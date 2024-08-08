---
sidebar_position: 3
---

# Ghost Collisions

Ghost Collisions are collisions that stop objects from moving when intersecting with a static object made out of multiple pieces of geometry (tilesets, polygon).

![ghost collisions](/img/ghost_collisions.gif)

This implementation follows the idea of [Brian Semrau - Dealing with Ghost Collisions](https://briansemrau.github.io/dealing-with-ghost-collisions/) article. For a more in-depth explanation read his article.

## Ghost Collisions Fix

The fix is to disable the contacts in the [PhysicsHooks::modify_solver_contacts](https://rapier.rs/docs/user_guides/rust/advanced_collision_detection/#contact-modification) event if:

1. The contact normal opposes the player’s velocity (which could cause the player to get caught).
2. The contact distance is smaller than the `physics/rapier/logic/ghost_collision_distance` project setting value. (Note, here we are also taking the velocity in consideration)

This solution works because these contacts are generally small enough to not cause problems.

## Side Effects

The side effects of this solution is that objects might pass through each other a bit. If this is not intended you can disable it by setting the `ghost_collision_distance` to 0.