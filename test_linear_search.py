```python
import unittest
from linear_search import linear_search

class TestLinearSearch(unittest.TestCase):
    def test_found(self):
        nums = [4, 2, 7, 1, 9]
        self.assertEqual(linear_search(nums, 7), 2)
        self.assertEqual(linear_search(nums, 9), 4)

    def test_not_found(self):
        nums = [4, 2, 7, 1, 9]
        self.assertEqual(linear_search(nums, 5), -1)

if __name__ == "__main__":
    unittest.main()

```
