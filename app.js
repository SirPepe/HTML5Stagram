var pageModel, imageModel;

(function(){

  var deps = [
    'app/drop',
    'app/read',
    'app/canvas',
    'lib/jquery',
    'lib/angular'
  ];

  require(deps, function(drop, read, canvas){

    drop('#Dropzone', function(evt){

      // Erster Eintrag in der Dateiliste = unser Bild
      var file = evt.dataTransfer.files[0];

      // Datei als Base64-String einlesen. Wenn die Datei eingelesen ist, Bild auf die
      // Canvas zeichnen und zwischenspeichern
      read.asDataURL(file, function(content){
        canvas.init('#Dropzone');
        canvas.drawURL(content, function(){});
      });

    });

  });

})();