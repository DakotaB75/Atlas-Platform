# Deployment Flow

```mermaid
flowchart LR

Developer --> PullRequest

PullRequest --> Review

Review --> Merge

Merge --> GitHubActions

GitHubActions --> Terraform

Terraform --> Azure

Azure --> Production
```