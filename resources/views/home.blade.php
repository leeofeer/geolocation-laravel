@extends('layouts.dashboard')
@section('page_heading','Ubicacion')
@section('section')
           
<!-- /.row -->
<meta name="csrf-token" content="{{ csrf_token() }}">
<div class="row">
    <style>
        #map{
            height: 340px;
        }
    </style>
    
    <div class="col-md-5" id="premap">
        <div id="map"></div>
    </div>

    <div class="col-md-5">
        <input type="text" name="negocio" id="negocio" placeholder="Introduce el nombre de tu negocio" class="form-control">
        <label>Mueva la Marca en el Mapa a la posicion correcta.</label>
        <hr />

        <input type="text" name="latitud" class="form-control" id="latitud" placeholder="latitud">
        <input type="text" name="longitud" class="form-control" id="longitud" placeholder="longitud">

        <button onclick="guardarU()" class="btn btn-primary" id="boton_guardar">Guardar Ubicacion</button>
            
            <button onclick="ModificarU()" class="btn btn-success" disabled="" id="boton_modificar">Modificar Ubicacion</button>
            <button onclick="cancelar()" class="btn btn-alert"  id="boton_cancelar">Cancelar</button>
            
            <label id="idnegocio" style="visibility:hidden;"></label>

        <hr />   
        <label>Negocios Registrados</label>    
        <table class="table table-hover" id="ubicaciones">
            <thead>
                <th>ID</th>
                <th>Negocio</th>
                <th>Latitud</th>
                <th>Longitud</th>
                <th>Accion</th>
                <!--<button class="btn btn-sm btn-success">Ver</button>-->
            </thead>
            <tbody></tbody>
        </table>
            
    </div>
                
</div>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"
   integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
   crossorigin=""/>
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.4.0/leaflet.js">
</script>
<script src="{{ asset("assets/scripts/initMapas.js") }}"></script>
<script src="{{ asset("assets/scripts/operacionesUbicacion.js") }}"></script>
<script>
    (function(){
        cargarTabla();
    })();
</script>            
<!-- /.row -->

            
@stop
