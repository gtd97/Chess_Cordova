$('#ValorUser').val("genis");
$('#ValorPassword').val("P@ssw0rd");

// Login
$( "#enviarFormulario" ).click(function() {	
	var user = $('#ValorUser').val();
	var pass = $('#ValorPassword').val();
	


	$.ajax({
		type : "GET",
	    url : "https://ajedrezapi.herokuapp.com/api/login/"+user+"/"+pass,	   
	    
	   	success: function(respuesta){
	   		respuesta = JSON.parse(respuesta);
	   		
        	if( respuesta.status == "Ok" ){
        		localStorage.setItem('token', respuesta.token );
        		window.location.replace("listado.html");
        	}
        },

        error: function(respuesta){
        	alert( "erroor ----> " + JSON.stringify(respuesta) );
        } 
    });

});


$("#botonBuscarPartida").click(function() {	

	$.ajax({
		type : "GET",
	    url : "https://ajedrezapi.herokuapp.com/api/en_espera/"+localStorage.getItem('token');,	   
	    
	   	success: function(respuesta){
	   		respuesta = JSON.parse(respuesta);
	   		alert(JSON.stringify(respuesta));
        	
        },

        error: function(respuesta){
        	alert( "erroor ----> " + JSON.stringify(respuesta) );
        } 
    });
});

/*
<h1>Usuarios Conectado</h1>
<hr>
<table id="tablaJugadores" class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Jugador</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td><button id="invitar" class="btn-danger botonBorder">invitar</button></td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td><button id="invitar" class="btn-danger botonBorder">invitar</button></td>
    </tr>
  
  </tbody>
</table>
*/