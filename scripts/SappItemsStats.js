var sappItems = require("SappItems");

var efficiency90 = new StatCat("efficiency90");
var efficiency120 = new StatCat("efficiency120");
var efficiency140 = new StatCat("efficiency140");
var efficiency180 = new StatCat("efficiency180");

var berylliumCost = new Stat("berylliumcost", efficiency90);
var graphiteCost = new Stat("graphitecost", efficiency90);
var carbideCost = new Stat("carbidecost", efficiency90);
var oxideCost = new Stat("oxidecost", efficiency90);
var thoriumCost = new Stat("thoriumcost", efficiency90);
var surgeCost = new Stat("surgecost", efficiency90);
var sapphireCost = new Stat("sapphirecost", efficiency90);
var rubyCost = new Stat("rubycost", efficiency90);
var topazCost = new Stat("topazcost", efficiency90);

var siliconCost = new Stat("siliconcost", efficiency120);

var tungstenCost = new Stat("tungstencost", efficiency140);
var phaseCost = new Stat("phasecost", efficiency140);
var creostoneCost = new Stat("creostonecost", efficiency140);

var amethystCost = new Stat("amethystcost", efficiency180);
var carvedCost = new Stat("carvedcost", efficiency180);

var items = [
    sappItems.carvedAlloy, Items.tungsten, Items.graphite, Items.thorium, Items.beryllium, 
    Items.oxide, Items.surgeAlloy, Items.phaseFabric, Items.carbide, Items.silicon, 
    sappItems.sapphire, sappItems.topaz, sappItems.amethyst, sappItems.ruby, sappItems.creostone
];

var costs = [
    carvedCost, tungstenCost, graphiteCost, thoriumCost, berylliumCost, 
    oxideCost, surgeCost, phaseCost, carbideCost, siliconCost, 
    sapphireCost, topazCost, amethystCost, rubyCost, creostoneCost
];

module.exports = {
    items: items,
    costs: costs
}
