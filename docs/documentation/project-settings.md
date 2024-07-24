---
sidebar_position: 4
---

# Project Settings

There are some options which can be configured for the Rapier library that change the physics simulation for the whole project. These can be accessed from **Project Settings** -> **Physics** -> **Rapier**:

![settings](/img/project-settings/settings.png)

- **Num Internal Pgs Iterations**: Number of internal Project Gauss Seidel (PGS) iterations run at each solver iteration.
- **Num Additional Friction Iterations**: Number of addition friction resolution iteration run during the last solver sub-step.
- **Num Iterations**:  The number of solver iterations run by the constraints solver for calculating forces
- **Max Ccd Substeps**: Maximum number of substeps performed by the solver.
- **Contact Skin**: A skin that is added to each shape. This can also be added individually to bodies by calling:
  ```js
  var contact_skin = 0.1 # Any value
  RapierPhysicsServer2D.body_set_extra_param(body_rid, 0, contact_skin)
  # or
  RapierPhysicsServer3D.body_set_extra_param(body_rid, 0, contact_skin)
  ````
- **Length Unit 2D**: The approximate size of most dynamic objects in the scene. For 2D it is **100** as gravity in Godot is **980**, and in real life it is **9.8**.
- **Length Unit 3D**: The approximate size of most dynamic objects in the scene. For 3D it is **1** as gravity in Godot is **9.8**, and in real life it is **9.8**.
- **Fluid Particle Radius**: The Particle Radius used for each Particle when simulating Fluids. For 2D it defaults to **20** and for 3D it defaults to **0.5**
- **Fluid Smoothing Factor**: The Smoothing Factor used when simulating Fluids.
