```mermaid
flowchart TD

    DEV[Developer]

    GH[GitHub]

    GHA[GitHub Actions]

    TF[Terraform]

    ACA[Azure Container Apps]

    PG[PostgreSQL]

    REDIS[Redis]

    MON[Azure Monitor]

    DEV --> GH

    GH --> GHA

    GHA --> TF

    TF --> ACA

    TF --> PG

    TF --> REDIS

    ACA --> MON

    PG --> MON

    REDIS --> MON
```