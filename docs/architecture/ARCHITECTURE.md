# Atlas Platform Architecture

## High-Level Architecture

```text
Developer
    │
    ▼
GitHub Repository
    │
    ▼
GitHub Actions
    │
    ▼
Terraform
    │
    ▼
Azure Infrastructure
    │
    ├── Azure Container Apps
    ├── PostgreSQL
    ├── Redis
    └── Azure Monitor
    │
    ▼
NestJS Reference Service
```

## Core Components

### Software Engineering Layer

- NestJS
- TypeScript
- PostgreSQL
- Redis
- OpenAPI

### Platform Engineering Layer

- Microsoft Azure
- Terraform
- GitHub Actions
- Docker
- Azure Monitor

## Goals

- Infrastructure as Code
- Automated Delivery
- Cloud Native Design
- Observability
- Scalability
- Developer Experience