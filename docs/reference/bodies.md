---
sidebar_position: 1
---

# Body Nodes

Drop-in replacements for Godot's body nodes that expose Rapier-only settings in the inspector. Use them exactly like the node they extend.

| Node | Extends |
|---|---|
| `RapierRigidBody2D` / `RapierRigidBody3D` | `RigidBody2D` / `RigidBody3D` |
| `RapierStaticBody2D` / `RapierStaticBody3D` | `StaticBody2D` / `StaticBody3D` |
| `RapierAnimatableBody2D` / `RapierAnimatableBody3D` | `AnimatableBody2D` / `AnimatableBody3D` |
| `RapierCharacterBody2D` / `RapierCharacterBody3D` | `CharacterBody2D` / `CharacterBody3D` |
| `RapierArea2D` / `RapierArea3D` | `Area2D` / `Area3D` |
| `RapierPhysicalBone2D` / `RapierPhysicalBone3D` | `PhysicalBone2D` / `PhysicalBone3D` |
| `RapierVehicleBody3D` | `VehicleBody3D` |

## Properties

Rigid bodies, physical bones and the vehicle body expose all of these. Static, animatable and character bodies and areas expose only `body_skin`.

| Property | Type | Default | What it does |
|---|---|---|---|
| `body_skin` | `float` | 0 | Contact skin thickness. Contacts form at this distance, so bodies rest slightly apart. Hides jitter in stacks. |
| `massless` | `bool` | false | The body has no mass of its own. Required for bodies in a multibody joint chain. |
| `dominance` | `int` | 0 | −127 to 127. Higher dominance is immovable to lower, as if it had infinite mass. |
| `soft_ccd` | `float` | 0 | Motion clamp distance for soft continuous collision detection; 0 disables. Cheaper than full CCD. |
| `additional_solver_iterations` | `int` | 0 | Extra solver iterations for this body and everything it interacts with. Stabilizes one important body without a global cost. |

## Without the custom nodes

Every property is also reachable on a plain Godot node through the server:

```gdscript
RapierPhysicsServer2D.body_set_extra_param(
    body.get_rid(), RapierPhysicsServer2D.BODY_PARAM_ADDITIONAL_SOLVER_ITERATIONS, 4)
```

See [Physics Server](physics-server) for the constants.
