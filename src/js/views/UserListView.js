var UserListView = Backbone.View.extend({
	
	el:'.page',

	render:function(){
		var users= new UserCollection();
		users.fetch();
       	console.log(users);
        }
});