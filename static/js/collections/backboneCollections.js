// Namespace our app
var app = app || {};
var BASE_URL = 'http://localhost:8080/';

function jsonParser(varSent){
    return $.parseJSON(JSON.stringify(varSent))
};

//====================
//CarMakers collection
//====================
app.CarMakersCollection = Backbone.Collection.extend({
    model: app.CarMakerModel,
    url: BASE_URL + 'car-maker/'
});

var allCarMakers = new app.CarMakersCollection();
allCarMakers.fetch({
    success: function(){
        console.log("Success! CarMakers fetched.");
        allCarMakers = jsonParser(allCarMakers);
    },
    error: function() {
        console.log("Error! Car makers couldn't be fetched.");
    }
});

//===============
//Cars collection
//===============
app.CarsCollection = Backbone.Collection.extend({
    model: app.CarModel,
    url: BASE_URL + 'cars/'
});

var allCars = new app.CarsCollection();
allCars.fetch({
    success: function() {
        console.log("Success! Cars fetched.");
        allCars = jsonParser(allCars);
    },
    error: function() {
        console.log("Error! Cars couldn't be fetched.");
    }
});

//====================
//Purchases collection
//====================
app.PurchasesCollection = Backbone.Collection.extend({
    model: app.PurchaseModel,
    url: BASE_URL + 'purchase/'
});

var allPurchases = new app.PurchasesCollection();
allPurchases.fetch({
    success: function() {
        console.log("Success! Purchases fetched.");
        allPurchases = jsonParser(allPurchases);
    },
    error: function() {
        console.log("Error! Purchases couldn't be fetched.");
    }
});

//====================
//Users collection
//====================
app.UsersCollection = Backbone.Collection.extend({
    model: app.UserModel,
    url: BASE_URL + 'users/'
});

var allUsers = new app.UsersCollection();
allUsers.fetch({
    success: function() {
        console.log("Success! Users fetched.");
        allUsers = jsonParser(allUsers);
    },
    error: function() {
        console.log("Error! Users couldn't be fetched.");
    }
});
