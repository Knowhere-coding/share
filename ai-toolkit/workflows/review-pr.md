# Workflow: Review Current Branch

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

Review all work performed on the current feature branch.
Use the Code Review workflow for analysis.

---

# Step 1

Determine:

- current branch
- default branch
- merge base

---

# Step 2

Collect:

- commits
- changed files
- diff summary

---

# Step 3

Inspect the final state of the code.
Do not only inspect the diff.
Understand how the changes integrate with the existing codebase.

---

# Step 4

Review commit quality.

Look for:

- unrelated commits
- large commits
- missing commit messages
- accidental files
- generated files
- debug code

---

# Step 5

Run the Code Review workflow on the collected changes.

---

# Additional Checks

Look for:

- forgotten TODOs
- console/debug logging
- commented-out code
- merge conflict markers
- temporary feature flags
- accidental configuration changes
- snapshot version updates

---

# Deliverable

Produce:

- Executive Summary
- Commit Review
- Engineering Findings
- Suggested Tests
- Merge Recommendation
