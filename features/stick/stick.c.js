// stick.c.js

stickData = 
{
    state: new ImGui_Var(false),
    temp: false,
    target: null
};

Stick.process = function (localPlayer)
{
    if (!stickData.state.value && stickData.temp == false)
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

    if (!stickData.target)
    {
        return;
    }

    if (!stickData.state.value && stickData.temp == true)
    {
        stickData.temp = false;

        physicsComponent.body.state.velocity.x = 0;
        physicsComponent.body.state.velocity.y = 0;
        physicsComponent.body.state.velocity.z = 0;
        return;
    }

    stickData.temp = true;

    physicsComponent.body.state.position.x = stickData.target.state.position.x;
    physicsComponent.body.state.position.y = stickData.target.state.position.y;
    physicsComponent.body.state.position.z = stickData.target.state.position.z;

    physicsComponent.body.state.orientation.w = stickData.target.state.orientation.w;
    physicsComponent.body.state.orientation.z = stickData.target.state.orientation.z;
    physicsComponent.body.state.orientation.x = stickData.target.state.orientation.x;
    physicsComponent.body.state.orientation.y = stickData.target.state.orientation.y;
                        
    physicsComponent.body.state.angularVelocity.x = 0;
    physicsComponent.body.state.angularVelocity.y = 0;
    physicsComponent.body.state.angularVelocity.z = 0;
        
    physicsComponent.body.state.velocity.x = 0;
    physicsComponent.body.state.velocity.y = 0;
    physicsComponent.body.state.velocity.z = 100000;
}