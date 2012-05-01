// Drag & Drop-Modul
define(['lib/jquery'], function(){
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
        $(this).removeClass('active');
        evt.preventDefault();
        callback.call(this, evt.originalEvent);
      }

    });

  };
});