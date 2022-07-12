// noKnockback.c.js

noKnockbackMply = new ImGui_Var(1);

NoKnockback.init = function (localPlayer)
{
    if (!localPlayer)
    {
        return;
    }

    let physicsComponent = GameObjects.getPhysicsComponent();

    if (!physicsComponent)
    {
        return;
    }

    physicsComponent.body.addWorldForce_f5o1bj$ = function(t, e, n) 
    {
        n *= noKnockbackMply.value;

        var o = n * e.x
          , i = n * e.y
          , r = n * e.z;
        this.forceAccum_0.x = this.forceAccum_0.x + o,
        this.forceAccum_0.y = this.forceAccum_0.y + i,
        this.forceAccum_0.z = this.forceAccum_0.z + r;
        var s = this.state.position
          , a = t.x - s.x
          , c = t.y - s.y
          , u = t.z - s.z;
        this.torqueAccum_0.x = this.torqueAccum_0.x + (c * r - u * i),
        this.torqueAccum_0.y = this.torqueAccum_0.y + (u * o - a * r),
        this.torqueAccum_0.z = this.torqueAccum_0.z + (a * i - c * o)
    }
}