$('#ValorUser').val("genis");
$('#ValorPassword').val("P@ssw0rd");


// Llamada para saber si te han invitado
function invitaciones(){
  // url: esta url devuelve los datos de la partida, siempre y cuando estes en alguna de ellas
  $.ajax({
    type : "GET",
    url : "https://ajedrezapi.herokuapp.com/api/id_partida/"+localStorage.getItem('mi_id')+"/"+localStorage.getItem('token'),     
    
    success: function(respuesta){
      respuesta = JSON.parse(respuesta);
      localStorage.setItem('partida_actual', respuesta.response[0].id);
      window.location.replace("partida.html");
    },
    error: function(respuesta){
      console.log( "erroor ----> " + JSON.stringify(respuesta) );
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
    console.log( "erroor ----> " + JSON.stringify(respuesta) );
  } 
});


// Login: Comprovacion de si el usuario y contraseña es correcto, y obtencion del token en el caso de que sea correcto todo.
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
     	console.log( "erroor login ----> " + JSON.stringify(respuesta) );
    } 
  });
});


// Generar Listado Usuarios: funcion para realizar la lista de todos los jugadores que estan en busqueda de partida
$("#botonBuscarPartida").click(function() {

  $.ajax({
    type : "GET",
    url : "https://ajedrezapi.herokuapp.com/api/cambiar_estado_busqueda/"+localStorage.getItem('token'),     
    
    success: function(respuesta){
      respuesta = JSON.parse(respuesta);   
    },
    error: function(respuesta){
      console.log( "erroor cambiar_estado_busqueda ----> " + JSON.stringify(respuesta) );
    }    
  });
  
  setInterval(invitaciones, 100);	
  //$('#tabla').show();$('#tabla').show();
  $('#botonBuscarPartida').hide();
  //$('#contenedortabla').show();

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
     	console.log( "erroor en_espera ----> " + JSON.stringify(respuesta) );
    }    
  });
});


// funcion para retar a un usuario, al clicar a un usuario de la lista creara automaticamente partida con él y sera invitado
function retar(e){
  $.ajax({
    type: "GET",
    url: "https://ajedrezapi.herokuapp.com/api/crear_partida/"+localStorage.getItem('mi_id')+"/"+e+"/"+localStorage.getItem('token'),

    success: function(respuesta){
      respuesta = JSON.parse(respuesta);
      
      if(respuesta.estado == 'Ok'){
        //alert(JSON.stringify(respuesta));
        localStorage.setItem('arrayFichas', respuesta.mensaje );
        console.log( localStorage.getItem('arrayFichas') );
        //window.location.replace("partida.html");
      }
    },
    error: function(respuesta){
      console.log( "erroor crear_partida ----> " + JSON.stringify(respuesta) );
    } 
  });
}









/*
// funcion que obtener las fichas
function generarTablero(e){
    $.ajax({
      type: "GET",
      url: "https://ajedrezapi.herokuapp.com/api/generarTablero/"+e.id+"/"+localStorage.getItem('token'),

      success: function(respuesta){
        respuesta = JSON.parse(respuesta);
        alert( "FICHAS --> " + JSON.stringify(respuesta) );
        
      },
      error: function(respuesta){
        alert( "error generarTablero ----> " + JSON.stringify(respuesta) );
      } 
    });
}
*/