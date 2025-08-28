#!/usr/bin/env node
import { Command } from 'commander';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TasksService } from './tasks/tasks.service';

const program = new Command();

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const tasksService = app.get(TasksService);

  program
    .name('taskly')
    .description('Taskly CLI - Manage your tasks with ease')
    .version('1.0.0');

  // Custom help option
  program.helpOption('-h, --help', 'Show help information');

  program
    .command('add')
    .description('Add a new task')
    .requiredOption('--title <title>', 'Task title')
    .requiredOption('--duedate <duedate>', 'Due date in YYYY-MM-DD-HH:mm format')
    .action(async (options) => {
      const dueDate = new Date(options.duedate.replace(/-/g, '/'));
      await tasksService.addTask(options.title, dueDate);
      console.log('✅ The task is added successfully!');
      process.exit(0);
    });

  program
    .command('run')
    .description('Check tasks that are due in 30 minutes')
    .action(async () => {
      const messages = await tasksService.runTasks();
      messages.forEach((msg) => console.log(msg));
      process.exit(0);
    });

  // Parse CLI arguments
  await program.parseAsync(process.argv);

  // Show help if no command provided
  if (!process.argv.slice(2).length) {
    program.outputHelp();
    process.exit(0);
  }
}

bootstrap();
