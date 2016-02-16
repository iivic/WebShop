//Namespace our app
var app = app || {};

//=============
//Main app view
//=============
app.MainAppView = Backbone.View.extend({
    template: _.template($('#carMakersTemplate').html()),

    render: function () {
        var templateData = this.collection.models[0].attributes.results;
        this.$el.html(this.template({data: templateData}));
    },

    initialize: function () {
        $(".jumbotron").text("Welcome to this awesome car web shop!");
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
    }
});
//==================
//Group of cars view
//==================
app.ChosenCarMakerView = Backbone.View.extend({
    template: _.template($("#carsTemplate").html()),

    render: function () {
        var templateData = this.collection.models[0].attributes.results;
        //TODO pagination on cars
        console.log(this.collection.models[0].attributes);
        console.log(Math.ceil(this.collection.models[0].attributes.count / 10));
        this.$el.html(this.template({data: templateData}));
    },

    initialize: function () {
        $(".jumbotron").text("Welcome to this awesome car web shop!");
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
    template: _.template($("#carDetailsTemplate").html()),

    events: {
        "click #purchase-car": "purchaseCar"
    },
    render: function () {
        var context = this;
        var templateData = this.model.attributes;
        var carMaker = new app.CarMakerModel([], {path: 'car-maker/?id=' + templateData.maker});
        carMaker.fetch({
            success: function () {
                context.$el.html(context.template({data: templateData, carMaker: carMaker.attributes.results[0]}));
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
    },
    purchaseCar: function () {
        var cardNumber = $("#cardNumberInput").val();
        if (cardNumber == "") {
            alert("Please enter your card number!")
        }
        else {
            var context = this;
            var carID = $("#purchase-car").attr("data-car-id");
            var price = $("#priceForPurchase").text();
            var discount = $("#discountForPurchase").text();
            var pricePaid = price - (price * discount / 100);
            var purchaseModel = new app.PurchaseModel([], {
                path: 'purchase/'
            });
            purchaseModel.set({
                car: carID, credit_card_number: cardNumber, price_paid: pricePaid
            });
            console.log(purchaseModel);
            purchaseModel.save({}, {
                success: function () {
                    console.log("Purchase saved!");
                    context.unbind();
                    context.remove();
                    $('.modal-backdrop').remove();
                    $('.modal-open').removeAttr("style");
                    $('.modal-open').removeClass("modal-open");
                    window.location = BASE_URL + "web-shop/#my-purchases";
                },
                error: function () {
                    console.log("Error saving purchase in ChosenCarView!");
                }
            });
        }
    }
});
//=================
//Current user cars
//=================
app.CurrentUserCars = Backbone.View.extend({
    template: _.template($("#carsTemplate").html()),

    render: function () {
        var templateData = this.model.attributes.results;
        this.$el.html(this.template({data: templateData}));
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
        this.$el.html(this.template({data: templateData}));
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
    template: _.template($("#addNewCarTemplate").html()),

    render: function () {
        var newCar = new app.CarModel([], {});
        var templateData = newCar.attributes;
        var context = this;
        var carMakers = new app.CarMakerModel([], {path: "car-maker/"});
        carMakers.fetch({
            success: function () {
                context.$el.html(context.template({data: templateData, carMakers: carMakers.attributes.results}));
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
        var context = this;
        var carInstance = new app.CarModel([], {path: "cars/"});
        this.setValuesToNewCar(carInstance);
        carInstance.save({}, {
            success: function (model, respose, options) {
                alert("The model has been saved to the server");
                context.unbind();
                context.remove();
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
        var maker = $("#maker option:selected").attr("value");
        var model = $("#model").val();
        var location = $("#location").val();
        var fuelType = $("#fuel_type option:selected").attr("value");
        var mileage = $("#mileage").val();
        var price = $("#price").val();
        var manufacturingYear = $("#manufacturing_year option:selected").attr("value");
        var discount = $("#discount").val();
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
    }
});
//===============
//Update car info
//===============
app.UpdateCarInfo = Backbone.View.extend({
    template: _.template($("#carUpdateTemplate").html()),

    events: {
        "click #update-car-button": "updateCar"
    },

    initialize: function () {
        $(".jumbotron").text("Update the fields with your new car information");
        var context = this;
        this.model.fetch({
            success: function () {
                context.render();
            },
            error: function () {
                console.log("Error in UpdateCarInfo! Model couldn't be fetched.");
            }
        });
    },
    render: function () {
        var context = this;
        this.$el.html(context.template({data: context.model.attributes}));
    },
    updateCar: function () {
        var model = $("#upd-model").val();
        var location = $("#upd-location").val();
        var fuelType = $("#upd-fuel_type option:selected").attr("value");
        var mileage = $("#upd-mileage").val();
        var price = $("#upd-price").val();
        var manufacturingYear = $("#upd-manufacturing_year option:selected").attr("value");
        var discount = $("#upd-discount").val();
        this.model.set({
            model: model,
            location: location,
            fuel_type: fuelType,
            mileage: mileage,
            price: price,
            manufacturing_year: manufacturingYear,
            discount: discount
        });
        var context = this;
        this.model.save({}, {
            success: function (model, respose, options) {
                alert("The model has been saved to the server");
                context.unbind();
                context.remove();
                window.location = BASE_URL + "web-shop/#my-cars";
            },
            error: function (model, xhr, options) {
                alert("Error while saving car! More info in console.");
                console.log(xhr.responseText);
            }
        });
    }
});
