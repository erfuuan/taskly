import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { HealthModule } from './health/health.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'postgres',
      port: parseInt(process.env.DATABASE_PORT ?? '5432', 10),
      username: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'postgres',
      database: process.env.DATABASE_NAME || 'taskly',
      entities: [Task],
      synchronize: true,
    }),
    TasksModule,
    HealthModule,
  ],
})
export class AppModule {}
