# Network Overview

```mermaid
flowchart LR

Internet

Internet --> AzureContainerApps

AzureContainerApps --> PostgreSQL

AzureContainerApps --> Redis

AzureContainerApps --> AzureMonitor
```