---
sidebar_position: 5
---

# Performance

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
