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

In fact, my Elixir experience led me to use this in React projects, such as [my evolved-salesman travelling salesman solver](https://github.com/ahuth/evolved-salesman/blob/495da8ef8487c50d2ec296fcfc74d6d5409aa093/src/utils/chromosome.js).

An example is:

```js
const population = Population.create(cities);
const fittest = Population.evolve(population);
const cost = Math.round(Chromosome.cost(fittest));
```

Seems to work really well to help separate out the application logic (basically domain models) from the UI (React components).

## Lists of Lists

Traversing a flat list turns out to be pretty straightforward. Something like:

```scheme
(list 1 2 3 4)
```

Ends up really being:

```scheme
(cons 1 (cons 2 (cons 3 (cons 4 nil))))
```

And then we can get the 3 with something like:

```scheme
(car (cdr (cdr the-list)))
```

Which makes sense.

However, things get funky when we have a list of lists. For example:

```scheme
(list 1 (list 2 (list 3 4)))
```

This is really the same as:

```scheme
(cons
  1
  (cons
    (cons
      2
      (cons
        (cons
          3
          (cons
            4
            nil))
        nil))
    nil))
```

...or something like that.

The top-level list here has 3 items:
1. 1
2. Second list
3. The empty list (or `nil` in scheme)

Which could be represented as:

```scheme
(cons 1 (cons second-list nil))
```

which is the first part of all those nested conses above. Then the second list also has 3 items:
1. 2
2. Third list
3. The empty list

Or:

```scheme
(cons 2 (cons third-list nil))
```

Finally, the third list is:

```scheme
(cons 3 (cons 4 nil))
```

Putting them all together, we get our crazy example. And from there we can see that it's more complicated to traverse down to a specific value. Now to get to the 3, we need:

```scheme
(car (car (cdr (car (cdr l)))))
```

Don't know about you, but that's hard for me to visualize without writing it all out on paper.
