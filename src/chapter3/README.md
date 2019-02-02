# Chapter 3

## Digital Circuits

Getting the digital circuit simulator examples working was challenging. They have an explicit asynchronous nature in the form of specific delays when processing changes to a wire. This isn't a problem in the book because the examples are just ran in a terminal.

For this project, however, we're running tests, and the tests need to know when everything is done running.

The solution was to figure out how to return a promise from `setSignal` that returns when the **_entire circuit_** is done "updating". It wasn't clear at first how to do this, but it ended up being pretty straightforward. Basically, the "primitive" circuits return a promise that resolves after the aforementioned delay. More complex circuits return a promise that resolves when all its "primitive" circuit's promises have resolved.

And finally, `setSignal` returns a promise that resolves when the promises from the operations that run as a result are done.

Essentially, everything returns a promise.
