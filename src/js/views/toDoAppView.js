/*global define */
define(['require',
        'backbone',
        'jquery',
        'underscore',
        'collections/toDoList',
        'views/toDoListView'],
  function (require,Backbone,$,_,Todos,TodoView){
    'use strict';
    var ENTER_KEY = 13;

    var TodoListAppView = Backbone.View.extend({
      el: '#todoapp',
      statsTemplate: _.template( $('#stats-template').html() ),
      events: {
        'keypress #new-todo': 'createOnEnter',
        'click #clear-completed': 'clearCompleted',
        'click #toggle-all': 'toggleAllComplete'
      },
      initialize: function() {
        this.allCheckbox = this.$('#toggle-all')[0];
        this.$input = this.$('#new-todo');
        this.$footer = this.$('#footer');
        this.$main = this.$('#main');
        this.mainTodoList = new Todos();

        this.listenTo(this.mainTodoList, 'add', this.addOne);
        this.listenTo(this.mainTodoList, 'reset', this.addAll);
        this.listenTo(this.mainTodoList, 'change:completed', this.filterOne);
        this.listenTo(this.mainTodoList,'filter', this.filterAll);
        this.listenTo(this.mainTodoList, 'all', this.render);
        this.mainTodoList.fetch();
      },
      render: function(){
        console.log(this);
        var completed = this.mainTodoList.completed().length;
        var remaining = this.mainTodoList.remaining().length;
        if( this.mainTodoList.length ){
          this.$main.show();
          this.$footer.show();
          this.$footer.html(this.statsTemplate({completed: completed, remaining: remaining }));
          this.$('#filters li a')
              .removeClass('selected')
              .filter('[href="#/' + ( this.TodoFilter || '' ) + '"]').addClass('selected');

        }else{
          this.$main.hide();
          this.$footer.hide();
        }
        this.allCheckbox.checked = !remaining;
      },
      addOne: function( todo ) {
        var view = new TodoView({ model: todo });
        $('#todo-list').append( view.render().el );
      },
      addAll: function() {
        this.$('#todo-list').html('');
        this.mainTodoList.each(this.addOne, this);
      },
      filterOne : function (todo) {
        todo.trigger('visible');
      },
      filterAll : function () {
        this.mainTodoList.each(this.filterOne, this);
      },
      newAttributes: function() {
        return {
          title: this.$input.val().trim(),
          order: this.mainTodoList.nextOrder(),
          completed: false
        };
      },
      createOnEnter: function( event ) {
        if ( event.which !== ENTER_KEY || !this.$input.val().trim() ) {
          return;
        }
        this.mainTodoList.create( this.newAttributes() );
        this.$input.val('');
      },
      clearCompleted: function() {
        _.invoke(this.mainTodoList.completed(), 'destroy');
        return false;
      },
      toggleAllComplete: function() {
        var completed = this.allCheckbox.checked;
        this.mainTodoList.each(function( todo ) {
          todo.save({'completed': completed });
        });
      }
    });
 
    return new TodoListAppView();
  });