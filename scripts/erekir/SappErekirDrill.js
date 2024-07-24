const environment = require("SappEnvironment");
const argonBorehole = extend(AttributeCrafter, "argon-borehole", {
	attribute: environment.argonAttr,
});

const argonPlasmaBore = extend(BeamDrill, "argon-plasma-bore", {});
const topazMine = extend(AttributeCrafter, "topaz-mine", {
    baseEfficiency: 0,
    minEfficiency: 8.999,
    displayEfficiency: false,
    boostScale: 1 / 9,
    attribute: environment.topazAttr,
});