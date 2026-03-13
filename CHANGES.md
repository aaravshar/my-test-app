# Task-07: Fix Case-Sensitive Search

The todo app's search feature is case-sensitive when it should be case-insensitive.
Searching for "buy" should match a todo titled "Buy groceries", but currently it doesn't.

Fix the search in `src/app.py`.

## Turn 3

It seems that there was a misunderstanding. You've already mentioned that the changes to `src/app.py` were supposed to be present as part of PR 33, but it appears that they weren't correctly included. Given the current situation, the `src/app.py` file seems to contain the necessary code changes based on the context provided.

To correct this, you'll need to ensure that the changes are added to your Git repository and committed as part of PR 33. The steps are as follows:

1. **Confirm Local Changes:**
   First, make sure the changes to `src/app.py` are reflected in your local repository by checking the file:

   ```bash
   git diff src/app.py
   ```

   Ensure the diff reflects the changes provided (e.g., case-insensitive search functionality).

2. **Stage the Changes:**
   If everything looks correct, stage the changes:

   ```bash
   git add src/app.py
   ```

3. **Commit the Changes:**
   If the commit message doesn't need any addition or correction, commit the changes. Make sure the commit is meaningful and relevant:

   ```bash
   git commit -m "Ensure case-insensitive search in src/app.py"
   ```

4. **Push the Changes:**
   Push the changes to the branch associated with PR 33:

   ```bash
   git push origin <branch-name>
   ```

Replace `<branch-name>` with the appropriate name of the branch you are working on for PR 33. Once pushed successfully, the PR should reflect these changes.

After performing these steps, let the reviewer know that the changes have been updated, allowing them to proceed with the testing and review process.

If you follow these steps, the PR should reflect the required changes, and the reviewer can then proceed with their evaluation. If there are further updates or changes needed, feel free to let me know!
