function cargarTabla(){
	$.ajax({
		url: "./lugares",
		dataType:"json",
		success: function(data){
			var tabla = $("#ubicaciones");
			tabla.find("tbody tr").remove();
			$.each(data, function(i,v){
				var fila = "<tr data-valor='valor"+v.id+"'>"+"<td>";
				fila += v.id +"</td>";
				fila += "<td>"+v.negocio +"</td>";
				fila += "<td>"+v.latitud +"</td>";
				fila += "<td>"+v.longitud +"</td>";
				fila += "<td>"+"<button class='btn btn-sm btn-success' onclick='verUbicacion("+v.id+")'>Ver</button>" +"</td>";
				fila += "<td>"+"<button class='btn btn-sm btn-danger' onclick='editar("+v.id+")''>Editar</button>" +"</td>";
				fila += "/<tr>";
						
				tabla.find("tbody").append(fila);
						
			});
		}
				
	});
	  
}

function guardarU(){
    var lat = document.getElementById('latitud').value;
    var lng = document.getElementById('longitud').value;
    var negocio = document.getElementById('negocio').value;
    
    $.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
	});
			
	$.ajax({
		url: "./lugares",
		method: "post",
		data: {negocio:negocio,latitud:lat,longitud:lng},
		success: function(data){
			//console.log(data);
			if(data=="OK"){
				cargarTabla()
			}
		}
				
	});
       //alert("Guardar en BD? neg:"+negocio+" lat:"+lat+" lng: "+lng);
  }

  function ModificarU(){
	//recogemos datos de los inputs en la pagina y preparamos la llamada ajax
	var lat = document.getElementById('latitud').value;
    var lng = document.getElementById('longitud').value;
    var negocio = document.getElementById('negocio').value;
	var idnegocio = $("#idnegocio").text();
 	//console.log(lat+lng+negocio+idnegocio);
	  
	//configuramos token 
	$.ajaxSetup({
    	headers: {
        	'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    	}
	});

	$.ajax({
		url: "./lugares/"+idnegocio,
		method: "put",
		data: {negocio:negocio,latitud:lat,longitud:lng},
		success: function(data){
			//console.log(data);

			if(data=="OK"){
				cargarTabla()
			}
		}
				
	});
  }

function actualizarPosicion(posicion){
    var lat = document.getElementById('latitud');
    var lng = document.getElementById('longitud');
    lat.value=`${posicion.lat}`;
    lng.value=`${posicion.lng}`;
    //console.log(lat);
    //console.log(`${posicion.lat}`+`${posicion.lng}`);
}

function verUbicacion(id){
	  //$('#mapa_modal').modal('show');
	  
	$("#premap").find("div").remove();
	$("#premap").append("<div id='map'></div>");
	  
	  
	$.ajax({
		url: "./lugares/"+id,
		dataType:"json",
		success: function(data){
			var latitud = data.latitud;
			var longitud = data.longitud;
			//console.log(data.latitud);
		  
			mostrarMapa(latitud,longitud);
		}
	});
}

 function editar(id){
	 //recargarmos el mapa en la ubicacion para poder seleccionar otras coordenadas
	 verUbicacion(id);
	 //deshabilitamos el boton de guardar y habilitamos el de modificar
	$("#boton_guardar").prop("disabled",true);
	$("#boton_modificar").prop("disabled",false);
	 
	//pedidmos la fila que coincide con el id y lo guardamos en la variable fila
    var fila = recuperarFila(id,'ubicaciones');
	
	//separamos el String en partes para usar sus elementos
	
	var filaSeparada = fila.split(",");
	//cada posicion es un dato: [0] corresponde al id,[1] al negocio, [2] a la latitud, [3] a la longitud.
	
	//asignamos valores a los inputs
	
	$("#idnegocio").text(filaSeparada[0]);
    $("#negocio").val(filaSeparada[1]);
	$("#latitud").val(filaSeparada[2]);
	$("#longitud").val(filaSeparada[3]);
	
    
 }
 
 function cancelar(){
	$("#boton_guardar").prop("disabled",false);
	$("#boton_modificar").prop("disabled",true);
	$("#negocio").val("");
	$("#latitud").val("");
	$("#longitud").val("");
	$("#idnegocio").text("");
 }

 function recuperarFila(id, tabla){
	 //funcion que recorre la tabla y guarda el contenido de las filas en variables
	var fila; //variable que almacena la fila que coincide con el id seleccionado
	$("#"+tabla+" tbody tr").each(function (index){
		//array para guardar las filas de la tabla
		var filas = new Array()
		$(this).children("td").each(function(index2){
			switch (index2){
				case 0:
					filas['idnegocio'] = $(this).text();
				break;
			
				case 1:
					filas['negocio'] = $(this).text();
				break;
			
				case 2:
					filas['latitud'] = $(this).text();
				break;
			
				case 3:
					filas['longitud'] = $(this).text();
				break;

			}
			
		});
		//condicional que compara los registros de la tabla con el id 
		if (filas['idnegocio']==id) {
			//guarda el valor de la fila en un String
			fila = filas['idnegocio']+","+filas['negocio']+","+filas['latitud']+","+filas['longitud'];
			
		} 
		
    });
	//retorna la fila
	return fila;
 }

