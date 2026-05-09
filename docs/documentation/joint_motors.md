---
sidebar_position: 4.5  
---

# Pin Joint Springs

Rapier has a motor system that can drive a joint to a target velocity or a target position. While motor velocity targets are already exposed in the base Godot physics objects, position targets are not.

In addition to supporting motor velocity targets, this extension exposes motor position targets in properties added to RapierPinJoint2D and RapierHingeJoint3D objects. 

A motor position target acts more like a spring than a motor, and in the case of a pin joint or hinge joint it is targeting an angle in radians (not a position).

![inspector properties](/img/joint_motors/motor_position_inspector.png)