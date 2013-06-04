// Foto-Schieß-Funktion
define(['lib/vendor/jquery'], function(){

  'use strict';

  var canvas, context, video;

  return {

    // Gibt an, ob Aufnehmen von diesem Browser unterstützt wird
    supportsRecording: (typeof navigator.getUserMedia !== 'undefined'),

    // Gibt an, ob gerade aufgenommen wird oder nicht
    isRecording: false,

    // Initialisierung; Variablen `canvas` und `context` belegen, Video-Element
    // erzeugen
    init: function(selector){
      canvas = $(selector);
      context = canvas[0].getContext('2d');
      video = $('<video>')[0];
    },

    // Überträgt Video-Daten vom Video-Element auf das Canvas-Element
    drawToCanvas: function(){
      var self = this;
      $(video).on('loadedmetadata', function(){
        console.log(video.duration);
        console.log(video.videoWidth);
        console.log(video.videoHeight);
      });
      $(video).on('play', function(){
        // Der Timeout ist ein Hack für FF ~21
        setTimeout(function(){
          canvas.attr({
            width: video.videoWidth,
            height: video.videoHeight
          });
          window.requestAnimationFrame(function render(){
            if(self.isRecording){
              context.drawImage(video, 0, 0);
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
        video.src = window.URL.createObjectURL(stream);
        video.play();
        self.isRecording = true;
        self.drawToCanvas();
        callback();
        console.dir(stream);
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