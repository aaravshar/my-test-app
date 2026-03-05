def merge_sort(arr):
    """Sorts an array in ascending order using the merge sort algorithm."""
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left_half = merge_sort(arr[:mid])
    right_half = merge_sort(arr[mid:])

    return merge(left_half, right_half)

def merge(left, right):
    """Merges two sorted sublists into a single sorted list."""
    result = []
    i = j = 0

    # Merge process for combining two halves
    while i < len(left) and j < len(right):
        if left[i] < right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    # Append remaining elements
    result.extend(left[i:])
    result.extend(right[j:])

    return result

# For testing the function 
if __name__ == "__main__":
    test_list = [38, 27, 43, 3, 9, 82, 10]
    print("Sorted array:", merge_sort(test_list))
