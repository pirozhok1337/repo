// other.c.js

otherData =
{
    gravity: new ImGui_Var(-1000),
    noCollision: new ImGui_Var(false),
    speedHack: new ImGui_Var(false),

    rapidUpdateData:
    {
        delay: new ImGui_Var(0),
        timeout: null,
        state: new ImGui_Var(true),
        mply: new ImGui_Var(1)
    }
};

Other.process = function (localPlayer)
{
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

    let speedCharacteristics = GameObjects.getSpeedCharacteristics();

    if (!speedCharacteristics)
    {
        return;
    }

    let maxSpeedSmoother_0 = speedCharacteristics.maxSpeedSmoother_0;

    if (!maxSpeedSmoother_0)
    {
        return;
    }

    let serverUpdates = GameObjects.getServerUpdates();

    if (!serverUpdates)
    {
        return;
    }

    if (otherData.speedHack.value)
    {
        maxSpeedSmoother_0.currentValue = 1e+100;
    }
    else
    {
        maxSpeedSmoother_0.currentValue = maxSpeedSmoother_0.targetValue;
    }

    world.physicsScene_0.gravity.z = otherData.gravity.value;

    if (otherData.noCollision.value)
    {
        physicsComponent.tankCollisionBox.collisionMask = 76;
    }
    else
    {
        physicsComponent.tankCollisionBox.collisionMask = 75;
    }

    if (KeyPressing.isKeyPressed(pingKey) && Utils.isNotOpenChat())
    {
        return;
    }

    if (!otherData.rapidUpdateData.state.value)
    {
        return;
    }

    if (otherData.rapidUpdateData.delay.value === 0)
    {
        for (let i = 0; i < otherData.rapidUpdateData.mply.value; i++)
        {
            serverUpdates.sendState_0(physicsComponent.getInterpolatedBodyState());
        }
    }
    else if (!otherData.rapidUpdateData.timeout)
    {
        otherData.rapidUpdateData.timeout = setTimeout(() => 
        {
            for (let i = 0; i < otherData.rapidUpdateData.mply.value; i++)
            {
                serverUpdates.sendState_0(physicsComponent.getInterpolatedBodyState());
            }

            otherData.rapidUpdateData.timeout = null;
        }, otherData.rapidUpdateData.delay.value);
    }
}