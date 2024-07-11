---
sidebar_position: 3
---

# Serialization

Since this addon is written in the Rust language, it is fairly easy to save and load the state of it at any time. For this there are some helper methods, directly accessible from the **RapierPhysicsServer2D** or **RapierPhysicsServer3D** singletons. You can export and import to both **json** or **binary**.

## Space Serialization

All the physics objects are grouped inside **spaces** (eg. a space contains all objects). Even if you don't create a space, a default space exists and can be obtained from:

```js
var space_2d_rid = get_viewport().world_2d.space
# or
var space_3d_rid = get_viewport().world_3d.space
```


:::note

If you want the physics simulation to happen inside another space and not interact with the default space, you can create a new space by creating a new [SubViewport](https://docs.godotengine.org/en/stable/tutorials/rendering/viewports.html). These come with new **world_2d** and/or **world_3d** instances. If you do this, you also have to render the new viewport using [SubViewportContainer](https://docs.godotengine.org/en/stable/classes/class_subviewportcontainer.html#class-subviewportcontainer).

:::

Next, all you have to do is call the export function from the **RapierPhysicsServer**:

```js
var exported_json: String = RapierPhysicsServer2D.space_export_json(space_2d_rid)
var exported_binary: PackedByteArray = RapierPhysicsServer2D.space_export_binary(space_2d_rid)
# or
var exported_json: String = RapierPhysicsServer3D.space_export_json(space_3d_rid)
var exported_binary: PackedByteArray = RapierPhysicsServer3D.space_export_binary(space_3d_rid)
```


:::note

Every export function has both json and binary variants. The **binary** one is going to be faster and result in  less size, while the **json** one is going to be better for debugging.

:::

Next, you can either print the result:

```js
print(exported_json)
```

Or store it to a file as json:

```js
var file = FileAccess.open("user://space.json", FileAccess.WRITE)
file.store_string(exported_json)
```

Or store it to a file as binary:

```js
var file = FileAccess.open("user://space.json", FileAccess.WRITE)
file.store_buffer(exported_binary)
```

## Collision Object Serialization

A Collision Object inside the wrapper refers to either a:
- RigidBody
- Area
- StaticBody
- CharacterBody

This serializes the data a Rigidbody structure has in Godot. This does not save the actual Rigidbody Rapier uses, that is stored in the Space serialization. This just stores a handle to that.

```js
var exported_json: String = RapierPhysicsServer2D.collision_object_export_json(body_rid)
# or
var exported_json: String = RapierPhysicsServer3D.collision_object_export_json(body_rid)
```

In order to get the **body_rid**, call the `get_rid()` method on the Collision Object.

## Joint Serialization

A Joint object refers to a Godot Joint. This has a reference to a handle that maps to a Rapier Joint. That one is stored on the Space.

```js
var exported_json: String = RapierPhysicsServer2D.joint_export_json(joint_rid)
# or
var exported_json: String = RapierPhysicsServer3D.joint_export_json(joint_rid)
```

In order to get the **joint_rid**, call the `get_rid()` method on the Collision Object.

## Shape Serialization

A Shape object refers to a Godot Shape. This has a reference to a handle that maps to a Rapier Collider. That one is stored on the Space.

```js
var exported_json: String = RapierPhysicsServer2D.shape_export_json(joint_rid)
# or
var exported_json: String = RapierPhysicsServer3D.shape_export_json(joint_rid)
```

In order to get the **shape_rid**, call the `get_rid()` method on the Collision Object.

:::note

A Shape can map to 0 or 1 or many Rapier Colliders. This is because in Godot, a shape can either be used reused for multiple RigidBodies, or can be used just for Physics Queries.

:::

## Serialize All Objects

It is also possible to get all the objects inside the Physics Server of a specific type:

```js
var collision_objects_json: String = RapierPhysicsServer2D.collision_objects_export_json()
var jointss_json: String = RapierPhysicsServer2D.joints_export_json()
var shapes_json: String = RapierPhysicsServer2D.shapes_export_json()
```
