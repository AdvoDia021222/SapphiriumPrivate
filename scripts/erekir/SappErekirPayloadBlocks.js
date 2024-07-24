const difference = extend(ErekirUnitType, "difference", {
});
difference.constructor = () => extend(BuildingTetherPayloadUnit, {});

const differenceFactory = extend(DroneCenter, "difference-factory", {
	status: StatusEffects.none,
	squareSprite: false,
	droneRange: 140,
	init() {
		this.super$init();
		this.droneType.aiController = () => extend(FlyingAI, {});
	},
});