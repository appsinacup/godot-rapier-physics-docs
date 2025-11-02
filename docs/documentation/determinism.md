---
sidebar_position: 7
---

# Determinism

This plugin is deterministic in all variants, even the faster variant. Determinism here means that if the exact same initial conditions are met, the simulation will be exactly the same (in the Physics Server).

Determinism means that if the inputs of the system and the outputs of the system are the same, the simulation has to be exactly the same. Imagine you have a system with inputs I1, I2, I3, and outputs O1, O2, O3. Running the simulation for T seconds with inputs I1..3 will result in outputs O1..3.

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

## Components

The Godot Rapier addon interacts with the following:

- Godot: The Scene Tree containing nodes
- Rapier Wrapper: The glue code written that interacts with Godot and Rapier Library
- Rapier Library: Is both **deterministic** and **cross platform deterministic** (the latter comes with a performance penalty)

## Godot

The Godot element is non deterministic. If:
- User input
- Animations
- Scripting logic

Is used to interact with the physics server, that could be a source of creating un-determinism.

## Rapier Wrapper

The wrapper has a lot of functions. The main interface is the **PhysicsServer** one from godot. There are a bunch of setters and getters, a **step** function and most notably an iterative **move_and_x** function.

- There are some HashMaps. These might not be deterministic(have not checked).
- RID's are used to map physics objects to nodes. The RID's change for every new node. This means if you reload a scene, you will not get exactly the same RID's.
