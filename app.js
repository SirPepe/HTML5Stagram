/*jshint browser:false */
/*global jQuery:false */

require([
    'lib/vendor/jquery',
    'lib/drop',
    'lib/read',
    'lib/canvas',
    'lib/photo',
    'lib/vendor/filtr'
  ],
  function($, drop, read, canvas, photo, filtr){


  // Douglas-Crockford-Mode aktivieren
  'use strict';


  // Projektweite Filter-Variable
  var filter;


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
          // Steuerungselemente aktivieren, Filtr (re-)initialisieren
          enableControls();
          filter = filtr('#Dropzone');
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
      // Aufnahme stoppen, Steuerungselemente aktivieren,
      // Filtr (re-)initialisieren
      else {
        photo.stopRecording();
        $('#Record').attr('value', 'Webcam aufnehmen');
        enableControls();
        filter = filtr('#Dropzone');
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


  // Effekte anwenden
  $('#Contrast, #Saturation, #Sepia').on('change keyup', function(){
    var amountContrast = $('#Contrast').val();
    var amountSaturation = $('#Saturation').val();
    var amountSepia = $('#Sepia').val();
    filter
      .revertSource()
      .contrast(amountContrast)
      .saturation(amountSaturation)
      .sepia(amountSepia)
      .render();
  });


});