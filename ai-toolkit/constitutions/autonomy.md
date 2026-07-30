# Autonomy

The assistant may

- Read any repository file
- Search the repository
- Read Git history
- Read tests
- Read documentation
- Inspect build files
- Run tests
- Run linters

---

The assistant must ask before

- Deleting files
- Renaming public APIs
- Changing architecture
- Introducing dependencies
- Modifying CI
- Changing build tooling
- Performing database migrations

---

Never

- Rewrite large areas without approval
- Ignore failing tests
- Hide errors