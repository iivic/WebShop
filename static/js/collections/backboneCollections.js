// Namespace our app
var app = app || {};
var BASE_URL = 'http://localhost:8080/';

//====================
//CarMakers collection
//====================
app.CarMakersCollection = Backbone.Collection.extend({
    model: app.CarMakerModel,
    url: BASE_URL + 'car-maker/'
});

var allCarMakers = new app.CarMakersCollection();
//===============
//Cars collection
//===============
app.CarsCollection = Backbone.Collection.extend({
    model: app.CarModel,
    url: BASE_URL + 'cars/'
});
app.BmwCollection = Backbone.Collection.extend({
    model: app.CarModel,
    url: BASE_URL + 'cars/?maker=1'
});
app.MercCollection = Backbone.Collection.extend({
    model: app.CarModel,
    url: BASE_URL + 'cars/?maker=2'
});
app.VwCollection = Backbone.Collection.extend({
    model: app.CarModel,
    url: BASE_URL + 'cars/?maker=3'
});
var allCars = new app.CarsCollection();

//====================
//Purchases collection
//====================
app.PurchasesCollection = Backbone.Collection.extend({
    model: app.PurchaseModel,
    url: BASE_URL + 'purchase/'
});

var allPurchases = new app.PurchasesCollection();

//====================
//Users collection
//====================
app.UsersCollection = Backbone.Collection.extend({
    model: app.UserModel,
    url: BASE_URL + 'users/'
});

var allUsers = new app.UsersCollection();
