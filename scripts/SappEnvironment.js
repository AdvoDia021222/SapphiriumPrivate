const statuses = require("SappStatuses");
const items = require("SappItems");

const ledoniteLiquid = extend(Floor, "ledonite", {
	isLiquid: true,
	status: statuses.superFreezing,
	statusDuration: 240,
	drownTime: 150,
	speedMultiplier: 0.19,
	lightColor: Color.valueOf("c1f4ff"),
});
	
const oreEmerald = extend(OreBlock, "ore-emerald", {});

const oreRuby = extend(OreBlock, "ore-ruby", {});

const oreDiamond = extend(OreBlock, "ore-diamond", {});

const oreCreostone = extend(OreBlock, "ore-creostone", {});

const ledoniteSecretions = extend(Floor, "ledonite-secretions", {});

const metalHexFloor = extend(Floor, "metal-hex-floor", {
    variants: 1
});

const markingWall = extend(StaticWall, "marking-wall", {
    variants: 3
});

const plateWall = extend(StaticWall, "plate-wall", {
    variants: 2
});

const metalTree = extend(TreeBlock, "metal-tree", {
    variants: 1
});

const rubyGrowths = extend(TallBlock, "ruby-growths", {
    variants: 0,
    clipSize: 128,
    shadowAlpha: 0.5,
    shadowOffset: -2.5
});

const rubyFloor = extend(Floor, "ruby-floor", {
	variants: 3,
});

const spinel = extend(Floor, "spinel", {
	variants: 3,
});

const rubyStone = extend(StaticWall, "ruby-stone", {
    variants: 2
});
rubyFloor.asFloor().wall = rubyStone;

const spinelWall = extend(StaticWall, "spinel-wall", {
    variants: 2
});
spinel.asFloor().wall = spinelWall;

const topazAttr = Attribute.add("topazAttr");
const topazVeins = extend(Floor, "topaz-veins", {
    variants: 3,
});
topazVeins.attributes.set(topazAttr, 1);
const amber = extend(Floor, "amber", {
    variants: 3,
});

const topazCliff = extend(TallBlock, "topaz-cliff", {
    variants: 0,
    clipSize: 128,
    shadowAlpha: 0.5,
    shadowOffset: -2.5
});

const topazWall = extend(StaticWall, "topaz-wall", {});
topazVeins.asFloor().wall = topazWall;

const amberWall = extend(StaticWall, "amber-wall", {});
amber.asFloor().wall = amberWall;

const sapphiricFloor = extend(Floor, "sapphiric-floor", {
    variants: 4
});

const sapphiricStone = extend(Floor, "sapphiric-stone", {
    variants: 3
});

const blueStone = extend(Floor, "blue-stone", {
    variants: 3
});

const denseBlueStone = extend(Floor, "dense-blue-stone", {
    variants: 3
});

const sapphiricRock = extend(TallBlock, "sapphiric-rock", {
    variants: 0,
    clipSize: 128,
    shadowAlpha: 0.5,
    shadowOffset: -2.5
});

const sapphiricRockLarge = extend(TallBlock, "sapphiric-rock-large", {
    variants: 0,
    clipSize: 128,
    shadowAlpha: 0.5,
    shadowOffset: -2.5
});

const sapphiricVent = extend(SteamVent, "sapphiric-vent", {
	parent: sapphiricFloor,
	blendGroup: sapphiricFloor,
	variants: 2
});
sapphiricVent.attributes.set(Attribute.steam, 1.2);

const rubyVent = extend(SteamVent, "ruby-vent", {
	parent: rubyFloor,
	blendGroup: rubyFloor,
	variants: 2
});
rubyVent.attributes.set(Attribute.steam, 1);

const argonAttr = Attribute.add("argonAttr");

const sapphiricArgonFault = extend(SteamVent, "sapphiric-argon-fault", {
	parent: sapphiricFloor,
	blendGroup: sapphiricFloor,
	effect: Fx.none,
	variants: 2
});
sapphiricArgonFault.attributes.set(argonAttr, 1);

const rubyArgonFault = extend(SteamVent, "ruby-argon-fault", {
	parent: rubyFloor,
	blendGroup: rubyFloor,
	effect: Fx.none,
	variants: 2
});
rubyArgonFault.attributes.set(argonAttr, 1);

const rhyoliteArgonFault = extend(SteamVent, "rhyolite-argon-fault", {
	parent: Blocks.rhyolite,
	blendGroup: Blocks.rhyolite,
	effect: Fx.none,
	variants: 2
});
rhyoliteArgonFault.attributes.set(argonAttr, 1);

const yellowStoneArgonFault = extend(SteamVent, "yellow-stone-argon-fault", {
	parent: Blocks.yellowStone,
	blendGroup: Blocks.yellowStone,
	effect: Fx.none,
	variants: 2
});
yellowStoneArgonFault.attributes.set(argonAttr, 1);

const carbonArgonFault = extend(SteamVent, "carbon-argon-fault", {
	parent: Blocks.carbonStone,
	blendGroup: Blocks.carbonStone,
	effect: Fx.none,
	variants: 2
});
carbonArgonFault.attributes.set(argonAttr, 1);

const redStoneArgonFault = extend(SteamVent, "red-stone-argon-fault", {
	parent: Blocks.denseRedStone,
	blendGroup: Blocks.denseRedStone,
	effect: Fx.none,
	variants: 2
});
redStoneArgonFault.attributes.set(argonAttr, 1);

const arkyicArgonFault = extend(SteamVent, "arkyic-argon-fault", {
	parent: Blocks.arkyicStone,
	blendGroup: Blocks.arkyicStone,
	effect: Fx.none,
	variants: 2
});
arkyicArgonFault.attributes.set(argonAttr, 1);

const crystallineArgonFault = extend(SteamVent, "crystalline-argon-fault", {
	parent: Blocks.crystallineStone,
	blendGroup: Blocks.crystallineStone,
	effect: Fx.none,
	variants: 2
});
crystallineArgonFault.attributes.set(argonAttr, 1);

const amethystStone = extend(Floor, "amethyst-stone", {
	variants: 3,
});

const purpleStone = extend(Floor, "purple-stone", {
	variants: 3,
});

const amethystWall = extend(StaticWall, "amethyst-wall", {
	variants: 3,
});
amethystStone.asFloor().wall = amethystWall;

const purpleStoneWall = extend(StaticWall, "purple-stone-wall", {
	variants: 3,
});
purpleStone.asFloor().wall = purpleStoneWall;

const amethystBoulder = extend(Prop, "amethyst-boulder", {
	variants: 2,
});
amethystStone.asFloor().decoration = amethystBoulder;

const amethystArgonFault = extend(SteamVent, "amethyst-argon-fault", {
	parent: amethystStone,
	blendGroup: amethystStone,
	effect: Fx.none,
});
amethystArgonFault.attributes.set(argonAttr, 1.2);

const sapphiricWall = extend(StaticWall, "sapphiric-wall", {});
sapphiricFloor.asFloor().wall = sapphiricWall;
sapphiricStone.asFloor().wall = sapphiricWall;

const blueStoneWall = extend(StaticWall, "blue-stone-wall", {});
blueStone.asFloor().wall = blueStoneWall;
denseBlueStone.asFloor().wall = blueStoneWall;

const oreSapphire = extend(OreBlock, "ore-sapphire", {
	itemDrop: items.sapphire,
});

const wallOreSapphire = extend(OreBlock, "ore-wall-sapphire", {
	wallOre: true,
	itemDrop: items.sapphire,
});

const oreAmethyst = extend(OreBlock, "ore-amethyst", {
	itemDrop: items.amethyst,
});

const wallOreAmethyst = extend(OreBlock, "ore-wall-amethyst", {
	wallOre: true,
	itemDrop: items.amethyst,
});

const wallOreRuby = extend(OreBlock, "ore-wall-ruby", {
	wallOre: true,
	itemDrop: items.ruby,
});

module.exports = {
	topazAttr: topazAttr,
	argonAttr: argonAttr,
}