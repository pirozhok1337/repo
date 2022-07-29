// airBreak.c.js

airBreak =
{
    enabled: new ImGui_Var(true),
    isShiftPressed: false,
    state: false,
    airWalk: new ImGui_Var(false),
    speed: new ImGui_Var(70),
    position: { x: 0, y: 0, z: 0 },
    smooth: new ImGui_Var(2)
}

let startSpeed = 
{
    forward: 0,
    right: 0,
    up: 0
};

document.addEventListener('keyup', (e) => 
{
    if (e.keyCode == 16 && e.location == 2 && Utils.isGameReady() && Utils.isNotOpenChat())
    {
        airBreak.isShiftPressed = true;
    }
})

AirBreak.process = function (localPlayer)
{
    if (!airBreak.enabled.value)
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

    let trackedChassis = GameObjects.getTrackedChassis();

    let camera = GameObjects.getCamera();

    if (!camera)
    {
        return;
    }

    let bodies = world.physicsScene_0.bodies_0.array_hd7ov6$_0;

    if (!bodies)
    {
        return;
    }

    if (!airBreak.state.value && trackedChassis)
    {
        trackedChassis.maxRayLength = 50;
        trackedChassis.dampingCoeff = 2000;
        trackedChassis.springCoeff = 16000;
    }

    if (airBreak.isShiftPressed)
    {
        airBreak.isShiftPressed = false;

        airBreak.state = !airBreak.state;

        startSpeed = 
        {
            forward: 0,
            right: 0,
            up: 0
        };

        if (airBreak.state)
        {
            airBreak.position.x = physicsComponent.body.state.position.x;
            airBreak.position.y = physicsComponent.body.state.position.y;
            airBreak.position.z = physicsComponent.body.state.position.z;
        }
        else
        {
            physicsComponent.body.movable = true;
            physicsComponent.body.state.velocity.x = 0;
            physicsComponent.body.state.velocity.y = 0;
            physicsComponent.body.state.velocity.z = 0;

            physicsComponent.body.state.angularVelocity.x = 0;
            physicsComponent.body.state.angularVelocity.y = 0;
            physicsComponent.body.state.angularVelocity.z = 0;
        
            for (let i = 0; i < bodies.length; i++) 
            {
                bodies.at(i).state.velocity.x = 0;
                bodies.at(i).state.velocity.y = 0;
                bodies.at(i).state.velocity.z = 0;

                bodies.at(i).state.angularVelocity.x = 0;
                bodies.at(i).state.angularVelocity.y = 0;
                bodies.at(i).state.angularVelocity.z = 0;

                bodies.at(i).movable = true;
            }
        }
    }

    if (!airBreak.state)
    {
        return;
    }

    let dt = world.physicsScene_0.dt * airBreak.smooth.value;
    let direction = camera.direction;

    if (!airBreak.airWalk.value)
    {
        if (KeyPressing.isKeyPressed(87 /*key: W*/) && Utils.isNotOpenChat())
        {
            startSpeed.forward += (airBreak.speed.value - startSpeed.forward) * dt;

            let position = 
            {
                x: airBreak.position.x + startSpeed.forward * Math.sin(-direction),
                y: airBreak.position.y + startSpeed.forward * Math.cos(-direction),
                z: 0
            };

            if (Utils.isNotKillZone(world, position))
            {
                airBreak.position.x = position.x;
                airBreak.position.y = position.y;
            }
        }
        else
        {
            if (startSpeed.forward > 0)
            {
                startSpeed.forward += (0 - startSpeed.forward) * (dt * 1.3);

                let position = 
                {
                    x: airBreak.position.x + startSpeed.forward * Math.sin(-direction),
                    y: airBreak.position.y + startSpeed.forward * Math.cos(-direction),
                    z: 0
                };
    
                if (Utils.isNotKillZone(world, position))
                {
                    airBreak.position.x = position.x;
                    airBreak.position.y = position.y;
                }
            }
        }
        

        if (KeyPressing.isKeyPressed(83 /*key: S*/) && Utils.isNotOpenChat())
        {
            startSpeed.forward -= (airBreak.speed.value - (-startSpeed.forward)) * dt;

            let position = 
            {
                x: airBreak.position.x + startSpeed.forward * Math.sin(-direction),
                y: airBreak.position.y + startSpeed.forward * Math.cos(-direction),
                z: 0
            };

            if (Utils.isNotKillZone(world, position))
            {
                airBreak.position.x = position.x;
                airBreak.position.y = position.y;
            }
        }
        else
        {
            if (startSpeed.forward < 0)
            {
                startSpeed.forward -= (0 - (-startSpeed.forward)) * (dt * 1.3);

                let position = 
                {
                    x: airBreak.position.x + startSpeed.forward * Math.sin(-direction),
                    y: airBreak.position.y + startSpeed.forward * Math.cos(-direction),
                    z: 0
                };
    
                if (Utils.isNotKillZone(world, position))
                {
                    airBreak.position.x = position.x;
                    airBreak.position.y = position.y;
                }
            }
        }

        if (KeyPressing.isKeyPressed(65 /*key: A*/) && Utils.isNotOpenChat())
        {
            startSpeed.right -= (airBreak.speed.value - (-startSpeed.right)) * dt;

            let position = 
            {
                x: airBreak.position.x + startSpeed.right * Math.sin(-(direction - Math.PI / 2)),
                y: airBreak.position.y + startSpeed.right * Math.cos(-(direction - Math.PI / 2)),
                z: 0
            };

            if (Utils.isNotKillZone(world, position))
            {
                airBreak.position.x = position.x;
                airBreak.position.y = position.y;
            }
        }
        else
        {
            if (startSpeed.right < 0)
            {
                startSpeed.right -= (0 - (-startSpeed.right)) * (dt * 1.3);

                let position = 
                {
                    x: airBreak.position.x + startSpeed.right * Math.sin(-(direction - Math.PI / 2)),
                    y: airBreak.position.y + startSpeed.right * Math.cos(-(direction - Math.PI / 2)),
                    z: 0
                };
    
                if (Utils.isNotKillZone(world, position))
                {
                    airBreak.position.x = position.x;
                    airBreak.position.y = position.y;
                }
            }
        }

        if (KeyPressing.isKeyPressed(68 /*key: D*/) && Utils.isNotOpenChat())
        {
            startSpeed.right += (airBreak.speed.value - startSpeed.right) * dt;

            let position = 
            {
                x: airBreak.position.x + startSpeed.right * Math.sin(-(direction - Math.PI / 2)),
                y: airBreak.position.y + startSpeed.right * Math.cos(-(direction - Math.PI / 2)),
                z: 0
            };

            if (Utils.isNotKillZone(world, position))
            {
                airBreak.position.x = position.x;
                airBreak.position.y = position.y;
            }
        }
        else
        {
            if (startSpeed.right > 0)
            {
                startSpeed.right += (0 - startSpeed.right) * (dt * 1.3);

                let position = 
                {
                    x: airBreak.position.x + startSpeed.right * Math.sin(-(direction - Math.PI / 2)),
                    y: airBreak.position.y + startSpeed.right * Math.cos(-(direction - Math.PI / 2)),
                    z: 0
                };
    
                if (Utils.isNotKillZone(world, position))
                {
                    airBreak.position.x = position.x;
                    airBreak.position.y = position.y;
                }
            }
        }
    }
    

    if (KeyPressing.isKeyPressed(81 /*key: Q*/) && Utils.isNotOpenChat())
    {
        startSpeed.up += (airBreak.speed.value - startSpeed.up) * dt;

        airBreak.position.z += startSpeed.up;
    }
    else
    {
        if (startSpeed.up > 0)
        {
            startSpeed.up += (0 - startSpeed.up) * (dt * 1.3);
            airBreak.position.z += startSpeed.up;
        }
    }

    if (KeyPressing.isKeyPressed(69 /*key: E*/) && Utils.isNotOpenChat())
    {
        startSpeed.up -= (airBreak.speed.value - (-startSpeed.up)) * dt;

        airBreak.position.z += startSpeed.up;
    }
    else
    {
        if (startSpeed.up < 0)
        {
            startSpeed.up -= (0 - (-startSpeed.up)) * (dt * 1.3);
            airBreak.position.z += startSpeed.up;
        }
    }

    if (!airBreak.airWalk.value)
    {
        for (let i = 0; i < bodies.length; i++) 
        {   
            bodies.at(i).state.velocity.x = 0;
            bodies.at(i).state.velocity.y = 0;
            bodies.at(i).state.velocity.z = 0;
    
            bodies.at(i).state.angularVelocity.x = 0;
            bodies.at(i).state.angularVelocity.y = 0;
            bodies.at(i).state.angularVelocity.z = 0;
    
            bodies.at(i).movable = false;
        }

        physicsComponent.body.state.position.x = airBreak.position.x;
        physicsComponent.body.state.position.y = airBreak.position.y;

        physicsComponent.body.state.velocity.x = 0;
        physicsComponent.body.state.velocity.y = 0;
        physicsComponent.body.state.angularVelocity.z = 0;

        if (syncData.deSyncData.state.value && syncData.deSyncData.teleportToRealPosition.value)
        {
            physicsComponent.body.state.orientation.w = syncData.deSyncData.orientation.w;
            physicsComponent.body.state.orientation.z = syncData.deSyncData.orientation.z;
        }
        else
        {
            physicsComponent.body.state.orientation.w = Math.sin(-(camera.direction - Math.PI) / 2);
            physicsComponent.body.state.orientation.z = Math.cos(-(camera.direction - Math.PI) / 2);
        }
    }
    else
    {
        for (let i = 0; i < bodies.length; i++) 
        {
            bodies.at(i).movable = true;
        }

        if (trackedChassis)
        {
            trackedChassis.maxRayLength = 1e+100;
            trackedChassis.dampingCoeff = 0;
            trackedChassis.springCoeff = 0;
        }
    }
    
    physicsComponent.body.state.position.z = airBreak.position.z;

    physicsComponent.body.state.angularVelocity.x = 0;
    physicsComponent.body.state.angularVelocity.y = 0;
    physicsComponent.body.state.velocity.z = 0;

    physicsComponent.body.state.orientation.x = 0;
    physicsComponent.body.state.orientation.y = 0;
}