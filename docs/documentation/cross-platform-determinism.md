---
sidebar_position: 6
---

# Determinism

The Godot Rapier addon is interacts with the following:

- Godot: The Scene Tree containing nodes
- Rapier Wrapper: The glue code written that interacts with Godot and Rapier Library
- Rapier Library: Is both **deterministic** and **cross platform deterministic** (the latter comes with a performance penalty)

## Godot

The Godot element is non deterministic. If:
- User input
- Animations
- Scripting logic

Is used to interact with the physics server, that could be a source of creating undeterministm.

## Rapier Wrapper

The wrapper has a lot of functions. The main interface is the **PhysicsServer** one from godot. There are a bunch of setters and getters, a **step** function and most notably an iterative **move_and_x** function.

- There are some HashMaps. These might not be deterministic(have not checked).
- RID's are used to map physics objects to nodes. The RID's change for every new node. This means if you reload a scene, you will not get exactly the same RID's.