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
  - **Fluid**

