define(['backbone'],function(Backbone){
  'use strict';

  var TodoItem = Backbone.Model.extend({
    defaults: {
      title: '',
      completed: false
    },
    toggle: function() {
      this.save({ completed: !this.get('completed') });
    }
  });

  return TodoItem;
});