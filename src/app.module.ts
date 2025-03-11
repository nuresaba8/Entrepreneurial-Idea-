import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JudgeModule } from './Judge/judge.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from "@nestjs-modules/mailer";
import { MailService } from './Judge/mail.service';
import { AuthModule } from './Judge/auth/auth.module';


@Module({
  imports: [
    JudgeModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'saba',
      database: 'Judge',
      autoLoadEntities: true,
      synchronize: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        ignoreTLS: true,
        secure: true,
        auth: {
          user: 'nuresaba686@gmail.com',
          pass: 'xexc yhxv dwii xpqk',
        },
      },
      defaults: {
        from: 'nuresaba686@gmail.com',
      },
    }), AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, MailService],
})
export class AppModule {}