```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        # Track if any swap is made during this pass
        swapped = False

        # Last i elements are already in place
        for j in range(0, n-i-1):
            # Swap if the element found is greater than the next element
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
                swapped = True
        
        # If no swaps were made, the array is sorted
        if not swapped:
            break
    return arr
```
