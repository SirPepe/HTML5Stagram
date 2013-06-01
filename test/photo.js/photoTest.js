define(['lib/photo'], function(photo){

  test('API-Vollständigkeit', function(){
    equal(typeof photo, 'object', 'photo-Modul übergibt Objekt');
    equal(typeof photo.supportsRecording, 'boolean', 'photo.supportsRecording ist ein Boolean');
    equal(typeof photo.isRecording, 'boolean', 'photo.isRecording ist ein Boolean');
    equal(typeof photo.init, 'function', 'photo.init ist eine Funktion');
    equal(typeof photo.drawToCanvas, 'function', 'photo.drawToCanvas ist eine Funktion');
    equal(typeof photo.startRecording, 'function', 'photo.startRecording ist eine Funktion');
    equal(typeof photo.stopRecording, 'function', 'photo.stopRecording ist eine Funktion');
  });

  test('supportsRecording', function(){
    var api = navigator.getUserMedia ||
              navigator.webkitGetUserMedia ||
              navigator.mozGetUserMedia ||
              navigator.msGetUserMedia;
    var supportsTest = (typeof navigator.getUserMedia !== 'undefined');
    equal(photo.supportsRecording, supportsTest, 'photo.supportsRecording gibt Browserunterstützung an');
  });

});