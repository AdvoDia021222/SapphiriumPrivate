const baseFabricator = extend(UnitFactory, "base-fabricator", {
    envDisabled: Env.scorching
});
const adoptiveReconstructor = extend(Reconstructor, "adoptive-reconstructor", {
    envDisabled: Env.scorching
});
const logicEncoder = extend(Reconstructor, "logic-encoder", {
    envDisabled: Env.scorching
});
const electronicModifier = extend(Reconstructor, "electronic-modifier", {
    envDisabled: Env.scorching
});
const innardDecrypter = extend(Reconstructor, "innard-decrypter", {
    envDisabled: Env.scorching
});

const regen = extend(ParticleEffect, {
	region: "sapphirium-rhombus",
	length: 0,
	sizeFrom: 4,
	sizeTo: 0,
	lifetime: 35,
	colorFrom: Pal.heal,
	colorTo: Pal.heal,
	particles: 1
});

const regeneration = extend(StatusEffect, "regeneration", {
	speedMultiplier: 1.35,
	damageMultiplier: 1.35,
	relooadMultiplier: 1.35,
	healthMultiplier: 0.7,
	damage: -0.2,
	effect: regen,
	effectChance: 0.07,
	color: Pal.heal,
});

var range = 100;
var reload = 350;
var activeEffect = Fx.healWaveDynamic;
var timer = 1;
var RepairStatusFieldAbility = extend(Ability, {
	update(unit) {
        timer += Time.delta;

        if(timer >= reload) {
            var wasHealed = false;

            Units.nearby(unit.team, unit.x, unit.y, range, other => {
                if(other.damaged()) {
                    wasHealed = true;
                    other.apply(regeneration, 350);
                }
            })
            if(wasHealed) {
                activeEffect.at(unit, range);
            }
            timer = 0;
        }
    },
    addStats(t) {
        t.add("[lightgray]" + Stat.reload.localized() + ": [white]" + Strings.autoFixed(60 / reload, 2) + " " + StatUnit.perSecond.localized());
        t.row();
        t.add("[lightgray]" + Stat.shootRange.localized() + ": [white]" +  Strings.autoFixed(range / Vars.tilesize, 2) + " " + StatUnit.blocks.localized());
        t.row();
        t.add(regeneration.emoji() + " " + regeneration.localizedName);
    },
    localized() {
        return Core.bundle.get("ability." + "repairstatusfield");
    }
});

const amplifyingDrone = extend(UnitType, "amplifying-drone", {});
amplifyingDrone.abilities.add(RepairStatusFieldAbility);
amplifyingDrone.immunities.add(regeneration);
amplifyingDrone.constructor = () => extend(BuildingTetherPayloadUnit, {});

const amplifyingDroneFactory = extend(DroneCenter, "amplifying-drone-factory", {
	status: StatusEffects.none,
	droneRange: 140,
	droneConstructTime: 60,
	init() {
		this.super$init();
		this.droneType.aiController = () => extend(FlyingAI, {});
	},
});