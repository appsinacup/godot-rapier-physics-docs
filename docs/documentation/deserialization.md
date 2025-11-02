---
sidebar_position: 5
---

# Deserialization

Deserializing can be useful to reload the exact state the world was left in previously. Similar to serialization functions, there is function that deserializes, but only from binary (json is just for debug):

```js
RapierPhysicsServer.import_binary(rid)
```

Note that you will need the rid of the object. This can be simple to do if you don't reload the scene, but if you do, then you need to do a mapping to know what object corresponds to what physics object. The reason is that the rid changes between runs. In order to figure out what rid the new object has, use the path of the object as unique property.


:::note

There is a high level script provided in `addons/godot-rapier2d/rapier_state_2d.gd` and `addons/godot-rapier3d/rapier_state_3d.gd`. These simplify the process of saving/loading and exporting/importing of states. For an example of usage, check [Scene Change 2D Test](https://github.com/appsinacup/godot-rapier-physics/blob/main/bin2d/test/integration/scene_change.gd) and [Scene Change 3D Test](https://github.com/appsinacup/godot-rapier-physics/blob/main/bin3d/test/integration/scene_change.gd), and their scenes they are in.

:::


## Space Deserialization

Spaces contain most of the data. Other objects contain references to the internal data that spaces have.

```js
RapierPhysicsServer2D.import_binary(space_rid, exported_binary)
# or
RapierPhysicsServer3D.import_binary(space_rid, exported_binary)
```

In order to get the exported data back, you can read it from a file or where you stored it:

```js
var file = FileAccess.open("user://space.json", FileAccess.READ)
var exported_binary: PackedByteArray = file.get_file_as_bytes()
```

## Collision Object Deserialization

Deserializing a collision object requires the internals of it to exist before. That would mean the shapes and the space and the joints.

```js
RapierPhysicsServer2D.import_binary(body_rid, exported_binary)
# or
RapierPhysicsServer3D.import_binary(body_rid, exported_binary)
```

## Joint Deserialization

Deserializing a joint requires a rid for the new joint. This joint will have references to a body that will need to exist (needs testing).

```js
RapierPhysicsServer2D.import_binary(joint_rid, exported_binary)
# or
RapierPhysicsServer3D.import_binary(joint_rid, exported_binary)
```

## Shape Deserialization

Deserializing a shape requires a rid for the new shape.

```js
RapierPhysicsServer2D.import_binary(joint_rid, exported_binary)
# or
RapierPhysicsServer3D.import_binary(joint_rid, exported_binary)
```
