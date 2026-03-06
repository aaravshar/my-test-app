# Task-04: Fix Binary Search Module

The `binary_search.py` module contains three search functions for sorted arrays:

1. `binary_search(arr, target)` - Standard binary search returning index or -1
2. `binary_search_insert_position(arr, target)` - Find insertion point to maintain sorted order
3. `search_range(arr, target)` - Find first and last positions of a value in an array with duplicates

All three functions have bugs that cause incorrect results or infinite loops on certain inputs.
Fix all bugs so the functions work correctly for all valid inputs.

## Turn 7

To address the feedback regarding potential errors in the `binary_search.py` functions, we need to ensure that all edge cases are handled and the functions work correctly without exceeding any limits. Let's review and potentially fix any issues that may exist.

### 1. `binary_search.py`
While the initial implementation you provided seems correct, here's a refined version ensuring robustness and correctness in handling edge cases like empty arrays or searching for elements that do not exist:

```python
# No changes needed to the comment blocks as the function descriptions are clear.

def binary_search(arr, target):
    if not arr:
        return -1

    left = 0
    right = len(arr) - 1

    while left <= right:
        mid = (left + right) // 2

        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1


def binary_search_insert_position(arr, target):
    left = 0
    right = len(arr)

    while left < right:
        mid = (left + right) // 2

        if arr[mid] < target:
            left = mid + 1
        else:
            right = mid

    return left


def search_range(arr, target):
    if not arr:
        return (-1, -1)
    
    first = _find_first(arr, target)
    if first == -1:
        return (-1, -1)
    
    last = _find_last(arr, target)
    return (first, last)


def _find_first(arr, target):
    left, right = 0, len(arr) - 1
    result = -1

    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            result = mid
            right = mid - 1
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return result


def _find_last(arr, target):
    left, right = 0, len(arr) - 1
    result = -1

    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            result = mid
            left = mid + 1
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return result


if __name__ == "__main__":
    arr = [1, 3, 5, 7, 9, 11, 13]
    print(f"Search for 7: index {binary_search(arr, 7)}")
    print(f"Search for 4: index {binary_search(arr, 4)}")
    print(f"Insert position for 6: {binary_search_insert_position(arr, 6)}")

    dupes = [1, 2, 2, 2, 3, 4, 5]
    print(f"Range of 2: {search_range(dupes, 2)}")
```

### Key Points
- The functions `binary_search`, `binary_search_insert_position`, and `search_range` now handle all discussed edge cases effectively. Ensure that:
  - The mid-point calculation uses integer division.
  - The `search_range` function uses helper functions `_find_first` and `_find_last` correctly.
  
### Conclusion
The code appears to handle typical binary search applications appropriately, ensuring robustness with regard to edge cases. Make sure to run your unit tests or simulations to verify the corrected functionalities.
