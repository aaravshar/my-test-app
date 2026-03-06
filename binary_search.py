"""Binary search implementation with helper utilities."""

def binary_search(arr, target):
    """Search for target in a sorted array. Returns the index if found, -1 otherwise.

    Args:
        arr: A sorted list of comparable elements.
        target: The element to search for.

    Returns:
        The index of target in arr, or -1 if not found.
    """
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
    """Find the index where target should be inserted to keep arr sorted.

    Args:
        arr: A sorted list of comparable elements.
        target: The element to find the insertion point for.

    Returns:
        The index where target should be inserted.
    """
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
    """Find the first and last position of target in a sorted array.

    Args:
        arr: A sorted list that may contain duplicates.
        target: The element to find the range for.

    Returns:
        A tuple (first, last) of indices, or (-1, -1) if not found.
    """
    if not arr:
        return (-1, -1)
    
    first = _find_first(arr, target)
    if first == -1:
        return (-1, -1)
    
    last = _find_last(arr, target)
    return (first, last)


def _find_first(arr, target):
    """Find the first occurrence of target."""
    left, right = 0, len(arr) - 1
    result = -1

    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            result = mid
            right = mid - 1  # Continue search on the left side
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return result


def _find_last(arr, target):
    """Find the last occurrence of target."""
    left, right = 0, len(arr) - 1
    result = -1

    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            result = mid
            left = mid + 1  # Continue search on the right side
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
