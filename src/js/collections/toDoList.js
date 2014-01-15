define(['backbone','localStorage','models/toDoItem'],
  function (Backbone,ls,myModel) {
    'use strict';
    
    var TodoList = Backbone.Collection.extend({
        model: myModel,
        localStorage: new Backbone.LocalStorage('todoItems-backbone'),
        completed: function() {
            return this.filter(function( todo ) {
                return todo.get('completed');
              });
          },
        remaining: function() {
            return this.without.apply( this, this.completed() );
          },
        nextOrder: function() {
            if ( !this.length ) {
              return 1;
            }
            return this.last().get('order') + 1;
          },
        comparator: function( todo ) {
          return todo.get('order');
        }
      });
    
    return TodoList;
  });