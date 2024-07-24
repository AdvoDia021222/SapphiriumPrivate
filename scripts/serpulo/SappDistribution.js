const strongConveyor = extend(Conveyor, "strong-conveyor", {});
const strongRouter = extend(Router, "strong-router", {});
const strongJunction = extend(Junction, "strong-junction", {});
const creostoneConveyor = extend(Conveyor, "creostone-conveyor", {});
const creostoneRouter = extend(Router, "creostone-router", {});
const creostoneJunction = extend(Junction, "creostone-junction", {});
const creostoneBridgeConveyor = extend(BufferedItemBridge, "creostone-bridge-conveyor", {});
const globiumConveyor = extend(ArmoredConveyor, "globium-conveyor", {});
const globiumStackConveyor = extend(StackConveyor, "globium-stack-conveyor", {
	speed: 6 / 60
});

const massBullet = extend(MassDriverBolt, {
	draw(b) {
		var w = 0.001;
		var h = 0.001;

        Draw.color(Pal.bulletYellowBack);
        Draw.rect("sapphirium-none-bullet-back", b.x, b.y, w, h, b.rotation() + 90);

        Draw.color(Pal.bulletYellow);
        Draw.rect("sapphirium-none-bullet", b.x, b.y, w, h, b.rotation() + 90);

        Draw.reset();
    },
    despawnEffect: Fx.none,
    hitEffect: Fx.none,
    collides: false,
});

const compactMassDriver = extend(MassDriver, "compact-driver", {});
compactMassDriver.bullet = extend(MassDriverBolt, {});
const teleporter = extend(MassDriver, "teleporter", {
    bullet: massBullet,
    envDisabled: Env.scorching
});