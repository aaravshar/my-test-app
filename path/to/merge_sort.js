function mergeSort(arr) {
    // Base case: array is already sorted or with a single element
    if (arr.length <= 1) {
        return arr;
    }

    // Split the array into two halves
    const mid = Math.floor(arr.length / 2);
    const leftHalf = arr.slice(0, mid);
    const rightHalf = arr.slice(mid);

    // Recursively sort both halves and merge them
    return merge(mergeSort(leftHalf), mergeSort(rightHalf));
}

function merge(left, right) {
    const result = [];
    let i = 0;
    let j = 0;

    // Merge both sorted halves into a result array
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }

    // Concatenate any remaining elements
    return result.concat(left.slice(i)).concat(right.slice(j));
}

// Example usage
const testArray = [38, 27, 43, 3, 9, 82, 10];
console.log("Sorted array:", mergeSort(testArray));
