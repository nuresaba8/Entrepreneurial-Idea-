import { IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, Matches, MinLength, Contains, IsEnum, MaxLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity('JudgeDTO')
export class JudgeDTO
{
    @IsNotEmpty({ message: 'Status should not be empty' })
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @IsNotEmpty({ message: 'Status should not be empty' })
  @MaxLength(100, { message: "Name must be at most 100 characters long" })
  @Column({ type: 'varchar', length: 100 })
  fullName: string;

  @IsNotEmpty({ message: 'Status should not be empty' })
  @IsNumber()
  @Column({ unsigned: true })
  age: number;

  @IsNotEmpty({ message: 'Status should not be empty' })
  @IsEnum(['active', 'inactive'], { message: 'Status must be either active or inactive' })
  @Column({
    type: 'enum',
    enum: ['active', 'inactive'],
    default: 'active'
  })
  status: 'active' | 'inactive';

    
}