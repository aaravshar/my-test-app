```markdown
# Merge Notes

## Merge Process

1. **Commit Changes**: Ensure all changes are committed.
2. **Push Branch**: Update the remote branch.
   - Command: `git push origin your-feature-branch`
3. **Sync and Resolve Conflicts**: Pull from main, resolve conflicts.
   - Commands:
     ```bash
     git checkout your-feature-branch
     git pull origin main
     ```
4. **Run Tests**: All tests should pass.
   - Commands:
     ```bash
     npm install
     npm test
     ```
5. **Finalize Merge**:
   - Merge commands:
     ```bash
     git checkout main
     git pull origin main
     git merge your-feature-branch
     git push origin main
     ```
6. **Confirmation**: Ensure the `main` branch reflects the merge properly and all CI tests pass on the remote server.

## Test Results

- All tests PASSED with no errors on local and remote after merging.

## Post-Merge Validation

- Ensure URLs in the `playwright.config.js` match the current testing and staging servers.
- Review the merged files and configurations for any missing dependencies or misconfigurations.
```markdown
