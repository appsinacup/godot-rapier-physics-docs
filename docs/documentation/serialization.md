---
sidebar_position: 3
---

# Serialization

Since this addon is written in the Rust language, it is fairly easy to save and load the state of it at any time. For this there are some helper methods, directly accessible from the **RapierPhysicsServer2D** or **RapierPhysicsServer3D** singletons. You can export and import to both **json** or **binary**.

## Space Serialization

As described in the previous chapter, the objects are grouped inside spaces (eg. a space contains all objects). Even if you don't create a space, one is already created and can be obtained from:

```js
var space_2d = get_viewport().world_2d.space
# or
var space_3d = get_viewport().world_3d.space
```


:::note

If you want the physics simulation to happen inside a space and not interact with other spaces, you can create a new space by creating a new [SubViewport](https://docs.godotengine.org/en/stable/tutorials/rendering/viewports.html). These come with new **world_2d** and/or **world_3d** instances. Note that if you do this, you also have to render the new viewport somewhere. For this you can use a [SubViewportContainer](https://docs.godotengine.org/en/stable/classes/class_subviewportcontainer.html#class-subviewportcontainer).

:::

Next, all you have to do is call the export function from the **RapierPhysicsServer**:

```js
var space_state_json = RapierPhysicsServer2D.space_export_json(space_2d)
var space_state_binary = RapierPhysicsServer2D.space_export_binary(space_2d)
# or
var space_state_json = RapierPhysicsServer3D.space_export_json(space_3d)
var space_state_binary = RapierPhysicsServer3D.space_export_binary(space_3d)
```


:::note

Every export function has both **_json** and **_binary** variants. The **binary** one is going to be faster and result in  less size, while the **_json** one is going to be better for debugging.

:::

Next, you either want to print or save to a file the results:

```js
print(space_state_json)
```

```js
var file = FileAccess.open("user://space.json", FileAccess.WRITE)
file.store_string(space_state_json)
```

In case you save to a file, you can store it and keep overriding the file, and then check the state in a moment you stop the game for eg. In the example above we are storing to `user://` file location. This can be accessed by going to: **Project** -> **Open User Data Folder**.

The resulting file should looks something like this:

```js
{
  "inner": {
    "impulse_joint_set": {
        <rapier internal data>
    },
    "multibody_joint_set": {
        <rapier internal data>
    },
    "collider_set": {
        <rapier internal data>
    },
    "rigid_body_set": {
        <rapier internal data>
    },
    "handle": {
        <rapier internal data>
    }
  },
  "space": {
    <rapier internal data>
  }
}
```

The **inner** structure will be the objects created inside the **Rapier Lib**. The **space** structure will contain the objects that the **Godot Rapier Wrapper** uses to communicate with Godot.

The **inner** structure contains maps to Godot data like this:
- rigidbodies map to **rigid_body_set**
- joints map to **impulse_joint_set**
- shapes map to **collider_set**
- multibody_joint_set are unused and handle is the map from **space** to **inner** structure

## Space Deserialization

TODO

## Collision Object Serialization

A Collision Object inside the wrapper refers to either a:
- RigidBody
- Area
- StaticBody
- CharacterBody

This serializes the data a Rigidbody structure has in Godot. This does not save the actual Rigidbody Rapier uses, that is stored in the Space serialization. This just stores a handle to that.

```js
var body_json = RapierPhysicsServer2D.collision_object_export_json(body_rid)
# or
var body_json = RapierPhysicsServer3D.collision_object_export_json(body_rid)
```

In order to get the **body_rid**, call the `get_rid()` method on the Collision Object.

## Joint Serialization

A Joint object refers to a Godot Joint. This has a reference to a handle that maps to a Rapier Joint. That one is stored on the Space.

```js
var joint_json = RapierPhysicsServer2D.joint_export_json(joint_rid)
# or
var joint_json = RapierPhysicsServer3D.joint_export_json(joint_rid)
```

## Joint Serialization

A Joint object refers to a Godot Joint. This has a reference to a handle that maps to a Rapier Joint. That one is stored on the Space.

```js
var joint_json = RapierPhysicsServer2D.joint_export_json(joint_rid)
# or
var joint_json = RapierPhysicsServer3D.joint_export_json(joint_rid)
```


## Shape Serialization

A Shape object refers to a Godot Shape. This has a reference to a handle that maps to a Rapier Collider. That one is stored on the Space.

```js
var shape_json = RapierPhysicsServer2D.shape_export_json(joint_rid)
# or
var shape_json = RapierPhysicsServer3D.shape_export_json(joint_rid)
```

:::note

A Shape can map to 0 or 1 or many Rapier Colliders. This is because in Godot, a shape can either be used reused for multiple RigidBodies, or can be used just for Physics Queries.

:::

## Serialize All Objects

It is also possible to get all the objects inside the Physics Server of a specific type:

```js
RapierPhysicsServer2D.collision_objects_export_json()
RapierPhysicsServer2D.joints_export_json()
RapierPhysicsServer2D.shapes_export_json()
```