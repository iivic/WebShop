// Namespace our app
var app = app || {};
var BASE_URL = BASE_URL || 'http://localhost:8080/';

//====================
//CarMakers collection
//====================
app.CarMakersCollection = Backbone.Collection.extend({
    model: app.CarMakerModel,
    url: BASE_URL + 'car-maker/'
});
//===============
//Cars collection
//===============
app.CarsCollection = Backbone.Collection.extend({
    model: app.CarModel,
    initialize: function (models, options) {
        this.path = options.path;
    },
    url: function () {
        return BASE_URL + this.path;
    }
});
//====================
//Purchases collection
//====================
app.PurchasesCollection = Backbone.Collection.extend({
    model: app.PurchaseModel,
    url: BASE_URL + 'purchase/'
});
//====================
//Users collection
//====================
app.UsersCollection = Backbone.Collection.extend({
    model: app.UserModel,
    url: BASE_URL + 'users/'
});
