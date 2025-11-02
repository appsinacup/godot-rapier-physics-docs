---
sidebar_position: 4
---

# Serialization

Since this addon is written in the Rust language, it is fairly easy to save and load the state of it at any time. For this there are some helper methods, directly accessible from the **RapierPhysicsServer2D** or **RapierPhysicsServer3D** singletons. You can export and import to both **json** or **binary**.

```js
RapierPhysicsServer.export_binary(rid)
RapierPhysicsServer.export_json(rid)
```

Each object (shapes, bodies, spaces, joints) has state. You need to save at least a space with all objects inside it for the physics server to function when loading it back. You cannot save just 1 body or just 1 joint (or you can, but then you have to guarantee that the rest would work correctly).

The reason each individual object has an import and export function is that they all match to things outside of Physics Server (eg. in the Scene tree). They need to be reimported and matched to their RID (Resource ID). This changes every time you reload the scene (eg. for each node or space).

:::note

There is a high level script provided in `addons/godot-rapier2d/rapier_state_2d.gd` and `addons/godot-rapier3d/rapier_state_3d.gd`. These simplify the process of saving/loading and exporting/importing of states. For an example of usage, check [Scene Change 2D Test](https://github.com/appsinacup/godot-rapier-physics/blob/main/bin2d/test/integration/scene_change.gd) and [Scene Change 3D Test](https://github.com/appsinacup/godot-rapier-physics/blob/main/bin3d/test/integration/scene_change.gd), and their scenes they are in.

:::


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

Similar to other physics objects, get the rid and serialize the joint.

```js
var exported_json: String = RapierPhysicsServer.export_binary(joint_rid)
```

## Shape Serialization

Not all shapes can be serialized right now since not all have the rid property (Godot internals). For those that do (eg. **CollisionShape2D**), use the `get_shape_owners` property of **CollisionObject3D** to get the shape owners and use that to get the `shape_rid`.

```js
for owner_id in node.get_shape_owners():
    for owner_shape_id in node.shape_owner_get_shape_count(owner_id):
        var shape_rid = node.shape_owner_get_shape(owner_id, owner_shape_id).get_rid()
```

Then you can do:
```js
var exported_json: String = RapierPhysicsServer.export_binary(shape_rid)
```
