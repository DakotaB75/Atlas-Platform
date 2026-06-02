# ADR-001

## Title

Terraform as Infrastructure as Code Standard

## Status

Accepted

## Context

Atlas Platform requires a repeatable and version-controlled approach for provisioning cloud infrastructure.

## Decision

Terraform has been selected as the Infrastructure as Code platform.

## Rationale

Benefits include:

- Multi-environment support
- Reusable modules
- Version control integration
- Cloud provider abstraction
- Industry adoption

## Consequences

All cloud resources must be provisioned through Terraform.

Manual resource creation should be avoided whenever possible.