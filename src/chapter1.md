# Chapter 1

## Largest Square Sum

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

## Exponentiation

I couldn't implement the "fast" exponentation function with an iterative process in the manner I think the authors intended. However, their clue about the following lead me to a good answer:

  (b^(n/2))^2 == (b^2)^(n/2)

This lead me to change:

  if (isEven(n)) {
    return square(exp(base, n / 2));
  }

to:

  if (isEven(n)) {
    return exp(square(base), n / 2);
  }

Note that the updated version is inherentaily tail-recursive / iterative, since it only calls `exp` at the "top" level and doesn't need its result to build up another expression!

Like I said, I don't think this is what the author's intended, but it's an interesting way of solving it: basically changing the problem to an exactly equivalent one, which can (hopefully) be solved much more easily later. For example, the following:

  exp(4, 4);

turns into:

  exp(16, 2);

which turns into:

  exp(256, 1)

which we know is 256!

Meanwhile, the "odd" case is easily turned in to a standard iterative process with an accumulator. Combine the two and we have a recursive exponentiation function using only tali calls / iterative processes.
