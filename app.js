/*jshint browser:false */
/*global jQuery:false */

require([
    'lib/vendor/jquery',
    'lib/drop',
    'lib/read',
    'lib/canvas',
    'lib/photo',
    'lib/vendor/caman.min'
  ],
  function($, drop, read, canvas, photo){


  // Douglas-Crockford-Mode aktivieren
  'use strict';


  // Hilfsfunktionen zum (de)aktivieren der Steuerungselemente
  function enableControls(){
    $('input[type=number], #Save, #Delete').attr('disabled', false);
  }
  function disableControls(){
    $('input[type=number], #Save, #Delete').attr('disabled', true);
    $('input[type=number]').val(function(){
      return $(this).data('default');
    });
  }


  // Canvas initalisieren
  canvas.init('#Dropzone');


  // Drops auf #Dropzone registrieren
  drop('#Dropzone', function(evt){

    // Erster Eintrag in der Dateiliste = unser Bild
    if(evt.dataTransfer.files){
      var file = evt.dataTransfer.files[0];

      // Datei als Base64-String einlesen. Wenn die Datei eingelesen ist, Bild
      // auf die Canvas zeichnen
      read.asDataURL(file, function(content){
        canvas.drawUrl(content, function(){
          enableControls();
        });
      });

    }

  });


  // Foto-Funktion initialisieren, wenn der Browser Unterstützung anbietet
  if(photo.supportsRecording){
    photo.init('#Dropzone');
    $('#Record').attr('disabled', false).click(function(){
      // Aufnahme starten
      if(!photo.isRecording){
        photo.startRecording(function(){
          $('#Record').attr('value', 'Foto schießen');
          disableControls();
        });
      }
      // Aufnahme stoppen
      else {
        photo.stopRecording();
        $('#Record').attr('value', 'Webcam aufnehmen');
        enableControls();
      }
    });
  }


  // Beim Klick auf "Löschen" die Canvas putzen und die Controls deaktivieren
  $('#Delete').click(function(){
    if(!this.disabled){
      canvas.reset();
      disableControls();
    }
  });


  // Beim Klick auf "Speichern" die Bilddaten exportieren
  $('#Save').click(function(){
    if(!this.disabled){
      var url = $('canvas')[0].toDataURL();
      location.href = url;
    }
  });


  // Caman-Wrapper
  var filter = function(filter, amount){
    Caman('#Dropzone', function(){
      this[filter](amount).render();
    });
  };


  // UI-Bindings für Caman
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