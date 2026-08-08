---
sidebar_position: 3
---

# Physics Server

`RapierPhysicsServer2D` and `RapierPhysicsServer3D` extend Godot's physics servers with the methods below. Everything works on plain Godot nodes; the [body](bodies) and [joint](joints) nodes are inspector conveniences over this API.

All methods are static: `RapierPhysicsServer2D.method(...)`. The 3D server has the same API with 3D types.

## Body parameters

```gdscript
RapierPhysicsServer2D.body_set_extra_param(rid, param, value)
RapierPhysicsServer2D.body_get_extra_param(rid, param)
```

| Constant | Value | Type |
|---|---|---|
| `BODY_PARAM_CONTACT_SKIN` | 0 | `float` |
| `BODY_PARAM_DOMINANCE` | 1 | `int` |
| `BODY_PARAM_SOFT_CCD` | 2 | `float` |
| `BODY_PARAM_MASSLESS` | 3 | `bool` |
| `BODY_PARAM_ADDITIONAL_SOLVER_ITERATIONS` | 4 | `int` |

See [Body Nodes](bodies#properties) for what each does.

## Contact queries

| Method | Returns |
|---|---|
| `body_set_contact_force_threshold(body, threshold)` | Contact force a contact must exceed before it is reported. |
| `body_get_contact_force_threshold(body)` | The threshold above. |
| `body_get_total_contact_impulse(body)` | Total contact impulse on the body this step, as a vector. |
| `body_get_max_contact_impulse(body)` | Strongest single contact impulse magnitude this step. |
| `body_get_total_friction_impulse(body)` | Total friction impulse magnitude this step. |
| `body_get_contact_tangent_impulse(body, contact_idx)` | Friction impulse at one reported contact. |
| `bodies_get_contact_impulse(body_a, body_b)` | Impulse `body_a` receives from `body_b` specifically. |

Impulses are read straight from the solver. Divide by the step delta for a force.

## Body state

| Method | Returns |
|---|---|
| `body_get_kinetic_energy(body)` | Kinetic energy combining linear and angular motion. |
| `body_is_ccd_active(body)` | Whether continuous collision detection actually ran for this body last step. |

## Joints

Create a joint with `PhysicsServer2D.joint_create()`, then shape it:

```gdscript
# Rope: bodies move freely while closer than max_distance.
RapierPhysicsServer2D.joint_make_rope(joint, anchor_a, anchor_b, max_distance, body_a, body_b)

# Fixed: locks all relative motion.
RapierPhysicsServer2D.joint_make_fixed(joint, anchor, body_a, body_b)
```

Anchors are in world space.

### Joint parameters

```gdscript
RapierPhysicsServer2D.joint_set_extra_param(joint, param, value)
RapierPhysicsServer2D.joint_get_extra_param(joint, param)
```

| Constant | Value | Meaning |
|---|---|---|
| `JOINT_TYPE` | 0 | The parameter selecting impulse vs multibody. |
| `JOINT_TYPE_IMPULSE_JOINT` | 0 | Solved iteratively by constraints. |
| `JOINT_TYPE_MULTIBODY_JOINT` | 1 | Solved exactly in reduced coordinates; cannot drift. |
| `JOINT_TYPE_MULTIBODY_KINEMATIC_JOINT` | 2 | Multibody with a kinematic root. |

### Tuning

| Method | What it does |
|---|---|
| `joint_set_softness(joint, natural_frequency, damping_ratio)` | How rigidly the joint holds; damping ratio 1 is critically damped. |
| `joint_set_enabled(joint, enabled)` | Toggle without destroying: breakable constraints. |
| `joint_set_motor_position_options(joint, target_pos, stiffness, damping, enabled)` | Drive the joint to an angle like a spring. See [motor position targets](../documentation/joints#motor-position-targets). |

### Reading forces

| Method | Returns |
|---|---|
| `joint_get_reaction_impulse(joint)` | World-space linear impulse the joint applied last step. |
| `joint_get_reaction_angular_impulse(joint)` | World-space angular impulse last step. |

Useful for breakable joints and rope tension. Multibody joints return zero.

### Inverse kinematics

For multibody joints only. See [Multibody Joints and IK](../documentation/joints).

| Method | What it does |
|---|---|
| `joint_solve_inverse_kinematics(joint, target_transform)` | Solve the chain towards a target and apply the result. |
| `joint_set_ik_options(joint, damping, max_iterations, constrained_axes, epsilon_linear, epsilon_angular)` | Custom solver options for one joint. |
| `joint_reset_ik_options(joint)` | Back to Rapier defaults. |

## Fluids

Backing API of the [fluid nodes](fluids). RIDs come from `fluid_create()`.

| Method | What it does |
|---|---|
| `fluid_create()` | Create a fluid, returns its RID. |
| `fluid_set_space(fluid, space)` | Put the fluid in a space. |
| `fluid_set_density(fluid, density)` | Set density. |
| `fluid_set_effects(fluid, effects)` | Set effect resources (viscosity, elasticity, surface tension). |
| `fluid_set_points(fluid, points)` | Replace all particles. |
| `fluid_set_points_and_velocities(fluid, points, velocities)` | Replace particles and velocities. |
| `fluid_add_points_and_velocities(fluid, points, velocities)` | Add particles. |
| `fluid_delete_points(fluid, indices)` | Remove particles by index. |
| `fluid_get_points(fluid)` | Particle positions. |
| `fluid_get_velocities(fluid)` | Particle velocities. |
| `fluid_get_accelerations(fluid)` | Particle accelerations. |
| `fluid_get_particles_in_aabb(fluid, aabb)` | Indices of particles inside a box. |
| `fluid_get_particles_in_ball(fluid, center, radius)` | Indices of particles inside a sphere. |
| `fluid_set_collision_masks(fluid, mask, layer)` | Interaction groups. |
| `fluid_get_collision_mask(fluid)` / `fluid_get_collision_layer(fluid)` | Read them back. |

## Spaces and stepping

| Method | What it does |
|---|---|
| `space_step(space, delta)` | Step one space manually. Requires disabling automatic stepping. |
| `space_flush_queries(space)` | Flush queued callbacks after `space_step`. |
| `space_get_active_bodies(space)` | RIDs of the active bodies. |
| `space_get_bodies_transform(space, bodies)` | Transforms for a list of bodies. |

## Identity and diagnostics

| Method | What it does |
|---|---|
| `get_rapier_id(rid)` | Stable id of an object; survives scene reload, used with serialization. |
| `get_global_id()` / `set_global_id(id)` | The server's id counter; restore it when loading a saved state. |
| `get_stats()` | Dictionary of internal counters. |

## State saving

Exporting and importing whole-space state lives on the `RapierStateManager2D` / `RapierStateManager3D` nodes, not the server. See [Serialization](../documentation/serialization).
