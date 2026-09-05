---
sidebar_position: 8
---

# DotNet
Due to GDExtension limitations, it's not possible to directly call the RapierPhysics functions from C# scripts.

To call RapierPhysics functions in C# you will need to reference the PhysicsServer2/3D singleton and use the "Call" method with desired methods name to use the various RapierPhysicsServer2/3D methods.

For example:
```cs
public partial class ManualPhysicsStepper : Node2D
{
    public override void _Ready()
    {
        Rid space = GetViewport().World2D.Space;
        PhysicsServer3D.SpaceSetActive(space, false);
    }
    public void OnButtonPressed()
    {
        Rid space = GetViewport().World2D.Space;
        float fixedDelta = 1f / ProjectSettings.GetSetting("physics/common/physics_ticks_per_second").AsSingle();
        for(int i = 0; i < 10; i++)
        {
            PhysicsServer2D.Singleton.Call("space_step", space, fixedDelta);
        }
        PhysicsServer2D.Singleton.Call("space_flush_queries", space);
    }
}
```

All method names are listed in the [PhysicsServer Class Reference](../reference/physics-server).