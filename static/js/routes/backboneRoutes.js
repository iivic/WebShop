//Namespace our app
var app = app || {};

app.MainRouter = Backbone.Router.extend({
    routes: {
        "": "mainPage",
        "car-maker/:id": "showCars",
        "cars/:id": "showCarDetails",
        "my-cars": "showMyCars",
        "my-purchases": "showMyPurchases",
        "add-car": "addNewCar",
        "delete-car/:id": "deleteCar",
        "edit-car/:id": "editCar"
    },

    resetTemplate: function () {
      $('#main-content').html('<h1 class="jumbotron"></h1><section id="content" class="container"></section>');
    },

    mainPage: function () {
        this.resetTemplate();
        var allCarMakers = new app.CarMakersCollection();
        new app.MainAppView({collection: allCarMakers, el: $('#content')});
    },
    showCars: function (id) {
        this.resetTemplate();
        id = (id === '0') ? "" : id;
        var allCars = new app.CarsCollection([], {path: 'cars/?maker=' + id});
        new app.ChosenCarMakerView({collection: allCars, el: $('#content')});
    },
    showCarDetails: function (id) {
        this.resetTemplate();
        var car = new app.CarModel([], {path: 'cars/' + id + '/'});
        new app.ChosenCarView({model: car, el: $('#content')});
    },
    showMyCars: function (){
        this.resetTemplate();
        var cars = new app.CarModel([], {path: 'cars/?owner=' + authUserId});
        new app.CurrentUserCars({model: cars, el: $('#content')});
    },
    showMyPurchases: function () {
        this.resetTemplate();
        var purchases = new app.PurchaseModel([], {path: 'purchase/?user=' + authUserId});
        new app.CurrentUserPurchases({model: purchases, el: $('#content')});
    },
    addNewCar: function () {
        this.resetTemplate();
        new app.AddNewCar({el: $('#content')});
    },
    deleteCar: function (id){
        var carToDelete = new app.CarModel({id: id}, {path: 'cars/' + id + "/"});
        carToDelete.destroy({
            success: function(){
                alert("Car successfully deleted!");
                window.location = BASE_URL + "web-shop/#my-cars";
            },
            error: function(){
                alert("Failed to delete car!");
            }
        });
    },
    editCar: function(id){
        this.resetTemplate();
        var carToEdit = new app.CarModel({id: id}, {path: 'cars/' + id + "/"});
        new app.UpdateCarInfo({model: carToEdit, el: $("#content")});
    }
});

var mainRouter = new app.MainRouter();
Backbone.history.start();

/*Backbone.history.on("all", function (route, router) {
    console.log(window.location.hash);
});*/