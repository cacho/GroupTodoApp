/*global define */
define(function (require) {
  'use strict';
  //['require','models/toDoItem','collections/toDoList','views/toDoListView','views/toDoAppView']
  var App = (function() {

    // constructor
    function App() {

      // context ref
      var _this = this;
      // toDoList App view
      this.todoAppView=require('views/toDoAppView');
      // new backbone router
      this.Router = new (this.Backbone.Router.extend({

        routes: {
          '': 'home',
          '*notFound': 'notFound',
          '*filter':'setFilter'
        },

        home: function() {
         /* var tpl = require('hbs!../templates/home');
          _this.$('.progress-bar').width('100%');
          setTimeout(function(){
            _this.$('#main-container').html(tpl());
           loadHome();
          },1000);*/
        },

        notFound: function() {
          _this.Router.navigate('#/');
        },
        
        setFilter:function(params){
          window.app.Todos.trigger('filter');
        }

      }))();

      // history backbone start
      this.Backbone.history.start();
      //start our ToDoApp
     // app.Todos = new TodoList();
      //var tdl= new TodoListAppView();
      //app.TodoRouter = this.Router;
    
    }

    function loadHome(){
      //var userList= new UserListView();
      //userList.render();
      //console.log(userList.el);

    }
   

    // My Awesome App VERSION
    App.prototype.VERSION = '0.0.1';

    // Backbone
    App.prototype.Backbone = require('backbone');

    // underscore
    App.prototype._ = require('underscore');

    // jQuery
    App.prototype.$ = require('jquery');

    // localStorage
    //App.prototype.localStorage = require('localStorage');
   /* 
    require('models/toDoItem');
    require('collections/toDoList');
    require('views/toDoListView');*/

    
    
    return App;

  })();

  return (new App());
});