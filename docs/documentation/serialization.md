---
sidebar_position: 2
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

In case you save to a file, you can store it and keep overriding the file, and then check the state in a moment you stop the game for eg.