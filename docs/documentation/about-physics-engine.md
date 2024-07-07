---
sidebar_position: 1
---

# Physics Engine

In Godot a Physics Engine is a system that offers **Spaces**, **Areas**, **Static Bodies**, **Rigid Bodies**, **Shapes**, **Joints** and **Character Controllers**. Godot offers the option for these systems (both 2D and 3D) to be replaced by custom implementations. All that is required is to implement a set of about 100+ API's:
- [PhysicsServer2D](https://docs.godotengine.org/en/stable/classes/class_physicsserver2dextension.html#class-physicsserver2dextension)
- [PhysicsServer3D](https://docs.godotengine.org/en/stable/classes/class_physicsserver3dextension.html#class-physicsserver3dextension)

This is exactly what tha Rapier Physics Server does. And thats why the physics engine should work exactly the same after changing it from the default one, as all the function calls (at least as far as Godot is concerned) are the same.

The hierarchy of these objects looks like this:

- **Space**: contains
  - **Rigidbodies**: can contain
    - **Shapes**
  - **Areas**: can contain
    - **Shapes**
  - **Joints**
  - **Character Controllers**: can contain
    - **Shapes**

