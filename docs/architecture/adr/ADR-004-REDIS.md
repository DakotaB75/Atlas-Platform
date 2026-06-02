# ADR-004

## Title

Redis as Distributed Cache

## Status

Accepted

## Context

The platform requires a high-performance caching layer.

## Decision

Redis will be used as the primary cache service.

## Rationale

- High performance
- Simplicity
- Industry standard
- Cloud-native availability

## Consequences

Frequently accessed data may be cached using Redis.