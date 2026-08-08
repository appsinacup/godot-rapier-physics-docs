---
sidebar_position: 2
---

# Joint Nodes

## Extended Godot joints

Drop-in replacements for Godot's joint nodes. Each adds `joint_type` (Impulse or Multibody) and the [IK properties](../documentation/joints#inverse-kinematics).

| Node | Extends |
|---|---|
| `RapierPinJoint2D` / `RapierPinJoint3D` | `PinJoint2D` / `PinJoint3D` |
| `RapierGrooveJoint2D` | `GrooveJoint2D` |
| `RapierDampedSpringJoint2D` | `DampedSpringJoint2D` |
| `RapierHingeJoint3D` | `HingeJoint3D` |
| `RapierSliderJoint3D` | `SliderJoint3D` |
| `RapierConeTwistJoint3D` | `ConeTwistJoint3D` |
| `RapierGeneric6DOFJoint3D` | `Generic6DOFJoint3D` |

`RapierPinJoint2D` and `RapierHingeJoint3D` also expose [motor position targets](../documentation/joints#motor-position-targets).

## Rope joint

`RapierRopeJoint2D` / `RapierRopeJoint3D` keep two bodies within `max_distance` of each other: free while closer, pulled back when the rope goes taut. Godot has no equivalent joint. Use it for chains, tethers and grappling hooks.

| Property | What it does |
|---|---|
| `node_a`, `node_b` | The two bodies. |
| `max_distance` | Rope length. |
| `disable_collision` | Whether the two bodies stop colliding with each other. |

The rope attaches to both bodies at the node's own position.

## Fixed joint

`RapierFixedJoint2D` / `RapierFixedJoint3D` lock all relative motion between two bodies so they move as one rigid assembly. Cheaper and clearer than a fully locked `Generic6DOFJoint3D`.

| Property | What it does |
|---|---|
| `node_a`, `node_b` | The two bodies. |
| `disable_collision` | Whether the two bodies stop colliding with each other. |

:::note

Rope and fixed joints have no Godot joint type, so `PhysicsServer2D.joint_get_type()` reports `JOINT_TYPE_MAX` for them. They can also be created directly through the [Physics Server](physics-server#joints).

:::
