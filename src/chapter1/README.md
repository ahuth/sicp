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

(b<sup>n/2</sup>)<sup>2</sup> = (b<sup>2</sup>)<sup>n/2</sup>

This lead me to change:

```js
if (isEven(n)) {
  return square(exp(base, n / 2));
}
```

to:

```js
if (isEven(n)) {
  return exp(square(base), n / 2);
}
```

Note that the updated version is inherentaily tail-recursive / iterative, since it only calls `exp` at the "top" level and doesn't need its result to build up another expression!

Like I said, I don't think this is what the author's intended, but it's an interesting way of solving it: basically changing the problem to an exactly equivalent one, which can (hopefully) be solved much more easily later. For example, the following:

```js
exp(4, 4);
```

turns into:

```js
exp(16, 2);
```

which turns into:

```js
exp(256, 1)
```

which we know is 256!

Meanwhile, the "odd" case is easily turned in to a standard iterative process with an accumulator. Combine the two and we have a recursive exponentiation function using only tali calls / iterative processes.

Actually, now that I think about it, this is probably **_exactly_** the solution the authors had in mind. They specifically mention that we need to keep a state variable (they call it `a`), and that `ab^n` (where `b` is the base) should stay constant throughout the iteration.

For out "even" case, the accumulator (or `a` here) doesn't actually, change. And in the solution outlined here, `b` is getting squared whiled `n` is being halved... meaning that `b^n` will always be equal to the same thing. Since `a` is a constant (for our "even" case. It does decrease for "odd"), then the constraint the authors mentioned holds true.
