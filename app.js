/*jshint browser:false */
/*global jQuery:false */

require(['lib/drop', 'lib/read', 'lib/canvas', 'lib/vendor/caman.min'],
  function(drop, read, canvas){

  // Douglas-Crockford-Mode aktivieren
  'use strict';

  // Canvas initalisieren
  canvas.init('#Dropzone');


  // Drops auf #Dropzone registrieren
  drop('#Dropzone', function(evt){

    // Erster Eintrag in der Dateiliste = unser Bild. IE kann das leider nicht
    if(evt.dataTransfer.files){
      var file = evt.dataTransfer.files[0];

      // Datei als Base64-String einlesen. Wenn die Datei eingelesen ist, Bild
      // auf die Canvas zeichnen
      read.asDataURL(file, function(content){
        canvas.drawUrl(content, function(){
          $('input').removeAttr('disabled'); // Inputs aktivieren
        });
      });

    }

  });


  // Beim Klick auf "Löschen" die Canvas putzen und die Controls
  // deaktivieren/resetten
  $('#Delete').click(function(){
    if(!this.disabled){
      canvas.reset();
      $('input').attr('disabled', 'disabled');
      $('#Contrast, #Saturation, #Sepia').val(function(){
        return $(this).data('default');
      });
    }
  });


  // Beim Klick auf "Speichern" die Bilddaten exportieren
  $('#Save').click(function(){
    if(!this.disabled){
      var url = canvas.el().toDataURL();
      location.href = url;
    }
  });

  // Caman-Wrapper
  var filter = function(filter, amount){
    Caman('#Dropzone', function(){
      this[filter](amount).render();
    });
  };


  // UI-Bindings
  $('#Contrast').change(function(){
    var amount = $(this).val() / 5;
    filter('contrast', amount);
  });
  $('#Saturation').change(function(){
    var amount = $(this).val();
    filter('saturation', amount);
  });
  $('#Sepia').change(function(){
    var amount = $(this).val();
    filter('sepia', amount);
  });


});