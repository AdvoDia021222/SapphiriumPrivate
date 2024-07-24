const items = require("SappItems");
const statuses = require("SappStatuses");

//topaz branch
var thrustBullet = extend(BasicBulletType, { 
    width: 0.001, 
    height: 0.001, 
    speed: 0, 
    lifetime: 0, 
    damage: 0,
    hitEffect: Fx.none,
    despawnEffect: Fx.none,
}); 

var thrustBullet2 = extend(BasicBulletType, { 
    width: 12, 
    height: 17, 
    speed: 5, 
    lifetime: 44, 
    damage: 33, 
    pierce : true, 
    pierceCap : 2, 
    pierceArmor: true, 
    hitEffect: Fx.hitBulletColor,
    despawnEffect: Fx.hitBulletColor,
    shootEffect: Fx.shootBigColor,
    backColor: Color.white, 
    frontColor: Color.valueOf("ffe18f"),
    trailColor: Color.valueOf("ffe18f"),
    hitColor: Color.valueOf("ffe18f"),
    trailWidth: 1.8,
    trailLength: 10
});

var thrustSparks = extend(ParticleEffect, {
    particles: 25,
    line: true,
    cone: 30,
    length: 56,
    lenFrom: 10,
    lenTo: 0,
    strokeFrom: 2,
    lifetime: 15,
    strokeTo: 0,
    colorFrom: Color.valueOf("ffe18f"),
    colorTo: Color.valueOf("ffe18f"),
});

var selfdam = extend(LightningBulletType, { 
    lightningColor: Color.valueOf("ffe18f"), 
    lightningLength: 6, 
    damage: 35, 
    collidesAir: true, 
    collidesGround: true, 
});

//1
const thrust = extend(ItemTurret, "thrust", {
    size: 3,
    shootSound: Sounds.pew,
    squareSprite: false,
});
thrust.ammo(items.topaz, thrustBullet2);
thrust.buildType = () => extend(ItemTurret.ItemTurretBuild, thrust, { 
    creload : 0,
    abscrl : 0,
    updateTile() { 
        this.super$updateTile();

        let cldred = (Mathf.round(this.abscrl * 0.02) > 200) ? 200 : Mathf.round(this.abscrl * 0.02);
        let cooldownShoot = 60 + cldred;

        if(!(this.hasAmmo() && this.isShooting() && this.isActive())) {
            if (this.creload > 0) this.creload--;
            if (this.abscrl > 0) this.abscrl -= 3;
            return;
        }

        this.creload++;
        if (this.creload == cooldownShoot) {
            Sounds.pulseBlast.at(this);
            multiPart.at(this.x, this.y);
            var thrustBullet2Obj = thrustBullet2.create(this, this.team, this.x, this.y, this.rotation);
            thrustBullet2Obj.damage = thrustBullet2Obj.damage + this.abscrl * 0.02 + this.creload * 0.5;
        }
        if (this.creload == cooldownShoot + 10) {
            let selfdam_obj = selfdam.create(this, Team.derelict, this.x, this.y, this.rotation);
            selfdam_obj.damage = 15 + (this.creload + this.abscrl) * 0.035;
            this.abscrl += this.creload;
            this.creload = 0;
        }
    },
    
});

var doubleSparks = extend(ParticleEffect, {
    particles: 8,
    line: true,
    length: 25,
    lifetime: 25,
    lenFrom: 8,
    lenTo: 0,
    strokeFrom: 2,
    cone: 90,
    strokeTo: 0,
    colorFrom: Color.valueOf("ffe18f"),
    colorTo: Color.valueOf("ffe18f"),
});

var mirrorSparks = extend(RadialEffect, {
    rotationSpacing: 180,
    amount: 2,
    effect: doubleSparks,
});

var greedBlade = extend(BasicBulletType, {
    width: 8,
    height: 60,
    damage: 125,
    pierceCap: 3,
    pierce: true,
    speed: 8,
    lifetime: 26.25,
    sprite: "sapphirium-diamond-shard",
    hitColor: Color.valueOf("ffe18f"),
    backColor: Color.valueOf("ffe18f"),
    frontColor: Color.white,
    hitEffect: mirrorSparks,
    despawnEffect: mirrorSparks,
    trailEffect: mirrorSparks,
    smokeEffect: Fx.shootBigSmoke,
    ammoMultiplier: 3,
    shootEffect: Fx.none,
});

var wavePart = extend(WaveEffect, {
    sides: 0,
    strokeFrom: 6,
    strokeTo: 0,
    sizeFrom: 0,
    sizeTo: 46,
    lifetime: 20,
    colorFrom: Color.valueOf("ffe18f"),
    colorTo: Color.valueOf("ffe18f"),
});

var sparksPart = extend(ParticleEffect, {
    particles: 20,
    length: 56,
    line: true,
    strokeFrom: 4,
    strokeTo: 0,
    lenFrom: 16,
    lenTo: 0,
    lifetime: 30,
    colorFrom: Color.valueOf("ffe18f"),
    colorTo: Color.valueOf("ffe18f"),
    cone: 360,
});

var multiPart = extend(MultiEffect, {
    effects: [wavePart, sparksPart]
});

//2
const greed = extend(ItemTurret, "greed", {
    squareSprite: false,
});
greed.ammo(items.topaz, thrustBullet);
greed.buildType = () => extend(ItemTurret.ItemTurretBuild, greed, {
    creload: 0,
    abscrl : 0,
    updateTile() {
        this.super$updateTile();
        let cldred = (Mathf.round(this.abscrl * 0.005) > 40) ? 40 : Mathf.round(this.abscrl * 0.005)
        if(!(this.hasAmmo() && this.isShooting() && this.isActive())) {
            if (this.creload > 0) this.creload--;
            if (this.abscrl > 0) this.abscrl -= 4;
            return;
        }

        this.creload++;
        if (this.abscrl < 2000) {
            if (this.creload == 65) {
                Sounds.pulseBlast.at(this);
                multiPart.at(this.x, this.y);
                var greedBladeObj = greedBlade.create(this, this.team, this.x, this.y, this.rotation);
                greedBladeObj.damage += this.abscrl * 0.018;
            }
            if (this.creload > 70) {
                var selfdamObj = selfdam.create(this, Team.derelict, this.x, this.y, this.rotation);
                selfdamObj.damage = 35 + (this.creload + this.abscrl) * 0.02;
                this.abscrl += this.creload;
                this.creload = 0;
            }
        }
        else if (this.abscrl < 4000) {
            if (this.creload == (80 - cldred) || this.creload == (90 - cldred)) {
                Sounds.pulseBlast.at(this);
                multiPart.at(this.x, this.y);
                var greedBladeObj = greedBlade.create(this, this.team, this.x, this.y, this.rotation);
                greedBladeObj.damage += 15 + this.abscrl * 0.02;
            }
            if (this.creload > (110 - cldred)) {
                var selfdamObj = selfdam.create(this, Team.derelict, this.x, this.y, this.rotation);
                selfdamObj.damage = 45 + this.creload * 0.01 + this.abscrl * 0.033;
                this.abscrl += this.creload;
                this.creload = 0;
            }
        }
        else {
            switch(this.creload) {
                case 45 - cldred:
                    Sounds.pulseBlast.at(this);
                    multiPart.at(this.x, this.y);
                    greedBladeObj.damage += 15 + this.abscrl * 0.025;
                    break;
                case 50 - cldred:
                    Sounds.pulseBlast.at(this);
                    multiPart.at(this.x, this.y);
                    greedBladeObj.damage += 15 + this.abscrl * 0.025;
                    break;
                case 55 - cldred:
                    Sounds.pulseBlast.at(this);
                    multiPart.at(this.x, this.y);
                    greedBladeObj.damage += 15 + this.abscrl * 0.025;
                    break;
            }

            if (this.creload > (70 - cldred)) {
                var selfdamObj = selfdam.create(this, Team.derelict, this.x, this.y, this.rotation);
                selfdamObj.damage = 55 + this.creload * 0.04 + this.abscrl * 0.053;
                this.abscrl += this.creload;
                this.creload = 0;
            }
        }
    }
});

var crueltyBullet = extend(BasicBulletType, {
    speed: 7,
    lifetime: 42.86,
    damage: 64,
    pierceArmor: true,
    hitColor: Color.valueOf("768a9a"),
    backColor: Color.valueOf("768a9a"),
    trailColor: Color.valueOf("768a9a"),
    frontColor: Color.white,
    pierceCap: 2,
    pierce: true,
    trailWidth: 2.4,
    trailLength: 8,
    hitEffect: Fx.hitBulletColor,
    despawnEffect: Fx.hitBulletColor,
    shootEffect: new MultiEffect(Fx.shootBigColor, Fx.colorSparkBig),
    smokeEffect: Fx.shootBigSmoke,
    lightningColor: Color.valueOf("768a9a"),
    lightningDamage: 22,
    lightningLength: 7,
});

var crueltyShootEffect = new MultiEffect(Fx.shootBigColor, Fx.colorSparkBig);

//3
const cruelty = extend(ItemTurret, "cruelty", {
    recoils: 4,
    squareSprite: false,
});
cruelty.buildType = () => extend(ItemTurret.ItemTurretBuild, cruelty, {
    creload : 0,
    abscrl : 0,
    updateTile() {
        this.super$updateTile();
        let crueltyShoot = this.isShooting() && this.hasAmmo();
        
        let rx = this.x + Mathf.range(7, -7);
        let ry = this.y + Mathf.range(7, -7);
        let rr = this.rotation + Mathf.range(360,0);

        let cldred = (Mathf.round(this.abscrl * 0.01) > 110) ? 110 : Mathf.round(this.abscrl * 0.01);
        let cldredo = (Mathf.round(this.abscrl * 0.01) > 165) ? 165 : Mathf.round(this.abscrl * 0.01);

        if(!(crueltyShoot)) {
            if (this.creload > 0) this.creload -= 2;
            if (this.abscrl > 0) this.abscrl -= 3;
            return;
        }

        this.creload++;
        let cooldownShoot = 130 - cldred;
        if (this.creload == (cooldownShoot)) {
            var crueltyBulletObj = crueltyBullet.create(this, this.team, rx, ry, this.rotation);
            crueltyBulletObj.damage = 54 + (this.creload + this.abscrl) * 0.038;
            Sounds.shootBig.at(this);
        }
        if (this.creload == (cooldownShoot + 10)) {
            var crueltyBulletObj2 = crueltyBullet.create(this, this.team, rx, ry, this.rotation);
            crueltyBulletObj2.damage = 54 + (this.creload + this.abscrl) * 0.038;
            Sounds.shootBig.at(this);
        }
        if (this.creload == (cooldownShoot + 20)) {
            var crueltyBulletObj3 = crueltyBullet.create(this, this.team, rx, ry, this.rotation);
            crueltyBulletObj3.damage = 54 + (this.creload + this.abscrl) * 0.038;
            Sounds.shootBig.at(this);
        }
        if (this.creload == (cooldownShoot + 30)) {
            var crueltyBulletObj4 = crueltyBullet.create(this, this.team, rx, ry, this.rotation);
            crueltyBulletObj4.damage = 54 + (this.creload + this.abscrl) * 0.038;
            Sounds.shootBig.at(this);
        }   
        
        if (this.creload % (118 - cldred) == 0) { 
            let selfdam_obj = selfdam.create(this, Team.derelict, rx,ry,rr);
            selfdam_obj.damage = 45 + (this.creload + this.abscrl) * 0.02;
        } 
        if (this.creload >= (205 - cldredo)) {
            this.abscrl += this.creload;
            this.creload = 0;
        }
    }
});
  
//amethyst branch
const devotion = extend(ItemTurret, "devotion", {
    squareSprite: false,
});

const addictionUnmovingLaser = extend(LaserBulletType, {
    length: 190,
    damage: 95,
    status: StatusEffects.unmoving,
    statusDuration: 40,
    width: 17,
    colors: [Color.valueOf("cca6ff"), Color.valueOf("cca6ff"), Color.white]
}); 

const addiction = extend(ItemTurret, "addiction", {
    setStats() {
        this.super$setStats();
        this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(this, addictionUnmovingLaser)));
    },
    squareSprite: false,
});
addiction.buildType = () => extend(ItemTurret.ItemTurretBuild, addiction, {
    creload : 0,
    updateTile() {
        this.super$updateTile();
        let addictionShoot = this.isShooting() && this.hasAmmo() && this.efficiency > 0;
        if(addictionShoot) {
            this.creload++;
            if(this.creload == 110) {
                addictionUnmovingLaser.create(this, this.team, this.x, this.y, this.rotation);
                Sounds.laser.at(this);
            }
            if(this.creload >= 120) {
                this.creload = 0;
            }
        }
    }
});

const inevitability = extend(ItemTurret, "inevitability", {
    squareSprite: false,
});

//creostone branch ?
const disarmament = extend(ItemTurret, "disarmament", {
    squareSprite: false,
});

var grayRing = extend(ParticleEffect, {
    particles: 1,
    length: 0,
    sizeFrom: 15,
    sizeTo: 0,
    lifetime: 180,
    colorFrom: Pal.lightishGray,
    colorTo: Pal.lightishGray,
});

var sorrowUnmovingLaser = extend(LaserBulletType, {
    length: 104,
    damage: 44,
    status: StatusEffects.unmoving,
    statusDuration: 180,
    width: 15,
    sideLength: 0,
    sideWidth: 0,
    colors: [Pal.darkerGray, Pal.darkishGray, Pal.lightishGray],
    hitColor: Pal.lightishGray,
    hitEffect: grayRing,
    collidesTiles: false,
});

var sorrowMeltingLaser = extend(LaserBulletType, {
    length: 56,
    damage: 120,
    status: StatusEffects.melting,
    statusDuration: 120,
    width: 15,
    sideLength: 0,
    sideWidth: 0,
    colors: [Color.valueOf("f25555"), Color.valueOf("fc8e6d"), Color.white],
    hitColor: Color.valueOf("fc8e6d"),
});

var sorrowFlammableLaser = extend(LaserBulletType, {
    length: 152,
    damage: 140,
    status: statuses.flammability,
    statusDuration: 420,
    width: 15,
    sideLength: 0,
    sideWidth: 0,
    colors: [Color.valueOf("d47f6a"), Color.valueOf("ffd17d"), Color.white],
    hitColor: Color.valueOf("ffd17d"),
});

var sorrowBurningLaser = extend(LaserBulletType, {
    length: 136,
    damage: 290,
    status: StatusEffects.burning,
    statusDuration: 120,
    width: 15,
    sideLength: 0,
    sideWidth: 0,
    colors: [Pal.lightOrange, Pal.lightishOrange, Color.white],
    hitColor: Pal.lightishOrange,
});

const sorrow = extend(PowerTurret, "sorrow", {
    setStats() {
        this.super$setStats();
        this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(this, sorrowUnmovingLaser)));
        this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(this, sorrowMeltingLaser)));
        this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(this, sorrowFlammableLaser)));
        this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(this, sorrowBurningLaser)));
    },
    squareSprite: false,
});
sorrow.buildType = () => extend(PowerTurret.PowerTurretBuild, sorrow, {
    creload : 0,
    updateTile() {
        this.super$updateTile();
        let sorrowShoot = this.isShooting() && this.hasAmmo() && this.power.status > 0;

        if(sorrowShoot) {
        	this.creload++;
            if(this.creload % 72 == 0 && this.creload != 102 && this.creload != 150 && this.creload != 180) {
                sorrowBurningLaser.create(this, this.team, this.x, this.y, this.rotation);
                Sounds.laser.at(this);
            }
            if(this.creload == 102) {
                sorrowFlammableLaser.create(this, this.team, this.x, this.y, this.rotation);
                Sounds.laser.at(this);
            }
            if(this.creload == 150) {
                sorrowMeltingLaser.create(this, this.team, this.x, this.y, this.rotation);
                Sounds.laser.at(this);
            }
            if(this.creload == 180) {
                sorrowUnmovingLaser.create(this, this.team, this.x, this.y, this.rotation);
                Sounds.laser.at(this);
            }
            else if (this.creload >= 180) this.creload = 0;
        }
    }
});

//for stats only
const dublicityInterval = extend(BasicBulletType, {
	damage: 45,
    splashDamage: 22,
    splashDamageRadius: 10,
    buildingDamageMultiplier: 1.3,
    homingPower: 0.5,
    homingRange: 22,
    pierceArmor: true,
});
const dublicitySpawnBullets = extend(BasicBulletType, {
	damage: 350,
    splashDamage: 190,
    splashDamageRadius: 40,
    buildingDamageMultiplier: 2,
    intervalBullets: 2,
    bulletInterval: 16,
    intervalRandomSpread: 360,
    intervalBullet: dublicityInterval,
});

const dublicity = extend(ItemTurret, "dublicity", {
	setStats() {
        this.super$setStats();
        this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(this, dublicitySpawnBullets)));
    },
    squareSprite: false,
});

//unknown branch
const multimortar = extend(ItemTurret, "multimortar", {
    squareSprite: false,
});
const elimination = extend(ItemTurret, "elimination", {
    squareSprite: false,
});
const dawn = extend(ItemTurret, "dawn", {
    squareSprite: false,
});
 
/*var healBomb = extend(EmpBulletType, {
width: 20, 
 height: 20, 
 speed: 1, 
 lifetime: 10, 
 shrinkY: 0.7, 
 shrinkX: 0.7, 
 damage: 0, 
 splashDamage: 0, 
 splashDamageRadius: 136, 
 hitEffect: Fx.none, 
 despawnEffect: Fx.none, 
 shootEffect: Fx.none, 
 smokeEffect: Fx.none, 
 collidesTeam: true, 
 collidesAir: false, 
 backColor: Color.valueOf("80a8ff"), 
 frontColor: Color.white, 
 healColor: Color.valueOf("80a8ff"), 
 hitColor: Color.valueOf("80a8ff"), 
 sprite: "sapphirium-none-bullet", 
 healPercent: 4, 
 homingPower: 0.1, 
 homingRange: 0.1, 
 timeIncrease: 0, 
 hitUnits: false, 
 radius: 136, 
}); 

const shelter = extend(ContinuousLiquidTurret, "shelter", {
	squareSprite: false,
	setStats(){
        this.super$setStats();
        this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(this, healBomb)));
    }
});
 
shelter.buildType = () => extend(ContinuousLiquidTurret.ContinuousLiquidTurretBuild, shelter, { 
 creload: 0, 
 updateTile(){
    this.super$updateTile();
    if(this.target == null){
        if(this.hasAmmo && this.power.status > 0){
            if(this.creload == 120){
                healBomb.create(this, this.x, this.y, this.rotation)
                this.creload = 0;
            }
            else this.creload++;
            }
        }
    }
}); */

/* how many times is the charge updated per second of firing */
const scaleUpdateRate = 10;
const scaleUpdateRate2 = 1;
/* percentage of scale increase per update ( from 0 to 100 ) */
const shootingBuff = 1;
/* period of heal outburst in seconds */
const healPeriod = 2;
/* how many percent will the buff decrease for one heal outburst ( from 0 to 100 ) */
const healDebuff = 50;
const buffBarColor = Pal.heal;

/* the radius of the spread of the heal ( in tiles ) */
const healRadius = 136;
const healRadius2 = 200;
const healColor = Color.valueOf("80a8ff");
const healEffect = Fx.healWave;

/* limiting the range of values ( from 0 to 100 ) */
const minHealPercent = 4;
const maxHealPercent = 28;
const minHealPercent2 = 3;
const maxHealPercent2 = 18;

function getHealPercent(healBuff) {
	return Mathf.clamp(healBuff * maxHealPercent, minHealPercent, maxHealPercent) / 100;
};

function getHealPercent2(healBuff) {
	return Mathf.clamp(healBuff * maxHealPercent2, minHealPercent2, maxHealPercent2) / 100;
};

const crackle = extend(ItemTurret, "crackle", {
	squareSprite: false,
	setStats() {
		this.super$setStats();
		
		this.stats.add(Stat.repairSpeed, 7, StatUnit.seconds);
	},
});
crackle.buildType = () => extend(ItemTurret.ItemTurretBuild, crackle, {
	/* ticks from last heal outburst or from the last heal update */
	updateTimer: 0,
	/* current percent of heal charge ( from 0 to 1 ) */
	healBuff: 0,
	
	updateTile() {
		this.super$updateTile();
		
		/* if the turret is inactive nothing happens */
		if(!this.hasAmmo) {
			this.updateTimer = 0;
			return;
		}
		
		this.updateTimer += 1;
		
		if(this.damaged() && this.target != null || this.isShooting()) {
			/* turret is shooting or targeting now */
			
			if(this.updateTimer > ((7 * 60) / scaleUpdateRate2)) {
				this.updateTimer = 0;
				this.healBuff = Mathf.clamp(this.healBuff + (shootingBuff / 100));
			}
		} else {
			/* turret isn't shooting or targeting now */
			
			if(this.damaged() && this.updateTimer > ((7 * 60) * healPeriod)) {
				this.updateTimer = 0;
				
				let healPercent = getHealPercent2(this.healBuff);
				
				Vars.indexer.eachBlock(this, healRadius2, block => ( block.damaged() && !block.isHealSuppressed() ), block => {
					block.heal(block.maxHealth * healPercent);
                    block.recentlyHealed();
                    Fx.healBlockFull.at(block.x, block.y, block.block.size, healColor, block.block);
                });
				
				Units.nearby(this.team, this.x, this.y, healRadius2, unit => {
                    if (unit.damaged()) {
                        unit.heal(unit.maxHealth * healPercent);
					}
                });
                
                Damage.damage(this.team, this.x, this.y, 8 * Vars.tilesize, 450, false, true);
                
                Fx.shockwave.at(this.x, this.y, this.rotation);
				
				//healEffect.at(this.x, this.y, healRadius, healColor);
				
				this.healBuff = Mathf.clamp(this.healBuff - (healDebuff / 100));
			}
		}
	}
});


const shelter = extend(ContinuousLiquidTurret, "shelter", {
	squareSprite: false,
	
	setStats() {
		this.super$setStats();
		
		this.stats.add(Stat.repairSpeed, 1, StatUnit.seconds);
	},
});

shelter.buildType = () => extend(ContinuousLiquidTurret.ContinuousLiquidTurretBuild, shelter, {
	/* ticks from last heal outburst or from the last heal update */
	updateTimer: 0,
	/* current percent of heal charge ( from 0 to 1 ) */
	healBuff: 1,
	
	updateTile() {
		this.super$updateTile();
		
		/* if the turret is inactive nothing happens */
		if(!this.hasAmmo() || this.power.status <= 0) {
			this.updateTimer = 0;
			return;
		}
		
		this.updateTimer += 1;
		
		if(this.target != null || this.isShooting()) {
			/* turret is shooting or targeting now */
			
			if(this.updateTimer > (60 / scaleUpdateRate)) {
				this.updateTimer = 0;
				this.healBuff = Mathf.clamp(this.healBuff + (shootingBuff / 100));
			}
		} else {
			/* turret isn't shooting or targeting now */
			
			if(this.updateTimer > (60 * healPeriod)) {
				this.updateTimer = 0;
				
				let healPercent = getHealPercent(this.healBuff);
				
				Vars.indexer.eachBlock(this, healRadius, block => ( block.damaged() && !block.isHealSuppressed() ), block => {
					block.heal(block.maxHealth * healPercent);
                    block.recentlyHealed();
                    Fx.healBlockFull.at(block.x, block.y, block.block.size, healColor, block.block);
                });
				
				Units.nearby(this.team, this.x, this.y, healRadius, unit => {
                    if(unit.damaged()) {
                        unit.heal(unit.maxHealth * healPercent);
					}
			});
                
				//healEffect.at(this.x, this.y, healRadius, healColor);
				
				this.healBuff = Mathf.clamp(this.healBuff - (healDebuff / 100));
			}
		}
	}
});