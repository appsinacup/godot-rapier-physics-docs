---
sidebar_position: 7
---

# StateManager Node

The Rapier physics engine supports the ability to serialize the entire physics state of the world; we've exposed this in Godot Rapier as a physics state save/load system. This functionality is accessible via the StateManager node, which comes in 2D and 3D versions.

# Caveats

In the implementation's present state, there are some important limitations for users to be aware of. At time of writing, the save/load system does not manipulate the scene tree. That means that if you instantiate or delete nodes (even if those nodes are physics objects),
the Godot Rapier serialization system will not automatically handle creation or deletion of those nodes. For example, let's say you have a scene which starts with two physics objects in it. You save the game (creating save state A). Then, you delete one of the physics objects, creating state B. If you then try to load state A from state B, you will encounter errors-- because the load system attempts to restore the state of the deleted physics object, but that object no longer exists in the scene tree. This means users must manually ensure that their scene tree objects match the objects represented by the physics state.

# Functionalities

The serialization system has two main modes-- export mode and cache mode. In export mode, the physics space state is exported in any of three formats:
1. Json. This format is a comparatively slow option, but it's human-readable, which makes it convenient for debugging or state analysis.
2. Godot Base64 Encoded String. Takes the Json physics state and encodes it into Godot Base64 binary. As such, it can be thought of as a slightly obfuscated version of the Json format option; it can be stored on disk more conveniently than the Json format, and can easily be decoded in GDScript.
3. Rust Bincode. This binary format is the recommended option for most use cases, as it's much faster than the other two formats; however, it is not human-readable and cannot be manually decoded in GDScript.
Export mode is designed for applications that need state to be saved to disk-- for example, if you want to save your game and load it from file later. 

The second mode-- state caching-- is a streamlined methodology for conveniently rapidly restoring saved data (for example, if a checkpoint has to be frequently reloaded). Cached state is stored in memory, in an object handled by the StateManager. The cache contains logic that can optionally store multiple states in an array, including support for cache rolling, which will automatically delete the oldest state if the specified maximum cache length is exceeded.

# Usage

Serialization is performed by the StateManager node (either the 2D or the 3D version, depending on your use case), which is a new node type added by Godot Rapier. Simply add a StateManager to your scene, and then call the following methods on it.

## Export and Import

To export the state, simply call the relevant method and supply the relevant space's RID, along with the export format (the below example is written in GDScript and takes the 2D world's default space):

```js
var space_rid = get_world_2d().space;
saved_state = rapier_state_manager.export_state(space_rid, "Json")
```

The strings corresponding to the various formats are:
1. "Json" for Json.
2. "GodotBase64" for Godot's Base64 encoded string.
3. "RustBincode" for Rust-native binary data.

Serialization works by taking a space and gathering up the physics state of all objects within that space (hence the supplied space RID). To export multiple different spaces, simply run the export for each relevant space's RID.
The export method will return a Godot Variant object-- a string for Json or GodotBase64, and a PackedByteArray for RustBincode. It's up to the user to decide how to use or store that variant to disk.

Once exported, state can be loaded using the import method:

```js
rapier_state_manager.import_state(space_rid, saved_state)
```

... Where saved_state must be a Godot Variant object. Note that format doesn't have to be supplied during the import call, as it will be automatically deduced from the data.

## State Caching API

To cache the physics state in memory, users can use the caching API. The following cache-related parameters are exposed from the StateManager:

```js
max_cache_length
```
The max number of states that can be stored in memory simultaneously. It's recommended that users be conservative and keep this number low where possible, depending on the expected sizes of your states.

```js
rolling_cache
```
A bool that determines whether the cache should automatically remove the oldest existing cached state if a new state is cached while the cache is already at capacity. For example, if the cache has a max cache length of 5, and it has 5 states stored in memory, the state at index 0 will be removed when cache_state is called if rolling_cache is set to true. Note that some manual cache management is often desirable even if rolling_cache is enabled; for example, when a state is loaded but the cache also contains saved states that were generated after the state which is being restored, it is usually best to manually clear the cache.

The following cache-related methods are exposed via the StateManager:

```js
get_max_cache_length()
```
Gets the current max cache length.

```js
set_max_cache_length(int new_length)
```
Changes the max cache length to the supplied value.

```js
cache_state(RID in_space, Variant tag)
```
Caches the current state of the space corresponding to the supplied RID. The tag parameter gives users the ability to essentially label the states in the cache with useful identifying information (for example, if you're storing state when the player character enters a library, you could tag the state with "library_entry"). The tag is a variant, so it can be whatever the user wants-- a string, a number, a binary array. This tag is the only way for users to easily differentiate between the contents of the cached states, so it's recommended to use something explicit and descriptive.

```js
load_cached_state(RID in_space, int index)
```
Loads the state from the cache at the given index into the specified space. To determine the index to load, one might use:

```js
ordered_cache_tags()
```
This method returns all the tags of the cached items in order-- so if you want to find a cached state with a specific tag, you can look up it's position in the list returned by this method, and then supply that index to load_cached_state.

```js
clear_cache()
```
Clears all states from the cache.

```js
remove_cached_by_index()
```
Removes the specified state from the cache.

```js
export_state_from_cache(int index, String serialization_format)
```
Serializes the selected cached state (allowing the state to be saved to disk, for example).
