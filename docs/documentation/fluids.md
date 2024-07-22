---
sidebar_position: 2
---

# Fluids


![fluid](/img/fluids/Fluid2D.png)

The **Rapier Physics Server** adds **Fluid2D** and **Fluid3D** nodes that make it possible to simulate liquids. Each liquid can have fluid effects, which are resources of type **FluidEffect2D** or **FluidEffect3D**.

## Fluid Node

In order to simulate a fluid, first create a fluid node. This node has:
- **debug_draw**: Right now only for 2d, will draw small squares where the fluid particles are.
- **density**: Defaults to 1, represents how heavy is the liquid.
- **lifetime**: Defaults to 0, represents time in seconds the fluid particles should live before they get destroyed. If 0 is disabled.
- **effects**: The fluid effects. Use these to make either water or goo or elastic liquids.
- **points**: The fluid particles. These need to be set before the fluid can be simulated.

## Fluid Effects

The fluid can simulate elastic, viscous or surface tension.

### Fluid Effect Elastic

The elastic fluid effect will keep the fluid close togheter.

### Fluid Effect Viscous

This will make the fluid stick together.

### Fluid Effect Surface Tension

This will make the fluid get attracted to other fluid particles, making surface tension. Too high values make the fluid explode.

## Fluid Points

In order to simulate fluids, you need to add points. These can be created with the helper scripts:
- `addons/godot-rapier2d/fluid_2d_circle.gd`: Set a radius and it creates fluid particles inside the circle.
- `addons/godot-rapier2d/fluid_2d_rectangle.gd`: Set a width and height and it creates fluid particles inside the rectangle.
- `addons/godot-rapier3d/fluid_3d_sphere.gd`: Set a radius and it creates fluid particles inside the sphere.
- `addons/godot-rapier3d/fluid_3d_box.gd`: Set a width and height and depth and it creates fluid particles inside the box.

## Fluid Renderers

TODO
