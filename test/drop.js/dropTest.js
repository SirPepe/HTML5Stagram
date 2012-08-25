define(['lib/drop'], function(drop){

  var element = document.getElementById('Droptest');

  test('API-Vollständigkeit', function(){
    equal(typeof drop, 'function', 'drop-Modul übergibt Funktion');
  });

  asyncTest('Modul-Funktionalität', function(){
    drop('#Droptest', function(evt){
      ok(true, 'Callback feuert');
      ok($(this).hasClass('active'), 'active-Klasse wird angewendet');
      equal(typeof evt, 'object', 'drop-Callback übergibt Event-Objekt');
      start();
    });
  });

});