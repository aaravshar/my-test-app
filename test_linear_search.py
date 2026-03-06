import unittest
from linear_search import linear_search

class TestLinearSearch(unittest.TestCase):

    def test_element_present(self):
        nums = [4, 2, 7, 1, 9]
        self.assertEqual(linear_search(nums, 7), 2)
        self.assertEqual(linear_search(nums, 9), 4)
    
    def test_element_absent(self):
        nums = [4, 2, 7, 1, 9]
        self.assertEqual(linear_search(nums, 3), -1)
        
    def test_empty_list(self):
        nums = []
        self.assertEqual(linear_search(nums, 3), -1)
        
    def test_single_element_list(self):
        nums = [3]
        self.assertEqual(linear_search(nums, 3), 0)
        self.assertEqual(linear_search(nums, 9), -1)

if __name__ == '__main__':
    unittest.main()
#
