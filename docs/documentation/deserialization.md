---
sidebar_position: 5
---

# Deserialization

Deserializing can be useful to reload the exact state the world was left in previously.

## Space Deserialization

Spaces contain most of the data. Other objects contain references to the internal data that spaces have.

```js
RapierPhysicsServer2D.space_import_json(space_rid, exported_json)
RapierPhysicsServer2D.space_import_binary(space_rid, exported_binary)
# or
RapierPhysicsServer3D.space_import_json(space_rid, exported_json)
RapierPhysicsServer3D.space_import_binary(space_rid, exported_binary)
```


:::note

Loading the state right now loads everything the same way as it was before. This will not work right now with some of the objects(eg. Rid's, Callables, etc.). More info on this will be added here soon.

:::

In order to get the exported data back, you can read it from a file or where you stored it:

```js
var file = FileAccess.open("user://space.json", FileAccess.READ)
var exported_json: String = file.get_as_text()
```

```js
var file = FileAccess.open("user://space.json", FileAccess.READ)
var exported_binary: PackedByteArray = file.get_file_as_bytes()
```

## Collision Object Deserialization

Deserializing a collision object requires the internals of it to exist before. That would mean the shapes and the space and the joints.

```js
var body_json = RapierPhysicsServer2D.collision_object_import_json(body_rid, exported_json)
# or
var body_json = RapierPhysicsServer3D.collision_object_import_json(body_rid, exported_json)
```

## Joint Deserialization

Deserializing a joint requires a rid for the new joint. This joint will have references to a body that will need to be fixed.

```js
RapierPhysicsServer2D.joint_import_json(joint_rid, exported_json)
# or
RapierPhysicsServer3D.joint_import_json(joint_rid, exported_json)
```

## Shape Deserialization

Deserializing a shape requires a rid for the new shape.

```js
RapierPhysicsServer2D.shape_import_json(joint_rid, exported_json)
# or
RapierPhysicsServer3D.shape_import_json(joint_rid, exported_json)
```

## Deserialization All Objects

It is also possible to get all the objects inside the Physics Server of a specific type:

```js
var collision_objects_json = RapierPhysicsServer2D.collision_objects_import_json()
var jointss_json = RapierPhysicsServer2D.joints_import_json()
var shapes_json = RapierPhysicsServer2D.shapes_import_json()
```


