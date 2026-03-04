
## Turn 3

To address the feedback, we'll add error handling for edge cases in the `binary_search.py` file and ensure the test cases in `test_binary_search.py` cover failure scenarios adequately. Here's the updated code:

--- FILE: binary_search.py ---
```python
def binary_search(arr, target):
    # Validate input types
    if not isinstance(arr, list):
        raise TypeError("The first argument must be a list.")
    if not isinstance(target, (int, float)):
        raise TypeError("The target must be a number.")

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
```

--- FILE: test_binary_search.py ---
```python
import unittest
from binary_search import binary_search

class TestBinarySearch(unittest.TestCase):
    def test_found(self):
        self.assertEqual(binary_search([1, 2, 3, 4, 5], 3), 2)
    
    def test_not_found(self):
        self.assertEqual(binary_search([1, 2, 3, 4, 5], 6), -1)
    
    def test_empty_array(self):
        self.assertEqual(binary_search([], 3), -1)
    
    def test_invalid_array_type(self):
        with self.assertRaises(TypeError):
            binary_search("not a list", 3)
    
    def test_invalid_target_type(self):
        with self.assertRaises(TypeError):
            binary_search([1, 2, 3], "three")
    
    def test_none_as_array(self):
        with self.assertRaises(TypeError):
            binary_search(None, 3)
    
    def test_none_as_target(self):
        with self.assertRaises(TypeError):
            binary_search([1, 2, 3], None)
    
    def test_single_element_found(self):
        self.assertEqual(binary_search([2], 2), 0)
    
    def test_single_element_not_found(self):
        self.assertEqual(binary_search([2], 3), -1)
    
    def test_unsorted_array(self):
        with self.assertRaises(ValueError):
            binary_search([3, 1, 2], 3)

if __name__ == "__main__":
    unittest.main()
```

### Key Modifications:
1. **Error Handling in `binary_search.py`:**
   - Added type checks for `arr` to ensure it's a list.
   - Added a type check for `target` to ensure it's a number (either `int` or `float`).

2. **Test Case Updates in `test_binary_search.py`:**
   - Added tests to check behavior when the array is `None`.
   - Added tests to check behavior when the target is `None`.
   - Added a test case for an unsorted array to raise a `ValueError`. (You might want to reconsider or remove this if the assumption is that the array is always sorted before being passed to this function.)

These modifications ensure that the binary search function is more robust and reliable by handling potential erroneous inputs appropriately.
