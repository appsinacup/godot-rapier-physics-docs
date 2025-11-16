---
sidebar_position: 4
---

# Multibdoy Joints and IK

Godot Rapier has **Impulse Joints**, which use Constraints-based approach.

It also has **Multibdoy Joints**, which use the [Reduced Coordinates Approach](https://rapier.rs/docs/user_guides/rust/joint_constraints). They are more stable but slower and can be used for IK. Multibody joints are a chain of multiple joints that are continuously connected, and use the Rapier Extension Classes.

:::note "WHICH APPROACH SHOULD I USE?"

The choice of approach depends on the application. For robotics, the reduced-coordinates approach is generally preferred because of its accuracy and ease of use, e.g., for control, inverse kinematics, etc.

:::

## Inverse Kinematics

The multibody joints support IK target nodes. In order to use it, create a Rapier Extension Class of the node you want to use (eg. RapierPinJoint2D) and select **joint_type** to Multibody:

![multibody](/img/joints/multibody.png)

Now, the whole chain structure will follow the **ik_target**:

![ik](/img/joints/ik.png)
