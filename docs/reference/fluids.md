---
sidebar_position: 4
---

# Fluid Nodes

How to use fluids is covered in [Fluids](../documentation/fluids) and the [tutorial](../tutorial/create-a-fluid). This page lists the classes.

## Fluid2D / Fluid3D

The base particle-fluid node.

| Property | Type | What it does |
|---|---|---|
| `radius` | `float` | Particle radius. Must match `physics/rapier/fluid/fluid_particle_radius_*`. |
| `density` | `float` | Fluid density. |
| `lifetime` | `float` | Seconds before a particle despawns; 0 keeps them forever. |
| `debug_draw` | `bool` | Draw the particles for debugging. |
| `effects` | `Array[Resource]` | Fluid effect resources, listed below. |
| `points` | `PackedVector2Array` | The particles. |
| `collision_layer` / `collision_mask` | `int` | Interaction groups. |

| Method | What it does |
|---|---|
| `get_points()` / `get_velocities()` / `get_accelerations()` | Per-particle state. |
| `get_remaining_times()` | Per-particle time left before despawn. |
| `create_rectangle_points(width, height)` | Generate a filled rectangle of particles. |
| `create_circle_points(radius)` | Generate a filled circle of particles. |

## Shape helpers

Scripts in the addon folder that extend `Fluid2D` / `Fluid3D` and fill their points for you. Attach them to a fluid node; only the faucets are global classes.

| Script / class | Properties |
|---|---|
| `fluid_2d_rectangle.gd` | `width`, `height` |
| `fluid_2d_circle.gd` | `circle_radius` |
| `fluid_3d_box.gd` / `fluid_3d_sphere.gd` | 3D equivalents |
| `Faucet2D` / `Faucet3D` | Spawns particles over time: `interval`, `max_particles`, `width`, `height` |

## Effects

Resources added to a fluid's `effects` array:

| Resource | Effect |
|---|---|
| `FluidEffect2DElasticity` | Springy, jelly-like behaviour. |
| `FluidEffect2DSurfaceTensionAKINCI` / `HE` / `WCSPH` | Surface tension, three different models. |
| `FluidEffect2DViscosityArtificial` / `DFSPH` / `XSPH` | Viscosity, three different models. |

All exist as `FluidEffect3D*` too.

## Renderers

| Node | What it does |
|---|---|
| `Fluid2DRenderer` | Draws each particle with a `MultiMesh`. |
| `Fluid2DShaderRenderer` | Draws the fluid with a metaball-style shader. |
| `Fluid3DRenderer` | 3D equivalent. |
