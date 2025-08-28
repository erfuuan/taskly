#!/usr/bin/env node
import { Command } from 'commander';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TasksService } from './tasks/tasks.service';
import chalk from 'chalk';

const program = new Command();

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const tasksService = app.get(TasksService);

  program
    .name(chalk.cyan.bold('taskly'))
    .description(chalk.green('Taskly CLI - Manage your tasks with ease'))
    .version('1.0.0');

  // Custom help option
  program.helpOption('-h, --help', chalk.yellow('Show help information'));

  // Add command
  program
    .command('add')
    .description(chalk.blue('Add a new task'))
    .requiredOption('--title <title>', chalk.magenta('Task title'))
    .requiredOption(
      '--duedate <duedate>',
      chalk.magenta('Due date in YYYY-MM-DD-HH:mm format'),
    )
    .action(async (options) => {
      try {
        const dueDate = new Date(options.duedate.replace(/-/g, '/'));
        await tasksService.addTask(options.title, dueDate);
        console.log(
          chalk.green.bold('✅ Success:') +
            ' ' +
            chalk.white(`Task "${options.title}" has been added!`),
        );
      } catch (err: any) {
        console.error(
          chalk.red.bold('❌ Error:') + ' ' + chalk.white(err.message),
        );
      } finally {
        process.exit(0);
      }
    });

  // Run command
  program
    .command('run')
    .description(chalk.blue('Check tasks that are due in 30 minutes'))
    .action(async () => {
      try {
        const messages = await tasksService.runTasks();
        if (messages.length === 0) {
          console.log(chalk.yellow('⚠️  No tasks due in the next 30 minutes.'));
        } else {
          messages.forEach((msg) =>
            console.log(chalk.yellow.bold('⏰ Task Reminder:') + ' ' + chalk.white(msg)),
          );
        }
      } catch (err: any) {
        console.error(
          chalk.red.bold('❌ Error:') + ' ' + chalk.white(err.message),
        );
      } finally {
        process.exit(0);
      }
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