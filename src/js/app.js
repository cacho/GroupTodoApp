/*global define */
define(function (require) {
  'use strict';
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
        
        setFilter:function(){
          this.todoAppView.mainTodoList.trigger('filter');
        }

      }))();

      // history backbone start
      this.Backbone.history.start();
    
    }

    // App VERSION
    App.prototype.VERSION = '0.0.1';

    // Backbone
    App.prototype.Backbone = require('backbone');

    // underscore
    App.prototype._ = require('underscore');

    // jQuery
    App.prototype.$ = require('jquery');

    return App;

  })();

  return (new App());
});