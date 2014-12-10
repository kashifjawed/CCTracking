var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "./App", "text!./Common/Templates/ModalPopup.html", "text!./Common/Templates/BusDetailModalPopup.html", "underscore", "jquery", "knockout", "knockback", "marionette", "backbone"], function(require, exports, APP) {
    var $ = require("jquery");
    var ko = require("knockout");
    var kb = require("knockback");

    String.prototype["getOuterHTML"] = function (selector) {
        return $(this.toString()).find(selector)[0].outerHTML;
    };

    APP.Application.getInstance().vent.on("Event:UpdateSummary", function () {
        require(['./Booking/BookingLeft/BookingLeftCtrl'], function (p) {
            new p.BookingLeftCtrl().Show();
        });
    });

    var Controller = (function () {
        function Controller() {
        }
        return Controller;
    })();
    exports.Controller = Controller;

    var ViewModel = (function () {
        function ViewModel(model, controller) {
            this.model = kb.viewModel(model);
            this.bbModel = model;
            this.controller = controller;
        }
        return ViewModel;
    })();
    exports.ViewModel = ViewModel;

    (function (Views) {
        var CollectionView = (function (_super) {
            __extends(CollectionView, _super);
            function CollectionView(options) {
                _super.call(this, options);
            }
            return CollectionView;
        })(Marionette.CollectionView);
        Views.CollectionView = CollectionView;
        var CompositeView = (function (_super) {
            __extends(CompositeView, _super);
            function CompositeView(options) {
                if (!options)
                    options = {};

                _super.call(this, options);
            }
            return CompositeView;
        })(Marionette.CompositeView);
        Views.CompositeView = CompositeView;
        var ItemView = (function (_super) {
            __extends(ItemView, _super);
            function ItemView(options) {
                if (!options)
                    options = {};
                _super.call(this, options);
            }
            return ItemView;
        })(Marionette.ItemView);
        Views.ItemView = ItemView;
        var MvvmView = (function (_super) {
            __extends(MvvmView, _super);
            function MvvmView(options) {
                _super.call(this, options);
            }
            MvvmView.prototype.initialize = function (options) {
                if (options.viewModel !== undefined) {
                    this.viewModel = options.viewModel;
                    options.model = this.viewModel.model;
                }
            };
            MvvmView.prototype.onShow = function () {
                ko.applyBindings(this.viewModel, this.el);
            };
            MvvmView.prototype.onClose = function () {
                ko.cleanNode($(this.el)[0]);
            };
            return MvvmView;
        })(ItemView);
        Views.MvvmView = MvvmView;
    })(exports.Views || (exports.Views = {}));
    var Views = exports.Views;

    var ModalPopupView = (function (_super) {
        __extends(ModalPopupView, _super);
        function ModalPopupView(options) {
            var modalPopupView = require("text!./Common/Templates/ModalPopup.html");
            this.template = modalPopupView.getOuterHTML("#Modal");
            _super.call(this, options);
        }
        return ModalPopupView;
    })(Views.ItemView);
    exports.ModalPopupView = ModalPopupView;

    var BusDetailModalPopupCollectionView = (function (_super) {
        __extends(BusDetailModalPopupCollectionView, _super);
        function BusDetailModalPopupCollectionView(options) {
            this.itemView = BusDetailModalPopupView;
            var girdTemplate = require("text!./Common/Templates/BusDetailModalPopup.html");
            this.template = girdTemplate.getOuterHTML("#ModalGrid");
            this.itemViewContainer = "#ItemContainer";
            _super.call(this, options);
        }
        return BusDetailModalPopupCollectionView;
    })(Views.CompositeView);
    exports.BusDetailModalPopupCollectionView = BusDetailModalPopupCollectionView;

    var BusDetailModalPopupView = (function (_super) {
        __extends(BusDetailModalPopupView, _super);
        function BusDetailModalPopupView(options) {
            var modalPopupView = require("text!./Common/Templates/BusDetailModalPopup.html");
            this.template = modalPopupView.getOuterHTML("#Modal");
            this.tagName = "table";
            _super.call(this, options);
        }
        return BusDetailModalPopupView;
    })(Views.ItemView);
    exports.BusDetailModalPopupView = BusDetailModalPopupView;

    function ShowModalPopup(type, title, message) {
        var alertModel = new Backbone.Model({ type: 'btn-' + type, title: title, message: message });
        var view = new this.ModalPopupView({ model: alertModel });
        var app = APP.Application.getInstance();
        app.ModalRegion.show(view);
    }
    exports.ShowModalPopup = ShowModalPopup;

    function ShowBusDetailModalPopup(busDetialDto, busDetailCollection) {
        var view = new this.BusDetailModalPopupCollectionView({ collection: busDetailCollection, model: busDetialDto });
        var app = APP.Application.getInstance();
        app.ModalRegion.show(view);
    }
    exports.ShowBusDetailModalPopup = ShowBusDetailModalPopup;

    $.ajaxSetup({
        'beforeSend': function (xhr) {
            var app = APP.Application.getInstance();
            if (app.reqres.hasHandler("AppGlobalSetting")) {
                xhr.setRequestHeader("AuthenticationToken", app.request("AppGlobalSetting").get("AuthenticationToken"));
            }
        }
    });

    function ValidationUtility() {
        var validationElements = $('[data-role="validate"]'), elementCount = 0;
        validationElements.popover({ placement: 'bottom' });
        validationElements.on('invalid', function () {
            if (elementCount === 0) {
                $('#' + this.id).popover('show');
                elementCount++;
            }
        });

        validationElements.on('blur', function () {
            $('#' + this.id).popover('hide');
        });

        var validate = function (formSelector) {
            elementCount = 0;
            if (formSelector.indexOf('#') === -1) {
                formSelector = '#' + formSelector;
            }

            return $(formSelector)[0].checkValidity();
        };
        return { validate: validate };
    }
    exports.ValidationUtility = ValidationUtility;

    function AddItem(busVisitCollection) {
        var app = APP.Application.getInstance();
        busVisitCollection.push({ centreId: 'center-d', busId: 'bus-d', driverId: 'driver-d' });
    }
    function RemoveItem() {
        alert('remove');
    }

    function FormatDateString(aDate) {
        return new Date(aDate).toLocaleDateString();
    }
    exports.FormatDateString = FormatDateString;
    function GetParameterByName(paramName, locationHref) {
        paramName = paramName.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + paramName + "=([^&#]*)"), results = regex.exec(locationHref);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    exports.GetParameterByName = GetParameterByName;

    (function (VisitTypes) {
        VisitTypes[VisitTypes["PatrolPump"] = 1] = "PatrolPump";
        VisitTypes[VisitTypes["Booking"] = 2] = "Booking";
        VisitTypes[VisitTypes["Maintenance"] = 3] = "Maintenance";
        VisitTypes[VisitTypes["Others"] = 4] = "Others";
    })(exports.VisitTypes || (exports.VisitTypes = {}));
    var VisitTypes = exports.VisitTypes;
    ko.bindingHandlers.numeric = {
        init: function (element, valueAccessor) {
            $(element).on("keydown", function (event) {
                if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || (event.keyCode == 65 && event.ctrlKey === true) || (event.keyCode == 188 || event.keyCode == 190 || event.keyCode == 110) || (event.keyCode >= 35 && event.keyCode <= 39)) {
                    return;
                } else {
                    if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                        event.preventDefault();
                    }
                }
            });
        }
    };
});
