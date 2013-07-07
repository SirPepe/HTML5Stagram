define(['lib/drop', 'lib/vendor/jquery'], function(drop){

  var element = document.getElementById('Droptest');

  test('API-Vollständigkeit', function(){
    equal(typeof drop, 'function', 'drop-Modul übergibt Funktion');
    equal(drop.length, 2, 'drop-Funktion akzeptiert zwei Parameter');
  });

  asyncTest('Modul-Funktionalität', function(){
    drop('#Droptest', function(evt){
      ok(true, 'Callback feuert');
      equal(this, $('#Droptest')[0], '"this" im drop-Callback ist das Drop-Ziel');
      ok($(this).hasClass('active'), 'active-Klasse wird angewendet');
      equal(typeof evt, 'object', 'drop-Callback übergibt Event-Objekt');
      stop();
      setTimeout(function(){
        ok(!$(this).hasClass('active'), 'active-Klasse wird wieder entfernt');
        start();
      }.bind(this), 500);
      start();
    });
  });

});