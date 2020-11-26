// Algorithm for counting inversions
// recursively count number of right, left, and split inversions
// # of split inversions for a value in sorted right array = length of sorted 
// left array when that element is pushed into sorted total array 

let arr = [1, 3, 5, 2, 4, 6];

const sortAndMerge = (left, right) => {
    let count = 0;
    let res = [];
    while (left.length >= 1 && right.length >= 1){
        if (left[0] < right[0]){
            res.push(left.shift());
        } else {
            res.push(right.shift());
            count += left.length; 
        }
    }
    return [count, res.concat(left).concat(right)]; 
}

const sortAndCount = (arr) => {
    if (arr.length <= 1) return [0, arr];
    let left = sortAndCount(arr.slice(0, arr.length/2));
    let right = sortAndCount(arr.slice(arr.length/2, arr.length));
    let split = sortAndMerge(left[1], right[1]);
    return [split[0] + left[0] + right[0], split[1]]; 
}

// console.log(sortAndCount(arr))