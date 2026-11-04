---
slug: 2026-updates
title: '2026 Updates'
date: 2026-11-04
authors: 
  - name: Apps in a Cup
    url: https://github.com/appsinacup
    image_url: https://github.com/appsinacup.png
tags: [changelog]
---

Godot Rapier had 14 releases this year, from v0.8.25 to [v0.35](/blog/v0-35-0). New: Rapier 0.35, Godot 4.7, rope and fixed joints, cross platform determinism fixes, and benchmarks against Box2D, Jolt and Box3D.

<!-- truncate -->

## Rapier 0.35 and benchmarks

The addon now runs on **Rapier 0.35**. Both 2D and 3D builds always have the **parallel SIMD** solver and **cross platform determinism** enabled.

We compared it with Box2D, Jolt, Box3D and Godot Physics across ten scenes. In 3D, Rapier is first on queries and joints. In 2D, it is the only engine that keeps every scene stable. The [v0.35 post](/blog/v0-35-0) has all the numbers, and the [benchmarks repo](https://github.com/Ughuuu/benchmarks-repo) has the tests.

![The 3D pyramid benchmark](/img/benchmarks/3d_pyramid.png)

![The 2D smash benchmark](/img/benchmarks/2d_smash.png)

## New features

- **Rope and fixed joints**, in 2D and 3D
- **Per-body solver iterations**
- **Per-joint stiffness and toggling**
- **Joint warm starting**
- **Motor position targeting** on joints
- **State integrate forces**
- **New project settings** for motion recovery, shape casting and query behaviour

## Determinism

- Fixed 2D cross platform determinism
- Added cross platform determinism tests
- Saved state congruence
- Fixed a state manager crash on Mac ARM

## Godot versions

- Updated to **Godot 4.6** and **Godot 4.7**
- Updated to the latest godot-rust, Rapier and Parry along the way

## Fixes

- Fixed 3D joint poses, the 6DOF motor position and limits, and the HingeJoint3D axis
- Fixed PinJoint2D softness to match Godot
- Fixed 2D contacts and shape cast queries
- Fixed the center of mass for forces applied at points
- Fixed Area2D monitorable, the pickable property and freeze mode
- Fixed crashes on startup and on server reload

## Balaur

We also [announced Balaur](/blog/balaur-engine), a game engine built around Rapier together with Sébastien Crozet, the author of Rapier.

## Thanks

Thanks to everyone who contributed this year: Schnorg, RaphaelLEMAS, jauwnio, Kyzzsa, dog-molecule, LeaoLuciano and Ardot66.

:::note Learn how to install
  Read the [Getting Started](https://godot.rapier.rs/docs/intro#install-the-plugin-from-assetlib) documentation.
  Join the conversation on [Discord](https://discord.gg/v649emcpAu).
:::
