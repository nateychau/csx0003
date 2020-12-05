/*
Master method

Base case: T(n) <= a constant

All larger n: T(n) <= a*T(n/b) + O(n^d)
a = # of recursive calls (>=1)
b = shrinkage factor of input size (>1)
d = exponent in run time of 'combine step'(>=0)
a,b,d are all constants independent of n

if a = b^d
O((n^d)*logn)

if a < b^d
O(n^d)

if a > b^d
O(n^(logb(a)))

*/