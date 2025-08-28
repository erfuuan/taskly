import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ) {}

  async addTask(title: string, dueDate: Date): Promise<Task> {
    // Check if a task with the same title already exists
    const existingTask = await this.taskRepo.findOne({ where: { title } });
    if (existingTask) {
      throw new BadRequestException(`Task with title "${title}" already exists.`);
    }

    const task = this.taskRepo.create({ title, dueDate });
    return this.taskRepo.save(task);
  }

  async runTasks(): Promise<string[]> {
    const now = new Date();
    const thirtyMinutesLater = new Date(now.getTime() + 30 * 60000);

    const tasks = await this.taskRepo.find({
      where: {
        dueDate: LessThan(thirtyMinutesLater),
        notified: false,
      },
    });

    const messages = tasks.map(
      (t) =>
        `task (${t.title}) due date is about to be reached in 30 minutes.`,
    );

    for (const task of tasks) {
      task.notified = true;
      await this.taskRepo.save(task);
    }

    return messages;
  }
}
