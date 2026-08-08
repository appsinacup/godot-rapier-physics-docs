---
sidebar_position: 3
---

# Rigid Bodies

Configuring rigid bodies can be difficult. This page describes some of the most common configurations.

## Increased Stackability

In order to improve simulation stackability and stability in general, Rapier Extension Classes (eg. RapierRigidBody2D, ..) offer custom settings. The two that matter most for stacks:

- **body_skin** adds a small contact skin, so stacked bodies rest slightly apart instead of jittering.
- **additional_solver_iterations** raises solver accuracy for one important body and everything it touches, without a global cost.

All properties are listed with types and defaults in the [Class Reference](../reference/bodies).

## Ghost Collisions

Ghost Collisions are collisions that stop objects from moving when intersecting with a static object made out of multiple pieces of geometry (tile sets, polygon).

![ghost collisions](/img/ghost_collisions.gif)

### How to avoid them

**Build the ground from one shape, not many.** A row of separate `StaticBody2D` boxes has a seam at every join, and a body sliding across can catch on each one. A single `ConcavePolygonShape2D` measurably reduces this — in our benchmark it roughly halved the vertical kick a sliding box picks up.

**In 3D, leave `backface_collision` off.** When a `ConcavePolygonShape3D` declares itself one-sided, godot-rapier builds the trimesh with `FIX_INTERNAL_EDGES`, which is the robust construction-time fix: contact normals are clamped using per-vertex pseudo-normals, so the invalid contacts at internal edges never generate. Turning `backface_collision` on requires collisions from both sides and disables it.

**In 2D, `physics/rapier/logic/oriented_concave_polyline_2d`** applies the same idea to polylines. It is **disabled by default** and should stay that way for most projects, because Godot's `ConcavePolygonShape2D` is double-sided — there is no `backface_collision` property on it — so enabling this makes your level geometry one-sided and bodies can pass through it from the wrong side.

If you do enable it, the winding matters: the solid must be to the right of each segment's direction. godot-rapier corrects the winding automatically for closed loops, and warns for open polylines, where there is no interior and no way to tell which side is solid.

## Continuous Collision Detection

Fast moving rigid bodies might pass through other rigid bodies, unless the **Continuous Collision Detection** is active. However, even then, it will only do 1 extra step. For multiple extra steps, configure the project setting **Max Ccd Sub Steps**: Maximum number of sub steps performed by the solver. By default it's set to 1.

## Shapes getting stuck inside

In some cases, objects might get stuck inside polygons. This happens because of the physics engine trying to push the object right and left and it ends up in same position always. A great read about this is the [Stuck Inside](https://box2d.org/posts/2020/04/stuck-inside/) article from box2d.

![ghost collisions](/img/rigidbodies/stuck.png)

In order to solve this, change the polygon to be formed of Segments instead of Solids, or change the Static Body polygon Radius (`RapierPhysicsServer2D.body_set_extra_param(self.get_rid(), 0, 1.0)`) so that the small objects cannot get inside.
