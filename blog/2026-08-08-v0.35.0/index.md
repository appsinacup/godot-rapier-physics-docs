---
slug: v0-35-0
title: 'v0.35.0 - Rapier vs Box2D vs Jolt vs Box3D'
date: 2026-08-08
authors: 
  - name: Apps in a Cup
    url: https://github.com/appsinacup
    image_url: https://github.com/appsinacup.png
tags: [changelog, release]
---

Godot Rapier now runs on **Rapier 0.35**.

Both 2D and 3D builds now always have **parallel SIMD** solver and **cross platform determinism** enabled.

### 2D: Rapier vs Box2D

Rapier is the only engine that keeps every scene stable: Box2D collapses the pyramid and blows the joints apart, those are marked as unstable.
- Issue on godot-box2d-v3 side: [godot-box2d-v3/issues/9](https://github.com/Pizzaandy/godot-box2d-v3/issues/9) [godot-box2d-v3/issues/8](https://github.com/Pizzaandy/godot-box2d-v3/issues/8)

| Engine | Version | Addon |
|-|-|-|
| <img src="/img/engines/rapier.svg" alt="Rapier" height="22" /> [**Rapier2D**](https://github.com/dimforge/rapier) | v0.35 | [godot-rapier2d](https://github.com/appsinacup/godot-rapier-physics) |
| <img src="/img/engines/box2d.svg" alt="Box2D" height="22" /> [**Box2D**](https://github.com/erincatto/box2d) | v3.1 | [godot-box2d-v3](https://github.com/Pizzaandy/godot-box2d-v3) |

| Engine | <img src="/img/engines/rapier.svg" alt="Rapier" height="22" /><br />Rapier2D | <img src="/img/engines/box2d.svg" alt="Box2D" height="22" /><br />Box2D |
|-|-|-|
| ![pyramid](/img/benchmarks/2d_pyramid.png) | **16&nbsp;ms**<br />1.8&nbsp;cores | 17&nbsp;ms<br />4.1&nbsp;cores<br />**unstable** |
| ![smash](/img/benchmarks/2d_smash.png) | **8&nbsp;ms**<br />2.2&nbsp;cores | 9&nbsp;ms<br />4.4&nbsp;cores |
| ![pile](/img/benchmarks/2d_mixed_pile.png) | 7&nbsp;ms<br />2.0&nbsp;cores | **6&nbsp;ms**<br />3.2&nbsp;cores |
| ![queries](/img/benchmarks/2d_query_storm.png) | 5.5&nbsp;ms<br />1.2&nbsp;cores | **3.9&nbsp;ms**<br />1.8&nbsp;cores |
| ![joints](/img/benchmarks/2d_joint_grid.png) | **6.4&nbsp;ms**<br />1.6&nbsp;cores | 3.8&nbsp;ms<br />2.8&nbsp;cores<br />**unstable** |

| Benchmark | Conclusion |
|-|-|
| Pyramid | **Rapier hold the pyramid stable**, 2.3x fewer cores. Box2D collapses, unstable |
| Smash | **Rapier 1.13x faster**, 2.0x fewer cores |
| Mixed shape pile | **Box2D 1.23x faster**, Rapier 1.6x fewer cores |
| Query storm | **Box2D 1.42x faster**, Rapier 1.5x fewer cores |
| Joint grid | **Rapier holds the joints together**; Box2D explodes, unstable |

### 3D: Rapier vs Jolt vs Box3D

Rapier3D is fastest on three of five scenes and 4x ahead on queries; Jolt crashes the joint grid. Box3D is single threaded (issue on godot-box3d side).

| Engine | Version | Addon |
|-|-|-|
| <img src="/img/engines/rapier.svg" alt="Rapier" height="22" /> [**Rapier3D**](https://github.com/dimforge/rapier) | v0.35 | [godot-rapier3d](https://github.com/appsinacup/godot-rapier-physics) |
| <img src="/img/engines/jolt.png" alt="Jolt" height="22" /> [**Jolt**](https://github.com/jrouwe/JoltPhysics) | v5.5.0 | ships with Godot v4.7 |
| <img src="/img/engines/box3d.svg" alt="Box3D" height="22" /> [**Box3D**](https://github.com/erincatto/box3d) | v0.1 | [godot-box3d](https://github.com/bearlikelion/godot-box3d) v0.2.3 |

| | <img src="/img/engines/rapier.svg" alt="Rapier" height="22" /><br />Rapier3D | <img src="/img/engines/jolt.png" alt="Jolt" height="22" /><br />Jolt | <img src="/img/engines/box3d.svg" alt="Box3D" height="22" /><br />Box3D |
|-|-|-|-|
| ![queries](/img/benchmarks/3d_query_storm.png) | **5.6&nbsp;ms**<br />1.1&nbsp;cores | 22&nbsp;ms<br />1.2&nbsp;cores | 6.3&nbsp;ms<br />1.0&nbsp;cores |
| ![pyramid](/img/benchmarks/3d_pyramid.png) | **19&nbsp;ms**<br />3.4&nbsp;cores | 24&nbsp;ms<br />5.6&nbsp;cores | 25&nbsp;ms<br />0.9&nbsp;cores |
| ![pile](/img/benchmarks/3d_mixed_pile.png) | **10&nbsp;ms**<br />2.5&nbsp;cores | 11&nbsp;ms<br />5.1&nbsp;cores | 14&nbsp;ms<br />1.0&nbsp;cores |
| ![joints](/img/benchmarks/3d_joint_grid.png) | **11.4&nbsp;ms**<br />2.3&nbsp;cores | **unstable**<br />never finishes | 11.2&nbsp;ms<br />1.0&nbsp;cores |
| ![smash](/img/benchmarks/3d_smash.png) | 12&nbsp;ms<br />2.9&nbsp;cores | **11&nbsp;ms**<br />5.0&nbsp;cores | 17&nbsp;ms<br />1.0&nbsp;cores |

| Benchmark | Conclusion |
|-|-|
| Query storm | **Rapier 4.0x faster than Jolt**, on par with Box3D |
| Pyramid | **Rapier 1.22x faster than Jolt, 1.27x than Box3D** |
| Mixed shape pile | **Rapier 1.12x faster than Jolt, 1.37x than Box3D** |
| Joint grid | Rapier and Box3D tie; **Jolt unstable**, never finishes |
| Smash | **Jolt 1.05x faster**, using 1.7x more cores |

### Building without experimental-threads

Official builds enable `experimental-threads` so the physics server can be driven from other threads. It costs 7-51% depending on the scene, so building from source without it is faster:

| Benchmark | Without threads | Official build | |
|-|-|-|-|
| 2D box pyramid | **16.4 ms** | 18.2 ms | 11% faster |
| 2D mixed pile | **6.9 ms** | 8.0 ms | 17% faster |
| 2D joint grid | **6.4 ms** | 7.4 ms | 15% faster |
| 3D box pyramid | **19.4 ms** | 20.7 ms | 7% faster |
| 3D smash | **12.0 ms** | 18.1 ms | 51% faster |
| 3D query storm | **5.6 ms** | 8.0 ms | 43% faster |

## New features

- **Rope and fixed joints**, in 2D and 3D. Godot has no equivalent of either. [Reference](/docs/reference/joints).
- **Per-body solver iterations**: stabilize one important body without paying for it globally. [Reference](/docs/reference/bodies).
- **Per-joint stiffness and toggling**: `joint_set_softness`, `joint_set_enabled` for breakable constraints. [Reference](/docs/reference/physics-server).
- **Joint warm starting**: stiff joint assemblies converge much better, at no measurable cost.
- **New project settings** for motion recovery, shape casting and query behaviour.

**Full Changelog**: https://github.com/appsinacup/godot-rapier-physics/blob/main/CHANGELOG.md
