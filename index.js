const express = require('express');
const resemble = require("resemblejs");
const cypress = require('cypress');
var app = require('express')();
var shell = require('shelljs');

app.use(express.static(__dirname));

app.get('/', async function(req, res){
	shell.exec('npm install cypress');
	res.render('./index.html');
});

app.get('/compare', async function(req, res){
	cypress.run({
		spec: 'cypress/integration/palette_spec.js'
	  })
	  .then((results) => {
			var img;
			var text;
			var diff = resemble('cypress/screenshots/palette_spec.js/test 11.png')
			.compareTo('cypress/screenshots/palette_spec.js/test 12.png')
			.ignoreLess()
			.onComplete(function(data) {
				console.log(data);
				text = data;
				img = data.getImageDataUrl();
			});
			var img2;
			var text2;
			diff = resemble('cypress/screenshots/palette_spec.js/test 21.png')
			.compareTo('cypress/screenshots/palette_spec.js/test 22.png')
			.ignoreLess()
			.onComplete(function(data) {
				console.log(data);
				text2 = data;
				img2 = data.getImageDataUrl();
				var fs = require('fs');
			});
			var html = '<h1>Taller 6 parte 2 VRT - Jose Alejandro Silva Ariza</h1>';
			html+='<form action="/">';
			html+='<input type="submit" value="Volver a inicio" />';
			html+='</form><br><br><table>';
			html+='<tr><th>Imagen base</th><th>Imagen modificada</th><th>Diferencias</th><th>Informacion importante</th></tr>';
			html+='<tr>';
      html+='<td><img src="cypress/screenshots/palette_spec.js/test 11.png" style="height: 174px; width: 272px"></td>';
      html+='<td><img src="cypress/screenshots/palette_spec.js/test 12.png" style="height: 174px; width: 272px"></td>';
			html+='<td><img src="'+img+'" style="height: 174px; width: 272px"></td>';
			html+='<td><h4>misMatchPercentage: '+text.misMatchPercentage+'<br>isSameDimensions:'+text.isSameDimensions+'<br>dimensionDifference:{width:'+text.dimensionDifference.width+', height:'+text.dimensionDifference.height+'}</h4></td>';
			html+='</tr>';
			html+='<tr>';
      html+='<td><img src="cypress/screenshots/palette_spec.js/test 21.png" style="height: 174px; width: 272px"></td>';
			html+='<td><img src="cypress/screenshots/palette_spec.js/test 22.png" style="height: 174px; width: 272px"></td>';
			html+='<td><img src="'+img2+'" style="height: 174px; width: 272px"></td>';
			html+='<td><h4>misMatchPercentage: '+text2.misMatchPercentage+'<br>isSameDimensions:'+text2.isSameDimensions+'<br>dimensionDifference:{width:'+text2.dimensionDifference.width+', height:'+text2.dimensionDifference.height+'}</h4></td>';
			html+='</tr>';
			html+='</table>';
			res.send(html);
	  })
	  .catch((err) => {
		console.error(err)
	  })
});

app.listen(process.env.PORT || 4000, function(){
    console.log('Node js server is running');
});
