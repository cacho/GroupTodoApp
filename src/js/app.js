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
          '*notFound': 'notFound'
        },

        home: function() {
          var tpl = require('hbs!../templates/home');
          _this.$('.progress-bar').width('100%');
          setTimeout(function(){
            _this.$('#main-container').html(tpl());
          },1000);
        },

        notFound: function() {
          _this.Router.navigate('#/');
        }

      }))(); //router

      // hitory backbone start
      this.Backbone.history.start();
    }
      //
      var UserList = Backbone.View.extend({
        el:'.page',
        render:function(){
          this.$el.html('content');
        }
      });
      
      var userList= new UserList();

      this.Router.on('route:home':function(){
          userList.render();
          }
      );

      });


    }// end constructor

    // My Awesome App VERSION
    App.prototype.VERSION = '0.0.0';

    // Backbone
    App.prototype.Backbone = require('backbone');

    // underscore
    App.prototype._ = require('underscore');

    // jQuery
    App.prototype.$ = require('jquery');

    // return App
    return App;

  })();

  return (new App());
});