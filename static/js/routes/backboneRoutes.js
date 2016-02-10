//Namespace our app
var app = app || {};

app.MainRouter = Backbone.Router.extend({
    routes: {
        "": "mainPage",
        "car-maker/:id": "showCars",
        "cars/:id": "showCarDetails",
        "my-cars": "showMyCars",
        "my-purchases": "showMyPurchases",
        "add-car": "addNewCar"
    },

    mainPage: function () {
        var allCarMakers = new app.CarMakersCollection();
        new app.MainAppView({collection: allCarMakers});
    },
    showCars: function (id) {
        id = (id === '0') ? "" : id;
        var allCars = new app.CarsCollection([], {path: 'cars/?maker=' + id});
        new app.ChosenCarMakerView({collection: allCars});
    },
    showCarDetails: function (id) {
        var car = new app.CarModel([], {path: 'cars/' + id});
        new app.ChosenCarView({model: car});
    },
    showMyCars: function (){
        var cars = new app.CarModel([], {path: 'cars/?owner=' + authUserId});
        new app.CurrentUserCars({model: cars});
    },
    showMyPurchases: function () {
        var purchases = new app.PurchaseModel([], {path: 'purchase/?user=' + authUserId});
        new app.CurrentUserPurchases({model: purchases});
    },
    addNewCar: function () {
        new app.AddNewCar({});
    }
});

var mainRouter = new app.MainRouter();
Backbone.history.start();

/*Backbone.history.on("all", function (route, router) {
    console.log(window.location.hash);
});*/