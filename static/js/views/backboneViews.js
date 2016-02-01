//Namespace our app
var app = app || {};

app.SingleCarMakerView = Backbone.View.extend({
    el: $('#content'),

    initialize: function(){
        this.render();
    },
    render: function(){
        this.$el.append('<p>It works</p>');
        return this;
    },
});

var testView = new app.SingleCarMakerView;

