def merge_sort(arr):
    if len(arr) <= 1: 
        return arr

    mid = len(arr) // 2
    left_half = arr[:mid]
    right_half = arr[mid:]

    # Recursive calls
    left_half = merge_sort(left_half)
    right_half = merge_sort(right_half)

    # Merge process
    i = j = k = 0
    sorted_array = [0] * len(arr)

    while i < len(left_half) and j < len(right_half):
        if left_half[i] <= right_half[j]:
            sorted_array[k] = left_half[i]
            i += 1
        else:
            sorted_array[k] = right_half[j]
            j += 1
        k += 1

    while i < len(left_half):
        sorted_array[k] = left_half[i]
        i += 1
        k += 1

    while j < len(right_half):
        sorted_array[k] = right_half[j]
        j += 1
        k += 1

    return sorted_array

# Test it out
test_list = [38, 27, 43, 3, 9, 82, 10]
print(merge_sort(test_list))
