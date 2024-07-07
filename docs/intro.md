---
sidebar_position: 1
---

# Getting Started

Get started by **installing the plugin** and activate the new **Physics Server** installed.

## What you'll need

- [Godot](https://godotengine.org/download/) version 4 or above.
- **Rapier** plugin from the Godot Asset Library.

:::note

There are 4 versions of the Rapier plugin. One for **2D**, one for **3D**. And for every dimension there is one for **cross platform determinism** and one with **parallel and SIMD** feature. If in doubt use the **parallel and SIMD** one as it's going to be faster.

:::


## Install the plugin

First create a new **Godot Project**. Next click on the **AssetLib** tab and search for the **Rapier** addon and click on the version you want.

![installing the plugin](/img/intro/install-addon.png)

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
