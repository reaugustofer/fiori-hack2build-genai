sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../controller/BaseController"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, BaseController) {
        "use strict";

        return BaseController.extend("numenit.com.hack2buildgenai.controller.List", {

            onInit: function () {
                let oRouter = this.getRouter();

                oRouter.getRoute("RouteList").attachMatched(this._onRouteMatched, this);
            },

            _onRouteMatched: function (oEvent) {
                let oArgs, oView;

                oArgs = oEvent.getParameter("arguments");
                oView = this.getView();

                oView.bindElement({
                    path: "/NewsList(" + "RawMaterial=" + oArgs.RawMaterial + "&" + "Region=" + oArgs.Region + ")",
                    events: {
                        change: this._onBindingChange.bind(this),
                        dataRequested: function (oEvent) {
                            oView.setBusy(true);
                        },
                        dataReceived: function (oEvent) {
                            oView.setBusy(false);
                        }
                    }
                });
            },

            _onBindingChange: function (oEvent) {
                // No data for the binding
                if (!this.getView().getBindingContext()) {
                    this.getRouter().getTargets().display("NotFound");
                }
            },

            onTableUpdStart: function (oEvent) {
                oEvent.getSource().setBusy(true);
            },

            onTableUpdFinished: function (oEvent) {
                oEvent.getSource().setBusy(false);
            },

            onListItemPress: function (oEvent) {
                let oItem = oEvent.getParameter("listItem") || oEvent.getSource();
                let oCtx = oItem.getBindingContext("newsModel");
                let oEntry = oCtx.getObject();
                let detailModel = this.getView().getModel("newsDetailModel");

                detailModel.setData(oEntry);

                this.getRouter().navTo("RouteNewsDetail", {
                    NewsId: oEntry.id
                });
            }

        });
    });