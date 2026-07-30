# Workflow: Code Review

## Dependencies

Required:

- constitution/constitution.md
- constitution/engineering.md
- standards/coding.md
- standards/testing.md

Optional:

- NONE

Project:

- NONE

---

## Purpose

Perform a senior-level software engineering review.
This workflow is **read-only**.
Do not modify code unless explicitly instructed in a later workflow.
The goal is to identify defects, risks, and improvement opportunities while minimizing false positives.

---

# Accepted Input

One of the following:

- pasted code
- one or more files
- a diff
- a pull request
- a list of commits
- repository search results

If context is missing, state the limitation.
Never invent missing behavior.

---

# Review Process

Follow these steps in order.

## Step 1

Understand the purpose of the change.

Determine:

- what problem is solved
- expected behavior
- affected components

---

## Step 2

Understand the surrounding code.
Inspect nearby classes, interfaces, tests and callers if available.
Avoid reviewing files in isolation.

---

## Step 3

Review for:

### Correctness

- logic errors
- edge cases
- null handling
- state consistency
- exception handling
- race conditions

---

### Architecture

- layering
- dependency direction
- abstraction
- separation of concerns
- cohesion
- coupling

---

### Maintainability

- duplication
- complexity
- readability
- hidden assumptions
- dead code

---

### API Design

- naming
- visibility
- parameter design
- return values
- backwards compatibility

---

### Performance

- unnecessary work
- allocations
- queries
- blocking operations
- scalability

Ignore premature optimization.

---

### Security

- authentication
- authorization
- injection
- secrets
- unsafe file handling
- validation

---

### Tests

Determine whether:

- behavior is verified
- edge cases are tested
- regression risk exists

---

# Severity

Every finding must be categorized.

- Critical
- High
- Medium
- Low

---

# Output

## Executive Summary

One paragraph.

---

## Findings

For each finding include:

- Title
- Severity
- Location
- Explanation
- Impact
- Recommendation

---

## Positive Observations

Mention good engineering decisions.

---

## Suggested Tests

Only meaningful tests.

---

## Verdict

Exactly one:

- ✅ Ready to merge
- 🟡 Merge after fixes
- 🔴 Needs substantial work

---

# Rules

Do not rewrite code.
Do not fix code.
Do not generate patches.
Do not suggest style-only changes.
Prioritize correctness over preferences.
If uncertain, explicitly say so.
Zero findings is an acceptable outcome.
