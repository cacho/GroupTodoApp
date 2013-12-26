var app = app || {};
app.User = Backbone.Model.extend({
	defaults:{
		uName:'',
		uActive:false
	},

	toggle:function(){
		this.save({
			uActive:!this.get('uActive')
		});
	}
});