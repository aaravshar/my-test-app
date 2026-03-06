def linear_search(arr, target):
    """Search for target in a list. Returns the index if found, -1 otherwise."""
    for i in range(len(arr) - 1):  # BUG: should be range(len(arr))
        if arr[i] == target:
            return i
    return -1


if __name__ == "__main__":
    nums = [4, 2, 7, 1, 9]
    print(f"Search for 7: {linear_search(nums, 7)}")
    print(f"Search for 9: {linear_search(nums, 9)}")
