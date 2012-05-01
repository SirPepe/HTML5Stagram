// Einfaches Datei-Einlesen
define(function(){

  return {
    asDataURL: function(file, callback){

      // FileReader anlegen
      var reader = new FileReader();

      // Erfolgs-Callback an Erfolgs-Event binden
      reader.addEventListener('load', function(){
        callback.call(this, this.result);
      }, false);

      // Datei-Einlesen
      reader.readAsDataURL(file);

    }
  };

});