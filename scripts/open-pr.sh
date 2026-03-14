```bash
#!/bin/bash
set -e

# --- Configuration ---
BRANCH_NAME="feature/update-playwright-todo-app"
TITLE="Update Playwright test suite for Flask Todo App"
DESCRIPTION="This PR adds a robust Playwright test suite for the Flask Todo App, including safeguards against .items() misinterpretation on JSON arrays (ensuring /api/todos always returns a JS array, not a dict)."

# Ensure we’re in a git repo
if ! git rev-parse --git-dir > /dev/null 2>&1; then
  echo "❌ Error: Not a git repository."
  echo ""
  echo "To open a PR manually:"
  echo "  git checkout -b ${BRANCH_NAME}"
  echo "  git add ."
  echo "  git commit -m 'feat: add Playwright tests (no .items() risks) and cleanup'"
  echo "  git push origin ${BRANCH_NAME}"
  exit 1
fi

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
REPO_SLUG="${GITHUB_REPOSITORY:-}"

echo "ℹ️ Current branch: ${CURRENT_BRANCH}"

# Save state and restore at end
cleanup() {
  if [[ "$CURRENT_BRANCH" != "$BRANCH_NAME" ]]; then
    echo "ℹ️ Returning to original branch: ${CURRENT_BRANCH}"
    git checkout "$CURRENT_BRANCH" 2>/dev/null || true
  fi
}
trap cleanup EXIT

# Sync main/master first
echo "ℹ️ Syncing main/master to avoid stale PRs..."
git fetch origin main 2>/dev/null || git fetch origin master || true
MAIN_BRANCH=$(git rev-parse --abbrev-ref origin/HEAD 2>/dev/null | sed 's|origin/||' || echo 'main')
if [[ "$MAIN_BRANCH" != "main" && "$MAIN_BRANCH" != "master" ]]; then
  MAIN_BRANCH="main"
fi
git checkout "$MAIN_BRANCH" 2>/dev/null || git checkout master 2>/dev/null || true
git pull origin "$MAIN_BRANCH" || true

# Create feature branch
echo "ℹ️ Creating and checking out branch: ${BRANCH_NAME}"
git checkout -b "$BRANCH_NAME"

# Stage and commit
echo "ℹ️ Staging all changes with 'git add .'"
git add .

# Check if there's anything to commit
if ! git diff --cached --quiet; then
  echo "ℹ️ Committing changes..."
  git commit -m "feat: add Playwright tests (no .items() risks) and cleanup" \
    -m "- Safeguards verify /api/todos returns arrays (not dicts), preventing .items() misinterpretation" \
    -m "- Includes reset/add/multiple todos tests; disables 'junit' to avoid XML parsing issues" \
    -m "- Adds global-setup cleanup script to remove stale test artifacts"
else
  echo "ℹ️ No staged changes to commit."
fi

# Push branch
echo "ℹ️ Pushing branch with --force-with-lease (safe)"
git push -u origin "$BRANCH_NAME" --force-with-lease

# Check gh CLI and auth
if ! command -v gh &>/dev/null; then
  echo "❌ 'gh' CLI not installed. Skipping automatic PR."
  echo ""
  echo "To create a PR manually:"
  echo "  git push -u origin ${BRANCH_NAME}"
  echo "  Visit: https://github.com/${REPO_SLUG}/compare/${BRANCH_NAME}?expand=1"
  exit 1
fi

if ! gh auth status &>/dev/null; then
  echo "❌ Not authenticated with GitHub CLI."
  echo "Run: gh auth login"
  echo ""
  echo "To create a PR manually after logging in:"
  echo "  gh pr create --title '$TITLE' --body '$DESCRIPTION' --base $MAIN_BRANCH --head ${BRANCH_NAME}"
  exit 1
fi

# Create PR *without* --fill (avoids auto-filling over custom title/body)
echo "ℹ️ Creating PR with title and body..."
gh pr create \
  --title "$TITLE" \
  --body "$DESCRIPTION" \
  --base "$MAIN_BRANCH" \
  --head "$BRANCH_NAME"

echo "✅ PR created successfully!"
echo "🔗 View it at: https://github.com/${REPO_SLUG}/pull/new/${BRANCH_NAME}"
