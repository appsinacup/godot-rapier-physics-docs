---
sidebar_position: 1
---

# Getting Started

## About this plugin

**Godot Rapier Physics** is a Rust wrapper on top of the [Rapier Lib](https://rapier.rs) written for Godot. **Rapier** is a set of 2D and 3D physics libraries written by [Dimforge](https://dimforge.com).


:::note Features

For a complete list of what features it has and what is worked on, read [Feature List](progress.md) page.

:::

Get started by **installing the plugin** and activate the new **Physics Server** installed.

## What you'll need

- [Godot](https://godotengine.org/download/) version 4.7 or above.
- **Rapier** plugin from the Godot Asset Store.

## Install the plugin from Asset Store

First create a new **Godot Project**. Next click on the **Asset Store** tab and search for the **Rapier** addon and click on the version you want.

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


## Optionally, Install the plugin from GitHub Releases

You can also install the latest release from **GitHub**. These versions are usually newer than the **Asset Store** releases.

In order to install the latest release, simply go to the [Godot Rapier Releases](https://github.com/appsinacup/godot-rapier-physics/releases) page and download the zip for your dimension (eg. **godot-rapier-2d-single.zip**). Make sure to click on the Assets dropdown to see the assets.

![releases github](/img/intro/github-releases.png)

After downloading it, extract the **zip** and you will find an **addons** folder (with a **godot-rapier2d** folder inside it). Copy the addons folder into your godot project (where the **project.godot** file resides).

## Optionally, Install the plugin from GitHub Latest Main

You can also install the latest **main** build from GitHub. These versions are usually newer than the GitHub **releases**, but less stable.

In order to install the latest main build, simply go to the [Godot Rapier Main Actions Tab](https://github.com/appsinacup/godot-rapier-physics/actions?query=branch:main) page, click the first green/passing build:

![main build github](/img/intro/github-main-build.png)

Scroll all the way down to the Artifacts section:

![main build github artifacts](/img/intro/github-main-artifacts.png)


Note, there are a lot of assets for this build, as there are also intermediate assets. The only assets you should download are:

- **godot-rapier-2d-single**
- **godot-rapier-3d-single**

After downloading it, extract the **zip** and you will find an **addons** folder (with a **godot-rapier2d** folder inside it). Copy the addons folder into your godot project (where the **project.godot** file resides).

## Web Settings

When exporting for web, you have to enable a few settings, otherwise the whole build will give an error. Go to **Project** -> **Export...** and enable both **Extension Support** and **Thread Support**:

![web](/img/intro/web.png)

Next, you can also enable the **Runnable** option and then click **Run in browser**:

![run-web](/img/intro/run-web.png)
