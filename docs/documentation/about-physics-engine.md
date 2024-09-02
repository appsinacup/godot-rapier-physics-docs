---
sidebar_position: 1
---

# Physics Engine

The Physics Engine is a system that offers **Spaces**, **Areas**, **Static Bodies**, **Rigid Bodies**, **Shapes**, **Joints** and **Character Controllers**:
- [PhysicsServer2D](https://docs.godotengine.org/en/stable/classes/class_physicsserver2dextension.html#class-physicsserver2dextension)
- [PhysicsServer3D](https://docs.godotengine.org/en/stable/classes/class_physicsserver3dextension.html#class-physicsserver3dextension)

The hierarchy of these objects looks like this:

- **Space**: contains
  - **Rigidbodies**: can contain
    - **Shapes**
  - **Areas**: can contain
    - **Shapes**
  - **Joints**
  - **Character Controllers**: can contain
    - **Shapes**
  - **Fluid**: new concept added by this plugin

## Space

The space holds stateless data about the godot space, **stateful data** and a **handle** for the **rapier space**. The stateless data can be changed through Godot API.

### Space State

Holds state that related to statistics, scheduled update lists and removed colliders. The scheduled lists contain things such as gravity updates for rigidbodies or callback updates or area monitor updates. The removed colliders use RID internally, and that one cannot be serialized.

### Space Handle

A handle that points to the internal Rapier Space. The handle is created once the space is created and doesn't change after. The handle points to the rapier space.

### Rapier Space

This is the internal data used by Rapier to simulate the space. This contains everything else simulated, from shapes to rigidbodies and joints.

WIP