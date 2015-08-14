var fill = "0.5"; 
var stroke = "0.5";
var highlight ="0.8";

var colorSet1 = [];
var colorSet2 = [];
var colorSet3 = [];

var rgbRandom = function() {
  return Math.floor(Math.random() * (255) + 0).toString()
}
var colorRandom = function() {
  return rgbRandom() + "," + rgbRandom() + "," + rgbRandom()
}

var data1Color = colorRandom()
var data2Color = colorRandom()
var data3Color = colorRandom()

export default {
  data1Fill: `rgba(${data1Color},${fill})`,
  data1Outline: `rgba(${data1Color},${stroke})`,
  data1Highlight: `rgba(${data1Color},${highlight})`,

  data2Fill: `rgba(${data2Color},${fill})`,
  data2Outline: `rgba(${data2Color},${stroke})`,
  data2Highlight: `rgba(${data2Color},${highlight})`,

  data3Fill: `rgba(${data3Color},${fill})`,
  data3Outline: `rgba(${data3Color},${stroke})`,
  data3Highlight: `rgba(${data3Color},${highlight})`,
}





