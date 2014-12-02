/// <reference path="../Scripts/typings/require/require.d.ts" />
/// <reference path="../Scripts/typings/marionette/marionette.d.ts" />
/// <amd-dependency path="marionette"/>
/// <amd-dependency path="datatablesBootstrap"/>


import adminLeft = require("../CCTracking.WebClient/Common/Views/AdminLeftView");
import modalHelper = require("./ModalHelper");
var datatablesBootstrap = require("datatablesBootstrap");

export class Application extends Marionette.Application {
    AppLayout: any;
    ContainerRegion: Marionette.Region;
    AppRoutes: Marionette.AppRouter;
    LoginRegion: Marionette.Region;
    HeaderRegion: Marionette.Region;
    LeftRegion: Marionette.Region;
    RightRegion: Marionette.Region;
    MainRegion: Marionette.Region;
    DetailRegion: Marionette.Region;
    ModalRegion: Marionette.Region;
    SubRegion: Marionette.Region;

    private static _instance: Application = null;

    constructor() {
        super();
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

    initializeAfter() {
        //console.log('Initalize after called..');
        this.initalizeLocalStorage();
        //var loginView = new login.LoginItemView();
        var layout = this.AppLayout;
        this.ContainerRegion.show(layout);
        //var loginCtrl = new loginController.LoginCtrl();
        //loginCtrl.Load();
        require(['./Login/LoginCtrl'], (p) => { new p.LoginCtrl().Load(); });

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
            goUser() {
                require(['./User/UserCtrl'], (p) => { new p.UserCtrl().Show(); });
            },
            goViewUser() {
                require(['./User/UserCtrl'], (p) => { new p.UserCtrl().GetAll(); });
            },
            goBus() {
                require(['./Bus/BusCtrl'], (p) => { new p.BusCtrl().Show(); });
            },
            goAddBooking() {
                require(['./Booking/BookingCtrl'], (p) => { new p.BookingCtrl().Show(); });
            },
            goEditBooking() {
                require(['./Booking/BookingCtrl'], (p) => { new p.BookingCtrl().Show(); });
            },
            goViewBooking() {
                require(['./Booking/BookingCtrl'], (p) => { new p.BookingCtrl().GetAll(1); });
            },
            goPayment() {
                require(['./Payment/PaymentCtrl'], (p) => { new p.PaymentCtrl().Show(); });
            },
            goStation()
            {
                require(['./Admin/AlkhidmatCentre/AlkhidmatCentreCtrl'], (p) => { new p.StationCtrl().Show(); });
            },
            goViewStation()
            {
                require(['./Admin/AlkhidmatCentre/AlkhidmatCentreCtrl'], (p) => { new p.StationCtrl().GetAll(); });
            },
            goCancel() {
                require(['./RefundBooking/RefundBookingCtrl'], (p) => { new p.RefundBookingCtrl().Show(); });
            },
            goViewBusVisit() {
                require(['./Bus/BusVisitCtrl'], (p) => { new p.BusVisitCtrl().SimpleLoad(); });
            },
            gobusVisit() {
                require(['./Bus/BusVisitCtrl'], (p) => { new p.BusVisitCtrl().Show(); });
            },
            goEditBusVisit() {
                require(['./Bus/BusVisitCtrl'], (p) => { new p.BusVisitCtrl().Show(); });
            },
            goAdminBusVisit() {
                require(['./Admin/BusMilage/BusMilageCtrl'], (p) => { new p.BusMilageCtrl().SimpleLoad(); });
            },
            goAdminBus() {
                require(['./Admin/Bus/BusCtrl'], (p) => { new p.BusCtrl().Show(); });
            },
            goViewAdminBus() {
                require(['./Admin/Bus/BusCtrl'], (p) => { new p.BusCtrl().GetAll(); });
            },
            goSearchBooking() {
                require(['./Search/SearchCtrl'], (p) => { new p.SearchCtrl().Show(); });
            },

            goAdminSearchBooking() {
                require(['./Admin/AdminSearchBooking/AdminSearchBookingCtrl'], (p) => { new p.AdminSearchBookingCtrl().Show(); });
            },
            goDriver() {
                require(['./Admin/Driver/DriverCtrl'], (p) => { new p.DriverCtrl().Show(); });
            },
            goViewDriver() {
                require(['./Admin/Driver/DriverCtrl'], (p) => { new p.DriverCtrl().GetAll(); });
            },
            goGraveyard() {
                require(['./Admin/Graveyard/GraveyardCtrl'], (p) => { new p.GraveyardCtrl().Show(); });
            },
            goViewGraveyard() {
                require(['./Admin/Graveyard/GraveyardCtrl'], (p) => { new p.GraveyardCtrl().GetAll(); });
            },
            goTown() {
                require(['./Admin/Town/TownCtrl'], (p) => { new p.TownCtrl().Show(); });
            },
            goViewTown() {
                require(['./Admin/Town/TownCtrl'], (p) => { new p.TownCtrl().GetAll(); });
            },
            goUnionCouncil() {
                require(['./Admin/UnionCouncil/UnionCouncilCtrl'], (p) => { new p.UnionCouncilCtrl().Show(); });
            },
            goViewUnionCouncil() {
                require(['./Admin/UnionCouncil/UnionCouncilCtrl'], (p) => { new p.UnionCouncilCtrl().GetAll(); });
            },
            goLandmark() {
                require(['./Admin/Landmark/LandmarkCtrl'], (p) => { new p.LandmarkCtrl().Show(); });
            },
            goViewLandmark() {
                require(['./Admin/Landmark/LandmarkCtrl'], (p) => { new p.LandmarkCtrl().GetAll(); });
            },
            goPaymentType() {
                require(['./Admin/PaymentType/PaymentTypeCtrl'], (p) => { new p.PaymentTypeCtrl().Show(); });
            },
            goViewPaymentType() {
                require(['./Admin/PaymentType/PaymentTypeCtrl'], (p) => { new p.PaymentTypeCtrl().GetAll(); });
            },
            goRefundType() {
                require(['./Admin/RefundType/RefundTypeCtrl'], (p) => { new p.RefundTypeCtrl().Show(); });
            },
            goViewRefundType() {
                require(['./Admin/RefundType/RefundTypeCtrl'], (p) => { new p.RefundTypeCtrl().GetAll(); });
            },
            goVisitType() {
                require(['./Admin/VisitType/VisitTypeCtrl'], (p) => { new p.VisitTypeCtrl().Show(); });
            },
            goViewVisitType() {
                require(['./Admin/VisitType/VisitTypeCtrl'], (p) => { new p.VisitTypeCtrl().GetAll(); });
            },
            goCauseOfDeath() {
                require(['./Admin/PaymentType/PaymentTypeCtrl'], (p) => { new p.PaymentTypeCtrl().Show(); });
            },
            goViewCauseOfDeath() {
                require(['./Admin/CauseOfDeath/CauseOfDeathCtrl'], (p) => { new p.PaymentTypeCtrl().GetAll(); });
            },
            goViewTest() {
                // new koBindingController.KoBindingCtrl().Show();
            },
            goTrackingDevice() {
                require(['./Admin/TrackingDevice/TrackingDeviceCtrl'], (p) => { new p.TrackingDeviceCtrl().Show(); });
            },
            goViewTrackingDevice() {
                require(['./Admin/TrackingDevice/TrackingDeviceCtrl'], (p) => { new p.TrackingDeviceCtrl().GetAll(); });
            },
            goChangePassword() {
                require(['./ChangePassword/ChangePasswordCtrl'], (p) => { new p.ChangePasswordCtrl().Load(); });
            },
            defaultRoute() {
                self.ContainerRegion.reset();
                self.ContainerRegion.show(layout);
                require(['./Login/LoginCtrl'], (p) => { new p.LoginCtrl().Load(); });
            }
        });
        this.AppRoutes = new routes();
    }

    initalizeLocalStorage() {
        if (localStorage.getItem('lookupResponse') != null) {
            localStorage.removeItem('lookupResponse');
        }
        require(['./DAL/Booking'], (p) => {
            var deferred = p.Load();
            deferred.done(p => {
                localStorage.setItem('lookupResponse', JSON.stringify(p));
            }
                );
        });
    }
    public static getInstance(): Application {

        if (Application._instance === null) {
            //alert("new instance");
            Application._instance = new Application();
        }
        return Application._instance;
    }
}

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
//aaa
