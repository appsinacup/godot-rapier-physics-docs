---
sidebar_position: 7
---

# Performance

## Common Pitfalls

If the performance you are getting is not what you are expecting, first thing to do is to see what the bottleneck is, by using the **Godot Monitors** tool from **Debugger** -> **Monitors** and check if the **Physics Process** time is high:

![monitors](/img/performance/monitors.png)

## Benchmark

This benchmark is done by creating objects until FPS drops below 30. Running on a mac book m1 air with Godot 4.3. Everything is run inside the godot editor using the [Godot Physics Tests](https://github.com/fabriceci/Godot-Physics-Tests) repository. Rendering is disabled for these tests as to only test physics solving speed. Higher number is better.

Shape|Dimensions|Godot 4.3 beta|Rapier|Rapier without state_sync_callback|[Box2D(2.4.1) 0.9.9 UNMAINTAINED](https://godotengine.org/asset-library/asset/2007)|[Jolt 0.13.beta](https://godotengine.org/asset-library/asset/1918)
-|-|-|-|-|-|-
Circle + Rectangle|2D|2900|5000|7800|3000|N/A
Sphere + Box|3D|1500|2500|4500|N/A|5000

:::note

Rapier Physics Server gets a lot more performance with the **state_sync_callback** disabled for RigidBodies. Read more below to find out more.

:::

## Extra Performance

If you are using regular Godot nodes for your physics simulation (eg. **RigidBody2D**, **StaticBody2d**, etc.) then you are using the normal logic for updating objects Godot uses. This logic goes as follows:
- **PhysicsServer::step()**: this method is called every physics frame and simulates one step of the physics world
- **PhysicsServer::flush_queries()**: this method is called after the step function and requests the physics server to update Godot with the new positions and angles and other things after objects moved. This usually is the bottleneck and takes **same amount of time** as much as the step function.

In order to optimize the this, you can omit the **state_sync_callback** from **flush_queries**, which:
1. Iterates through all **active bodies** (bodies that moved this frame)
2. Call the **state_sync_callback** of every object.
3. This callback calls back into Godot, and then Godot calls again into the physics server in order to get: **transform**, **linear_velocity**, **angular_velocity** and **is_sleeping** for every object.

### Disabling state_sync_callback

A big optimization that can be made is to look at the **PhysicsServer** as a data storing object, and try to get all the positions when needed. And for this, **RapierPhysicsServer** offers the option to disable the **state_sync_callback** of an object:

```js
RapierPhysicsServer.body_set_state_sync_callback(body_rid, Callable())
```

If you do the above thing for some objects, these objects will no longer receive active event updates from the physics server (eg. the physics node will stay in place on godot side). But you will be able to do a lot more simulated objects.

In order to then get the transform of all the objects that were active, the **RapierPhysicsServer** offers the following function:

```js
var body_rids: Array = RapierPhysicsServer2D.space_get_active_bodies(space_rid)
var body_transforms: Array[Transform2D] = RapierPhysicsServer2D.space_get_bodies_positions(body_rids)
#or
var body_rids: Array = RapierPhysicsServer3D.space_get_active_bodies(space_rid)
var body_transforms: Array[Transform3D] = RapierPhysicsServer3D.space_get_bodies_positions(body_rids)
```

In order to render the objects, you can use a **MultiMeshInstance**, like so:
- 2D

```js
extends MultiMeshInstance2D

func _process(delta: float) -> void:
	var bodies := RapierPhysicsServer2D.space_get_active_bodies(get_viewport().world_2d.space)
	var transforms := RapierPhysicsServer2D.space_get_bodies_transform(get_viewport().world_2d.space, bodies)
	multimesh.instance_count = transforms.size()
	var idx = 0
	for transform in transforms:
		multimesh.set_instance_transform_2d(idx, transform)
		idx += 1
```
- 3D

```js
extends MultiMeshInstance3D

func _process(delta: float) -> void:
	var bodies := RapierPhysicsServer3D.space_get_active_bodies(get_viewport().world_3d.space)
	var transforms := RapierPhysicsServer3D.space_get_bodies_transform(get_viewport().world_3d.space, bodies)
	multimesh.instance_count = transforms.size()
	var idx = 0
	for transform in transforms:
		multimesh.set_instance_transform(idx, transform)
		idx += 1
```
