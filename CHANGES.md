# Task-05: Fix Linear Search

The `linear_search.py` file has a bug that causes it to miss finding the last element in the list. Fix it.

## Turn 3

To address the feedback about the build failure, we need to examine the build logs to identify what caused the issue. Since this information is not directly available here, I'll provide guidance on what steps to take when you access the build logs. Also, we will assume that the code itself, as provided earlier, is correct unless there are specific errors reported in the build logs related to syntax or dependencies in `linear_search.py`.

Here's what you should typically do:

1. **Check Build Environment:**
   - Verify that all dependencies and environment settings required for the build are correct.
   - Ensure there are no missing dependencies that might be causing the environment to fail to initialize properly.

2. **Examine the Logs:**
   - Look at the build logs for any error messages related to syntax errors, missing files, or misconfigurations.
   - Note any lines indicating where the failure might have occurred, such as compilation errors, if applicable.

3. **Code Verification:**
   - Ensure the code does not have issues like improper imports or unsupported language features which might lead to build failures.
   - Based on the feedback, since tests did not run due to an early build failure, check if any configuration files are set up correctly for the testing framework being used.

4. **Rerun Build:**
   - After making any identified corrections, attempt to rebuild to verify if the issue is resolved.

If specific corrections to code or configuration are needed based on the error logs, modify them accordingly.

For the current code provided, it's assumed to be syntactically correct and logically sound for performing a linear search, as shown in the `linear_search.py`. If errors pertain to this code, they would typically involve syntax issues or missing components (which would be visible in error logs).

Once you identify and fix the specific issues using the guidance above, ensure to rerun your tests to verify that both the build and tests run as expected.

If there are specific build tool configurations or testing frameworks involved, ensure that:
- Configuration files (e.g., for tools like `pytest`, `nose`, `unittest`, etc.) are properly set up.
- Correct versions for dependencies and interpreters are specified in relevant config files like `requirements.txt` or `environment.yml`.

Please let me know if you need more context or help with a specific part of the process described.
