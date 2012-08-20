/*global jQuery:false */

require(['lib/drop', 'lib/read', 'lib/canvas'], function(drop, read, canvas){

  // Douglas-Crockford-Mode aktivieren
  'use strict';

  // Canvas initalisieren
  canvas.init('#Dropzone');


  // Drops auf #Dropzone registrieren
  drop('#Dropzone', function(evt){

    // Erster Eintrag in der Dateiliste = unser Bild
    var file = evt.dataTransfer.files[0];

    // Datei als Base64-String einlesen. Wenn die Datei eingelesen ist, Bild
    // auf die Canvas zeichnen
    read.asDataURL(file, function(content){
      canvas.drawURL(content, function(){
        $('input').removeAttr('disabled'); // Inputs aktivieren
      });
    });

  });


  // Beim Klick auf "Löschen" die Canvas putzen und die Controls
  // deaktivieren/resetten
  $('#Delete').click(function(){
    if(!this.disabled){
      canvas.reset();
      // Alle Inputs deaktivieren...
      $('input').attr('disabled', 'disabled');
      // ... und auf ihre Standardwerte zurücksetzen
      $('#Contrast, #Saturation, #Sepia').each(function(index, input){
        $(input).val($(input).data('default'));
      });
    }
  });


});