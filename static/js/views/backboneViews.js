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
//==================
//Group of cars view
//==================
app.ChosenCarMakerView = Backbone.View.extend({
    el: $('#content'),
    template: _.template($("#carsTemplate").html()),

    render: function () {
        var templateData = this.collection.models[0].attributes.results;
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
                console.log("Error in ChosenCarMakerView! Cars couldn't be fetched.");
            }
        });
    }
});
//======================
//Singe car details view
//======================
app.ChosenCarView = Backbone.View.extend({
    el: $('#content'),
    template: _.template($("#carDetailsTemplate").html()),

    render: function () {
        var context = this;
        var templateData = this.model.attributes;
        var carMaker = new app.CarMakerModel([], {path: 'car-maker/?id=' + templateData.maker});
        carMaker.fetch({
            success: function () {
                context.$el.html(context.template({data: templateData, carMaker: carMaker.attributes.results[0]}));
                return context;
            },
            error: function () {
                console.log("Error in ChosenCarView! CarMaker couldn't be fetched.");
            }
        });
    },
    initialize: function () {
        $(".jumbotron").text("Car details");
        var context = this;
        this.model.fetch({
            success: function () {
                console.log("Success! Car fetched.");
                context.render();
            },
            error: function () {
                console.log("Error in ChosenCarView! Car couldn't be fetched.");
            }
        });
    }
});
//=================
//Current user cars
//=================
app.CurrentUserCars = Backbone.View.extend({
    el: $('#content'),
    template: _.template($("#carsTemplate").html()),

    render: function () {
        var templateData = this.model.attributes.results;
        this.$el.html(this.template({data: templateData}));
        return this;
    },
    initialize: function () {
        $(".jumbotron").text("My cars");
        var context = this;
        this.model.fetch({
            success: function () {
                console.log("Success! Cars fetched.");
                context.render();
            },
            error: function () {
                console.log("Error in CurrentUserCars! Cars couldn't be fetched.");
            }
        })
    }
});
//======================
//Current user purchases
//======================
app.CurrentUserPurchases = Backbone.View.extend({
    el: $("#content"),
    template: _.template($("#userPurchasesTemplate").html()),

    render: function () {
        var templateData = this.model.attributes.results;
        console.log(templateData);
        this.$el.html(this.template({data: templateData}));
        return this;
    },
    initialize: function () {
        $(".jumbotron").text("My purchases");
        var context = this;
        this.model.fetch({
            success: function () {
                console.log("Success! Cars fetched.");
                context.render();
            },
            error: function () {
                console.log("Error in CurrentUserCars! Cars couldn't be fetched.");
            }
        })
    }
});
//===========
//Add new car
//===========
app.AddNewCar = Backbone.View.extend({
    el: $("#content"),
    template: _.template($("#addNewCarTemplate").html()),

    render: function () {
        var newCar = new app.CarModel([], {});
        var templateData = newCar.attributes;
        var context = this;
        var carMakers = new app.CarMakerModel([], {path: "car-maker/"});
        carMakers.fetch({
            success: function () {
                context.$el.html(context.template({data: templateData, carMakers: carMakers.attributes.results}));
                console.log(carMakers.attributes.results);
                return context;
            },
            error: function () {
                console.log("Error in AddNewCar! CarMakers couldn't be fetched.");
            }
        });
    },
    initialize: function () {
        $(".jumbotron").text("Fill the fields with your car information");
        this.render();
    },

    events: {
        "click #new-car-button": "saveCar"
    },
    saveCar: function () {
        var carInstance = new app.CarModel([], {path: "cars/"});
        this.setValuesToNewCar(carInstance);
        carInstance.save({}, {
            success: function (model, respose, options) {
                alert("The model has been saved to the server");
                window.location = BASE_URL + "web-shop/#my-cars";
            },
            error: function (model, xhr, options) {
                alert("Error while saving car! More info in console.");
                console.log(xhr.responseText);
            }
        });
    },
    //Set function for new car
    setValuesToNewCar: function (carInstance) {
        var maker = $("select[name=maker] option:selected").attr("value");
        var model = $("input[name=model]").val();
        var location = $("input[name=location]").val();
        var fuelType = $("select[name=fuel_type] option:selected").attr("value");
        var mileage = $("input[name=mileage]").val();
        var price = $("input[name=price]").val();
        var manufacturingYear = $("select[name=manufacturing_year] option:selected").attr("value");
        var discount = $("input[name=discount]").val();
        carInstance.set({
            maker: maker,
            model: model,
            location: location,
            fuel_type: fuelType,
            mileage: mileage,
            price: price,
            manufacturing_year: manufacturingYear,
            discount: discount
        });
        console.log(carInstance);
    }
});
