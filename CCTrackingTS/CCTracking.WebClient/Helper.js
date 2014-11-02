/// <reference path="../Scripts/typings/require/require.d.ts" />
/// <reference path="../Scripts/typings/marionette/marionette.d.ts" />
/// <amd-dependency path="text!./Common/Templates/ModalPopup.html"/>
/// <amd-dependency path="text!./Common/Templates/BusDetailModalPopup.html"/>
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

    //var Marionette = require("marionette");
    //var Backbone = require("backbone");
    String.prototype["getOuterHTML"] = function (selector) {
        return $(this.toString()).find(selector)[0].outerHTML;
    };

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

                //options.template = "#navBarCollectionViewTemplate";
                _super.call(this, options);
                //this.itemView = NavBarItemView;
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
            //template: string;
            function MvvmView(options) {
                //if (!options) options = {};
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

    //var noOfShownModals = 0;
    //export class ModalRegion extends Marionette.Region {
    //    el: any;
    //    onShow(view) {
    //        var modalDiv = this.$el.closest(".modal");
    //        if (view.title !== undefined)
    //            modalDiv.find('.modal-title').text(view.title);
    //        else
    //            modalDiv.find('.modal-title').text("");
    //        if (view.type !== undefined)
    //            modalDiv.addClass(view.type);
    //        else
    //            modalDiv.addClass("gs-modal-edit");
    //        modalDiv.modal({
    //            backdrop: 'static',
    //            keyboard: false
    //        });
    //        //noOfShownModals++;
    //        //var level = "level" + noOfShownModals;
    //        //modalDiv.data()["bs.modal"].$backdrop.addClass(level);
    //        //modalDiv.data()["bs.modal"].$element.addClass(level);
    //        //view.on("close", () => this.onBeforeClose(view));
    //        //modalDiv.one('hide.bs.modal', () => view.close());
    //    }
    //    onBeforeClose(view) {
    //        var modalDiv = view.$el.closest(".modal");
    //        if (view.type !== undefined)
    //            modalDiv.removeClass(view.type);
    //        else
    //            modalDiv.removeClass("gs-modal-edit");
    //        //if (modalDiv.data()["bs.modal"].$backdrop != undefined)
    //        //    modalDiv.data()["bs.modal"].$backdrop.remove();
    //        //modalDiv.off('hide.bs.modal');
    //        //modalDiv.modal('hide');
    //        //modalDiv.data()["bs.modal"].$element.removeClass("level" + noOfShownModals);
    //        //noOfShownModals--;
    //        return true;
    //    }
    //};
    var ModalPopupView = (function (_super) {
        __extends(ModalPopupView, _super);
        function ModalPopupView(options) {
            //debugger;
            var modalPopupView = require("text!./Common/Templates/ModalPopup.html");
            this.template = modalPopupView.getOuterHTML("#Modal");
            _super.call(this, options);
            //this.model = options.model;
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
            //this.model = options.model;
        }
        return BusDetailModalPopupView;
    })(Views.ItemView);
    exports.BusDetailModalPopupView = BusDetailModalPopupView;

    /*
    type value can be:
    1- default
    2- primary
    3- success
    4- info
    5- warning
    6- danger
    */
    function ShowModalPopup(type, title, message) {
        var alertModel = new Backbone.Model({ type: 'btn-' + type, title: title, message: message });
        var view = new this.ModalPopupView({ model: alertModel });
        var app = APP.Application.getInstance();
        app.ModalRegion.show(view);
    }
    exports.ShowModalPopup = ShowModalPopup;

    //export function ShowBusDetailModalPopup(busDetialDto, type, title, message) {
    function ShowBusDetailModalPopup(busDetialDto, busDetailCollection) {
        //var alertModel = new Backbone.Model({ type: 'btn-' + type, title: title, message: message });
        //var view = new this.BusDetailModalPopupView({ model: busDetialDto});
        var view = new this.BusDetailModalPopupCollectionView({ collection: busDetailCollection, model: busDetialDto });
        var app = APP.Application.getInstance();
        app.ModalRegion.show(view);
    }
    exports.ShowBusDetailModalPopup = ShowBusDetailModalPopup;

    //export class ModalRegion extends Marionette.Region.extend{
    //    constructor(options?) {
    //        super();
    //        Marionette.Region.prototype.constructor.apply(this, arguments);
    //        this.ensureEl();
    //        this.$el.on('hidden', { region: this }, function (event) {
    //            event.data.region.close();
    //        });
    //    }
    //    onShow() {
    //        this.$el.modal('show');
    //    }
    //    onClose() {
    //        this.$el.modal('hide');
    //    }
    //}
    //var app = APP.Application.getInstance();
    /// Adds Authentication Token to each outgoing call if there is an AppGlobalSetting present
    $.ajaxSetup({
        'beforeSend': function (xhr) {
            var app = APP.Application.getInstance();
            if (app.reqres.hasHandler("AppGlobalSetting")) {
                xhr.setRequestHeader("AuthenticationToken", app.request("AppGlobalSetting").get("AuthenticationToken"));
            }
        }
    });

    /// Handles all error scenarios coming from the server
    //$(document).ajaxError((event, jqXHR, ajaxSettings, thrownError) => {
    //    if (ajaxSettings["consumeError"] != null && ajaxSettings["consumeError"] == true)
    //        return;
    //    if (jqXHR.status == 403) {
    //        app.vent.trigger("BackToLogin");
    //    }
    //    ShowError(jqXHR.responseText == "" ? thrownError : jqXHR.responseText);
    //});
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
            //debugger;
            elementCount = 0;
            if (formSelector.indexOf('#') === -1) {
                formSelector = '#' + formSelector;
            }

            //$(formSelector)[0][0].setCustomValidity('ssss');
            //debugger;
            return $(formSelector)[0].checkValidity();
        };
        return { validate: validate };
    }
    exports.ValidationUtility = ValidationUtility;

    //export function SubscribeApplicationEventListener() {
    //    var app = APP.Application.getInstance();
    //    app.vent.on("BusVisitItem:Add", (busVisitCollection) => AddItem(busVisitCollection));
    //    app.vent.on("BusVisitItem:Remove", RemoveItem);
    //}
    function AddItem(busVisitCollection) {
        //alert('added');
        var app = APP.Application.getInstance();
        busVisitCollection.push({ centreId: 'center-d', busId: 'bus-d', driverId: 'driver-d' });
        //var collectionView = new BusVisitCollectionView({ collection: items });
        //app.SubRegion.show(collectionView);
    }
    function RemoveItem() {
        alert('remove');
    }

    function FormatDateString(aDate) {
        return new Date(aDate).toLocaleDateString();
    }
    exports.FormatDateString = FormatDateString;

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
                // Allow: backspace, delete, tab, escape, and enter
                if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || (event.keyCode == 65 && event.ctrlKey === true) || (event.keyCode == 188 || event.keyCode == 190 || event.keyCode == 110) || (event.keyCode >= 35 && event.keyCode <= 39)) {
                    // let it happen, don't do anything
                    return;
                } else {
                    // Ensure that it is a number and stop the keypress
                    if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                        event.preventDefault();
                    }
                }
            });
        }
    };
});
//# sourceMappingURL=Helper.js.map
