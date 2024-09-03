---
sidebar_position: 1
---

# Getting Started

## About this plugin

**Godot Rapier Physics** is a Rust wrapper on top of the [Rapier Lib](https://rapier.rs) written for Godot. **Rapier** is a set of 2D and 3D physics libraries written by [Dimforge](https://dimforge.com).


:::warning

This plugin is still being written and may lack features and performance. For a complete list of what features it has and what is worked on, read [Implementation Progress](progress.md) page.

:::

Get started by **installing the plugin** and activate the new **Physics Server** installed.

## What you'll need

- [Godot](https://godotengine.org/download/) version 4 or above.
- **Rapier** plugin from the Godot Asset Library.

## Install the plugin

First create a new **Godot Project**. Next click on the **AssetLib** tab and search for the **Rapier** addon and click on the version you want.

![installing the plugin](/img/intro/install-addon.png)

:::note

There are 4 versions of the Rapier plugin. One for **2D**, one for **3D**.

For every dimension there is:
- a **faster** version with **parallel SIMD** feature
- a **slower** version with **cross platform determinism**.

The **parallel SIMD** one uses **parallel solving** and **Single instruction, multiple data** (batches multiple instructions into one for faster calculations).

The **cross platform determinism** version supports determistic simulations across multiple systems, but has **NO parallel and NO SIMD** features.

:::

Then click **Download**.

![download plugin](/img/intro/download-addon.png)

and **Install**.

![click install](/img/intro/click-install.png)

:::note

If asked to restart, select yes.

:::

## Activate the Physics Engine

Go to **Project** -> **Project Settings**. Enable the **Advanced Settings** on the top right.

Then go to **Physics/2D** or **Physics/3D**. At the **Physics Engine** dropdown select the **Rapier2D** or **Rapier3D** physics engine.

![activate plugin](/img/intro/activate-plugin.png)

## Web Settings

When exporting for web, you have to enable a few settings, otherwise the whole build will give an error. Go to **Project** -> **Export...** and enable both **Extension Support** and **Thread Support**:

![web](/img/intro/web.png)

Next, you can also enable the **Runnable** option and then click **Run in browser**:

![run-web](/img/intro/run-web.png)


:::warning

Do not install both the 2D and 3D version of Rapier plugin on web. Only one works at a time.

:::