/// <reference path="../Scripts/typings/require/require.d.ts" />
/// <reference path="../Scripts/typings/marionette/marionette.d.ts" />
/// <amd-dependency path="marionette"/>
/// <amd-dependency path="datatablesBootstrap"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "./ModalHelper", "marionette", "datatablesBootstrap"], function(require, exports, modalHelper) {
    var datatablesBootstrap = require("datatablesBootstrap");

    var Application = (function (_super) {
        __extends(Application, _super);
        function Application() {
            _super.call(this);
            if (Application._instance) {
                throw new Error("Error: Creating Application object.");
            }
            Application._instance = this;

            this.on('initialize:after', this.initializeAfter);

            this.addRegions({
                ContainerRegion: '#ContainerRegion',
                ModalRegion: '#ModalPopup'
            });

            //alert('constructor');
            var layout = Marionette.Layout.extend({
                template: "#AppLayout",
                regions: {
                    LoginRegion: '#LoginRegion',
                    HeaderRegion: '#HeaderRegion',
                    LeftRegion: '#LeftRegion',
                    RightRegion: '#RightRegion',
                    MainRegion: '#MainRegion',
                    DetailRegion: '#DetailRegion',
                    SubRegion: '#SubRegion'
                }
            });
            this.AppLayout = new layout();

            this.LoginRegion = this.AppLayout.LoginRegion;
            this.HeaderRegion = this.AppLayout.HeaderRegion;
            this.LeftRegion = this.AppLayout.LeftRegion;
            this.RightRegion = this.AppLayout.RightRegion;
            this.MainRegion = this.AppLayout.MainRegion;
            this.DetailRegion = this.AppLayout.DetailRegion;
            this.SubRegion = this.AppLayout.SubRegion;

            //start history...
            if (Backbone.history) {
                Backbone.history.start();
            }
        }
        Application.prototype.initializeAfter = function () {
            //console.log('Initalize after called..');
            this.initalizeLocalStorage();

            //var loginView = new login.LoginItemView();
            var layout = this.AppLayout;
            this.ContainerRegion.show(layout);

            //var loginCtrl = new loginController.LoginCtrl();
            //loginCtrl.Load();
            require(['./Login/LoginCtrl'], function (p) {
                new p.LoginCtrl().Load();
            });

            var self = this;
            var routes = Backbone.Router.extend({
                routes: {
                    'user': 'goUser',
                    'viewUser': 'goViewUser',
                    'bus': 'goBus',
                    'addBooking': 'goAddBooking',
                    'editBooking': 'goEditBooking',
                    'viewBooking': 'goViewBooking',
                    'payment': 'goPayment',
                    'alkhidmatCentre': 'goStation',
                    'viewAlkhidmatCentre': 'goViewStation',
                    'cancel': 'goCancel',
                    'busVisit': 'gobusVisit',
                    'editBusVisit': 'goEditBusVisit',
                    'viewBusVisit': 'goViewBusVisit',
                    'adminBusVisit': 'goAdminBusVisit',
                    'adminBus': 'goAdminBus',
                    'viewAdminBus': 'goViewAdminBus',
                    'searchBooking': 'goSearchBooking',
                    'adminSearchBooking': 'goAdminSearchBooking',
                    'driver': 'goDriver',
                    'viewDriver': 'goViewDriver',
                    'graveyard': 'goGraveyard',
                    'viewGraveyard': 'goViewGraveyard',
                    'town': 'goTown',
                    'viewTown': 'goViewTown',
                    'unionCouncil': 'goUnionCouncil',
                    'viewUnionCouncil': 'goViewUnionCouncil',
                    'landmark': 'goLandmark',
                    'viewLandmark': 'goViewLandmark',
                    'paymentType': 'goPaymentType',
                    'viewPaymentType': 'goViewPaymentType',
                    'refundType': 'goRefundType',
                    'viewRefundType': 'goViewRefundType',
                    'visitType': 'goVisitType',
                    'viewVisitType': 'goViewVisitType',
                    'causeOfDeath': 'goCauseOfDeath',
                    'viewCauseOfDeath': 'goViewCauseOfDeath',
                    'viewTest': 'goViewTest',
                    'trackingDevice': 'goTrackingDevice',
                    'viewTrackingDevice': 'goViewTrackingDevice',
                    'changePassword': 'goChangePassword',
                    '*other': 'defaultRoute'
                },
                goUser: function () {
                    require(['./User/UserCtrl'], function (p) {
                        new p.UserCtrl().Show();
                    });
                },
                goViewUser: function () {
                    require(['./User/UserCtrl'], function (p) {
                        new p.UserCtrl().GetAll();
                    });
                },
                goBus: function () {
                    require(['./Bus/BusCtrl'], function (p) {
                        new p.BusCtrl().Show();
                    });
                },
                goAddBooking: function () {
                    require(['./Booking/BookingCtrl'], function (p) {
                        new p.BookingCtrl().Show();
                    });
                },
                goEditBooking: function () {
                    require(['./Booking/BookingCtrl'], function (p) {
                        new p.BookingCtrl().Show();
                    });
                },
                goViewBooking: function () {
                    require(['./Booking/BookingCtrl'], function (p) {
                        new p.BookingCtrl().GetAll(1);
                    });
                },
                goPayment: function () {
                    require(['./Payment/PaymentCtrl'], function (p) {
                        new p.PaymentCtrl().Show();
                    });
                },
                goStation: function () {
                    require(['./Admin/AlkhidmatCentre/AlkhidmatCentreCtrl'], function (p) {
                        new p.StationCtrl().Show();
                    });
                },
                goViewStation: function () {
                    require(['./Admin/AlkhidmatCentre/AlkhidmatCentreCtrl'], function (p) {
                        new p.StationCtrl().GetAll();
                    });
                },
                goCancel: function () {
                    require(['./RefundBooking/RefundBookingCtrl'], function (p) {
                        new p.RefundBookingCtrl().Show();
                    });
                },
                goViewBusVisit: function () {
                    require(['./Bus/BusVisitCtrl'], function (p) {
                        new p.BusVisitCtrl().SimpleLoad();
                    });
                },
                gobusVisit: function () {
                    require(['./Bus/BusVisitCtrl'], function (p) {
                        new p.BusVisitCtrl().Show();
                    });
                },
                goEditBusVisit: function () {
                    require(['./Bus/BusVisitCtrl'], function (p) {
                        new p.BusVisitCtrl().Show();
                    });
                },
                goAdminBusVisit: function () {
                    require(['./Admin/BusMilage/BusMilageCtrl'], function (p) {
                        new p.BusMilageCtrl().SimpleLoad();
                    });
                },
                goAdminBus: function () {
                    require(['./Admin/Bus/BusCtrl'], function (p) {
                        new p.BusCtrl().Show();
                    });
                },
                goViewAdminBus: function () {
                    require(['./Admin/Bus/BusCtrl'], function (p) {
                        new p.BusCtrl().GetAll();
                    });
                },
                goSearchBooking: function () {
                    require(['./Search/SearchCtrl'], function (p) {
                        new p.SearchCtrl().Show();
                    });
                },
                goAdminSearchBooking: function () {
                    require(['./Admin/AdminSearchBooking/AdminSearchBookingCtrl'], function (p) {
                        new p.AdminSearchBookingCtrl().Show();
                    });
                },
                goDriver: function () {
                    require(['./Admin/Driver/DriverCtrl'], function (p) {
                        new p.DriverCtrl().Show();
                    });
                },
                goViewDriver: function () {
                    require(['./Admin/Driver/DriverCtrl'], function (p) {
                        new p.DriverCtrl().GetAll();
                    });
                },
                goGraveyard: function () {
                    require(['./Admin/Graveyard/GraveyardCtrl'], function (p) {
                        new p.GraveyardCtrl().Show();
                    });
                },
                goViewGraveyard: function () {
                    require(['./Admin/Graveyard/GraveyardCtrl'], function (p) {
                        new p.GraveyardCtrl().GetAll();
                    });
                },
                goTown: function () {
                    require(['./Admin/Town/TownCtrl'], function (p) {
                        new p.TownCtrl().Show();
                    });
                },
                goViewTown: function () {
                    require(['./Admin/Town/TownCtrl'], function (p) {
                        new p.TownCtrl().GetAll();
                    });
                },
                goUnionCouncil: function () {
                    require(['./Admin/UnionCouncil/UnionCouncilCtrl'], function (p) {
                        new p.UnionCouncilCtrl().Show();
                    });
                },
                goViewUnionCouncil: function () {
                    require(['./Admin/UnionCouncil/UnionCouncilCtrl'], function (p) {
                        new p.UnionCouncilCtrl().GetAll();
                    });
                },
                goLandmark: function () {
                    require(['./Admin/Landmark/LandmarkCtrl'], function (p) {
                        new p.LandmarkCtrl().Show();
                    });
                },
                goViewLandmark: function () {
                    require(['./Admin/Landmark/LandmarkCtrl'], function (p) {
                        new p.LandmarkCtrl().GetAll();
                    });
                },
                goPaymentType: function () {
                    require(['./Admin/PaymentType/PaymentTypeCtrl'], function (p) {
                        new p.PaymentTypeCtrl().Show();
                    });
                },
                goViewPaymentType: function () {
                    require(['./Admin/PaymentType/PaymentTypeCtrl'], function (p) {
                        new p.PaymentTypeCtrl().GetAll();
                    });
                },
                goRefundType: function () {
                    require(['./Admin/RefundType/RefundTypeCtrl'], function (p) {
                        new p.RefundTypeCtrl().Show();
                    });
                },
                goViewRefundType: function () {
                    require(['./Admin/RefundType/RefundTypeCtrl'], function (p) {
                        new p.RefundTypeCtrl().GetAll();
                    });
                },
                goVisitType: function () {
                    require(['./Admin/VisitType/VisitTypeCtrl'], function (p) {
                        new p.VisitTypeCtrl().Show();
                    });
                },
                goViewVisitType: function () {
                    require(['./Admin/VisitType/VisitTypeCtrl'], function (p) {
                        new p.VisitTypeCtrl().GetAll();
                    });
                },
                goCauseOfDeath: function () {
                    require(['./Admin/PaymentType/PaymentTypeCtrl'], function (p) {
                        new p.PaymentTypeCtrl().Show();
                    });
                },
                goViewCauseOfDeath: function () {
                    require(['./Admin/CauseOfDeath/CauseOfDeathCtrl'], function (p) {
                        new p.PaymentTypeCtrl().GetAll();
                    });
                },
                goViewTest: function () {
                    // new koBindingController.KoBindingCtrl().Show();
                },
                goTrackingDevice: function () {
                    require(['./Admin/TrackingDevice/TrackingDeviceCtrl'], function (p) {
                        new p.TrackingDeviceCtrl().Show();
                    });
                },
                goViewTrackingDevice: function () {
                    require(['./Admin/TrackingDevice/TrackingDeviceCtrl'], function (p) {
                        new p.TrackingDeviceCtrl().GetAll();
                    });
                },
                goChangePassword: function () {
                    require(['./ChangePassword/ChangePasswordCtrl'], function (p) {
                        new p.ChangePasswordCtrl().Load();
                    });
                },
                defaultRoute: function () {
                    self.ContainerRegion.reset();
                    self.ContainerRegion.show(layout);
                    require(['./Login/LoginCtrl'], function (p) {
                        new p.LoginCtrl().Load();
                    });
                }
            });
            this.AppRoutes = new routes();
        };

        Application.prototype.initalizeLocalStorage = function () {
            if (localStorage.getItem('lookupResponse') != null) {
                localStorage.removeItem('lookupResponse');
            }
            require(['./DAL/Booking'], function (p) {
                var deferred = p.Load();
                deferred.done(function (p) {
                    localStorage.setItem('lookupResponse', JSON.stringify(p));
                });
            });
        };
        Application.getInstance = function () {
            if (Application._instance === null) {
                //alert("new instance");
                Application._instance = new Application();
            }
            return Application._instance;
        };
        Application._instance = null;
        return Application;
    })(Marionette.Application);
    exports.Application = Application;

    //on load call initialize application
    $(function () {
        var app = Application.getInstance();
        app.start();

        //var rgnModal = modalHelper.GetModalRegion();
        var rgnModal = new modalHelper.ModalRegion({ el: '#ModalPopup' });

        //var modal = new rgnModal({ el: '#ModalPopup' });
        //app.ModalRegion = modal;
        app.ModalRegion = rgnModal;
    });
});
//aaa
//# sourceMappingURL=App.js.map
