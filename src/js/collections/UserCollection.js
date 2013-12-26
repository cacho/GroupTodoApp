var app = app || {};
var UserCollection = Backbone.Collection.extend({
	model:app.User,
	localStorage: new Backbone.LocalStorage('users-backbone'),
	completed:function(){
		return this.filter(function(user){
			return user.get('uActive');
		});
	},
	remaining:function(){
		return this.without.apply(this,this.completed());
	},
	nextOrder:function(){
		if( !this.length ) { 
			return 1;
		}
		return this.last().get('order') + 1;
	},
	comparator: function( todo ) {
		return todo.get('order');
	}
});
app.Users= new UserCollection();