---
sidebar_position: 4
---

# Feature List (Updated Nov 2025)

 See the tables below to get an idea of what status it is in.

## Godot Features

### Platforms ✅

2D | 3D | Platform
-|-|-
✅|✅|Windows (x86_64, x86_32)
✅|✅|macOS (x86-64 + arm64 Universal)
✅|✅|Linux (x86_64)
✅|✅|Android (x86_64, x86_32, arm64)
✅|✅|iOS (arm64)
✅|✅|Web (wasm32)

### Builds ✅

2D | 3D | Feature
-|-|-
✅|✅|Single Build
✅|✅|Cross Platform Deterministic Build
✅|✅|Parallel SIMD Build

:::note Double Builds

If you want custom double builds, that is currently not supported. A dependency, salva, used for liquids, doesn't currently support double builds. Will come at a later time.

:::

### Collision Objects ✅

2D | 3D | CollisionObject
-|-|-
✅ | ✅ | Space
✅ | ✅ | RigidBody
✅ | ✅ | StaticBody
✅ | ✅ | CharacterBody
N/A | ❌ | SoftBody
✅ | ✅ | Area

❌ - Not implemented in Rapier Lib

### Joints ✅

2D | Joint
-|-
✅ | Pin Join 2D
✅ | Groove Joint 2D
✅ | Damped Spring Joint 2D

3D | Joint
-|-
✅ | Cone Twist Joint 3D
✅ | Generic 6 DOF Joint 3D
✅ | Hinge Joint 3D
✅ | Pin Join 3D
✅ | Slider Joint 3D

### Shapes ✅

2D | 3D | Shape
-|-|-
✅|✅|World Boundary Shape
✅|N/A|Segment Shape
⌛|⌛|Separation Ray Shape
✅|✅|Circle/Sphere Shape
✅|✅|Box/Rectangle Shape
✅|✅|Capsule Shape
N/A|✅|Cylinder Shape
N/A|✅|Height Map Shape
✅|✅|Convex Polygon Shape
✅|✅|Concave Polygon Shape

⌛ - If anyone asks for it on discord, will implement it. Right now no one uses this.

### Queries ✅

2D | 3D | Query
-|-|-
✅|✅|Intersect Ray
✅|✅|Intersect Point
✅|✅|Intersect Shape
✅|✅|Cast Motion
✅|✅|Collide Shape
✅|✅|Rest Info

### Misc

- No support for asymmetric collisions (eg. object 1 hitting object 2 but object 2 not hitting object 1). This is the exact check rapier does: `(A.layer & B.mask) != 0 || (B.layer & A.mask) != 0`

## New Features ✅

2D | 3D| Feature
-|-|-
✅|✅| Fluid
✅|✅| FluidEffect
✅|✅| Fluid Samples
✅|✅| Serialization
✅|✅| Deserialization
✅|✅| Performance Improvement
✅|✅| MultiBody Joints
⌛|⌛| Inverse Kinematics
