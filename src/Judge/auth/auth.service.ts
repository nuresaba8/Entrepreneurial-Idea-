import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JudgeService } from '../judge.service'; 
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";
import { JudgeLoginDTO } from '../judge.logindto';
import { JudgeEntity } from '../judge.entity';
import { JudgeProfile } from '../judge.profile';
import { NotificationEntity } from '../notification.entity';

@Injectable()
export class AuthService {
  constructor(
    private judgeService: JudgeService,
    private jwtService: JwtService
  ) {}


  async signUp(judgeEntity: JudgeEntity): Promise<any> {
    try {
      await this.judgeService.createAuthJudge(judgeEntity);
      return { message: "Judge is added successfully" };
    } catch (error) {
      throw new BadRequestException('Failed to sign up judge: ' + error.message);
    }
  }
  
  


  async signIn(signInDto: JudgeLoginDTO): Promise<{ access_token: string; id: number }> {
    try {
      console.log("Signing in with email:", signInDto.email); // Log the email
      const judge = await this.judgeService.findOne(signInDto.email);
      console.log("Judge found:", judge); // Log the fetched judge object
      
      if (!judge || !(await bcrypt.compare(signInDto.password, judge.judge_password))) {
        throw new UnauthorizedException('Invalid email or password');
      }
      const payload = { email: signInDto.email };  
      
      return {
        access_token: await this.jwtService.signAsync(payload),
        id: judge.judge_id,
      };
    } catch (error) {
      console.error('Error during sign-in:', error);
      throw error;
    }
  }
}