def binary_search(arr, target):
    left = 0
    right = len(arr)  # Bug: should be len(arr) - 1
    
    while left < right:  # Bug: should be left <= right
        mid = (left + right) / 2  # Bug: should be // for integer division
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid  # Bug: should be mid + 1
        else:
            right = mid  # Bug: should be mid - 1
    
    return -1
