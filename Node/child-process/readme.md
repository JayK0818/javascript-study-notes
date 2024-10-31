# Child Process

  The *node:child_process* module provides the ability to spawn subprocesses in a manner that is similar, but not identical.

  The *child_process.spawn()* method spawns the child process asynchronously, without blocking the Node.js event loop.
  The *child_process.spawnSync()* method provides equivalent functionality in synchronous manner that blocks the event loop.