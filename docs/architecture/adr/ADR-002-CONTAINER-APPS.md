# ADR-002

## Title

Azure Container Apps as Primary Compute Platform

## Status

Accepted

## Context

Atlas Platform requires a container-based runtime capable of supporting modern cloud-native workloads.

## Decision

Azure Container Apps will be used as the primary compute platform.

## Rationale

- Serverless operations
- Native Azure integration
- Simplified scaling
- Container-based deployments
- Reduced operational overhead

## Consequences

All backend services should be containerized and deployable through Azure Container Apps.