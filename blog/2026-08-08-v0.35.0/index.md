---
slug: v0-35-0
title: 'v0.35 - Rapier vs Box2D vs Jolt vs Box3D vs Godot Physics'
date: 2026-08-08
authors: 
  - name: Apps in a Cup
    url: https://github.com/appsinacup
    image_url: https://github.com/appsinacup.png
tags: [changelog, release]
---

Godot Rapier now runs on **Rapier 0.35**.

Both 2D and 3D builds now always have **parallel SIMD** solver and **cross platform determinism** enabled.

Here is the repo used to run the tests [benchmarks-repo](https://github.com/Ughuuu/benchmarks-repo).

### 2D: Rapier vs Box2D

Rapier is the only engine that keeps every scene stable: Box2D collapses the pyramid and blows the joints apart, those are marked as unstable.
- Issue on godot-box2d-v3 side: [godot-box2d-v3/issues/9](https://github.com/Pizzaandy/godot-box2d-v3/issues/9) [godot-box2d-v3/issues/8](https://github.com/Pizzaandy/godot-box2d-v3/issues/8)

| Engine | Version | Addon |
|-|-|-|
| <img src="/img/engines/rapier.svg" alt="Rapier" height="22" /> [**Rapier2D**](https://github.com/dimforge/rapier) | v0.35 | [godot-rapier2d](https://github.com/appsinacup/godot-rapier-physics) |
| <img src="/img/engines/box2d.svg" alt="Box2D" height="22" /> [**Box2D**](https://github.com/erincatto/box2d) | v3.1 | [godot-box2d-v3](https://github.com/Pizzaandy/godot-box2d-v3) |
| <img src="/img/engines/godot.svg" alt="Godot Physics" height="22" /> [**Godot Physics 2D**](https://github.com/godotengine/godot) | v4.7 | ships with Godot |

| Engine | <img src="/img/engines/rapier.svg" alt="Rapier" height="22" /><br />Rapier2D | <img src="/img/engines/box2d.svg" alt="Box2D" height="22" /><br />Box2D | <img src="/img/engines/godot.svg" alt="Godot Physics" height="22" /><br />Godot Physics |
|-|-|-|-|
| ![pyramid](/img/benchmarks/2d_pyramid.png) | **20.0&nbsp;ms**<br />1.8&nbsp;cores | 21.3&nbsp;ms<br />3.8&nbsp;cores<br />**unstable** | 147&nbsp;ms<br />1.2&nbsp;cores |
| ![smash](/img/benchmarks/2d_smash.png) | 11.9&nbsp;ms<br />2.1&nbsp;cores | **11.6&nbsp;ms**<br />3.8&nbsp;cores | 55.1&nbsp;ms<br />1.3&nbsp;cores |
| ![pile](/img/benchmarks/2d_mixed_pile.png) | 9.3&nbsp;ms<br />1.7&nbsp;cores | **6.7&nbsp;ms**<br />2.9&nbsp;cores | 71.1&nbsp;ms<br />1.3&nbsp;cores |
| ![queries](/img/benchmarks/2d_query_storm.png) | 6.2&nbsp;ms<br />1.2&nbsp;cores | **4.6&nbsp;ms**<br />1.6&nbsp;cores | 57.2&nbsp;ms<br />1.1&nbsp;cores |
| ![joints](/img/benchmarks/2d_joint_grid.png) | **10.2&nbsp;ms**<br />1.5&nbsp;cores | 4.9&nbsp;ms<br />2.6&nbsp;cores<br />**unstable** | **unstable**<br />never finishes |

| Benchmark | 1st | 2nd | 3rd |
|-|-|-|-|
| Pyramid | **Rapier2D** | Box2D 1.07x | Godot Physics 7.35x |
| Smash | **Box2D** | Rapier2D 1.02x | Godot Physics 4.76x |
| Mixed shape pile | **Box2D** | Rapier2D 1.38x | Godot Physics 10.60x |
| Query storm | **Box2D** | Rapier2D 1.37x | Godot Physics 12.56x |
| Joint grid | **Box2D** | Rapier2D 2.06x | Godot Physics never finishes |

Unstable runs, whose times are not comparable: Box2D on the pyramid (collapses) and on the joint
grid (infinite displacement). Godot Physics does not finish the joint grid within 60&nbsp;s.

### 3D: Rapier vs Jolt vs Box3D

Rapier3D is fastest on queries and joints and stays close on the rest; Jolt crashes the joint grid. Box3D became multi-threaded in godot-box3d v0.2.4 and is now the fastest on three scenes — the numbers below were re-measured against it.

| Engine | Version | Addon |
|-|-|-|
| <img src="/img/engines/rapier.svg" alt="Rapier" height="22" /> [**Rapier3D**](https://github.com/dimforge/rapier) | v0.35 | [godot-rapier3d](https://github.com/appsinacup/godot-rapier-physics) |
| <img src="/img/engines/jolt.png" alt="Jolt" height="22" /> [**Jolt**](https://github.com/jrouwe/JoltPhysics) | v5.5.0 | ships with Godot v4.7 |
| <img src="/img/engines/box3d.svg" alt="Box3D" height="22" /> [**Box3D**](https://github.com/erincatto/box3d) | v0.1 | [godot-box3d](https://github.com/bearlikelion/godot-box3d) v0.2.4 |
| <img src="/img/engines/godot.svg" alt="Godot Physics" height="22" /> [**Godot Physics 3D**](https://github.com/godotengine/godot) | v4.7 | ships with Godot |

| | <img src="/img/engines/rapier.svg" alt="Rapier" height="22" /><br />Rapier3D | <img src="/img/engines/jolt.png" alt="Jolt" height="22" /><br />Jolt | <img src="/img/engines/box3d.svg" alt="Box3D" height="22" /><br />Box3D | <img src="/img/engines/godot.svg" alt="Godot Physics" height="22" /><br />Godot Physics |
|-|-|-|-|-|
| ![queries](/img/benchmarks/3d_query_storm.png) | **5.9&nbsp;ms**<br />1.0&nbsp;cores | 26.4&nbsp;ms<br />1.1&nbsp;cores | 6.7&nbsp;ms<br />1.1&nbsp;cores | 73.3&nbsp;ms<br />1.0&nbsp;cores |
| ![pyramid](/img/benchmarks/3d_pyramid.png) | 14.6&nbsp;ms<br />2.8&nbsp;cores | 26.9&nbsp;ms<br />4.7&nbsp;cores | **13.5&nbsp;ms**<br />2.7&nbsp;cores | 48.0&nbsp;ms<br />1.4&nbsp;cores |
| ![pile](/img/benchmarks/3d_mixed_pile.png) | 11.3&nbsp;ms<br />2.1&nbsp;cores | 13.7&nbsp;ms<br />3.6&nbsp;cores | **9.7&nbsp;ms**<br />2.4&nbsp;cores | 84.9&nbsp;ms<br />1.7&nbsp;cores |
| ![joints](/img/benchmarks/3d_joint_grid.png) | **8.9&nbsp;ms**<br />1.7&nbsp;cores | **unstable**<br />never finishes | 10.3&nbsp;ms<br />1.8&nbsp;cores<br />**unstable** | 26.1&nbsp;ms<br />1.2&nbsp;cores |
| ![smash](/img/benchmarks/3d_smash.png) | 19.1&nbsp;ms<br />2.8&nbsp;cores | 12.1&nbsp;ms<br />5.0&nbsp;cores | **9.6&nbsp;ms**<br />2.9&nbsp;cores | 100&nbsp;ms<br />1.3&nbsp;cores |

| Benchmark | 1st | 2nd | 3rd | 4th |
|-|-|-|-|-|
| Query storm | **Rapier3D** | Box3D 1.12x | Jolt 4.46x | Godot Physics 12.35x |
| Pyramid | **Box3D** | Rapier3D 1.08x | Jolt 1.99x | Godot Physics 3.55x |
| Mixed shape pile | **Box3D** | Rapier3D 1.16x | Jolt 1.41x | Godot Physics 8.73x |
| Joint grid | **Rapier3D** | Box3D 1.15x | Godot Physics 2.92x | Jolt never finishes |
| Smash | **Box3D** | Jolt 1.26x | Rapier3D 1.99x | Godot Physics 10.40x |

Unstable runs, whose times are not comparable: Box3D on the joint grid (infinite displacement).
Jolt does not finish the joint grid within 60&nbsp;s, and Godot Physics does not finish the drop
scene.

### experimental-threads is no longer enabled

Official builds used to enable `experimental-threads` so the physics server could be driven from
other threads. It cost 7-51% depending on the scene, and it turned out to be unnecessary: Godot
already serialises every call onto a single physics thread through `PhysicsServer3DWrapMT` and its
command queue, so the extra synchronisation was protecting a call path that is never concurrent.
Godot Physics, Jolt and Box3D all take the same no-locking approach.

## New features

- **Rope and fixed joints**, in 2D and 3D. Godot has no equivalent of either. [Reference](/docs/reference/joints).
- **Per-body solver iterations**: stabilize one important body without paying for it globally. [Reference](/docs/reference/bodies).
- **Per-joint stiffness and toggling**: `joint_set_softness`, `joint_set_enabled` for breakable constraints. [Reference](/docs/reference/physics-server).
- **Joint warm starting**: stiff joint assemblies converge much better, at no measurable cost.
- **New project settings** for motion recovery, shape casting and query behaviour.

**Full Changelog**: https://github.com/appsinacup/godot-rapier-physics/blob/main/CHANGELOG.md
