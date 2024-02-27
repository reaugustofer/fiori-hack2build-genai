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
                var oRouter = this.getRouter();

                oRouter.getRoute("RouteList").attachMatched(this._onRouteMatched, this);
            },

            _onRouteMatched: function (oEvent) {
                var oArgs, oView;

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
                var oItem = oEvent.getParameter("listItem") || oEvent.getSource();
                var oCtx = oItem.getBindingContext("newsModel");
                var oEntry = oCtx.getObject();

                alert("List item pressed: News Id: " + oEntry.id);

                this.getRouter().navTo("RouteNewsDetail", {
                    NewsId: oEntry.id
                });
            }

        });
    });