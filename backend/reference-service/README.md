# Atlas Reference Service

Production-oriented NestJS backend used as the reference workload for the Atlas Platform.

The service demonstrates a small but realistic API with PostgreSQL persistence, Redis cache, OpenAPI documentation, validation, business errors, Docker support and request tracing.

## Stack

- Node.js
- TypeScript strict mode
- NestJS
- PostgreSQL
- Redis
- TypeORM
- Class Validator
- Zod environment validation
- Swagger / OpenAPI
- Docker Compose

## Project Structure

```text
src
├── cache                 # Redis cache contract and implementation
├── common
│   ├── context           # Request context storage
│   ├── dto               # Shared response DTOs
│   ├── errors            # Business errors and global exception filter
│   ├── logging           # Request-aware application logger
│   ├── middleware        # Request id middleware
│   └── observability     # Global observability module
├── config                # Environment validation
├── database              # PostgreSQL/TypeORM connection
└── modules
    ├── health            # Health endpoint
    └── users             # User CRUD module
```

## Quick Start With Docker

From this directory:

```bash
docker compose up --build
```

Services:

- API: `http://localhost:3000`
- Swagger: `http://localhost:3000/docs`
- Health: `http://localhost:3000/health`
- PostgreSQL: `localhost:5432`
- Redis: `localhost:6379`

Stop services:

```bash
docker compose down
```

Remove local database/cache volumes:

```bash
docker compose down -v
```

## Local Development

Install dependencies:

```bash
npm install
```

Create local env file:

```bash
cp .env.example .env
```

Start PostgreSQL and Redis. The easiest option is Docker Compose:

```bash
docker compose up postgres redis
```

Run the API in watch mode:

```bash
npm run start:dev
```

Build:

```bash
npm run build
```

## Environment Variables

| Variable | Description | Default example |
| --- | --- | --- |
| `PORT` | HTTP server port | `3000` |
| `NODE_ENV` | Runtime environment | `development` |
| `DATABASE_HOST` | PostgreSQL host | `localhost` |
| `DATABASE_PORT` | PostgreSQL port | `5432` |
| `DATABASE_USER` | PostgreSQL user | `atlas` |
| `DATABASE_PASSWORD` | PostgreSQL password | `atlas` |
| `DATABASE_NAME` | PostgreSQL database | `atlas_reference` |
| `REDIS_HOST` | Redis host | `localhost` |
| `REDIS_PORT` | Redis port | `6379` |

Environment values are validated at startup with Zod.

## API Documentation

Swagger UI is available at:

```text
http://localhost:3000/docs
```

## Endpoints

### Health

```http
GET /health
```

Response:

```json
{
  "status": "healthy"
}
```

### Users

```http
GET /users
POST /users
GET /users/:id
PUT /users/:id
DELETE /users/:id
```

User fields:

```text
id
name
email
createdAt
updatedAt
```

## Example Requests

Create user:

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Foo User",
    "email": "foo@example.com"
  }'
```

List users:

```bash
curl http://localhost:3000/users
```

Get user by id:

```bash
curl http://localhost:3000/users/1
```

Update user:

```bash
curl -X PUT http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Foo Updated",
    "email": "foo.updated@example.com"
  }'
```

Delete user:

```bash
curl -X DELETE http://localhost:3000/users/1
```

Send a request id for traceability:

```bash
curl http://localhost:3000/users/1 \
  -H "x-request-id: local-test-123"
```

## Error Format

Errors use a stable application format:

```json
{
  "errorCode": "user/not-found",
  "errorMsg": "User with id 1 was not found"
}
```

Current business error codes:

- `user/not-found`
- `user/already-exists`
- `internal/server-error`

Validation errors are normalized by the global exception filter.

## Persistence

PostgreSQL is configured through TypeORM.

- `DatabaseModule` owns the database connection.
- Feature modules register their own entities with `TypeOrmModule.forFeature`.
- `UsersModule` owns `UserEntity` and `TypeOrmUserRepository`.

In non-production environments, TypeORM `synchronize` is enabled for local development convenience. Production deployments should use migrations.

## Cache

Redis is used through a cache contract:

- `CacheService` defines the cache interface.
- `RedisCacheService` implements it with `ioredis`.
- `GET /users/:id` uses cache-aside lookup.
- Create/update refresh the user cache entry.
- Delete invalidates the user cache entry.

Cache failures are logged but do not fail the user request when PostgreSQL can still serve the operation.

## Observability

Every HTTP request receives a request id:

- Incoming `x-request-id` is reused.
- If missing, a new id is generated.
- The response includes `x-request-id`.

Logs include:

- request id
- component name
- HTTP method
- route
- status code
- duration

Example log shape:

```text
[requestId=local-test-123] [component=HttpRequest] Request completed {"durationMs":12,"method":"GET","route":"/users/1","statusCode":200}
```

## Docker Services

`docker-compose.yml` starts:

- `backend`
- `postgres`
- `redis`

PostgreSQL and Redis include health checks. The backend waits for both services before starting.

## Useful Scripts

```bash
npm run start:dev
npm run build
npm run start:prod
npm run lint
npm test
```
