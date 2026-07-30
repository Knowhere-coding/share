# Workflow: Address Review Findings

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

Implement approved review findings while preserving behavior whenever possible.

---

# Input

One of:

- review report
- review comments
- GitHub review
- PR comments

---

# Step 1

Read every finding.
Ignore suggestions marked as already resolved.

---

# Step 2

Sort findings by severity.

Fix in this order:

- Critical
- High
- Medium
- Low

---

# Step 3

For every finding:

- Understand the root cause before editing code.
- Avoid superficial fixes.

---

# Step 4

Modify the smallest amount of code necessary.
Avoid unrelated refactoring.

---

# Step 5

Preserve:

- public APIs
- behavior
- architecture
- coding conventions

unless explicitly requested otherwise.

---

# Step 6

After every fix:

- verify
- compilation
- tests
- imports
- formatting

---

# Final Report

For every finding report:

- Status
- Resolved
- Partially Resolved
- Not Resolved
- Reason
- Files changed
- Remaining risks
- Testing performed
