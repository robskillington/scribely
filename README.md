# scribely

A scribe producer and consumer that can be used stand-alone or part of a larger scribe topology.

## Roadmap

* Producer: Add queueing and flushing at fixed intervals
* Producer: Add optional disk buffering with resend on wakeup to ensure items aren't lost if process crashes
