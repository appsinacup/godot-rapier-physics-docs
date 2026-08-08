---
sidebar_position: 2
---

# Save and Load Physics State

Save the physics world to disk and restore it later — a save-game for physics. Concepts and limitations are covered in [Serialization](../documentation/serialization).

## Add a state manager

Add a **RapierStateManager2D** node to your scene (or `RapierStateManager3D` in 3D).

## Save to a file

Export the space's state and write it to disk. `RustBincode` is the fastest format; use `Json` while debugging so you can read the output.

```gdscript
@onready var state_manager: RapierStateManager2D = $RapierStateManager2D

func save_game() -> void:
	var state: Variant = state_manager.export_state(get_world_2d().space, "RustBincode")
	var file := FileAccess.open("user://physics_save.bin", FileAccess.WRITE)
	file.store_var(state)
```

## Load it back

The scene tree must contain the same physics nodes it had when saving — import restores their state, it does not create them.

```gdscript
func load_game() -> void:
	var file := FileAccess.open("user://physics_save.bin", FileAccess.READ)
	state_manager.import_state(get_world_2d().space, file.get_var())
```

The format is detected automatically on import.

## Checkpoints without files

For rapid restores (checkpoint retries, rollback), keep snapshots in memory instead:

```gdscript
func checkpoint() -> void:
	state_manager.cache_state(get_world_2d().space, "checkpoint")

func retry() -> void:
	var index: int = state_manager.ordered_cache_tags().find("checkpoint")
	state_manager.load_cached_state(get_world_2d().space, index)
```

All state manager methods are listed in the [Class Reference](../reference/state-manager).
