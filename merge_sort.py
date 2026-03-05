import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def merge_sort(arr):
    logging.info(f"Sorting array: {arr}")
    
    # Only attempt to sort arrays of length 1 or more
    if len(arr) <= 1: 
        logging.info(f"Array is already sorted: {arr}")
        return arr

    mid = len(arr) // 2
    left_half = arr[:mid]
    right_half = arr[mid:]

    # Recursive calls
    logging.info(f"Left half before sort: {left_half}")
    logging.info(f"Right half before sort: {right_half}")
    
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
        k += 1
        logging.info(f"Merged array in process: {arr}")

    # Copy any remaining elements of left_half
    while i < len(left_half):
        arr[k] = left_half[i]
        i += 1
        k += 1
        logging.info(f"Appending remaining left half: {arr}")

    # Copy any remaining elements of right_half
    while j < len(right_half):
        arr[k] = right_half[j]
        j += 1
        k += 1
        logging.info(f"Appending remaining right half: {arr}")

    logging.info(f"Sorted array: {arr}")
    return arr

# Test it out
test_list = [38, 27, 43, 3, 9, 82, 10]
sorted_list = merge_sort(test_list)
print(f"Result of merge sort: {sorted_list}")

# Note: The `NoSuchBucket` error is related to AWS S3 operations and is not relevant to the 
# functionality of this file. Ensure the correct bucket name and AWS S3 configurations in your 
# specific AWS-related script/environment.
