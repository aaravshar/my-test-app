# Task-04: Fix Binary Search Module

The `binary_search.py` module contains three search functions for sorted arrays:

1. `binary_search(arr, target)` - Standard binary search returning index or -1
2. `binary_search_insert_position(arr, target)` - Find insertion point to maintain sorted order
3. `search_range(arr, target)` - Find first and last positions of a value in an array with duplicates

All three functions have bugs that cause incorrect results or infinite loops on certain inputs. Fix all bugs so the functions work correctly for all valid inputs.

## Turn 4

Regarding the automated testing environment issues, please follow these steps to troubleshoot:

1. **Dependencies & Configuration**: Ensure all required packages are installed and correct configurations are applied.
2. **File Permissions**: Verify the testing framework has appropriate access rights to all necessary files and directories.
3. **Service Availability**: Check the stability and availability of any external services or databases that are part of the tests.
4. **Resource Allocation**: Confirm that the test environment is not resource-constrained.

Additionally, enhance the logging in the test script to capture detailed runtime outputs and error messages for further insights into potential issues.

### Manual Testing Verification

For manual testing, perform the following checks for each function to validate outputs:

- **`binary_search(arr, target)`**: Test cases where the target exists, does not exist, and edge cases like empty arrays.
- **`binary_search_insert_position(arr, target)`**: Include cases where the target should be placed at the start, end, or between elements.
- **`search_range(arr, target)`**: Ensure the function correctly identifies ranges in arrays with duplicates and handles edge cases.

Assuming successful manual testing and troubleshooting, approve the pull request once verified.

If issues persist with automated testing, engage with the support team for your testing infrastructure.
