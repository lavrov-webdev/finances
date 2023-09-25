import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { SprintsModule } from './sprints/sprints.module';
import { CategoriesModule } from './categories/categories.module';
import { EnvelopesModule } from './envelopes/envelopes.module';
import { TransactionsModule } from './transactions/transactions.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    CategoriesModule,
    SprintsModule,
    EnvelopesModule,
    TransactionsModule,
    PrismaModule,
  ],
})
export class AppModule {}
