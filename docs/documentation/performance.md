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

In case you want to see if the performance you are getting is expected one or not, you can check the ratio of the numbers you get on Rapier and on Godot Physics, and compare with the table below.

This benchmark is done by creating objects until FPS drops below 30. Running on a macbook m2 pro with Godot 4.2. Everything is run inside the godot editor using the [Godot Physics Tests](https://github.com/fabriceci/Godot-Physics-Tests) repository.

Each cell shows max shape count. Higher number is better.

Shape|Godot 2D|Godot 3D|Rapier 2D old (C++)|Rapier 2D (Rust)|Rapier 3D (Rust)|Jolt 3D
-|-|-|-|-|-|-
Sphere|5000|3300|8800|5500|5200|8000
Box|3500|3200|7700|8000|5200|7200
Capsule|4500|2700|8000|7000|5100|7400
Convex Polygon|3500|3100|6500|6300|5000|8000


:::note

This plugin was recently rewritten from C++ to Rust. There are still some things missing from what it had originally and performance is slower than it used to be. This is to be considered beta and still work in progress.

:::