/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    printarTablero: function(){
        var padre = $("#tablero");
        var listaH = [' ','A','B','C','D','E','G','H','I'];
        var listaV = [' ','1','2','3','4','5','6','7','8'];
        var contador = 0;
        var tabla = $("<table class='tabla'></table>");
        var tbody = $("<tbdoy></tbdoy>");

        for ( var filas = 0; filas < listaH.length; filas++ ){
            var tr = $("<tr>"+filas+"</tr>");

            for ( var columnas = 0; columnas < listaV.length; columnas++ ){
                
                if( filas == 0){
                    var td = $("<td class='recuadro'>"+ listaH[columnas] +"</td>");
                }
                else if( columnas == 0 ){
                    var td = $("<td class='recuadro'>"+ listaV[filas] +"</td>");
                }
                else{
                    if(contador % 2 == 0){
                        var td = $("<td class='blanco' id='"+ listaV[filas]+","+listaH[columnas] +"'></td>");    
                    }else{
                        var td = $("<td class='negro' id='"+ listaV[filas]+","+listaH[columnas] +"'></td>");
                    }
                    
                }
                tr.append(td);
                contador++;
            }
            tbody.append(tr);
        }

        tabla.append(tbody);
        padre.append(tabla);

    }
};

app.initialize();
app.printarTablero();


$( "td" ).click(function() {
  alert( this.id );
});