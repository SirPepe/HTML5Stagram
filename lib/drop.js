// Drag & Drop-Modul
define(['lib/vendor/jquery'], function(){

  'use strict';

  return function(selector, callback){

    $(selector).bind({

      // Drop-Operation ermöglichen
      dragover: function(evt){
        evt.preventDefault();
      },

      // Aktiv-Klasse bei Dropover
      dragenter: function(evt){
        $(this).addClass('active');
      },
      dragleave: function(evt){
        $(this).removeClass('active');
      },

      // Drop-Event
      drop: function(evt){
        callback.call(this, evt.originalEvent);
        $(this).removeClass('active');
        evt.preventDefault();
      }

    });

  };
});