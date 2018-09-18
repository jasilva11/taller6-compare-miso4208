const express = require('express');
const resemble = require("resemblejs");
const app = express();

app.use(express.static(__dirname + '/public/'));

app.listen('3001', function() {
  console.log('Servidor web escuchando en el puerto 3001');
});

app.get('/compare', function(req, res){
	var img;
	var text;
	var diff = resemble('images/Captura.png')
	.compareTo('images/Captura2.png')
	.ignoreLess()
	.onComplete(function(data) {
	    console.log(data);
	    text = data;
		img = data.getImageDataUrl();
	    /*
	{
	  misMatchPercentage : 100, // %
	  isSameDimensions: true, // or false
	  dimensionDifference: { width: 0, height: -1 }, // defined if dimensions are not the same
	  getImageDataUrl: function(){}
	}
	*/
	});
    //res.send('<h4>'+diff+'</h4>');
    res.send('<div><img src="'+img+'" style="height: 174px; width: 272px;"/>	<img src="'+img+'" style="height: 174px; width: 272px;"/> 	<img src="'+img+'" style="height: 174px; width: 272px;"/>		<h4>misMatchPercentage: '+text.misMatchPercentage+'<br>isSameDimensions: '+text.isSameDimensions+'<br>dimensionDifference: '+JSON.stringify(text.dimensionDifference)+'</h4></div>');
   	//document.getElementById("div_imagen").html('<img src="demoassets/People.jpg"/>');
});