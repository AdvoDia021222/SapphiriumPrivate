const statuses = require("SappStatuses");
//5 power units per tick * 60 ticks(1 sec.) = 300 units of power in the game per second
const powerProduction = 8;
//for stats
const generationType = Stat.basePowerGeneration;

//sapphire branch
const tesla = extend(CoreBlock, "tesla", {
    hasPower: true,
    outputsPower: true,
    consumesPower: false,
    squareSprite: false,

	//for stats
    setStats() {
        this.super$setStats();
        this.stats.add(generationType, powerProduction * 60, StatUnit.powerSecond);
    },
	//for bars
    setBars() {
        this.super$setBars();
        this.addBar("poweroutput", entity => new Bar(
            () => Core.bundle.format("bar.poweroutput", powerProduction * 60),
            () => Pal.powerBar,
            () => 1
	    ));
    },

    baseExplosiveness: 10,
});

//efficiency multiplier 
const productionEfficiency = 1.0;

tesla.buildType = () => extend(CoreBlock.CoreBuild, tesla, {
        creload: 0,
	    collision(bullet) {
            this.super$collision(bullet);
            if(this.creload == 6 && this.damaged() && !this.isHealSuppressed() && !this.checkSuppression()){
                this.heal(this.maxHealth * 1.5 / 100);
                this.recentlyHealed();
                Fx.healBlockFull.at(this.x, this.y, this.block.size, Color.valueOf("ab8ea4"), this.block);
                this.creload = 0;
            }
            else this.creload++;
            return true;
        },
	//endowing the core with the ability to produce power
        getPowerProduction(){
            return powerProduction * productionEfficiency;
        }
    });
    
//amethyst branch
var fadingSparks = extend(ParticleEffect, {
    particles: 12,
    line: true,
    cone: 360,
    length: 36,
    lenFrom: 10,
    lenTo: 0,
    strokeFrom: 2,
    lifetime: 30,
    strokeTo: 0,
    colorFrom: Color.valueOf("c093fa"),
    colorTo: Color.valueOf("c093fa00"),
});
var purpleWave = extend(WaveEffect, {
    sides:4,
    sizeFrom: 24,
    sizeTo: 240,
    lifetime: 160,
    strokeFrom: 6,
    strokeTo: 2,
    colorFrom: Color.valueOf("c093fa"),
    colorTo: Color.valueOf("c093fa00"),
});
var waveSparks = extend(ParticleEffect, {
    particles: 8,
    line: true,
    cone: 360,
    length: 320,
    lenFrom:6,
    lenTo: 14,
    strokeFrom: 0,
    lifetime: 160,
    strokeTo: 2,
    colorFrom: Color.valueOf("c093fa"),
    colorTo: Color.valueOf("c093fa00"),
});
var mainstar = extend(ParticleEffect, {
    particles: 1,
    cone: 30,
    length: 0,
    lifetime: 60,
    sizeFrom: 7,
    sizeTo: 2,
    region:"sapphirium-star-effect",
    colorFrom: Color.valueOf("c093fa"),
    colorTo: Color.valueOf("ffffff00"),
});
var ObserStar = extend(BasicBulletType, {
	damage: 75,
	lifetime: 40,
	width: 5,
	length: 14,
	speed:4.5,
    pierceArmor: true,
    trailWidth: 1.7,
    trailLength: 100,
    homingPower: 0.4,
    homingRange: 46,
    sprite: "sapphirium-star-bullet",
    backColor: Color.valueOf("c093fa"),
    trailColor: Color.valueOf("c093fa"),
	hitColor: Color.valueOf("c093fa"),
	status: statuses.execute,
	despawnEffect: new MultiEffect(fadingSparks, mainstar),
});

const corePurpleNight = extend(CoreBlock, "core-purple-night", {
    squareSprite: false,
});

corePurpleNight.buildType = () => extend(CoreBlock.CoreBuild, corePurpleNight, {
    creload: 0,
	collision(bullet) {
        this.super$collision(bullet);
        this.creload++;
        if(this.creload == 16) {
            var randstar = Mathf.random(12, 19);
            for(var i = 0; i < randstar; i++) {
                var ObserStar_obj = ObserStar.create(this, this.x + Mathf.random(-3,3), this.y+ Mathf.random(-3,3), Mathf.range(0.0,360.0));
        	    ObserStar_obj.vel.scl(Mathf.random(0.6,1.8));
        	    purpleWave.at(this.x, this.y);
        	    waveSparks.at(this.x, this.y);
        	    Sounds.release.at(this);
            }
        }
        else if(this.creload >= 17) {
        	this.creload = 0;
        }
        return true;
    }
});