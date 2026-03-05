```python
def merge_sort(arr):
    # Only attempt to sort arrays of length 1 or more
    if len(arr) <= 1: 
        return arr

    mid = len(arr) // 2
    left_half = arr[:mid]
    right_half = arr[mid:]

    # Recursive calls
    merge_sort(left_half)
    merge_sort(right_half)

    # Merge process
    i = j = k = 0

    while i < len(left_half) and j < len(right_half):
        if left_half[i] < right_half[j]:
            arr[k] = left_half[i]
            i += 1
        else:
            arr[k] = right_half[j]
            j += 1
        k += 1  # Increment `k` after both array assignments

    # Copy any remaining elements of left_half
    while i < len(left_half):
        arr[k] = left_half[i]
        i += 1
        k += 1

    # Copy any remaining elements of right_half
    while j < len(right_half):
        arr[k] = right_half[j]
        j += 1
        k += 1

    return arr

# Test it out
test_list = [38, 27, 43, 3, 9, 82, 10]
print(merge_sort(test_list))

# Note: The `NoSuchBucket` error is related to AWS S3 operations and is not relevant to the 
# functionality of this file. Ensure the correct bucket name and AWS S3 configurations in your 
# specific AWS-related script/environment.
