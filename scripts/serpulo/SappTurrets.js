const statuses = require("SappStatuses");
const items = require("SappItems");
const liquids = require("SappLiquids");

//Dart Faction
const cast = extend(ItemTurret, "cast", {});
const thrower = extend(ItemTurret, "thrower", {
    envDisabled: Env.scorching
});
const speed = extend(ItemTurret, "speed", {});
const launch = extend(ItemTurret, "launch", {});
const flight = extend(ItemTurret, "flight", {});

//Sandbank Faction
const sandTurret = extend(ItemTurret, "sand-turret", {});
const sandThrower = extend(ItemTurret, "sand-thrower", {
    envDisabled: Env.scorching
});
const dune = extend(ItemTurret, "dune", {});
const pyramid = extend(ItemTurret, "pyramid", {});

//Indigo Faction
const frostbite = extend(ItemTurret, "frostbite", {});
const icicle = extend(PowerTurret, "icicle", {});
const hoarfrost = extend(PowerTurret, "hoarfrost", {});
const centerBullet = extend(BasicBulletType, {
	width: 20,
	height: 24,
	speed: 7,
	lifetime: 40,
	damage: 70,
	knockback: 4,
	hitEffect: Fx.flakExplosion,
	despawnEffect: Fx.flakExplosion,
	backColor: Pal.lancerLaser,
	frontColor: Color.white,
	trailWidth: 4,
	trailLength: 40,
	trailColor: Pal.lancerLaser,
	status: StatusEffects.freezing,
	statusDuration: 90,
});

const reproduction = extend(ItemTurret, "reproduction", {
    setStats() {
        this.super$setStats();
        this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(this, centerBullet)));
    },
    canOverdrive: false
});
reproduction.buildType = () => extend(ItemTurret.ItemTurretBuild, reproduction, {
	creload: 0,
    updateTile() {
        this.super$updateTile();
        let reproductionShoot = this.isShooting() && this.isActive() && this.hasAmmo();
        if(!(reproductionShoot)) return;

        this.creload++;
        if(this.creload >= 70) {
            this.creload = 0;
            centerBullet.create(this, this.team, this.x, this.y, this.rotation);
            Sounds.shoot.at(this);
            Fx.shootBigColor.at(this.x, this.y);
        }

    },
});

const north = extend(PowerTurret, "north", {});
const bow = extend(ItemTurret, "bow", {});
const overfreezingCharge = extend(ShrapnelBulletType, {
	fromColor: Color.white,
	toColor: Pal.lancerLaser,
	damage: 22,
	serrations: 7,
	length: 320,
	status: statuses.overfreezing,
	statusDuration: 84,
	lifetime: 25,
});

const impaler = extend(ItemTurret, "impaler", {
    setStats(){
        this.super$setStats();
        this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(this, overfreezingCharge)));
    },
    canOverdrive: false
});
impaler.buildType = () => extend(ItemTurret.ItemTurretBuild, impaler, {
	creload: 0,
    updateTile() {
        this.super$updateTile();
        let impalerShoot = this.isShooting() && this.isActive() && this.hasAmmo() && this.power.status > 0.5;
        if(!(impalerShoot)) return;

        this.creload++;
        if(this.creload >= 240) {
            this.creload = 0;
            overfreezingCharge.create(this, this.team, this.x, this.y, this.rotation);
            Sounds.shootBig.at(this);
        }
        
    },
});
const glow = extend(ItemTurret, "glow", {
    envDisabled: Env.scorching
});
const splashEffect = extend(ExplosionEffect, {
	waveRad: 115,
	waveRadBase: 65,
	waveColor: Color.valueOf("b8fffe"),
	waveStroke: 2,
	waveLife: 160,
	smokes: 0,
	sparks: 10,
	sparkLen: 16,
	sparkStroke: 3,
	sparkColor: Color.valueOf("b8fffe"),
	sparkRad: 135,
});

const everfrostSplash = extend(BombBulletType, {
	width: 0,
	height: 0,
	speed: 0,
	lifetime: 1,
	backColor: Color.valueOf("b8fffe"),
	frontColor: Color.white,
	hitEffect: Fx.none,
	despawnEffect: new MultiEffect(Fx.titanExplosion, splashEffect, Fx.titanSmoke),
	scaledSplashDamage: true,
	splashDamage: 170,
	splashDamageRadius: 115,
	damage: 0,
	collidesAir: false,
	hitColor: Color.valueOf("b8fffe"),
	status: StatusEffects.freezing,
	statusDuration: 65
});

var auxiliaryUnit = new Stat("auxiliaryunit", StatCat.function);
const shielder = extend(UnitType, "shielder", {});
shielder.constructor = () => extend(UnitEntity, {});
const everfrost = extend(LiquidTurret, "everfrost", {
    setStats() {
        this.super$setStats();
        this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(this, everfrostSplash)));
        this.stats.add(auxiliaryUnit, StatValues.content(shielder));
    },
    canOverdrive: false
});
everfrost.buildType = () => extend(LiquidTurret.LiquidTurretBuild, everfrost, {
    creload : 0,
    updateTile() {
        this.super$updateTile();
        let everfrostShooting = this.isShooting() && this.hasAmmo() && this.power.status > 0.5;
        if(!(everfrostShooting)) return;
        
        this.creload++;
        if(this.creload % 310 == 0) {
            everfrostSplash.create(this, this.team, this.x, this.y, this.rotation);
            Sounds.titanExplosion.at(this);
        }
        else if(this.creload == 1100) {
            shielder.spawn(this.team, this.x, this.y);
            Fx.spawn.at(this.x, this.y);
            Sounds.respawn.at(this);
        }
        else if(this.creload > 1100) this.creload = 0;
    }
});

//Emerald Light Faction
const pulse = extend(PowerTurret, "pulse", {});
const turretPressure = extend(PowerTurret, "turret-pressure", {});
const revival = extend(ItemTurret, "revival", {});
const release = extend(ItemTurret, "release", {});
const emeraldEmpCannon = extend(ItemTurret, "emerald-emp-cannon", {});

//Beam Faction
const wire = extend(PowerTurret, "wire", {});
const shock = extend(ItemTurret, "shock", {});
const electron = extend(TractorBeamTurret, "electron", {});
const discharge = extend(PowerTurret, "discharge", {});
const yellowLaserCharge = new Effect(80, 100, e => {
    Draw.color(Pal.surge);
    Lines.stroke(e.fin() * 2);
    Lines.circle(e.x, e.y, 4 + e.fout() * 100);

    Fill.circle(e.x, e.y, e.fin() * 20);

    Angles.randLenVectors(e.id, 20, 40 * e.fout(), (x, y) => {
        Fill.circle(e.x + x, e.y + y, e.fin() * 5);
        Drawf.light(e.x + x, e.y + y, e.fin() * 15, Pal.surge, 0.7);
    });

    Draw.color();

    Fill.circle(e.x, e.y, e.fin() * 10);
    Drawf.light(e.x, e.y, e.fin() * 20, Pal.heal, 0.7);
});
yellowLaserCharge.followParent = true;
yellowLaserCharge.rotWithParent = true;
    
const pierceLaser = extend(LaserBulletType, {
	length: 310,
	colors: [Pal.surge, Pal.surge, Color.white],
	damage: 130,
	lifetime: 65,
	buildingDamageMultiplier: 0.1,
	lightColor: Pal.surge,
	lightningColor: Pal.surge,
	lightningSpacing: 30,
	lightningLength: 4,
	lightningLengthRand: 10,
	width: 30,
	lightningDamage: 40,
	lightningAngleRand: 40,
	lightningDelay: 1.1,
	chargeEffect: yellowLaserCharge,
	sideWidth: 0,
	sideLength: 0,
});

const pierce = extend(PowerTurret, "pierce", {
    canOverdrive: false
});
pierce.shootType = pierceLaser;
pierce.buildType = () => extend(PowerTurret.PowerTurretBuild, pierce, {
    creload : 0,
    updateTile() {
        this.super$updateTile();
        let pierceLaserShoot = this.isShooting() && this.hasAmmo() && this.power.status > 0.5;
        if(!(pierceLaserShoot)) return this.creload = 0;

        this.creload++;
        if (this.creload % 400 == 0) {
            pierceLaser.create(this, this.team, this.x, this.y, this.rotation);
            Sounds.laserblast.at(this);
        } 
        else if (this.creload == 1300) {
            pierceLaser.create(this, this.team, this.x, this.y, this.rotation);
            Sounds.laserblast.at(this);
        }
        else if (this.creload > 1300) this.creload = 0;

    }
});

const sparrow = extend(PowerTurret, "sparrow", {});

//for stats only
const hawkSpawnBullets = extend(BasicBulletType, {
	damage: 0,
	pierce: true,
	status: statuses.passiveBloodrage,
});

const hawk = extend(PowerTurret, "hawk", {
    setStats() {
        this.super$setStats();
        this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(this, hawkSpawnBullets)));
    },
});

const scrStar = extend(PowerTurret, "scarlet-star", {});

const sharpLaser = extend(LaserBulletType, {
	width: 25,
	length: 400,
	sideWidth: 2.5,
	sideAngle: 70,
	colors: [Color.valueOf("8a3340"), Color.valueOf("ff6e6e"), Color.valueOf("ff6e6e")], 
	damage: 300,
	lightColor: Color.valueOf("ff6e6e"),
	status: statuses.activeBloodrage,
});

const injection = extend(ItemTurret, "injection", {
    setStats() {
        this.super$setStats();
        this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(this, sharpLaser)));
    },
    canOverdrive: false
});
injection.buildType = () => extend(ItemTurret.ItemTurretBuild, injection, {
	creload : 0,
    updateTile() {
        this.super$updateTile();
        let injectionShoot = this.isShooting() && this.hasAmmo() && this.power.status > 0.5;
        if(!(injectionShoot)) return;
        
        this.creload++;
        if(this.creload >= 440) {
            this.creload = 0;
            sharpLaser.create(this, this.team, this.x, this.y, this.rotation)
            Fx.none.at(this.x, this.y)
            Sounds.laser.at(this)
            Effect.shake(4, 4, this)
        }

    },
});

const bloodsap = extend(SapBulletType, {
	sapStrength: 0.95,
	damage: 80,
	lifetime: 20,
	length: 400,
	color: Color.valueOf("ff6e6e"),
	hitColor: Color.valueOf("ff6e6e"),
	status: statuses.passiveBloodrage,
	statusDuration: 280,
	width: 0.9,
	ammoMultiplier: 1,
});

const bloodlust = extend(ItemTurret, "bloodlust", {
    setStats(){
        this.super$setStats();
        this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(this, bloodsap)));
    },
    canOverdrive: false
});
bloodlust.buildType = () => extend(ItemTurret.ItemTurretBuild, bloodlust, {
	creload : 0,
    updateTile() {
        this.super$updateTile();
        let sx = this.x + Mathf.range(9.75, -9.75);
        let sy = this.y + Mathf.range(10.5, -10.5);

        let bloodlustShoot = this.isShooting() && this.isActive() && this.hasAmmo() && this.power.status > 0.5;
        if (!(bloodlustShoot)) return;

        this.creload++;
        if (this.creload >= 20) {
            this.creload = 0;
            bloodsap.create(this, this.team, sx, sy, this.rotation);
            Sounds.sap.at(this);
        }
    },
});

const scarletRhombuses = extend(ParticleEffect, {
	region: "sapphirium-rhombus",
	particles: 6,
	cone: 360,
	length: 16,
	lifetime: Fx.hitBulletColor.lifetime,
	sizeFrom: 5.5,
	sizeTo: 0,
	colorFrom: Color.valueOf("ff6e6e"),
	colorTo: Color.valueOf("ff6e6e"),
});

const weavingBullet = extend(BasicBulletType, {
	width: 12,
	height: 12,
	speed: 5,
	lifetime: 76.4,
	damage: 44,
	weaveMag: 3,
	weaveScale: 3,
	trailWidth: 3,
	homingPower: 0.05,
    homingRange: 96,
	trailLength: 26,
	shrinkX: 0,
    shrinkY: 0,
	trailColor: Color.valueOf("ff6e6e"),
	backColor: Color.valueOf("ff6e6e"),
	frontColor: Color.white,
	status: statuses.passiveBloodrage,
	hitColor: Color.valueOf("ff6e6e"),
	hitEffect: new MultiEffect(Fx.hitBulletColor, scarletRhombuses),
	despawnEffect: new MultiEffect(Fx.hitBulletColor, scarletRhombuses),
	pierce: true,
	pierceBuilding: true,
	pierceArmor: true,
});

const scarletExplosion = extend(ExplosionEffect, {
	waveRad: 24,
	waveColor: Color.valueOf("ff6e6e"),
	waveStroke: 3,
	waveLife: 18,
	sparks: 0,
	smokes: 6,
	lifetime: 45,
	smokeRad: 28,
	smokeColor: Color.valueOf("ff6e6e85"),
	smokeSize: 6.5,
});

const scarletArtilleryBullet = extend(ArtilleryBulletType, {
	width: 12,
	height: 12,
	speed: 3,
	lifetime: 67.34,
	damage: 55,
	splashDamage: 55,
	splashDamageRadius: 24,
	homingPower: 0.02,
    homingRange: 96,
    shrinkX: 0,
    shrinkY: 0,
	trailColor: Color.valueOf("ff6e6e"),
	backColor: Color.valueOf("ff6e6e"),
	frontColor: Color.white,
	status: statuses.passiveBloodrage,
	hitColor: Color.valueOf("ff6e6e"),
	hitEffect: scarletExplosion,
	despawnEffect: scarletExplosion,
	collides: true,
	collidesTiles: false,
	knockback: 0.8,
	inaccuracy: 6,
	pierceArmor: true,
});

const scarletBullet = extend(BasicBulletType, {
	width: 12,
	height: 14,
	speed: 4.5,
	lifetime: 24.56,
	damage: 35,
	shrinkX: 0,
	shrinkY: 0,
	homingPower: 0.02,
    homingRange: 96,
	backColor: Color.valueOf("ff6e6e"),
	frontColor: Color.white,
	status: statuses.passiveBloodrage,
	hitColor: Color.valueOf("ff6e6e"),
	hitEffect: Fx.hitBulletColor,
	despawnEffect: Fx.hitBulletColor,
	pierceArmor: true,
	pierce: true,
	pierceBuilding: true,
	pierceCap: 1,
});

const aorta = extend(ItemTurret, "aorta", {
    setStats() {
        this.super$setStats();
        this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(this, weavingBullet)));
        this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(this, scarletArtilleryBullet)));
        this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(this, scarletBullet)));
    },
    shootY: -3.75,
    canOverdrive: false,
    envDisabled: Env.scorching
});
aorta.buildType = () => extend(ItemTurret.ItemTurretBuild, aorta, {
    creload : 0,
    updateTile() {
        this.super$updateTile();
        let aortaShoot = this.isShooting() && this.hasAmmo() && this.power.status > 0.5;
        if(!(aortaShoot)) return this.creload = 0;

        this.creload++;
        if(this.creload == 350) {
            Sounds.release.at(this);
            var rsh = Mathf.random(0, 9);
            for(var i = 0; i < 7 + rsh; i++) {
                let angleOffset = i * 1.77777778 - (9 - 1) * 1.77777778 / 2;
                var weavingBullet_obj = weavingBullet.create(this, this.team, this.x, this.y, this.rotation + angleOffset);
                weavingBullet_obj.vel.scl(Mathf.random(0.7, 1.5));
            }
            for(var i = 0; i < 6 + rsh; i++) {
                let a = this.rotation + Mathf.range(27 / 2);
                let len = Mathf.random(1, 7);
                var scarletArtilleryBullet_obj = scarletArtilleryBullet.create(this, this.team, this.x + Angles.trnsx(a, len), this.y + Angles.trnsy(a, len), a, Mathf.random(1.5, 1), Mathf.random(1.5, 1));
                scarletArtilleryBullet_obj.vel.scl(Mathf.random(0.9, 1.4));
            }
            for(var i = 0; i < 11 + rsh; i++) {
                let aa = this.rotation + Mathf.range(15 / 2);
                let lenn = Mathf.random(1, 7);
                var scarletBullet_obj = scarletBullet.create(this, this.team, this.x + Angles.trnsx(aa, lenn), this.y + Angles.trnsy(aa, lenn), aa, Mathf.random(1.5, 1), Mathf.random(1.5, 1));
                scarletBullet_obj.vel.scl(Mathf.random(0.9, 1.7));
            }
        }
        else if(this.creload > 350) this.creload = 0;
    }
});

const goldenPollination = extend(StatusEffect, "golden-pollination", {
	healthMultiplier: 1.4,
	speedMultiplier: 0.3,
	reloadMultiplier: 0.85
});

const goldenHit = extend(ParticleEffect, {
	particles: 6,
	sizeFrom: 4,
	sizeTo: 0,
	lifetime: 25,
	length: 15,
	cone: 360,
	colorFrom: Pal.surge,
	colorTo: Pal.surge
});

const goldenFire = extend(ParticleEffect, {
    particles: 30,
    sizeFrom: 4,
    sizeTo: 0,
    lifetime: 20,
    length: 230,
    //interp: Interp.circleOut,
    cone: 6,
    colorFrom: Color.valueOf("f3e97975"),
    colorTo: Color.valueOf("d99e6a75")
});

const goldenFireBullet = extend(BasicBulletType, {
	width: 0.01,
	height: 0.01,
	damage: 12,
	lifetime: 14,
	sprite: "circle-bullet",
	status: goldenPollination,
	statusDuration: 250,
	hitEffect: goldenHit,
	despawnEffect: Fx.none,
	frontColor: Color.white,
	backColor: Pal.surge,
	speed: 9,
});
	

const enlight = extend(ItemTurret, "enlightenment", {
    setStats() {
        this.super$setStats();
        this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(this, goldenFireBullet)));
    },
});
enlight.buildType = () => extend(ItemTurret.ItemTurretBuild, enlight, {
    creload : 0,
    updateTile() {
        this.super$updateTile();

        let fx = this.x + Mathf.range(-2.5, 2.5);
        let fy = this.y + Mathf.range(-6.5, 6.5);

        let enlightShoot = this.isShooting() && this.hasAmmo();
        if(!(enlightShoot)) return;

        this.creload++;
        if (this.creload >= 9) {
            this.creload = 0;
            goldenFireBullet.create(this, this.team, fx, fy, this.rotation);
            goldenFire.at(fx, fy, this.rotation);
            Sounds.flame.at(this);
        }
    },
});

const contLaser = extend(ContinuousLaserBulletType, {
    damage: 3,
    length: 105,
    shake: 0,
    width: 4,
    pierceArmor: true,
    colors: [Pal.surge, Pal.surge, Pal.surge, Color.white],
});            
            
const infiniteLSA = extend(ContinuousTurret, "infinite-laser-array", {
    health: 800,
    rotateSpeed: 5,
    recoil: 0,
    shake: 0,
    range: 90,
    shootEffect: Fx.none,
    shootSound: Sounds.laserbig,
    loopSound: Sounds.beam,
    loopSoundVolume: 0.8,
    shootType: contLaser,
});
infiniteLSA.consumePower(5);

const goldHorn = extend(PowerTurret, "gold-horn", {});

const shockBlast = extend(ExplosionEffect, {
	waveRad: 12,
	waveLife: 8,
	waveStroke: 3,
	waveColor: Pal.surge,
	sparks: 8,
	sparkRad: 18,
	sparkColor: Pal.surge,
	sparkLen: 6,
	sparkStroke: 3,
	smokes: 0,
});

const whiteLightning = extend(LightningBulletType, {
	lightningLength: 6,
	lightningColor: Color.white,
	damage: 8,
	hitColor: Color.white,
});

const yellowLightning = extend(LightningBulletType, {
	lightningLength: 6,
	lightningColor: Pal.surge,
	damage: 8,
	hitColor: Pal.surge,
});

const rightBullet = extend(BasicBulletType, {
	width: 18,
	height: 22,
	speed: 7,
	lifetime: 24.29,
	damage: 44,
	pierce: true,
	pierceCap: 2,
	pierceArmor: true,
	backColor: Pal.surge,
	frontColor: Color.white,
	trailWidth: 3.5,
	trailLength: 30,
	trailColor: Pal.surge,
	status: StatusEffects.shocked,
	statusDuration: 60,
	intervalBullet: whiteLightning,
	bulletInterval: 5,
	intervalAngle: 90,
	intervalRandomSpread: 180,
	intervalBullets: 3,
	hitEffect: shockBlast,
	despawnEffect: shockBlast,
});

const leftBullet = extend(BasicBulletType, {
	width: 18,
	height: 22,
	speed: 7,
	lifetime: 24.29,
	damage: 44,
	pierce: true,
	pierceCap: 2,
	pierceArmor: true,
	backColor: Pal.surge,
	frontColor: Color.white,
	trailWidth: 3.5,
	trailLength: 30,
	trailColor: Pal.surge,
	status: StatusEffects.shocked,
	statusDuration: 60,
	intervalBullet: yellowLightning,
	bulletInterval: 5,
	intervalAngle: -90,
	intervalRandomSpread: 180,
	intervalBullets: 3,
	hitEffect: shockBlast,
	despawnEffect: shockBlast,
});

const brazier = extend(ContinuousLiquidTurret, "brazier", {
    setStats() {
        this.super$setStats();
        this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(this, rightBullet)));
        this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(this, leftBullet)));
    },
    canOverdrive: false,
    envDisabled: Env.scorching
});
brazier.buildType = () => extend(ContinuousLiquidTurret.ContinuousLiquidTurretBuild, brazier, {
    creload : 0,
    updateTile() {
        this.super$updateTile();

        let brX = this.x - 1;
        let brX2 = this.x + 1;

        let brazierShoot = this.isShooting() && this.power.status > 0.5 && this.hasAmmo();
        if(!(brazierShoot)) return this.creload = 0;

        this.creload++;
        if(this.creload >= 16) {
            this.creload = 0;
            rightBullet.create(this, this.team, brX2, this.y, this.rotation);
            leftBullet.create(this, this.team, brX, this.y, this.rotation);
            Sounds.spark.at(this);
        }
    },
});

const perfection = extend(ItemTurret, "perfection", {});

//Water Faction
const splash = extend(LiquidTurret, "splash", {});
const rainfall = extend(LiquidTurret, "rainfall", {});
const waterdrop = extend(LiquidTurret, "waterdrop", {});

//Fire Faction
const bayonet = extend(ItemTurret, "bayonet", {
    shootY: 7.25
});
const cloudBreaker = extend(ItemTurret, "cloud-breaker", {});
const fireBullet = extend(BasicBulletType, {
    width: 12,
    height: 17,
    speed: 10,
    lifetime: 44,
    damage: 20,
    hitEffect: new MultiEffect(Fx.hitBulletSmall, Fx.fireHit),
    despawnEffect: new MultiEffect(Fx.hitBulletSmall, Fx.fireHit),
    backColor: Pal.lightishOrange,
    frontColor: Pal.lighterOrange,
    trailColor: Pal.lightishOrange,
    trailChance: 0.9
});

const flame = extend(ItemTurret, "flame", {
    setStats(){
        this.super$setStats();
        this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(this, fireBullet)));
    },
    envDisabled: Env.scorching
});
flame.buildType = () => extend(ItemTurret.ItemTurretBuild, flame, {
    creload : 0,
    updateTile() {
        this.super$updateTile();
        let flameShoot = this.isShooting() && this.hasAmmo();
        if(!(flameShoot)) return this.creload = 0;

        this.creload++;
        if(this.creload >= 8) {
            this.creload = 0;
            fireBullet.create(this, this.team, this.x, this.y, this.rotation);
            Sounds.shoot.at(this);
        }
    },
});

const needle = extend(ItemTurret, "needle", {});

const blastBullet = extend(BasicBulletType, {
	width: 9,
	height: 9,
	speed: 5,
	lifetime: 50,
	trailWidth: 2,
	trailLength: 16,
	shrinkY: 0,
	hitEffect: Fx.blastExplosion,
	despawnEffect: Fx.blastExplosion,
	damage: 55,
	status: StatusEffects.blasted,
	weaveMag: 8,
	weaveScale: 4,
	weaveRandom: true,
	pierceArmor: true
});

const fallen = extend(ContinuousLiquidTurret, "fallen", {
	setStats() {
        this.super$setStats();
        this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(this, blastBullet)));
    },
    canOverdrive: false
});
fallen.buildType = () => extend(ContinuousLiquidTurret.ContinuousLiquidTurretBuild, fallen, {
    creload : 0,
    updateTile() {
        this.super$updateTile();
        let fallenShoot = this.isShooting() && this.hasAmmo() && this.power.status > 0.5;
        if (!(fallenShoot)) return this.creload = 0;

        this.creload++;
        if (this.creload >= 9) {
            for (let i = 0; i < 2; i++) {
                blastBullet.create(this, this.team, this.x, this.y, this.rotation)
            }
            Sounds.shootSnap.at(this);
        }
    },
});

//Acid Faction
const melinite = extend(PowerTurret, "melinite", {});
const toxin = extend(PowerTurret, "toxin", {});
const reagent = extend(ItemTurret, "reagent", {});
const endoxin = extend(ItemTurret, "endoxin", {
    envDisabled: Env.scorching
});

//for stats only
const corrodingSpawnBullets = extend(BasicBulletType, {
	damage: 150,
	pierce: true,
	status: statuses.acidCorrosion,
	statusDuration: 180,
	buildingDamageMultiplier: 0.75
});

const corroding = extend(ItemTurret, "corroding", {
	setStats(){
        this.super$setStats();
        this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(this, corrodingSpawnBullets)));
    },
    shootLength: 1,
});

//Lightning Faction, only one turret lol
const energySparkLightning = extend(LightningBulletType, {
	lifetime: 70,
	lightningColor: Pal.accent,
	lightningLength: 14,
	damage: 12,
	collidesGround: false,
	collidesAir: true,
});

const energySpark = extend(FlakBulletType, {
	width: 7,
	height: 7,
	speed: 6,
	lifetime: 45,
	hitEffect: Fx.flakExplosion,
	despawnEffect: Fx.flakExplosion,
	damage: 10,
	splashDamage: 20,
	splashDamageRadius: 45,
	explodeRange: 45,
	fragBullets: 2,
	fragCone: 360,
	fragBullet: energySparkLightning,
	backColor: Pal.accent,
	frontColor: Color.white,
	collidesGround: false
});

const energyExplode = extend(ExplosionEffect, {
	waveRad: 185,
	waveColor: Pal.accent,
	waveLife: 25,
	smokeRad: 195,
	smokeSize: 4,
	smokeColor: Pal.darkerMetal,
	smokes: 6,
	sparkRad: 195,
	sparkLen: 5,
	sparks: 6,
	sparkColor: Pal.accent,
});

const energyBall = extend(BasicBulletType, {
	sprite: "circle-bullet",
	width: 15,
	height: 15,
	shrinkX: 2,
	shrinkY: 2,
	speed: 0,
	lifetime: 185,
	damage: 0,
	collides: false,
	collidesGround: false,
	collidesAir: true,
	collidesTiles: false,
	splashDamage: 115,
	splashDamageRadius: 185,
	backColor: Pal.accent,
	frontColor: Color.white,
	despawnEffect: energyExplode,
	hitEffect: Fx.none,
	fragBullets: 16,
	fragCone: 360,
	fragLifeMin: 0.3,
	fragBullet: energySpark,
	hitSound: Sounds.explosion
});

const trembling = extend(PowerTurret, "trembling", {
    setStats(){
        this.super$setStats();
        this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(this, energyBall)));
    },
    canOverdrive: false
});
trembling.buildType = () => extend(PowerTurret.PowerTurretBuild, trembling, {
    creload : 0,
    updateTile(){
        this.super$updateTile();
        let tremblingShoot = this.isShooting() && this.power.status > 0.1 && this.hasAmmo();
        if (!(tremblingShoot)) return;

        this.creload++;
        if(this.creload >= 180) {
            this.creload = 0;
            energyBall.create(this, this.team, this.x, this.y, this.rotation);
            Sounds.shockBlast.at(this);
        }
    },
});

//Shadow Faction
const decay = extend(ItemTurret, "decay", {
    envDisabled: Env.scorching
});

const absorption = extend(UnitType, "absorption", {
	speed: 0,
	hitSize: 0,
	health: 720,
	rotateSpeed: 5,
	itemCapacity: 0,
	physics: false,
	engineSize: 0,
	drawMinimup: false,
	drawShields: false,
	isEnemy: false,
	playerControllable: false,
	targetable: false,
    hittable: false,
    outlineColor: Pal.darkOutline,
    drawBody: false,
    drawCell: false,
});
absorption.constructor = () => extend(UnitEntity, {});

const middleLaser = extend(LaserBulletType, {
	damage: 25,
	length: 100,
	drawSize: 420,
	pierceCap: 3,
	pierceArmor: true,
	sideWidth: 0,
    sideLength: 0,
    colors: [Color.valueOf("665c9e75"), Color.valueOf("8b73c7"), Color.valueOf("a488eb")],
    status: StatusEffects.sapped,
    statusDuration: 60
});

const adynamia = extend(ItemTurret, "adynamia", {
    size: 3,
    setStats(){
        this.super$setStats();
        this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(this, middleLaser)));
        this.stats.add(auxiliaryUnit, StatValues.content(absorption));
    },
    canOverdrive: false
});
adynamia.buildType = () => extend(ItemTurret.ItemTurretBuild, adynamia, {
    creload : 0,
    updateTile() {
        this.super$updateTile();
        let adynamiaShoot = this.isShooting() && this.hasAmmo() && this.power.status > 0.5;
        
        if(adynamiaShoot) {
            this.creload++;
            if(this.creload % 80 == 0) {
                middleLaser.create(this, this.team, this.x, this.y, this.rotation);
                Sounds.laser.at(this);
            }
            else if(this.creload == 1081) absorption.spawn(this.team, this.x, this.y);
            else if(this.creload > 1081) this.creload = 0;
        }
        else this.creload = 0;
    }
});

const sawHit = extend(ExplosionEffect, {
    waveColor: Color.valueOf("9497ff"),
    smokeColor: Color.valueOf("5c5e9e"),
    sparkColor: Color.valueOf("9497ff"),
    waveRad: 35,
    waveStroke: 4,
    waveLife: 25,
    sparkStroke: 3,
    sparkRad: 40,
    sparkLen: 20,
    smokeSize: 5,
    smokeRad: 25,
    smokes: 5,
    sparks: 5
});

const sawDespawn = extend(ExplosionEffect, {
    smokeColor: Color.valueOf("5c5e9e"),
    sparkColor: Color.valueOf("9497ff"),
    waveRad: 0,
    waveStroke: 0,
    waveLife: 0,
    smokeSize: 5,
    smokeRad: 25,
    smokes: 5,
    sparks: 0
});

const saw = extend(BasicBulletType, {
    width: 24,
    height: 24,

    damage: 80,
    speed: 6,
    lifetime: 60,
    pierce: true,
    sprite: "sapphirium-saw",
    spin: 20,
    
    status: StatusEffects.sapped,
    statusDuration: 180,

    hitSound: Sounds.laser,
    hitEffect: sawHit,
    despawnEffect: sawDespawn,
    frontColor: Color.valueOf("ffffff"),
    backColor: Color.valueOf("bd99ff"),
    hitSoundVolume: 0.4,
    shrinkY: 0,

    despawned(b) {
        sawBack.create(b, b.x, b.y, b.rotation() - 180, 1, 1);
    }
});
const sawBack = extend(BasicBulletType, {
    width: 24,
    height: 24,

    damage: 160,
    speed: 6,
    lifetime: 60,
    pierce: true,
    sprite: "sapphirium-saw",
    spin: -20,
    status: StatusEffects.sapped,
    statusDuration: 180,

    hitSound: Sounds.laser,
    hitEffect: sawHit,
    despawnEffect: sawDespawn,
    frontColor: Color.valueOf("ffffff"),
    backColor: Color.valueOf("bd99ff"),
    hitSoundVolume: 0.4,
    shrinkY: 0,
});
const blade = extend(PowerTurret, "blade", {
    shootType: saw
});
const punch = extend(ItemTurret, "punch", {});

//Diamond Faction
const diamondBullet = extend(BasicBulletType, {
	sprite: "sapphirium-diamond-shard",
	width: 12,
	height: 16,
	shrinkY: 0,
	damage: 33,
	hitEffect: Fx.hitBulletColor,
	despawnEffect: Fx.hitBulletColor,
	backColor: Color.valueOf("a1b1d1"),
	frontColor: Color.white,
	speed: 4,
	lifetime: 50
});

const curvature = extend(ItemTurret, "curvature", {
    setStats(){
        this.super$setStats();
        this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(this, diamondBullet)));
    },
    canOverdrive: false
});
curvature.buildType = () => extend(ItemTurret.ItemTurretBuild, curvature, {
	creload : 0,
    updateTile() {
        this.super$updateTile();
        let curvatureShoot = this.isShooting() && this.hasAmmo();
        if(!(curvatureShoot)) return this.creload = 0;
        
        this.creload++;
        if(this.creload >= 60) {
            this.creload = 0;
            for(let i = 0; i < 4; i++) {
                let angleOffset = i * 6.25 - (4 - 1) * 6.25 / 2;
                diamondBullet.create(this, this.team, this.x, this.y + 2.75, this.rotation + angleOffset);
            }
            Sounds.shootBig.at(this);
            Effect.shake(2, 2, this);
        }

    },
});

const diamondDrone = extend(UnitType, "diamond-drone", {});
diamondDrone.constructor = () => extend(UnitEntity, {});
const shine = extend(ItemTurret, "shine", {
    canOverdrive: false,
    setStats() {
        this.super$setStats();
        this.stats.add(auxiliaryUnit, StatValues.content(diamondDrone));
    }
});
shine.buildType = () => extend(ItemTurret.ItemTurretBuild, shine, {
    creload : 0,
    updateTile() {
        this.super$updateTile();
        shineShoot = this.isShooting() && this.hasAmmo();

        if (shineShoot && this.creload >= 600) {
            this.creload = 0;
            diamondDrone.spawn(this.team, this.x, this.y);
            Fx.spawn.at(this.x, this.y);
            Sounds.respawn.at(this);
        }
        else if (this.creload < 600) this.creload++;
    },
});

const skull = extend(ItemTurret, "skull", {});

const draw = extend(ItemTurret, "draw", {
    envDisabled: Env.scorching
});

//This turret is not part of any of the factions, could be an acid faction turret but it has no acid properties
const greenLaser = extend(LaserBulletType, {
	damage: 100,
	colors: [Pal.heal, Pal.heal, Color.white],
	drawSize: 200,
	width: 25,
	length: 560,
    shake: 1,
    despawnEffect: Fx.smokeCloud,
    smokeEffect: Fx.none,
    healPercent: 5,
    collidesTeam: true,
});

const executioner = extend(LaserTurret, "executioner", {
    setStats(){
        this.super$setStats();
        this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(this, greenLaser)));
    },
    canOverdrive: false
});
executioner.consume(new ConsumeCoolant(2)).update = false;
executioner.buildType = () => extend(LaserTurret.LaserTurretBuild, executioner, {
	creload : 0,
    updateTile() {
        this.super$updateTile();
        //bullet summoning x/y coordinates
        let wx = this.x + Mathf.range(14.25, -14.25);
        let wy = this.y + Mathf.range(22, -22);
        executionerShoot = this.isShooting() && this.isActive() && this.hasAmmo() && this.power.status > 0.5;

        if (executionerShoot) {
            this.creload++;
            if (this.creload >= 60) {
                this.creload = 0;
                greenLaser.create(this, this.team, wx, wy, this.rotation);
                Fx.shootBigSmoke2.at(wx, wy);
                Sounds.laserblast.at(this);
            }
        }
        else this.creload = 0;
    },
});