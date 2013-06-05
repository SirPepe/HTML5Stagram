/*

Canvas-Library
--------------

API:

 * modul.init(selector)
 * modul.reset()
 * modul.drawUrl(url, callback)

*/

define(['lib/vendor/jquery'], function($){

  'use strict';

  var canvas, context;

  return {

    // Initialisierung; Variablen `canvas` und `context` neu belegen
    init: function(selector){
      canvas = $(selector);
      context = canvas[0].getContext('2d');
    },

    // Canvas komplett löschen
    reset: function(){
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    },

    // Inhalt einer URL auf die Canvas malen
    drawUrl: function(url, callback){
      var img = new Image();
      img.src = url;
      img.addEventListener('load', function(){
        canvas.attr({
          width: img.naturalWidth,
          height: img.naturalHeight
        });
        context.drawImage(img, 0, 0);
        callback();
      }, false);
    }

  };

});