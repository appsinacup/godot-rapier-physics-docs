---
sidebar_position: 4
---

# Serialization

Since this addon is written in the Rust language, it is fairly easy to save and load the state of it at any time. For this there are some helper methods, directly accessible from the **RapierPhysicsServer2D** or **RapierPhysicsServer3D** singletons. You can export and import to both **json** or **binary**.

```js
RapierPhysicsServer.export_binary(rid)
RapierPhysicsServer.export_json(rid)
```

## Space

All the physics objects are grouped inside **spaces** (eg. a space contains all objects). Even if you don't create a space, a default space exists and can be obtained from:

```js
var space_2d_rid = get_viewport().world_2d.space
# or
var space_3d_rid = get_viewport().world_3d.space
```


:::note

If you want the physics simulation to happen inside another space and not interact with the default space, you can create a new space by creating a new [SubViewport](https://docs.godotengine.org/en/stable/tutorials/rendering/viewports.html). These come with new **world_2d** and/or **world_3d** instances. If you do this, you also have to render the new viewport using [SubViewportContainer](https://docs.godotengine.org/en/stable/classes/class_subviewportcontainer.html#class-subviewportcontainer).

:::

Next, all you have to do is call the export function from the **RapierPhysicsServer**.

```js
var exported_binary: String = RapierPhysicsServer.export_binary(space_rid)
```

:::note

Every export function has both json and binary variants. The **binary** one is going to be faster and result in  less size, while the **json** one is going to be better for debugging.

:::

Next, you can either print the result:

```js
print(exported_binary)
```

Or store it to a file as binary:

```js
var file = FileAccess.open("user://space.bin", FileAccess.WRITE)
file.store_buffer(exported_binary)
```

## Collision Object Serialization

A Collision Object inside the wrapper refers to either a:
- RigidBody
- Area
- StaticBody
- CharacterBody

This serializes the data a RigidBody structure has in Godot. This does not save the actual RigidBody Rapier uses, that is stored in the Space serialization. This just stores a handle to that.

```js
var exported_json: String = RapierPhysicsServer.export_binary(body_rid)
```

In order to get the **body_rid**, call the `get_rid()` method on the Collision Object.

## Joint Serialization

Similar to other physics objects, get the rid and serialize the joint

```js
var exported_json: String = RapierPhysicsServer.export_binary(joint_rid)
```
## Shape Serialization

Not all shapes can be serialized right now, some simply don't export the rid property. For those that do (eg. **CollisionShape2D**) do, use the `get_shape_owners` property of **CollisionObject3D** to get the shape owners and use that to get the `shape_rid`.

```js
for owner_id in node.get_shape_owners():
    for owner_shape_id in node.shape_owner_get_shape_count(owner_id):
        var shape_rid = node.shape_owner_get_shape(owner_id, owner_shape_id).get_rid()
```

Then you can do:
```js
var exported_json: String = RapierPhysicsServer.export_binary(shape_rid)
```
