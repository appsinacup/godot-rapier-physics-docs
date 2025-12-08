---
sidebar_position: 7
---

# Determinism

This plugin is deterministic in all variants, even the faster variant (parallel). Determinism in this context means that if the exact same initial conditions are met, the **Physics State** will be exactly the same.


:::note Articles

Interesting articles about determinism:
- [From creator of Rapier](https://rapier.rs/docs/user_guides/rust/determinism)
- [From creator of Box2D](https://box2d.org/posts/2024/08/determinism/)

:::


## Systems

The Systems that interact with the Godot Rapier addon are the following:

- Scene Tree: Handles nodes and their internal state.
- Godot-Rapier: The glue code written that interacts with Godot and Rapier Library.
- Rapier Library: Is both **deterministic** and **cross platform deterministic** (the latter comes with a performance penalty)

## State

All of the systems have an internal state. In this case, the **Godot-Rapier** and **Rapier Library** are deterministic, but not other parts of Godot (eg. the **Scene Tree**).

What does this mean?

- It means that if you save the state and reload the state of the **Physics Server**, that will only be the state for the Physics Server. It is the job of the person writting the game to make sure other parts of the game are in sync (eg. the nodes themselves).
- It also means that, from a conceptual point, there is a **physics state** and a **node state**. A node, like a **Area**, has both godot state (was it intersecting last frame?) and physics state (is it intersecting now, what is the position, etc.). The difference between the two is Godot holds a **node state** as a cache layer in order to speed up accessing properties, while the actual source of truth is in the **physics state**.

A good example can be seen below. The simulation is restarted from the exact point, but the contact point remains the old one until the frame processes (the physics serve is stopped for 1 second in between):

![determinism](/img/determinism/determinism.gif)

In such a case, one can think of this as the **actual** simulation data, and the **view** of that data. It can be dangerous to rely on the view of that data, as it can be old data. The best way to get the latest data is to access directly the **PhysicsServer** API.

Aside for the Physics Server, another system that interacts in Godot is the Scene Tree and the Rendering System. These also have states that are not deterministic. Eg. If you load the Physics State and one callback is called later, that doesn't mean the Physics Server didn't execute deterministic, but rather that Godot internals decided to call it later (specficially the Area Collide event is called the next frame. Most things in Godot are called the next frame, so current frame after load might look wrong).

## Re-running a deterministic simulation

In order to re-run a deterministic simulation, you have to have exactly the same input conditions. It's not enough to set the positions or velocities of the objects to where the objects were initially (it might look like the world inputs are the objects positions, but there are more hidden inputs too. In order to see the state of the world, use serialization functions on the space). In order to have the exact same conditions, you can reload the scene using `get_tree().reload_current_scene()` and then reload the Physics State using `import_binary` functions (for all objects and space).

## Manual stepping

Rapier exposes 2 functions for manual stepping:

- `RapierPhysicsServer2/3D.space_step(space, delta)`
- `RapierPhysicsServer2/3D.space_flush_queries(space)`

Also, if you don't want the physics space to auto step, you can use:

- `PhysicsServer2/3D.space_set_active(space, false)`

In order to get the current space rid, use:

- `var space := get_viewport().world_2/3d.space`

In order to get the **fixed delta** your project uses:

- `var fixed_delta = 1.0 / ProjectSettings.get_setting("physics/common/physics_ticks_per_second")`

Example script:

```swift
extends Node2D

func _ready() -> void:
	var space := get_viewport().world_2d.space
	PhysicsServer2D.space_set_active(space, false)

func _on_button_pressed() -> void:
	var space := get_viewport().world_2d.space
	var fixed_delta = 1.0 / ProjectSettings.get_setting("physics/common/physics_ticks_per_second")
	for i in 10:
		RapierPhysicsServer2D.space_step(space, fixed_delta)
	RapierPhysicsServer2D.space_flush_queries(space)
```

## Godot

The Godot element is non deterministic. If:
- User input
- Animations
- Scripting logic

Is used to interact with the physics server, that could be a source of creating un-determinism if you don't know for sure they are deterministic.

## Rapier Wrapper

The wrapper has a lot of functions. The main interface is the **PhysicsServer** one from godot. There are a bunch of setters and getters, a **step** function and most notably an iterative **move_and_x** function. Rapier also exposes a bunch of extra functions through the **RapierPhysicsServer**.
