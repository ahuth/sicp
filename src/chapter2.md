# Chapter 2

## Data Abstractions

So far the author's concept of data abstraction is really interesting. Basically they advocate for providing constructor, getter, and setter functions, which result in programmers never having to understand the inner implementation. For example, for dealing with rational numbers:

```scheme
(define (make-rat n d)
  (cons n d))

(define (numer x)
  (car x))

(define (denom x)
  (cdr x))

(define (+rat x y)
  (make-rat (+ (* (numer x) (denom y))
               (* (denom x) (numer y)))
            (* (denom x) (denom y))))
```

Now we can use these functions and deal with more complex data, without ever actually understanding - or even directly accessing - any implementation details.

This concept is well known, but doesn't seem to be successfully implemented in practice. Not sure exactly why, but it could be for a couple reasons:

- The benefits aren't immediately clear to developers
- People don't know how to start doing this
- People may not be thinking on this level, and are just trying to solve the problem right in front of them.
- Doing this can seem unnecessary, or maybe even harmful.

An implied task for me is to figure out ways of demonstrating and explaining this. Copying-and-pasting seems to be really common (probably because of its perceived safety, and the speed it has), so supplying and marketing examples may be effective.

The first time I really started to understand this way of doing data abstraction was when studying Elixir. For example, checkout out [its String module](https://hexdocs.pm/elixir/String.html#downcase/2):

```elixir
s = String.downcase(s)
```

`String` provides a bunch of functions which take a string and return something new. Just like the authors do.

In fact, my Elixir experience led me to use this in React projects. In [my evolved-salesman one](https://github.com/ahuth/evolved-salesman/blob/495da8ef8487c50d2ec296fcfc74d6d5409aa093/src/utils/chromosome.js), I made heavy use of this.

An example is:

```js
const population = Population.create(cities);
const fittest = Population.evolve(population);
const cost = Math.round(Chromosome.cost(fittest));
```

Seems to work really well to help separate out the application logic (basically domain models) from the UI (React components).
