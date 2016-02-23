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
});;// Namespace our app
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
app.CarsCollection = Backbone.PageableCollection.extend({
    model: app.CarModel,
    initialize: function (models, options) {
        this.path = options.path;
    },
    url: function () {
        return BASE_URL + this.path;
    },
    mode: "client",
    state: {
        pageSize: 5
    }
});
//====================
//Purchases collection
//====================
app.PurchasesCollection = Backbone.Collection.extend({
    model: app.PurchaseModel,
    initialize: function (models, options) {
        this.path = options.path;
    },
    url: function () {
        return BASE_URL + this.path;
    }
});
//====================
//Users collection
//====================
app.UsersCollection = Backbone.Collection.extend({
    model: app.UserModel,
    url: BASE_URL + 'users/'
});
;//Namespace our app
var app = app || {};

//=============
//Main app view
//=============
app.MainAppView = Backbone.View.extend({
    template: _.template($('#carMakersTemplate').html()),

    render: function () {
        var templateData = this.collection.models;
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
    events: {
        "click #previousCarListButton": "previousCarPage",
        "click #nextCarListButton": "nextCarPage"
    },
    nextCarPage: function () {
        var lastPage = this.collection.state.lastPage;
        var currentPage = this.collection.state.currentPage;
        if (currentPage == lastPage) alert("Last page!");
        else {
            this.collection.getNextPage();
            this.render();
        }
    },
    previousCarPage: function () {
        var firstPage = this.collection.state.firstPage;
        var currentPage = this.collection.state.currentPage;
        if (currentPage == firstPage) alert("First page!");
        else {
            this.collection.getPreviousPage();
            this.render();
        }
    },
    render: function () {
        var firstPage = this.collection.state.firstPage;
        var lastPage = this.collection.state.lastPage;
        var currentPage = this.collection.state.currentPage;
        var flag = "";

        if (currentPage == firstPage) {
            flag = "first";
        }
        else if (currentPage == lastPage) {
            flag = "last";
        }
        var templateData = this.collection.models;
        this.$el.html(this.template({data: templateData, flag: flag}));

        if (currentPage == firstPage && currentPage == lastPage) {
            $(".car-list-buttons").hide();
        }

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
                context.$el.html(context.template({data: templateData, carMaker: carMaker.attributes[0]}));
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
    events: {
        "click #previousCarListButton": "previousCarPage",
        "click #nextCarListButton": "nextCarPage"
    },
    nextCarPage: function () {
        var lastPage = this.collection.state.lastPage;
        var currentPage = this.collection.state.currentPage;
        if (currentPage == lastPage) alert("Last page!");
        else {
            this.collection.getNextPage();
            this.render();
        }

    },
    previousCarPage: function () {
        var firstPage = this.collection.state.firstPage;
        var currentPage = this.collection.state.currentPage;
        if (currentPage == firstPage) alert("First page!");
        else {
            this.collection.getPreviousPage();
            this.render();
        }
    },
    render: function () {
        var firstPage = this.collection.state.firstPage;
        var lastPage = this.collection.state.lastPage;
        var currentPage = this.collection.state.currentPage;
        var flag = "";
        if (currentPage == firstPage) {
            flag = "first";
        }
        else if (currentPage == lastPage) {
            flag = "last";
        }
        var templateData = this.collection.models;
        this.$el.html(this.template({data: templateData, flag: flag}));
    },
    initialize: function () {
        $(".jumbotron").text("My cars");
        var context = this;
        this.collection.fetch({
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
        var templateData = this.collection.models;
        this.$el.html(this.template({data: templateData}));
    },
    initialize: function () {
        $(".jumbotron").text("My purchases");
        var context = this;
        this.collection.fetch({
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
;//Namespace our app
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
    showMyCars: function () {
        this.resetTemplate();
        var cars = new app.CarsCollection([], {path: 'cars/?owner=' + authUserId});
        new app.CurrentUserCars({collection: cars, el: $('#content')});
    },
    showMyPurchases: function () {
        this.resetTemplate();
        var purchases = new app.PurchasesCollection([], {path: 'purchase/?user=' + authUserId});
        new app.CurrentUserPurchases({collection: purchases, el: $('#content')});
    },
    addNewCar: function () {
        this.resetTemplate();
        new app.AddNewCar({el: $('#content')});
    },
    deleteCar: function (id) {
        var carToDelete = new app.CarModel({id: id}, {path: 'cars/' + id + "/"});
        carToDelete.destroy({
            success: function () {
                alert("Car successfully deleted!");
                window.location = BASE_URL + "web-shop/#my-cars";
            },
            error: function () {
                alert("Failed to delete car!");
            }
        });
    },
    editCar: function (id) {
        this.resetTemplate();
        var carToEdit = new app.CarModel({id: id}, {path: 'cars/' + id + "/"});
        new app.UpdateCarInfo({model: carToEdit, el: $("#content")});
    }
});

var mainRouter = new app.MainRouter();
Backbone.history.start();

/*Backbone.history.on("all", function (route, router) {
 console.log(window.location.hash);
 });*/;$(function () {
    console.log("Start of script!");
    // GET COOKIE INFO
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    var csrftoken = getCookie('csrftoken');

    $.ajaxSetup({
        beforeSend: function (xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });//END COOKIE INFO
});