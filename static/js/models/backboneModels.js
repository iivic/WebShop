// Namespace our app
var app = app || {};
var BASE_URL = BASE_URL || 'http://localhost:8080/';

app.UserModel = Backbone.Model.extend({});

app.CarMakerModel = Backbone.Model.extend({
    initialize: function (models, options) {
        this.path = options.path;
    },
    url: function () {
        return BASE_URL + this.path;
    }
});

app.CarModel = Backbone.Model.extend({
    defaults: {
            available: "true",
            owner: authUserUsername
        },
    initialize: function (models, options) {
        this.path = options.path;
    },
    url: function () {
        return BASE_URL + this.path;
    }
});

app.PurchaseModel = Backbone.Model.extend({
    initialize: function (models, options) {
        this.path = options.path;
    },
    url: function(){
        return BASE_URL + this.path;
    }
});