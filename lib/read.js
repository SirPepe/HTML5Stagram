/*jshint browser:false */
/*global jQuery:false */

// Einfaches Datei-Einlesen
define(function(){

  return {

    asDataURL: function(file, callback){

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