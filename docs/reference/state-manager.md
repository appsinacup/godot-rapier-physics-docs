---
sidebar_position: 5
---

# State Manager

`RapierStateManager2D` / `RapierStateManager3D` save and restore whole-space physics state. Concepts, limitations and formats are covered in [Serialization](../documentation/serialization); this page lists the API.

| Method | What it does |
|---|---|
| `export_state(space, format)` | Export a space's state. Formats: `Json`, `GodotBase64`, `RustBincode`. |
| `import_state(space, state)` | Restore a previously exported state; format is auto-detected. |
| `cache_state(space, tag)` | Snapshot into the in-memory cache instead of exporting. Tag it with any Variant to find it again. |
| `ordered_cache_tags()` | The tags of all cached snapshots, in cache order; look up an index here for `load_cached_state`. |
| `load_cached_state(space, index)` | Restore a cached snapshot. |
| `export_state_from_cache(index, format)` | Serialize a cached snapshot. |
| `remove_cached_by_index(index)` | Drop one snapshot. |
| `clear_cache()` | Drop them all. |
| `get_max_cache_length()` / `set_max_cache_length(n)` | Cache size limit. |
| `rolling_cache` | Property: when full, caching evicts the oldest snapshot instead of failing. |

Related server methods: [`get_rapier_id`, `get_global_id`, `set_global_id`](physics-server#identity-and-diagnostics).
