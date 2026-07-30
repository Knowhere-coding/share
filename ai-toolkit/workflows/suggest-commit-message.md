# Workflow: Suggest Commit Message

## Dependencies

Required:

- NONE

Optional:

- NONE

Project:

- NONE

---

## Purpose

Analyze code changes and suggest high-quality Conventional Commit messages.

The goal is to create commit messages that clearly communicate:

- what changed
- why it changed
- the impact of the change

This workflow does not create commits.

---

# Input

The review source can be:

- unstaged changes
- staged changes
- a git diff
- selected files
- recent commits
- a completed task description

Use the available context.

---

# Preparation

Before suggesting messages:

1. Inspect the changes.
2. Understand the intent of the changes.
3. Identify:

- affected components
- user-visible changes
- technical changes
- bug fixes
- refactoring
- dependencies
- configuration changes
- tests added or modified

4. If available, inspect related files for additional context.

---

# Conventional Commit Format

Use this format:

```
<type>(<scope>): <short description>
```

Optional body:

```
<type>(<scope>): <short description>

<body explaining why>
```

---

# Allowed Types

Prefer these types:

## feat

A new feature or capability.

Example:

```
feat(payment): add retry handling for failed transactions
```

---

## fix

A bug fix.

Example:

```
fix(auth): prevent expired tokens from being accepted
```

---

## refactor

Code restructuring without behavior change.

Example:

```
refactor(order): simplify validation flow
```

---

## test

Adding or changing tests.

Example:

```
test(payment): add integration tests for refunds
```

---

## docs

Documentation changes.

Example:

```
docs(api): document authentication flow
```

---

## perf

Performance improvements.

Example:

```
perf(search): reduce database queries during lookup
```

---

## build

Build system or dependency changes.

Example:

```
build(dependencies): upgrade spring boot version
```

---

## chore

Maintenance work.

Example:

```
chore(ci): update pipeline configuration
```

---

# Message Quality Rules

Commit messages should:

- start with a lowercase type
- use imperative language
- be concise
- describe the outcome, not the implementation detail
- avoid unnecessary technical details
- language: german

Prefer:

```
fix(order): prevent duplicate processing of payments
```

Over:

```
fix(order): change payment service if statement
```

---

# Scope

Suggest a scope when useful.

Good scopes:

- domain name
- module name
- component name

Examples:

```
auth
payment
database
api
frontend
ci
```

Avoid overly detailed scopes.

---

# Output Format

Provide:

## Change Summary

A short description of what the changes accomplish.

---

## Suggested Commit Messages

Provide 3-5 options.

Rank them:

### Recommended

```
type(scope): message
```

Reason:

Explain why this best represents the change.

---

### Alternative 1

```
type(scope): message
```

When to use it.

---

### Alternative 2

```
type(scope): message
```

When to use it.

---

## Commit Type

Explain:

- why this is feat/fix/refactor/etc.
- why other types were rejected

---

# Rules

Do not suggest a commit message before understanding the diff.
Do not infer requirements that are not visible.
Do not combine unrelated changes into one commit message.
If the changes contain multiple unrelated concerns, recommend splitting the commit.
If unsure, provide alternatives and explain the uncertainty.
Do not perform git commit commands.
