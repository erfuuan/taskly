# Taskly

Taskly is a lightweight task management application built with **NestJS** and **PostgreSQL**.  
It provides a **CLI for task management** and a **REST API** for health checks.

---

## Features

- Add tasks via CLI with title and due date.
- Check tasks due in the next 30 minutes via CLI.
- REST API endpoint for health check.
- PostgreSQL database for task storage.
- Dockerized setup with multi-stage build.
- Security and logging with **Helmet** and **Morgan**.
- Configuration via `.env` file.

---

## Prerequisites

- Docker & Docker Compose
- Node.js 22+ (for local development, optional if using Docker)
- npm 8+

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/taskly.git
cd taskly
```

## Create env file:
```
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=taskly
```

## Run
``` 
docker-compose up --build -d
```




# CLI Usage

## Add a Task

``` 
docker-compose exec taskly-app node dist/cli.js add --title="Do something" --duedate="2025/11/01-11:23"
```

## Run Tasks

```
docker-compose exec taskly-app node dist/cli.js run
```

## Output

```
task (Do something) due date is about to be reached in 30 minutes.
```


## CLI Help

```
docker-compose exec taskly-app node dist/cli.js --help
```

# REST API

## Health Check

```
curl -X GET "http://localhost:3000/api/v1/health"
```

## Response : 

```
{
    "status": "ok",
    "timestamp": "2025-08-28T14:14:45.664Z"
}
```
