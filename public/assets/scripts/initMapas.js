

//pedir permiso al usuario para que el navegador capture la posicion

navigator.geolocation.getCurrentPosition(pedirPosicion);

//funcion que ejecuta la API de html
function pedirPosicion(pos) {
    var latitud = pos.coords.latitude;
    var longitud = pos.coords.longitude;
    var precision = pos.coords.accuracy;

    mostrarMapa(latitud,longitud);

    //console.log(latitud+" lon:"+longitud+" precision "+precision);   
}



function mostrarMapa(latitud,longitud){
//dibuja el mapa con las coordenadas capturadas por el navegador
	
    var map = L.map('map');
			
	map.setView([latitud, longitud], 17);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
        {
        	attribution: 'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a>',
        	minZoom:14,
        	maxZoom: 18
        }).addTo(map);
    //agrega control de escala
    L.control.scale().addTo(map);

    map.locate({setView: true, maxZoom: 14});

    //inserta marcador movible
    var marker = L.marker([latitud, longitud],{draggable:true}).addTo(map);
    //capturar el evento al mover el marcador
	marker.on("dragend", function(e){
		var marcador = e.target;
		var posicion = marcador.getLatLng();
		//console.log(posicion);
    	//enviar las coordenadas a la funcion para su procesamiento
		actualizarPosicion(posicion);
	});
}


