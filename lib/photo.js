// Foto-Schieß-Funktion
define(['lib/vendor/jquery'], function($){

  'use strict';

  return {

    // Gibt an, ob Aufnehmen von diesem Browser unterstützt wird
    supportsRecording: (typeof navigator.getUserMedia !== 'undefined'),

    // Gibt an, ob gerade aufgenommen wird oder nicht
    isRecording: false,

    // Initialisierung; Variablen `canvas` und `context` belegen, Video-Element
    // erzeugen
    init: function(selector){
      canvas.init(selector);
      this.context = this.canvas.getContext('2d');
      this.video = $('<video>')[0];
    },

    // Überträgt Video-Daten vom Video-Element auf das Canvas-Element
    drawToCanvas: function(){
      var self = this;
      $(this.video).on('play', function(){
        // Der Timeout ist ein Hack für FF ~21
        setTimeout(function(){
          self.canvas.attr({
            width: self.video.videoWidth,
            height: self.video.videoHeight
          });
          window.requestAnimationFrame(function render(){
            if(self.isRecording){
              self.context.drawImage(self.video, 0, 0);
              window.requestAnimationFrame(render);
            }
          });
        }, 500);
      });
    },

    // Startet die Übertragung
    startRecording: function(callback){
      var self = this;
      navigator.getUserMedia({ video: true, audio: false }, function(stream){
        self.video.src = window.URL.createObjectURL(stream);
        self.video.play();
        self.isRecording = true;
        self.drawToCanvas();
        callback();
      }, function(err){
        window.alert('Fehler ' + err.code);
        console.log(err);
      });
    },

    // Stoppt die Übertragung von Video-Daten auf das Canvas-Element
    stopRecording: function(){
      this.isRecording = false;
    }

  };

});