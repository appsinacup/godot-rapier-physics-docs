---
sidebar_position: 4
---

# Feature List (Updated Aug 2026)

 See the tables below to get an idea of what status it is in.

## Rapier-only Nodes

Nodes this plugin adds that Godot itself does not have:

Node | What it is
-|-
Fluid2D / Fluid3D | Particle fluids, with shape helpers, faucets and renderers
RapierRopeJoint2D / 3D | Maximum-distance constraint: chains, tethers, grappling hooks
RapierFixedJoint2D / 3D | Welds two bodies into one rigid assembly
RapierStateManager2D / 3D | Save, load and cache whole-space physics state

The extended body and joint nodes are listed in the [Class Reference](reference/bodies).

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
✅ | Pin Joint 2D
✅ | Groove Joint 2D
✅ | Damped Spring Joint 2D
✅ | Rope Joint 2D (Rapier only)
✅ | Fixed Joint 2D (Rapier only)

3D | Joint
-|-
✅ | Cone Twist Joint 3D
✅ | Generic 6 DOF Joint 3D
✅ | Hinge Joint 3D
✅ | Pin Joint 3D
✅ | Slider Joint 3D
✅ | Rope Joint 3D (Rapier only)
✅ | Fixed Joint 3D (Rapier only)

### Shapes ✅

2D | 3D | Shape
-|-|-
✅|✅|World Boundary Shape
✅|N/A|Segment Shape
✅|✅|Separation Ray Shape
✅|✅|Circle/Sphere Shape
✅|✅|Box/Rectangle Shape
✅|✅|Capsule Shape
N/A|✅|Cylinder Shape
N/A|✅|Height Map Shape
✅|✅|Convex Polygon Shape
✅|✅|Concave Polygon Shape

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
✅|✅| Inverse Kinematics
