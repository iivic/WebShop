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
            maker : 1,
            model : "Empty",
            location : "Empty",
            fuel_type : "Petrol",
            mileage : 0,
            price : 0,
            manufacturing_year : 2000,
            available: "true",
            discount: 0,
            last_update_date: "",
            owner: authUserUsername
        },
    initialize: function (models, options) {
        this.path = options.path;
    },
    url: function () {
        return BASE_URL + this.path;
    },
    urlRoot: BASE_URL
});

app.PurchaseModel = Backbone.Model.extend({
    initialize: function (models, options) {
        this.path = options.path;
    },
    url: function(){
        return BASE_URL + this.path;
    }
});