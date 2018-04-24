$('#tabla').hide();
$('#listado').hide();
$('#tablero').hide();


$('#ValorUser').val("genis");
$('#ValorPassword').val("P@ssw0rd");


// Llamada para saber si te han invitado
function invitaciones(){
  $.ajax({
    type : "GET",
    url : "https://ajedrezapi.herokuapp.com/api/id_partida/"+localStorage.getItem('mi_id')+"/"+localStorage.getItem('token'),     
    
    success: function(respuesta){
      respuesta = JSON.parse(respuesta);
      localStorage.setItem('partida_actual', respuesta.response[0]);
      $('#index').hide();
      $('#listado').hide();
      $('#tablero').show();
      generarTablero( respuesta.response[0] );
      //window.location.replace("partida.html");
    },
    error: function(respuesta){
      alert( "erroor ----> " + JSON.stringify(respuesta) );
    } 
  });
}


// Obtencion del id usuario
$.ajax({
  type : "GET",
  url : "https://ajedrezapi.herokuapp.com/api/id_usuario/"+localStorage.getItem('token'),     
  
  success: function(respuesta){
    respuesta = JSON.parse(respuesta);
    localStorage.setItem('mi_id', respuesta[0].id);
  },
  error: function(respuesta){
    alert( "erroor ----> " + JSON.stringify(respuesta) );
  } 
});


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
      	$('#index').hide();
        $('#listado').show();
        //window.location.replace("listado.html");
      }
    },
    error: function(respuesta){
     	alert( "erroor ----> " + JSON.stringify(respuesta) );
    } 
  });
});


// Generar Listado Usuarios
$("#botonBuscarPartida").click(function() {
  setInterval(invitaciones, 100);	
  $('#tabla').show();$('#tabla').show();
  $('#botonBuscarPartida').hide();

	$.ajax({
		type : "GET",
    url : "https://ajedrezapi.herokuapp.com/api/en_espera/"+localStorage.getItem('token'),	   
    
   	success: function(respuesta){
   		respuesta = JSON.parse(respuesta);

      for (var num = 0; num < respuesta.length; num++){
        numero = 1;
        // Columna
        var tr = $('<tr></tr>');
        // Numero
        var th = $('<th scope="row">'+numero+'</th>');
        // Name
        var tdName = $('<td>'+respuesta[num].name+'</td>');
        // Boton
        var tdBoton = $('<td></td>');
        var button = $('<button id="'+respuesta[num].id+'" class="btn btn-danger">Retar!</button>').click( function(e) {
          // target sirve para coger el elemento clickado
          retar(e.target.id);
        });

        tdBoton.append(button);
        tr.append(th);
        tr.append(tdName);
        tr.append(tdBoton);
        $('#tbody').append(tr);
        numero++;
      }  
    },
    error: function(respuesta){
     	alert( "erroor ----> " + JSON.stringify(respuesta) );
    }    
  });
});


// funcion para retar a un usuario
function retar(e){
  $.ajax({
    type: "GET",
    url: "https://ajedrezapi.herokuapp.com/api/crear_partida/"+localStorage.getItem('mi_id')+"/"+e+"/"+localStorage.getItem('token'),

    success: function(respuesta){
      respuesta = JSON.parse(respuesta);
      
      if(respuesta.estado == 'Ok'){
        //alert(JSON.stringify(respuesta));
        localStorage.setItem('arrayFichas', respuesta.mensaje );
        $('#index').hide();
        $('#listado').hide();
        $('#tablero').show();
        //window.location.replace("partida.html");
      }
    },
    error: function(respuesta){
      alert( "erroor ----> " + JSON.stringify(respuesta) );
    } 

  });
}

// funcion que genera el tablero inicial
function generarTablero(e){
  //  /generarTablero/{id_partida}/{jugador1}/{jugador2}/{token}
  //alert( "https://ajedrezapi.herokuapp.com/api/generarTablero/"+e.id+"/"+localStorage.getItem('token') );

  $.ajax({
    type: "GET",
    url: "https://ajedrezapi.herokuapp.com/api/generarTablero/"+e.id+"/"+localStorage.getItem('token'),

    success: function(respuesta){
      respuesta = JSON.parse(respuesta);
      localStorage.setItem('fichas1', respuesta.fichas[0].fila + "," + respuesta.fichas[0].columna );
      localStorage.setItem('fichas2', respuesta.fichas[1].fila + "," + respuesta.fichas[1].columna );
      test();
    },
    error: function(respuesta){
      alert( "erroor generarTablero ----> " + JSON.stringify(respuesta) );
    } 
  });
  
}