/*global define */
define(function (require) {
  'use strict';

  var App = (function() {

    // constructor
    function App() {

      // context ref
      var _this = this;

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
        
        setFilter:function(param){
          window.app.Todos.trigger('filter');
        }

      }))();

      // history backbone start
      this.Backbone.history.start();
      //start our ToDoApp
      app.Todos = new TodoList();
      new TodoListAppView();
      app.TodoRouter = this.Router;
      //this.Todos= new TodoList({model: app.TodoItem});
    
    }

    function loadHome(){
      //var userList= new UserListView();
      //userList.render();
      //console.log(userList.el);

    }
   

    // My Awesome App VERSION
    App.prototype.VERSION = '0.0.0';

    // Backbone
    App.prototype.Backbone = require('backbone');

    // underscore
    App.prototype._ = require('underscore');

    // jQuery
    App.prototype.$ = require('jquery');
    // jQuery
    App.prototype.localStorage = require('backbone.localStorage');
    
    require('models/toDoItem');
    require('collections/toDoList');
    require('views/toDoListView');
    require('views/toDoAppView');
    
   

    
     // UserListView
    //App.prototype.AppView = require('views/AppView');
     // UserListView
    //App.prototype.UserListView = require('views/UserListView');
     // UserListView
    //App.prototype.UserCollection = require('collections/UserCollection');
     // UserListView
    //App.prototype.User = require('models/User');
    // return App
    return App;

  })();

  return (new App());
});