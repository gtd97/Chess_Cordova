// Login
$( "#enviarFormulario" ).click(function() {
	alert("ha clicado en enviarFormulario");

	$.ajax({
	    url : 'ajedrezapi.herokuapp.com/api/login',
	    data : { 
	    	usuario : $("input[name='user']"),
	    	password: $("input[name='password']") 
	    },

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


