// Foto-Schieß-Funktion
define(['lib/vendor/jquery'], function(){

  'use strict';

  var canvas, context, video;

  navigator.getUserMedia = navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia;

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
      $(video).on('loadedmetadata', function(){
        canvas.attr({
          height: video.videoHeight,
          width: video.videoWidth
        });
      });
      var self = this;
      window.requestAnimationFrame(function render(){
        if(self.isRecording){
          context.drawImage(video, 0, 0);
          window.requestAnimationFrame(render);
        }
      });
    },


    // Startet die Übertragung
    startRecording: function(){
      var self = this;
      navigator.getUserMedia({ video: true, audio: false }, function(stream){
        video.src = window.URL.createObjectURL(stream);
        video.play();
        self.isRecording = true;
        self.drawToCanvas();
      }, function(err){
        window.alert('Fehler: ' + err);
      });
    },


    // Stoppt die Übertragung von Video-Daten auf das Canvas-Element
    stopRecording: function(){
      this.isRecording = false;
    }


  };

});