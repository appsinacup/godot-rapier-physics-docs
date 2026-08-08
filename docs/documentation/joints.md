---
sidebar_position: 4
---

# Multibody Joints and IK

Godot Rapier has **Impulse Joints**, which use Constraints-based approach.

It also has **Multibody Joints**, which use the [Reduced Coordinates Approach](https://rapier.rs/docs/user_guides/rust/joint_constraints). They are more stable but slower and can be used for IK. Multibody joints are a chain of multiple joints that are continuously connected, and use the Rapier Extension Classes.

:::note "WHICH APPROACH SHOULD I USE?"

The choice of approach depends on the application. For robotics, the reduced-coordinates approach is generally preferred because of its accuracy and ease of use, e.g., for control, inverse kinematics, etc.

:::

## Inverse Kinematics

The multibody joints support IK target nodes. In order to use it, create a Rapier Extension Class of the node you want to use (eg. RapierPinJoint2D) and select **joint_type** to Multibody:

![multibody](/img/joints/multibody.png)

Now, the whole chain structure will follow the **ik_target**:

![ik](/img/joints/ik.png)

When setting a multibody joint, the rigidbodies need to not collide with each other and be massless.

## Motor position targets

Rapier's motors can drive a joint to a target velocity or a target position. Godot only exposes velocity targets; `RapierPinJoint2D` and `RapierHingeJoint3D` add position targets, which act like a spring towards an angle in radians.

![inspector properties](/img/joint_motors/motor_position_inspector.png)

Every joint node and its properties is listed in the [Class Reference](../reference/joints).

