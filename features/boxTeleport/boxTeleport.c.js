// boxTeleport.c.js

let boxTeleport = new ImGui_Var(false);

BoxTeleport.process = function (localPlayer)
{   
    if (!boxTeleport.value)
    {
        return;
    }

    if (!localPlayer)
    {
        return;
    }

    let world = GameObjects.getWorld();

    if (!world)
    {
        return;
    }

    let physicsComponent = GameObjects.getPhysicsComponent();

    if (!physicsComponent)
    {
        return;
    }

    let camera = GameObjects.getCamera();

    if (!camera)
    {
        return;
    }
    
    let triggers = world.triggers_0.triggers_0.array;

    if (triggers && triggers.length != 0)
    {
        for (let i = 0; i < triggers.length; i++)
        {
            if (triggers.at(i).enabled)
            {
                let triggerPosition = triggers.at(i).bonus_0;

                if (!triggerPosition)
                {
                    continue;
                }

                if (!triggerPosition.hasOwnProperty("_bonusMesh_0"))
                {
                    continue;
                }

                triggerPosition = triggerPosition._bonusMesh_0.object3d.aabb;

                if (!triggerPosition)
                {
                    continue;
                }

                physicsComponent.body.state.position.x = triggerPosition.center.x;
                physicsComponent.body.state.position.y = triggerPosition.center.y;
                physicsComponent.body.state.position.z = triggerPosition.maxZ;

                physicsComponent.body.state.orientation.w = Math.sin(-(camera.direction - Math.PI) / 2);
                physicsComponent.body.state.orientation.z = Math.cos(-(camera.direction - Math.PI) / 2);
                physicsComponent.body.state.orientation.x = 0;
                physicsComponent.body.state.orientation.y = 0;
                    
                physicsComponent.body.state.angularVelocity.x = 0;
                physicsComponent.body.state.angularVelocity.y = 0;
                physicsComponent.body.state.angularVelocity.z = 0;

                physicsComponent.body.state.velocity.x = 0;
                physicsComponent.body.state.velocity.y = 0;
                physicsComponent.body.state.velocity.z = 0;
            }
        }
    }
}