//Namespace our app
var app = app || {};

//=============
//Main app view
//=============
app.MainAppView = Backbone.View.extend({
    el: $('#content'),
    template: _.template($('#carMakersTemplate').html()),

    render: function () {
        var templateData = this.collection.models[0].attributes.results;
        this.$el.html(this.template({data: templateData}));
        return this;
    },

    initialize: function () {
        var context = this;
        this.collection.fetch({
            success: function () {
                console.log("Success! CarMakers fetched.");
                context.render();
            },
            error: function () {
                console.log("Error! Car makers couldn't be fetched.");
            }
        });
    },
});

var mainAppView = new app.MainAppView({collection: allCarMakers});

//===============
//Single car view
//===============
app.ChosenCarMakerView = Backbone.View.extend({
    el: $('#content'),
    template: _.template($("#carsTemplate").html()),

    render: function () {
        var templateData = this.collection.models[0].attributes.results;
        console.log(templateData);
        this.$el.html(this.template({data: templateData}));
        return this;
    },

    initialize: function () {
        var context = this;
        this.collection.fetch({
            success: function () {
                console.log("Success! Cars fetched.");
                context.render();
            },
            error: function () {
                console.log("Error! Cars couldn't be fetched.");
            }
        });
    }
});
