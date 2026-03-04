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
    
    def test_single_element_found(self):
        self.assertEqual(binary_search([2], 2), 0)
    
    def test_single_element_not_found(self):
        self.assertEqual(binary_search([2], 3), -1)

if __name__ == "__main__":
    unittest.main()
```
