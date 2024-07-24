var liquidsTemp = new StatCat("liquidstemp");
var waterTemp = new Stat("watertemp", liquidsTemp);
var arkysTemp = new Stat("arkysTemp", liquidsTemp);
var neoplasmTemp = new Stat("neoplasmtemp", liquidsTemp);
var slagTemp = new Stat("slagtemp", liquidsTemp);

var liquids = [Liquids.water, Liquids.arkycite, Liquids.neoplasm, Liquids.slag];
var temperatures = [waterTemp, arkysTemp, neoplasmTemp, slagTemp];

module.exports = {
    liquids: liquids,
    temperatures: temperatures
}