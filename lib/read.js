/*

Datei-Einlese-Library
---------------------

API: modul.asDataUrl(file, callback)

Muss dem Callback die eingelesene Datei als Data-URL übergeben

*/

define(function(){

  'use strict';

  return {

    asDataUrl: function(file, callback){

      // FileReader anlegen
      var reader = new FileReader();

      // Erfolgs-Callback an Erfolgs-Event binden
      reader.addEventListener('load', function(){
        callback(this.result);
      }, false);

      // Datei-Einlesen starten
      reader.readAsDataURL(file);

    }

  };
});