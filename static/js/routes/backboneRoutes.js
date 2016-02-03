//Namespace our app
var app = app || {};

app.MainRouter = Backbone.Router.extend({
    routes:{
        "": "mainPage",
        "All": "allCarsPage",
        "BMW": "allBMWs",
        "Mercedes-Benz": "allMerc",
        "VW": "allVW",
    },

    mainPage: function(){
        var mainAppView = new app.MainAppView({collection: allCarMakers});
    },
    allCarsPage: function(){
        var chosenCarMakerView = new app.ChosenCarMakerView({collection: allCars});
    },
    allBMWs: function(){
        var bmwCars = new app.BmwCollection();
        var chosenCarMakerView = new app.ChosenCarMakerView({collection: bmwCars});
    },
    allMerc: function(){
        var mercCars = new app.MercCollection();
        var chosenCarMakerView = new app.ChosenCarMakerView({collection: mercCars});
    },
    allVW: function(){
        var vwCars = new app.VwCollection();
        var chosenCarMakerView = new app.ChosenCarMakerView({collection: vwCars});
    }
});

var mainRouter = new app.MainRouter();
Backbone.history.start();