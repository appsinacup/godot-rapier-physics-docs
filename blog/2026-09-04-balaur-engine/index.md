---
slug: balaur-engine
title: 'We are building a game engine: Balaur'
date: 2026-09-04
authors: 
  - name: Apps in a Cup
    url: https://github.com/appsinacup
    image_url: https://github.com/appsinacup.png
tags: [balaur, announcement]
---

This addon puts **Rapier** underneath Godot. For the past while we have been building an engine around it instead: [**Balaur**](https://balaurengine.org), a node-based 2D and 3D game engine written in Rust, together with **Sébastien Crozet**, the author of [Rapier](https://rapier.rs).

<!-- truncate -->

## Why

The [Determinism](/docs/documentation/determinism) page on this site is honest about where the addon stops. Rapier is deterministic and cross platform deterministic, and the physics state serializes and reloads exactly. The scene tree, the rendering system, input and scripting are not, and keeping the rest of the game in step with the physics is left to you.

Balaur is what that limit looks like when you get to choose the engine as well as the physics. The whole tick is deterministic, not just the physics server: **same inputs, same bits on every platform**, a digest per tick, record and replay, and rollback. Network replies are queued and land at the start of a tick, so a replay covers logins and retries without touching the network.

## What it is

A game is a tree of named nodes with scripts attached, over an ECS you never see. Scenes are plain TOML:

```toml
[[nodes]]
name = "Ball"
position = [0.0, 6.0, 0.0]
script = "scripts/ball.rn"
body3d = "dynamic"
collider3d = { kind = "ball", radius = 0.5 }
shape3d = { kind = "ball", radius = 0.5 }
```

`body3d` and `collider3d` come from the physics plugin, which is Rapier for both 2D and 3D, stepped on a fixed 60 Hz tick. A component registered by a plugin becomes a scene key, a script call and an inspector row at the same time.

Scripts are [Rune](https://rune-rs.github.io) — Rust's syntax, no build step, `async`/`await` — and they hot reload while the game runs, in milliseconds, with the state intact:

<video autoPlay loop muted playsInline width="100%">
  <source src="/video/balaur_hot_reload.mp4" type="video/mp4" />
</video>

There is an editor, and it is itself a Balaur project: scene tree, inspector, gizmos, an animation timeline, 2D and 3D rig tools, play-in-editor, and a script debugger with breakpoints.

![The Balaur editor](/img/balaur/editor.webp)

Also in it today: 2D and 3D rendering on wgpu, 2D lights and occluders, WESL shaders, skeletons with two-bone IK, UI widgets, audio and input, HTTP and websockets, and a pack that fuses onto a runtime so a game ships as one self-contained binary with no compiler and no sources.

## Where it is

Early. Balaur is at `0.1`, it is weeks old, and it builds from source — there is no binary release yet, and no browser runtime yet. If you need to ship a game this year, Godot is the safer choice, and the [comparison page](https://balaurengine.org/compare) says so in more detail than this post has room for.

It is MIT licensed and on [GitHub](https://github.com/balaurengine/balaur). Issues and questions are welcome, especially from people who have pushed the determinism and state serialization in this addon further than we have.

## What this means for Godot Rapier Physics

Nothing changes. This addon is a separate project, it is still maintained, and releases carry on as they have been — the fluids, the IK, the stacking and ghost collision work all continue here. Balaur is where the deterministic-engine idea goes when it is not constrained to living inside a physics server.

- [balaurengine.org](https://balaurengine.org)
- [Features](https://balaurengine.org/features) and [Roadmap](https://balaurengine.org/docs/roadmap)
- [Compared with Godot, Bevy and Fyrox](https://balaurengine.org/compare)
