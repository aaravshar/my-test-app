```bash
#!/bin/bash
set -e

# --- Configuration ---
REPO_SLUG="${GITHUB_REPOSITORY:-}"
BRANCH_NAME="feature/update-playwright-todo-app"
TITLE="Update Playwright test suite for Flask Todo App"
DESCRIPTION="This PR adds a robust Playwright test suite to validate the Flask Todo App, with safeguards against common .items() misinterpretation on JSON arrays."

# Ensure we’re in a git repo
if ! git rev-parse --git-dir > /dev/null 2>&1; then
  echo "Error: Not a git repository."
  exit 1
fi

# Save current branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
  echo "❌ 'gh' CLI not found. Please install it first: https://cli.github.com/"
  echo ""
  echo "To open a PR manually:"
  echo "  git checkout -b ${BRANCH_NAME}"
  echo "  git add ."
  echo "  git commit -m 'feat: add Playwright tests (no .items() risks) and cleanup script'"
  echo "  git push origin ${BRANCH_NAME}"
  echo "  Then open a PR at GitHub UI."
  exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
  echo "❌ GitHub CLI not authenticated. Run: gh auth login"
  exit 1
fi

# Sync main first (avoid stale PR)
if [[ "$CURRENT_BRANCH" != "main" && "$CURRENT_BRANCH" != "master" ]]; then
  echo "ℹ️ Switching to main/master to pull latest..."
  git checkout main 2>/dev/null || git checkout master || true
  git pull origin main || git pull origin master
fi

# Create and push feature branch
echo "ℹ️ Creating branch ${BRANCH_NAME}..."
git checkout -b "$BRANCH_NAME"

echo "ℹ️ Stage and commit all changes..."
git add .
git commit -m "feat: add Playwright test suite with array safety guards + cleanup" \
  -m "- Safeguards verify /api/todos returns arrays (not dicts), preventing .items() misinterpretation" \
  -m "- Includes reset,add,multiple todos tests; disables 'junit' to avoid XML parsing issues" \
  -m "- Adds global-setup cleanup script to remove stale test artifacts"

echo "ℹ️ Pushing ${BRANCH_NAME}..."
git push -u origin "$BRANCH_NAME" --force-with-lease

# Create PR
echo "ℹ️ Opening PR on GitHub..."
gh pr create \
  --title "$TITLE" \
  --body "$DESCRIPTION" \
  --base "main" \
  --head "$BRANCH_NAME" \
  --fill

echo "✅ PR created successfully!"
echo "🔗 You can view it at: https://github.com/${REPO_SLUG}/pull/new/${BRANCH_NAME}"
```
