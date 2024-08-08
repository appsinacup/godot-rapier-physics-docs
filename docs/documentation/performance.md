---
sidebar_position: 7
---

# Performance

## More speed

If you are using regular Godot nodes for your physics simulation (eg. **RigidBody2D**, **StaticBody2d**, etc.) then you are using the normal logic for updating objects Godot uses. This logic goes as follows:
- **PhysicsServer::step()**: this method is called every physics frame and simulates one step of the physics world
- **PhysicsServer::flush_queries()**: this method is called after the step function and requests the physics server to update Godot with the new positions and angles and other things after objects moved. This usually is the bottleneck and takes **same amount of time** as much as the step function.

In order to optimize the **flush_queries**, function first we need to understand how it works:
1. Iterate through all **active bodies** (bodies that moved this frame)
2. Call the **state_sync_callback** of every object.
3. This callback calls back into Godot, and then Godot calls again into the physics server in order to get: **transform**, **linear_velocity**, **angular_velocity** and **is_sleeping** for every object.

So, looking back at this, for 5000 objects we have:
```rust
PhysicsServer2D:
    flush_queries:
    for i in 5000:
        let callable = get_state_sync_callback(i);
        callable.call()
Godot:
    _sync_body_state(i):
        body_get_transform(i)
        body_get_linear_velocity(i)
        body_get_angular_velocity(i)
        body_is_sleeping(i)
```

The first thing we notice is the physics server calls into Godot, then Godot calls back in order to get all this information (transform, velocity, etc.). It might be you don't actually need all of this information (eg. maybe velocity is not needed in all cases).

A big optimization that can be made is to look at the **PhysicsServer** as a data storing object, and try to get all the positions when needed. And for this, **RapierPhysicsServer** offers the option to disable the **state_sync_callback** of an object:

```js
RapierPhysicsServer.body_set_state_sync_callback(body_rid, Callable())
```

If you do the above thing for some objects, these objects will no longer receive any updates from the physics server. But you will be able to do a lot more simulated objects.

Now you might be asking, how to get the position in a more efficient manner? For this the **RapierPhysicsServer** offers the following function:

```js
var body_rids: Array = RapierPhysicsServer.space_get_active_bodies(space_rid)
var body_positions: PackedVectorArray = RapierPhysicsServer.space_get_bodies_positions(body_rids)
```


## Common Pitfalls

If the performance you are getting is not what you are expecting, first thing to do is to see what the bottleneck is, by using the **Godot Monitors** tool from **Debugger** -> **Monitors**:

![monitors](/img/performance/monitors.png)

If the **Physics Server** is the bottleneck, the **Physics Process** time should be very big. In this case, create an issue on the [github project page](https://github.com/appsinacup/godot-rapier-physics/issues).

If not, it's possible as you have many objects the bottleneck is the rendering. If that is the case, the **Process** monitor should be high. You can use [MultiMeshInstance2D](https://docs.godotengine.org/en/stable/classes/class_multimeshinstance2d.html) and [MultiMeshInstance3D](https://docs.godotengine.org/en/stable/classes/class_multimeshinstance3d.html)

## Benchmark

This benchmark is done by creating objects until FPS drops below 30. Running on a macbook m2 pro with Godot 4.3. Everything is run inside the godot editor using the [Godot Physics Tests](https://github.com/fabriceci/Godot-Physics-Tests) repository. Rendering is disabled for these tests as to only test physics solving speed. Higher number is better.

Shape|Dimensions|Godot 4.3 beta|Rapier 0.7.18|[Box2D(2.4.1) 0.9.9 UNMAINTAINED](https://godotengine.org/asset-library/asset/2007)|[Jolt 0.13.beta](https://godotengine.org/asset-library/asset/1918)
-|-|-|-|-|-
Circle + Rectangle|2D|2800|6900|4200|N/A
Sphere + Box|3D|2700|5400|N/A|7500
