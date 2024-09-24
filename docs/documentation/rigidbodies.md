---
sidebar_position: 3
---

# Rigid Bodies

Configuring rigid bodies can be difficult. This page describes some of the most common configurations.

## Ghost Collisions

Ghost Collisions are collisions that stop objects from moving when intersecting with a static object made out of multiple pieces of geometry (tile sets, polygon).

![ghost collisions](/img/ghost_collisions.gif)

There are 2 things implemented to fix ghost collisions.

1. The first implementation follows the idea of [Brian Semrau - Dealing with Ghost Collisions](https://briansemrau.github.io/dealing-with-ghost-collisions/) article. For a more in-depth explanation read his article.

2. The second one fixes the normals of polygons that have information about points nearby, follows an idea similar to this [box2D Ghost Collisions](https://box2d.org/posts/2020/06/ghost-collisions/) (right now it's implemented just for 3D though).

### Ghost Collisions Fix in modify_contacts

The first fix is to disable the contacts in the [PhysicsHooks::modify_solver_contacts](https://rapier.rs/docs/user_guides/rust/advanced_collision_detection/#contact-modification) event if:

1. The contact normal opposes the player’s velocity (which could cause the player to get caught).
2. The contact distance is smaller than the `physics/rapier/logic/ghost_collision_distance` project setting value. (Note, here we are also taking the velocity in consideration)

In order to activate it set `physics/rapier/logic/ghost_collision_distance` to `1.0` or something bigger.

### Ghost Collisions Side Effects

The side effects of this solution is that objects might pass through each other a bit. If this is not intended you can disable it by setting the `ghost_collision_distance` to 0.

## Continuous Collision Detection

Fast moving rigid bodies might pass through other rigid bodies, unless the **Continuous Collision Detection** is active. However, even then, it will only do 1 extra step. For multiple extra steps, configure the project setting **Max Ccd Sub Steps**: Maximum number of sub steps performed by the solver. By default it's set to 1.

## Shapes getting stuck inside

In some cases, objects might get stuck inside polygons. This happens because of the physics engine trying to push the object right and left and it ends up in same position always. A great read about this is the [Stuck Inside](https://box2d.org/posts/2020/04/stuck-inside/) article from box2d.

![ghost collisions](/img/rigidbodies/stuck.png)

In order to solve this, change the polygon to be formed of Segments instead of Solids, or change the Static Body polygon Radius (`RapierPhysicsServer2D.body_set_extra_param(self.get_rid(), 0, 1.0)`) so that the small objects cannot get inside.