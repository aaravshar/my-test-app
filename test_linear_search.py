```python
import unittest
from linear_search import linear_search

class TestLinearSearch(unittest.TestCase):
    def test_found(self):
        self.assertEqual(linear_search([4, 2, 7, 1, 9], 7), 2)
        self.assertEqual(linear_search([4, 2, 7, 1, 9], 9), 4)
        self.assertEqual(linear_search([4, 2, 7, 1, 9], 4), 0)
     
    def test_not_found(self):
        self.assertEqual(linear_search([4, 2, 7, 1, 9], 5), -1)
        self.assertEqual(linear_search([], 1), -1)
    
    def test_single_element(self):
        self.assertEqual(linear_search([1], 1), 0)
        self.assertEqual(linear_search([1], 2), -1)

if __name__ == "__main__":
    unittest.main()
```
