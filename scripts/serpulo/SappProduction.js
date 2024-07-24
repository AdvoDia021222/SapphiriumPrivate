const multi = require("multi-crafter/lib")
const freezer = multi.MultiCrafter("freezer") 
const denseSmelter = extend(GenericCrafter, "dense-smelter", {});
const bigDenseSmelter = extend(GenericCrafter, "big-dense-smelter", {});
const plastaniumPress = extend(AttributeCrafter, "plastanium-press", {});
const phaseSewingFactory = extend(GenericCrafter, "phase-sewing-factory", {});
const impulseKineticSmelter = extend(AttributeCrafter, "impulse-kinetic-smelter", {});
const globiumSmelter = extend(AttributeCrafter, "globium-smelter", {
    envDisabled: Env.scorching
});
const tinoriumCrystallizer = extend(AttributeCrafter, "tinorium-crystallizer", {
    envDisabled: Env.scorching
});
const diamondPress = extend(AttributeCrafter, "diamond-press", {
    attribute: Attribute.heat,
});
const creostoneSmelter = extend(GenericCrafter, "creostone-smelter", {
    envDisabled: Env.scorching
});
const creotiteConverter = extend(AttributeCrafter, "creotite-converter", {
    envDisabled: Env.scorching
});
const bigBlastMixer = extend(GenericCrafter, "big-blast-mixer", {});
const multicharger = multi.MultiCrafter("multi-charger") 
const cryofluidMegamixer = extend(GenericCrafter, "cryofluid-megamixer", {});
const ledoniteMixer = extend(GenericCrafter, "ledonite-mixer", {});
const creotiteMixer = extend(GenericCrafter, "creotite-mixer", {});
const creotiteMegaMixer = extend(GenericCrafter, "creotite-megamixer", {});
const electromixer = extend(GenericCrafter, "electromixer", {});
const surgeMassSynthesizer = extend(GenericCrafter, "surge-mass-synthesizer", {
    envDisabled: Env.scorching
});