```python
import unittest
from merge_sort import merge_sort

class TestMergeSort(unittest.TestCase):
    """Unit tests for the merge_sort function."""

    def test_empty_list(self):
        """Test sorting an empty list: should return an empty list."""
        self.assertEqual(merge_sort([]), [])

    def test_single_element(self):
        """Test sorting a list with a single element: should return the same list."""
        self.assertEqual(merge_sort([1]), [1])

    def test_sorted_list(self):
        """Test sorting an already sorted list: should return the same list."""
        self.assertEqual(merge_sort([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5])

    def test_unsorted_list(self):
        """Test sorting a normal unsorted list: should return the sorted list."""
        self.assertEqual(merge_sort([38, 27, 43, 3, 9, 82, 10]), [3, 9, 10, 27, 38, 43, 82])

    def test_reverse_sorted_list(self):
        """Test sorting a reverse sorted list: should return the sorted list."""
        self.assertEqual(merge_sort([5, 4, 3, 2, 1]), [1, 2, 3, 4, 5])

if __name__ == "__main__":
    unittest.main()
```
