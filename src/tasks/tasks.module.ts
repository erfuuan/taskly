import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
