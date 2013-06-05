// Foto-Schieß-Funktion
define(['lib/vendor/jquery'], function($){

  'use strict';

  var video, context, canvas;

  return {

    // Gibt an, ob Aufnehmen von diesem Browser unterstützt wird
    supportsRecording: (typeof navigator.getUserMedia !== 'undefined'),

    // Gibt an, ob gerade aufgenommen wird oder nicht
    isRecording: false,

    // Initialisierung; Variablen `canvas` und `context` belegen,
    // Video-Element `video` erzeugen
    init: function(selector){
      canvas = $(selector)[0];
      context = canvas.getContext('2d');
      video = $('<video>')[0];
    },

    // Startet die Aufnahme
    startRecording: function(callback){
      var self = this;
      navigator.getUserMedia({ video: true, audio: false }, function(stream){
        self.playStream(stream, callback);
      }, function(err){
        window.alert('Fehler ' + err.code);
        console.log(err);
      });
    },

    // Beginnt den Stream abzuspielen. Sobald das Video läuft, wird der Callback
    // `next()` ausgeführt
    playStream: function(stream, callback){
      video.src = window.URL.createObjectURL(stream);
      this.isRecording = true;
      video.play();
      $(video).on('play', function(){
        this.resizeCanvas(callback);
        this.copyVideo();
      }.bind(this));
    },

    // Passt die Canvas-Größe auf die Größe des Video-Elements an
    resizeCanvas: function(callback){
      $(video).on('loadedmetadata', function(){
        $(canvas).attr({
          width: video.videoWidth,
          height: video.videoHeight
        });
        callback();
      });
    },

    // Überträgt Video-Daten vom Video-Element auf das Canvas-Element. Der
    // Timeout ist ein Hack für einen Bug im Firefox ~21
    copyVideo: function(){
      var self = this;
      setTimeout(function(){
        window.requestAnimationFrame(function render(){
          if(self.isRecording){
            context.drawImage(video, 0, 0);
            window.requestAnimationFrame(render);
          }
        });
      }, 500);
    },

    // Stoppt die Übertragung von Video-Daten auf das Canvas-Element
    stopRecording: function(){
      this.isRecording = false;
      video.pause();
    },

    // Getter für Video- und Canvas-Elemente
    getVideo: function(){ return video; },
    getCanvas: function(){ return canvas; }

  };

});