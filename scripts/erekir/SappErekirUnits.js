const statuses = require("SappStatuses");

//Faith faction
const phenomenon = extend(ErekirUnitType, "phenomenon", {});
phenomenon.constructor = () => extend(LegsUnit, {});

const loyalty = extend(ErekirUnitType, "loyalty", {});
loyalty.constructor = () => extend(LegsUnit, {});

const cult = extend(ErekirUnitType, "cult", {});
cult.constructor = () => extend(LegsUnit, {});

const penance = extend(ErekirUnitType, "penance", {});
penance.constructor = () => extend(LegsUnit, {});

const milestone = extend(ErekirUnitType, "milestone", {});
milestone.constructor = () => extend(LegsUnit, {});

//Hunters faction
const hound = extend(ErekirUnitType, "hound", {});
hound.constructor = () => extend(MechUnit, {});

const wildness = extend(ErekirUnitType, "wildness", {});
wildness.constructor = () => extend(LegsUnit, {});

const hunt = extend(ErekirUnitType, "hunt", {});
hunt.constructor = () => extend(MechUnit, {});

const houndSpawnerBullet = extend(BasicBulletType, {
    width: 16,
    height: 16,
    sprite: "large-orb",
    speed: 0,
    damage: 0,
    lifetime: 10,
    shrinkX: -0.7,
    shrinkY: -0.7,
    collides: false,
    collidesTiles: false,
    hittable: false,
    absorbable: false,
    reflectable: false,
    hitEffect: Fx.none,
    despawnEffect: Fx.spawn,
    despawnSound: Sounds.respawn,
    despawnUnit: hound,
    despawnUnitCount: 2,
    despawnUnitRadius: 8,
    shootEffect: Fx.none,
    smokeEffect: Fx.none
});

var despawnUnit = new Stat("despawnunit", StatCat.function);
/*var amount = new Stat("amount");*/
const houndSpawner = extend(Weapon, "hound-spawner", {
	x: 0,
	y: -12.5,
	reload: 1200,
	recoil: 0,
    mirror: false,
    alternate: false,
    ejectEffect: Fx.none,
    shootSound: Sounds.none,
    alwaysShooting: true,
    bullet: houndSpawnerBullet,
    addStats(u, t) {
        this.super$addStats(u, t);
        t.add("[accent]" + despawnUnit.localized() + ":" + " " + "[white]" + 2 + " " + hound.localizedName);
        t.row();
        t.image(hound.uiIcon).size(40).center().scaling(Scaling.fit);
	}
});

const waveEffect = extend(WaveEffect, {
    sizeTo: 12,
    strokeFrom: 1,
    lifetime: 24,
    colorFrom: Color.valueOf("ffe18f"),
    colorTo: Color.valueOf("ffe18f"),
});

const particleEffect = extend(ParticleEffect, {
    particles: 1,
    cone: 360,
    length: 0,
    sizeFrom: 6,
    sizeTo: 0,
    lifetime: 30,
    colorFrom: Color.valueOf("ffe18f"),
    colorTo: Color.valueOf("574F00"),
    region: "sapphirium-rhombus"
});

const particleEffect2 = extend(ParticleEffect, {
    startDelay: 12,
    particles: 1,
    cone: 360,
    length: 0,
    sizeFrom: 4,
    sizeTo: 0,
    lifetime: 15,
    colorFrom: Color.white,
    colorTo: Color.valueOf("EBD700"),
    region: "sapphirium-rhombus"
});

const waveEffect2 = extend(WaveEffect, {
    sizeTo: 8,
    strokeFrom: 1,
    lifetime: 30,
    colorFrom: Color.valueOf("ffe18f"),
    colorTo: Color.valueOf("ffe18f"),
});

const particleEffect3 = extend(ParticleEffect, {
    particles: 1,
    cone: 360,
    length: 0,
    sizeFrom: 7,
    sizeTo: 0,
    lifetime: 60,
    colorFrom: Color.valueOf("ffe18f"),
    colorTo: Color.valueOf("574F00"),
    region: "sapphirium-rhombus"
});

const particleEffect4 = extend(ParticleEffect, {
    startDelay: 25,
    particles: 1,
    cone: 360,
    length: 0,
    sizeFrom: 5,
    sizeTo: 0,
    lifetime: 30,
    colorFrom: Color.white,
    colorTo: Color.white,
    region: "sapphirium-rhombus"
});

const raptorShotgunBullet = extend(BasicBulletType, 8, 66, "sapphirium-laser-bullet", {
    width: 14,
    height: 20,
    lifetime: 24,
    homingPower: 0.05,
    homingRange: 46,
    backColor: Color.valueOf("ffe18f"),
    hitColor: Color.valueOf("ffe18f"),
    frontColor: Color.white,
    trailColor: Color.valueOf("ffe18f"),
    trailWidth: 2,
    trailLength: 4,
    shootEffect: Fx.shootBigColor,
    status: statuses.deepWounds,
    statusDuration: 120,
    smokeEffect: Fx.shootSmokeSquareSparse,
    despawnEffect: new MultiEffect(waveEffect, particleEffect, particleEffect2),
    hitEffect: new MultiEffect(waveEffect2, particleEffect3, particleEffect4),
});

const raptorShotgun = extend(Weapon, "sapphirium-raptor-shotgun", {
    x: -15.75,
    y: 0.75,
    top: false,
    mirror: false,
    shootSound: Sounds.shootAltLong,
    ejectEffect: Fx.casing3,
    recoil: 6,
    reload: 120,
    velocityRnd: 0.7,
    xRand: 3,
    shoot: new ShootSpread(10, 2),
    bullet: raptorShotgunBullet
});

const wave = extend(WaveEffect, {
    sides: 0,
    sizeFrom: 0,
    sizeTo: 56,
    strokeFrom: 3,
    strokeTo: 0,
    lifetime: 30,
    colorFrom: Color.valueOf("eb6550"),
    colorTo: Color.valueOf("eb6550"),
});

const emp = extend(EmpBulletType, {
    width: 14,
    height: 14,
    radius: 56,
    damage: 0,
    speed: 0,
    sprite: "circle-bullet",
    backColor: Color.valueOf("eb6550"),
    frontColor: Color.valueOf("eb8778"),
    hitColor: Color.valueOf("eb6550"),
    hitEffect: wave,
    despawnEffect: wave,
    collidesAir: true,
    collidesGround: true,
    shrinkX: 0,
    shrinkY: 0,

    removed(b) {
        this.super$removed(b);
        Damage.status(Team.derelict, b.x, b.y, 56, statuses.unleash, 420, this.collidesAir, this.collidesGround);
    }
});

//for stats only
const empP = extend(EmpBulletType, {
    width: 14,
    height: 14,
    radius: 56,
    damage: 0,
    speed: 0,
    collidesAir: true,
    collidesGround: true,
    status: statuses.unleash,
    statusDuration: 420
});

const raptorArtilleryBullet = extend(ArtilleryBulletType, {
    width: 28,
    height: 28,
    lifetime: 110,
    speed: 1.3,
    damage: 220,
    sprite: "shell",
    splashDamage: 220,
    splashDamageRadius: 56,
    backColor: Color.valueOf("ffe18f"),
    hitColor: Color.valueOf("ffe18f"),
    trailColor: Color.valueOf("ffe18f"),
    frontColor: Color.white,
    trailLength: 27,
    trailWidth: 3,
    hitEffect: Fx.blastExplosion,
    despawnEffect: Fx.blastExplosion,
    despawnUnit: wildness,
    fragBullets: 1,
    fragBullet: emp,
    fragRandomSpread: 0,
});

const raptorArtillery = extend(Weapon, "sapphirium-raptor-artillery", {
    x: 15,
    y: 0.75,
    top: false,
    mirror: false,
    shootSound: Sounds.artillery,
    ejectEffect: Fx.casing3,
    recoil: 5,
    reload: 1200,
    recoilTime: 800,
    cooldownTime: 1200,
    bullet: raptorArtilleryBullet,
    addStats(u, t) {
        this.super$addStats(u, t);
        StatValues.ammo(ObjectMap.of(u, empP)).display(t);
        t.row();
        t.add("[accent]" + despawnUnit.localized() + ":" + " " + "[white]" + 1 + " " + wildness.localizedName);
        t.row();
        t.image(wildness.uiIcon).size(40).center().scaling(Scaling.fit);
    }
});


const raptor = extend(ErekirUnitType, "raptor", {});
raptor.constructor = () => extend(MechUnit, {});
raptor.weapons.addAll(houndSpawner, raptorShotgun, raptorArtillery);

//Ghosts
const mainWeaponBullet = extend(BasicBulletType, {
    width: 6,
    height: 12,
    speed: 8,
    lifetime: 18,
    damage: 22,
    buildingDamageMultiplier: 0.33,
    pierce: true,
    pierceBuilding: true,
    backColor: Color.valueOf("ff6e6e"),
    hitColor: Color.valueOf("ff6e6e"),
    trailColor: Color.valueOf("ff6e6e"),
    frontColor: Color.white,
    trailWidth: 1.2,
    trailLength: 18,
    hitEffect: Fx.hitBulletColor,
    despawnEffect: Fx.hitBulletColor,
    shootEffect: Fx.shootSmallColor,
    smokeEffect: Fx.shootSmallSmoke,
});

const presenceMainWeapon = extend(Weapon, "presence-main-weapon", {
    x: 0,
    y: 0,
    shootY: 0.5,
    reload: 20,
    recoil: 0,
    ejectEffect: Fx.none,
    mirror: false,
    bullet: mainWeaponBullet
});

const blurWeaponBullet = extend(BasicBulletType, {
    width: 0,
    height: 0,
    speed: 8,
    damage: 0,
    lifetime: 10,
    hitEffect: Fx.none,
    despawnEffect: Fx.none,
    shootEffect: Fx.none,
    smokeEffect: Fx.none,
    collides: false,
    collidesGround: false,
    collidesAir: false,
    collidesTiles: false,
    scaleLife: true,
});

const blurWeapon = extend(Weapon, "blur-weapon", {
    x: 0,
    y: 0,
    mirror: false,
    reload: 20,
    recoil: 0,
    ejectEffect: Fx.none,
    shootSound: Sounds.none,
    shootStatus: statuses.blur,
    shootStatusDuration: 20,
    display: false,
    bullet: blurWeaponBullet,
    alwaysShooting: true
});

const wraithWeaponBullet = extend(BasicBulletType, {
    width: 8,
    height: 8,
    speed: 5,
    damage: 0,
    lifetime: 6,
    sprite: "sapphirium-none-bullet",
    hitEffect: Fx.none,
    despawnEffect: Fx.none,
    shootEffect: Fx.none,
    smokeEffect: Fx.none,
    maxRange: 30
});

const presenceWraithWeapon = extend(Weapon, "presence-wraith-weapon", {
    x: 0,
    y: 0,
    mirror: false,
    rotate: true,
    reload: 10,
    recoil: 0,
    ejectEffect: Fx.none,
    shootSound: Sounds.missile,
    shootStatus: statuses.wraith,
    shootStatusDuration: 120,
    display: false,
    bullet: wraithWeaponBullet,
    controllable: false,
    autoTarget: true,
});
	
const presence = extend(ErekirUnitType, "presence", {
    health: 0.9,
    armor: 6,
    speed: 2,
    rotateSpeed: 6,
    flying: true,
    drag: 0.07,
    accel: 0.09,
    hitSize: 9,
    engineSize: 0,
    trailLength: 10,
    lowAltitude: true,
    range: 72
});
presence.constructor = () => extend(UnitEntity, {});
presence.weapons.addAll(presenceMainWeapon, blurWeapon, presenceWraithWeapon);
presence.setEnginesMirror(
    UnitType.UnitEngine(20 / 4, -19 / 4, 2.5, 315)
);

const apparitionPin = extend(BasicBulletType, {
    speed: 5.3,
    width: 5,
    height: 12,
    knockback: 4,
    damage: 30,
    buildingDamageMultiplier: 1.2,
    backColor: Color.valueOf("ff6e6e"),
    frontColor: Color.white,
    hitColor: Color.valueOf("ff6e6e"),
    hitEffect: Fx.hitBulletColor,
    despawnEffect: Fx.hitBulletColor,
    sprite: "sapphirium-pin",
    lifetime: 21.15,
});

const apparitionWeapon = extend(Weapon, "apparition-weapon", {
    x: 0,
    y: 0,
    shootY: 0,
    reload: 16,
    recoil: 0,
    mirror: false,
    ejectEffect: Fx.none,
    bullet: apparitionPin
});

const apparitionPart = extend(RegionPart, {
    suffix: "-engine-bottom",
    mirror: false,
    layerOffset: -0.3,
});

const apparition = extend(ErekirUnitType, "apparition", {
    health: 1.4,
    armor: 7,
    speed: 2.3,
    lowAltitude: true,
    rotateSpeed: 4,
    flying: true,
    drag: 0.07,
    accel: 0.09,
    hitSize: 14,
    engineOffset: 8.75,
    engineLayer: 89.8,
    engineSize: 3.5,
    range: 112
});
apparition.constructor = () => extend(UnitEntity, {});
apparition.immunities.add(statuses.unleash);
apparition.parts.add(apparitionPart);
apparition.weapons.addAll(apparitionWeapon, blurWeapon, presenceWraithWeapon);

const gripperPin = extend(BasicBulletType, {
    speed: 5.3,
    width: 9,
    height: 16,
    knockback: 3.5,
    shrinkY: 0,
    shrinkX: 0,
    trailWidth: 1.2,
    trailLength: 100,
    weaveMag:  1,
    weaveScale: 4,
    damage: 65,
    buildingDamageMultiplier: 1.5,
    backColor: Color.valueOf("ff6e6e"),
    frontColor: Color.white,
    hitColor: Color.valueOf("ff6e6e"),
    trailColor: Color.valueOf("ff6e6e"),
    hitEffect: Fx.hitBulletColor,
    despawnEffect: Fx.hitBulletColor,
    sprite: "sapphirium-pin",
    lifetime: 28.68,
    status: StatusEffects.slow,
    statusDuration: 120
});

const gripperWeapon = extend(Weapon, "sapphirium-gripper-weapon", {
    x: 30 / 4,
    y: -15 / 4,
    shootY: 0,
    reload: 30,
    recoil: 3,
    mirror: true,
    rotate: true,
    rotateSpeed: 5,
    ejectEffect: Fx.none,
    bullet: gripperPin,
    shootSound: Sounds.bolt
});

const gripperShell = extend(BasicBulletType, {
    speed: 11,
    width: 4,
    height: 11,
    pierce: true,
    pierceBuilding: true,
    damage: 95,
    buildingDamageMultiplier: 0.45,
    backColor: Color.valueOf("ff6e6e"),
    frontColor: Color.white,
    hitColor: Color.valueOf("ff6e6e"),
    hitEffect: Fx.hitBulletColor,
    despawnEffect: Fx.hitBulletColor,
    sprite: "shell",
    lifetime: 22,
    weaveMag: 1,
    weaveScale: 6,
    status: StatusEffects.slow,
    statusDuration: 120,
    shrinkY: 0,
    shrinkX: 0,
    trailWidth: 1.1,
    trailLength: 400,
    trailColor: Color.valueOf("ff6e6e"),
});

const gripperCenterWeapon = extend(Weapon, "gripper-center-weapon", {
    x: 0,
    y: 12 / 4,
    shootY: 0,
    reload: 60,
    recoil: 0,
    mirror: false,
    ejectEffect: Fx.none,
    bullet: gripperShell,
    shootSound: Sounds.bolt
});

const gripperWraithBullet = extend(BasicBulletType, {
    width: 8,
    height: 8,
    speed: 5,
    damage: 0,
    sprite: "sapphirium-none-bullet",
    lifetime: 19.2,
    hitEffect: Fx.none,
    despawnEffect: Fx.none,
    shootEffect: Fx.none,
    smokeEffect: Fx.none,
    maxRange: 96
});

const gripperWraithWeapon = extend(Weapon, "gripper-wraith-weapon", {
    x: 0,
    y: 0,
    mirror: false,
    rotate: true,
    reload: 10,
    recoil: 0,
    ejectEffect: Fx.none,
    shootSound: Sounds.missile,
    shootStatus: statuses.wraith,
    shootStatusDuration: 120,
    display: false,
    bullet: gripperWraithBullet,
    controllable: false,
    autoTarget: true,
});

const gripper = extend(ErekirUnitType, "gripper", {
	health: 7400,
	armor: 16,
	speed: 2,
	drag: 0.07,
	accel: 0.09,
	rotateSpeed: 3,
	flying: true,
	lowAltitude: true,
    range: 152,
    engineOffset: 50 / 4,
    engineSize: 12 / 4,
    hitSize: 25
});
gripper.constructor = () => extend(UnitEntity, {});
gripper.immunities.add(statuses.unleash);
gripper.weapons.addAll(gripperWeapon, gripperCenterWeapon, blurWeapon, gripperWraithWeapon);
gripper.setEnginesMirror(
    UnitType.UnitEngine(35 / 4, -47 / 4, 12 / 4, 315),
    UnitType.UnitEngine(54 / 4, -26 / 4, 12 / 4, 315)
);

//4
const oozeAoEWave = extend(WaveEffect, {
    lifetime: 23,
    sizeTo: 100,
    strokeTo: 3,
    colorFrom: Color.valueOf("ff6e6e"),
    colorTo: Color.valueOf("ff6e6e00")
});

const oozeOrbTrail = extend(ParticleEffect, {
    particles: 1,
    length: 0,
    region: "sapphirium-double-trail",
    lifetime: 19,
    sizeFrom: 14,
    baseRotation: 90,
    rotWithParent: true,
    sizeTo: 5,
    colorFrom: Color.valueOf("ff6e6e"),
    colorTo: Color.valueOf("ff6e6e00")
});

const oozeOrb = extend(BasicBulletType, {
    speed: 6,
    width: 8,
    height: 8,
    knockback: 2.7,
    shrinkY: 0,
    shrinkX: 0,
    trailWidth: 2,
    trailLength: 100,
    damage: 65,
    trailRotation: true,
    buildingDamageMultiplier: 1.2,
    backColor: Color.valueOf("ff6e6e"),
    frontColor: Color.white,
    hitColor: Color.valueOf("ff6e6e"),
    trailColor: Color.valueOf("ff6e6e"),
    hitEffect: Fx.hitBulletColor,
    despawnEffect: Fx.hitBulletColor,
    sprite: "large-orb",
    lifetime: 29,
    status: StatusEffects.slow,
    statusDuration: 120
});

const oozeWeapon = extend(Weapon, "sapphirium-ooze-weapon", {
    x: 29 / 4,
    y: -36 / 4,
    shootY: 0,
    reload: 70,
    recoil: 3,
    mirror: true,
    rotate: true,
    rotateSpeed: 2,
    ejectEffect: Fx.none,
    bullet: oozeOrb,
    shootSound: Sounds.bolt
});

const oozeWeaponSec = extend(Weapon, "sapphirium-ooze-weapon", {
    x: 53 / 4,
    y: 19 / 4,
    shootY: 0,
    reload: 40,
    recoil: 3,
    mirror: true,
    rotate: true,
    rotateSpeed: 3,
    ejectEffect: Fx.none,
    bullet: oozeOrb,
    shootSound: Sounds.bolt
});

const oozeShell = extend(BasicBulletType, {
    speed: 11,
    width: 8,
    height: 18,
    pierce: true,
    pierceBuilding: true,
    pierceCap: 2,
    damage: 10,
    buildingDamageMultiplier: 30,
    backColor: Color.valueOf("ff6e6e"),
    frontColor: Color.white,
    hitColor: Color.valueOf("ff6e6e"),
    hitEffect: Fx.hitBulletColor,
    despawnEffect: Fx.hitBulletColor,
    sprite: "shell",
    lifetime: 28,
    status: statuses.truesight,
    statusDuration: 120,
    shrinkY: 0,
    shrinkX: 0,
    trailWidth: 2,
    trailLength: 400,
    trailColor: Color.valueOf("ff6e6e")
});

const oozeCenterWeapon = extend(Weapon, "ooze-center-weapon", {
    x: 0,
    y: 15 / 4,
    shootY: 0,
    reload: 300,
    recoil: 0,
    mirror: false,
    rotateSpeed: 0.6,
    ejectEffect: Fx.none,
    bullet: oozeShell,
    shootSound: Sounds.bolt
});

const oozeWraithBullet = extend(BasicBulletType, {
    width: 8,
    height: 8,
    speed: 5,
    damage: 0,
    sprite: "sapphirium-none-bullet",
    lifetime: 19.2,
    hitEffect: Fx.none,
    despawnEffect: Fx.none,
    shootEffect: Fx.none,
    smokeEffect: Fx.none,
    maxRange: 109
});

const oozeWraithWeapon = extend(Weapon, "ooze-wraith-weapon", {
    x: 0,
    y: 0,
    mirror: false,
    rotate: true,
    reload: 10,
    recoil: 0,
    ejectEffect: Fx.none,
    shootSound: Sounds.missile,
    shootStatus: statuses.wraith,
    shootStatusDuration: 180,
    display: false,
    bullet: oozeWraithBullet,
    controllable: false,
    autoTarget: true
});

const oozeAoEBullet = extend(BasicBulletType, {
    width: 1,
    height: 1,
    lifetime: 1,
    speed: 1,
    damage: 1,
    sprite: "sapphirium-none-bullet",
    splashDamage: 120,
    buildingDamageMultiplier: 0,
    splashDamageRadius: 100,
    hitEffect: Fx.none,
    despawnEffect: oozeAoEWave,
    shootEffect: Fx.none,
    smokeEffect: Fx.none,
    backColor: Color.valueOf("ffe18f"),
    hitColor: Color.valueOf("ffe18f"),
    frontColor: Color.white
});

const oozeAoEWeapon = extend(Weapon, "ooze-aoe-weapon", {
    x: 0,
    y: 0,
    mirror: false,
    reload: 200,
    ejectEffect: Fx.none,
    shootSound: Sounds.missile,
    display: false,
    bullet: oozeAoEBullet,
    controllable: false,
    alwaysShooting: true
});

const ooze = extend(ErekirUnitType, "ooze", {
	health: 12000,
	armor: 23,
	speed: 0.6,
	drag: 0.02,
	accel: 0.06,
	rotateSpeed: 0.9,
	flying: true,
	lowAltitude: true,
    range: 152,
    engineOffset: 50 / 4,
    engineSize: 12 / 4,
    hitSize: 38
});

ooze.constructor = () => extend(UnitEntity, {});
ooze.immunities.addAll  (statuses.unleash, statuses.truesight);
ooze.weapons.addAll(oozeWeapon, oozeWeaponSec, oozeCenterWeapon, oozeAoEWeapon, blurWeapon, oozeWraithWeapon);
ooze.setEnginesMirror(
    UnitType.UnitEngine(68 / 4, -30 / 4, 16 / 4, 315),
    UnitType.UnitEngine(-68 / 4, -30 / 4, 16 / 4, 315),
    UnitType.UnitEngine(0 / 4, -62 / 4, 24 / 4, 90)
);

//Core
var blueHeal = new Effect(11, e => {
    Draw.color(Color.valueOf("d1efff"));
    Lines.stroke(e.fout() * 2);
    Lines.circle(e.x, e.y, 2 + e.finpow() * 7);
});
var blueHealWave = new Effect(22, e => {
    Draw.color(Color.valueOf("d1efff"));
    Lines.stroke(e.fout() * 2);
    Lines.circle(e.x, e.y, 4 + e.finpow() * 60);
});
var blueHealWaveBig = new Effect(33, e => {
    Draw.color(Color.valueOf("d1efff"));
    Lines.stroke(e.fout() * 3);
    Lines.circle(e.x, e.y, 6 + e.finpow() * (15 * Vars.tilesize));
});
var blueSquares = extend(ParticleEffect, {
	particles: 16,
	length: 15 * Vars.tilesize,
	cone: 360,
	lifetime: 80,
	sizeFrom: 8,
	sizeTo: 0,
	region: "sapphirium-rhombus",
	colorFrom: Color.valueOf("d1efff"),
	colorTo: Color.valueOf("d1efff")
});
var blueMulti = new MultiEffect(blueHealWaveBig, blueSquares);
var repairField = extend(RepairFieldAbility, 40, 60 * 7, 60, {
    healEffect: blueHeal,
    activeEffect: blueHealWave,
    localized() {
        return Core.bundle.get("ability.repairfield");
        }
});

var unitHealAmount = 60;
var blockHealPercent = 0.3;
var healRange = 15 * Vars.tilesize;

var unitHeal = new Stat("unitheal");
var blockHeal = new Stat("blockheal");
var healthUnits = new StatUnit("healthUnits");

var repairWave = extend(Ability, {
	death(unit) {
        let wasHealed = false;

        Units.nearby(unit.team, unit.x, unit.y, healRange, other => {
            if(other.damaged()) {
                blueHeal.at(other, false);
                wasHealed = true;
            }
            other.heal(unitHealAmount);
        });
        
        if(wasHealed) {
            blueMulti.at(unit, healRange);
        }
        
        Units.nearbyBuildings(unit.x, unit.y, healRange, other => {
            if(other.team == unit.team && other.damaged() && !other.checkSuppression() && !other.isHealSuppressed()) {
                other.heal(other.maxHealth * blockHealPercent);
                other.recentlyHealed();
                Fx.healBlockFull.at(other.x, other.y, other.block.size, Color.valueOf("d1efff"), other.block);
            }
        });
    },
    addStats(t) {
        t.add("[lightgray]" + unitHeal.localized() + ": [white]" + unitHealAmount + " " + healthUnits.localized());
        t.row();
        t.add("[lightgray]" + blockHeal.localized() + ": [white]" + (blockHealPercent * 100) + StatUnit.percent.localized());
        t.row();
        t.add("[lightgray]" + Stat.shootRange.localized() + ": [white]" +  Strings.autoFixed(healRange / Vars.tilesize, 2) + " " + StatUnit.blocks.localized());
    },
    localized() {
    	return Core.bundle.get("ability." + "repairwave");
    }
});

const firmament = extend(ErekirUnitType, "firmament", {
    engineColor: Color.valueOf("d1efff")
});
firmament.constructor = () => extend(PayloadUnit, {});
firmament.payloadCapacity = (2* 2) * Vars.tilePayload;
firmament.abilities.addAll(repairField, repairWave);
firmament.setEnginesMirror(
    UnitType.UnitEngine(25 / 4, -31 / 4, 10 / 4, 315),
    UnitType.UnitEngine(40 / 4, -15 / 4, 10 / 4, 315)
);

var highSpeedWave = extend(WaveEffect, {
    sides: 0,
    sizeFrom: 0,
    sizeTo: 28,
    strokeFrom: 5,
    strokeTo: 0,
    lifetime: 80,
    colorFrom: Color.valueOf("c093fa"),
    colorTo: Color.valueOf("c093fa"),
});
	
var highSpeedField = extend(StatusFieldAbility, statuses.highSpeed, 180, 480, 28, {
	applyEffect: Fx.none,
	activeEffect: highSpeedWave,
	parentizeEffects: true,
	localized() {
		return Core.bundle.get("ability.statusfield");
	}
});
var sappingWave = new Effect(80, e => {
    Draw.color(Pal.sap.cpy());
    Lines.stroke(e.fout() * 3);
    Lines.circle(e.x, e.y, 4 + e.finpow() * 80);
});
var sappingParticles = extend(ParticleEffect, {
	particles: 16,
	cone: 360,
	interp: Interp.circleOut,
	lifetime: 100,
	sizeFrom: 5,
	sizeTo: 0,
	colorFrom: Pal.sap.cpy(),
	colorTo: Pal.sap.cpy(),
	length: 80,
});

var multiSapping = new MultiEffect(sappingWave, sappingParticles);
var timer = 1;
var status = StatusEffects.sapped;
var sappingField = extend(Ability, {
	update(unit){
        timer += Time.delta;

        if(timer >= 180) {
            Units.nearbyEnemies(unit.team, unit.x, unit.y, 80, other => {
                other.apply(status, 60);
            });
            
            var x = unit.x + Angles.trnsx(unit.rotation, 0, 0);
            var y = unit.y + Angles.trnsy(unit.rotation, 0, 0);
            multiSapping.at(x, y, true ? 80 : unit.rotation, true ? unit : null);

            timer = 0;
        }
    },
    addStats(t) {
    	t.add("[lightgray]" + Stat.reload.localized() + ": [white]" + Strings.autoFixed(60 / 180, 2) + " " + StatUnit.perSecond.localized());
        t.row();
        t.add("[lightgray]" + Stat.shootRange.localized() + ": [white]" +  Strings.autoFixed(80 / Vars.tilesize, 2) + " " + StatUnit.blocks.localized());
        t.row();
        t.add(status.emoji() + " " + status.localizedName);
    },
   localized() {
   	return Core.bundle.get("ability." + "sappingfield");
   }
});
		

const aspiration = extend(ErekirUnitType, "aspiration", {});
aspiration.constructor = () => extend(PayloadUnit, {});
aspiration.payloadCapacity = (2 * 2) * Vars.tilePayload;
aspiration.abilities.addAll(highSpeedField, sappingField);