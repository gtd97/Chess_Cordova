// Login
$( "#enviarFormulario" ).click(function() {
	
	$.ajax({
	    url : 'ajedrezapi.herokuapp.com/api/login',
	    data : { usuario: $('#ValorUser'), password: $('ValorPassword')},

	    type : 'GET',
	    dataType : 'json',

	    success : function(json) {
	       alert( JSON.strinigfy(json) );
	    },
	 
	    error : function(xhr, status) {
	        alert('Disculpe, existió un problema');
	    },
	 
	    complete : function(xhr, status) {
	        alert('Petición realizada');
	    }
	});
});


