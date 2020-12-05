const { ifError } = require("assert");
var fs = require("fs");

// Algorithm for counting inversions
// recursively count number of right, left, and split inversions
// # of split inversions for a value in sorted right array = length of sorted
// left array when that element is pushed into sorted total array

let arr = [1, 3, 5, 2, 4, 6];
let arr2 = [8, 6, 7, 2, 5, 4, 1, 3, 9];

const sortAndMerge = (left, right) => {
  let count = 0;
  let res = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      res.push(left.shift());
    } else {
      res.push(right.shift());
      count += left.length;
    }
  }
  return [count, res.concat(left).concat(right)];
};

const sortAndCount = (arr) => {
  if (arr.length <= 1) return [0, arr];
  let left = sortAndCount(arr.slice(0, arr.length / 2));
  let right = sortAndCount(arr.slice(Math.floor(arr.length / 2), arr.length));
  let split = sortAndMerge(left[1], right[1]);
  return [split[0] + left[0] + right[0], split[1]];
};

// console.log(sortAndCount(arr2));

fs.readFile("./text1.txt", function (err, data) {
  if (err) {
    return console.error(err);
  }
  let arr = data
    .toString()
    .split("\n")
    .map((el) => parseInt(el));
  // console.log(sortAndCount(arr));
});

//brute force matrix multiplication
let a = [
  [1, 2],
  [3, 4],
];
let b = [
  [5, 6],
  [7, 8],
];

const naiveMM = (a, b) => {
  let prod = [];
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a[0].length; j++) {
      let cell = 0;
      for (let k = 0; k < a.length; k++) {
        cell += a[(k, j)] * b[(j, k)];
      }
      prod.push([cell]);
    }
  }
  return prod;
};

//quick sort in place

let unsorted = [5, 2, 4, 1, 10, 8, 6, 4];

const partition = (arr, l, h) => {
  let pivot = arr[l];
  let i = l;
  let j = h;
  while (i < j) {
    while (arr[i] <= pivot) {
      i++;
    }
    while (arr[j] > pivot) {
      j--;
    }
    if (i < j) {
      let temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
  }
  let temp = arr[j];
  arr[j] = arr[l];
  arr[l] = temp;
  return j;
};

const quickSort = (arr, l, h) => {
  if (l < h) {
    let pIdx = partition(arr, l, h);
    quickSort(arr, l, pIdx - 1);
    quickSort(arr, pIdx + 1, h);
  }
  return arr;
};

// console.log(quickSort(unsorted, 0, unsorted.length-1));

const moreSpaceQuickSort = (arr) => {
  if (arr.length <= 1) return arr;
  let pivot = arr.shift();
  let left = moreSpaceQuickSort(arr.filter((el) => el <= pivot));
  let right = moreSpaceQuickSort(arr.filter((el) => el > pivot));
  return left.concat([pivot]).concat(right);
};

// console.log(moreSpaceQuickSort(unsorted));

//let unsorted = [5, 2, 4, 1, 10, 8, 6, 4];

const quickSort2 = (arr, left, right) => {
  if (right <= 1) return arr;
  let pivotIdx = Math.floor(Math.random() * (right-left))+left;
  // console.log(pivotIdx);
  let partition = partition2(arr, pivotIdx, right);
  quickSort(arr, left, partition-1);
  quickSort(arr, partition+1, right);
  return arr;
};

const partition2 = (arr, pivotIdx, right) => {
  let pivot = arr[pivotIdx];
  let i = pivotIdx + 1;
  let j = pivotIdx + 1;
  while (j < right) {
    if (arr[j] < pivot) {
      let temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
      i++;
    }
    j++;
  }
  let temp = pivot;
  arr[pivotIdx] = arr[i - 1];
  arr[i - 1] = temp;
  return i - 1;
};

console.log(quickSort2(unsorted, 0, unsorted.length));
