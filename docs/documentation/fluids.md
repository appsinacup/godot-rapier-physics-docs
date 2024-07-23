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

In order to render the fluid, you can either use the `debug_draw` feature, or make your own renderer. The way the renderer would work is it gets the points every frame and then draw an object for every point.

### Fluid2DRenderer

The most efficient way to render multiple objects is a **MultiMeshInstance2D**. This can be created easily by dragging a texture in the scene and then clicking on the sprite it created and clicking convert to **MeshInstance2D**:

![mesh instance](/img/fluids/mesh_instance.png)

The multimeseh has methods for drawing efficiently:
- **multimesh.set_instance_transform_2d(index, new_transform)**
- **multimesh.set_instance_color(index, color)**

This is what the **Fluid2DRenderer** node does. You assign it a **Fluid2D** node and a **color**, and it then uses the default resources from the addon:
- **multimesh.mesh**: `res://addons/godot-rapier2d/circle_mesh.tres`
- **texture** `res://addons/godot-rapier2d/Circle2D.svg`

![fluid renderer](/img/fluids/fluid_renderer.png)

In case you are using the **Fluid2DRenderer**, don't forget to disable the **debug_draw** of the **Fluid2D** node.
