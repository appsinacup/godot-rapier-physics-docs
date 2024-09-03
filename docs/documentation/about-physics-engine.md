---
sidebar_position: 1
---

# Physics Engine

The Physics Engine is a system that offers **Spaces**, **Areas**, **Static Bodies**, **Rigid Bodies**, **Shapes**, **Joints** and **Character Controllers**:
- [PhysicsServer2D](https://docs.godotengine.org/en/stable/classes/class_physicsserver2dextension.html#class-physicsserver2dextension)
- [PhysicsServer3D](https://docs.godotengine.org/en/stable/classes/class_physicsserver3dextension.html#class-physicsserver3dextension)

The hierarchy of these objects looks like this:

- **Space**: can contain
  - **RigidBodies**: can contain
    - **ShapeInstances**
  - **Areas**: can contain
    - **ShapeInstances**
  - **Character Controllers**: can contain
    - **ShapeInstances**
  - **Joints**
  - **Fluid**: new concept added by this plugin
- **Shapes**

:::note

**RigidBodies/Areas/Character Controllers** can be outside of any space (during initialization time).

**Joints** can also be outside of any space (empty joints).

**Shapes** are always outside of spaces, but shape instances (or colliders) are bound to bodies. (because shapes can be shared between bodies)

Objects without space are a temporary thing and usually done only during initialization.

:::

All these objects have some internal **state**, and they then also have a **handle** for a Rapier Object.

## Rapier

Rapier is a physics system that has some concepts that can be mapped to the Physics Engine:

- **World**: contains
  - **RigidBodies**: contain
    - **Colliders**
  - **ImpulseJoints**
  - **MultiBodyJoints**
- **FluidWorld**: contains
  - **Fluids**
- **Shapes**

## Space

The space holds data about:
- **stateless data** about the godot space.
- **stateful data** about statistics, scheduled update lists and removed colliders. The scheduled lists contain things such as gravity updates for rigid bodies or callback updates or area monitor updates. The removed colliders use RID internally, and that one cannot be serialized.
- handle that points to a **inner rapier space**. This is the internal data used by Rapier to simulate the space.

:::note

The **inner rapier space** also contains the rigid bodies, joints and colliders.

:::

## RigidBody / Area / CharacterController

The bodies hold data about:
- **stateless data** about the godot bodies.
- **stateful data** about detected bodies, computed mass, etc.
- handle that points to a **inner rapier rigid body**. This is the internal data used by Rapier to simulate the body.

## Joint

The joints hold data about:
- **stateless data** about the godot joints.
- handle that points to a **inner rapier joint**. This is the internal data used by Rapier to simulate the joint. This can be either a **impulse joint** or a **multi body joint**.

## Shape

The shapes hold data about:
- **stateless data** about the godot shapes.
- **stateful data** about owners, aabb, etc.
- handle that points to a **inner rapier shape**. This is the internal data used by Rapier to create colliders.

## Colliders

The colliders are shapes created on bodies. Bodies and shapes hold the handle that points to a **inner rapier collider**.