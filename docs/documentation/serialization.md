---
sidebar_position: 6
---

# Serialization

Since this addon is written in the Rust language, it is fairly easy to save and load the state of it at any time, via the **StateManager** node (see below).

## Space

All the physics objects are grouped inside **spaces** (eg. a space contains all objects). Even if you don't create a space, a default space exists and can be obtained from:

```js
var space_2d_rid = get_viewport().world_2d.space
# or
var space_3d_rid = get_viewport().world_3d.space
```


:::note SubViewports

If you want the physics simulation to happen inside another space and not interact with the default space, you can create a new space by creating a new [SubViewport](https://docs.godotengine.org/en/stable/tutorials/rendering/viewports.html). These come with new **world_2d** and/or **world_3d** instances. If you do this, you also have to render the new viewport using [SubViewportContainer](https://docs.godotengine.org/en/stable/classes/class_subviewportcontainer.html#class-subviewportcontainer).

:::


## StateManager Node

The Rapier physics engine supports the ability to serialize the entire physics state of the world; we've exposed this in Godot Rapier as a physics state save/load system. This functionality is accessible via the StateManager node, which comes in 2D and 3D versions.

## Caveats

In the implementation's present state, there are some important limitations for users to be aware of. At time of writing, the save/load system does **not manipulate the scene tree**. That means that if you instantiate or delete nodes (even if those nodes are physics objects),
the Godot Rapier serialization system will not automatically handle creation or deletion of those nodes. That is the job of the developer (eg. via scene reload).

For example, let's say you have a scene which starts with two physics objects in it. You save the game (creating save state A). Then, you delete one of the physics objects, creating state B. If you then try to load state A from state B, you will encounter errors-- because the load system attempts to restore the state of the deleted physics object, but that object no longer exists in the scene tree. This means users must manually ensure that their scene tree objects match the objects represented by the physics state.

## Functionalities

The serialization system has two main modes-- **export mode** and **cache mode**. In export mode, the physics space state is exported in any of three formats:
1. **Json**: This format is a comparatively slow option, but it's human-readable, which makes it convenient for debugging or state analysis.
2. **Godot Base64 Encoded String**: Takes the Json physics state and encodes it into Godot Base64 binary. As such, it can be thought of as a slightly obfuscated version of the Json format option; it can be stored on disk more conveniently than the Json format, and can easily be decoded in GDScript.
3. **Rust Bincode**: This binary format is the recommended option for most use cases, as it's much faster than the other two formats; however, it is not human-readable and cannot be manually decoded in GDScript.
Export mode is designed for applications that need state to be saved to disk-- for example, if you want to save your game and load it from file later. 

The second mode **state caching** is a streamlined methodology for conveniently rapidly restoring saved data (for example, if a checkpoint has to be frequently reloaded). Cached state is stored in memory, in an object handled by the StateManager. The cache contains logic that can optionally store multiple states in an array, including support for cache rolling, which will automatically delete the oldest state if the specified maximum cache length is exceeded.

## Usage

Serialization is performed by the **RapierStateManager2D** / **RapierStateManager3D** node. Add one to your scene and call `export_state` / `import_state` on it with the space's RID — step by step in the [Save and Load State tutorial](../tutorial/save-and-load-state), full API in the [Class Reference](../reference/state-manager).

Serialization gathers the physics state of all objects within the supplied space; to export multiple spaces, export each RID. Export returns a String for `Json` and `GodotBase64` or a `PackedByteArray` for `RustBincode`; import detects the format automatically.

### State Caching API

To cache physics state in memory instead of exporting it, use the caching API: `cache_state` snapshots the space and labels it with any Variant tag ("library_entry", a frame number, ...), `ordered_cache_tags` finds a snapshot's index by tag, and `load_cached_state` restores it.

Keep `max_cache_length` conservative, since each snapshot holds a whole space. With `rolling_cache` enabled a full cache evicts its oldest snapshot on the next `cache_state`; even then some manual management is desirable — after restoring an older state, clear the snapshots that were taken after it.

All methods and properties are listed in the [Class Reference](../reference/state-manager).
