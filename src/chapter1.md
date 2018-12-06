# Chapter 1

Found something interesting right off the bat, in Exercise 1.2. The scheme implementation is something like:

```scheme
(define (largestSqSum a b c)
  (apply + (map square (biggest a b c))))
```

The closest Javascript to that is something like:

```js
function largestSqSum(a, b, c) {
  return biggest(a, b, c).map(square).reduce(add)
}
```

Where `add` would traditionally be:

```js
function add(acc, n) {
  return acc + n;
}
```

Classic `reduce` pattern of returning a new accumulator at each iteration.

What's interesting, though, is when we re-write `add` like it's truly just an `add` function, and not some thing we're giving to `reduce`:

```js
function add(a, b) {
  return a + b;
}
```

Even though the function is now more generic, it works just as well as it did before! To me this is not far off from the Scheme pattern of applying a function to a list:

```scheme
(apply + (1 2 3))
```

🤔
