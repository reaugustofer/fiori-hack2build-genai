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

        return BaseController.extend("numenit.com.hack2buildgenai.controller.NewsDetail", {

            onInit: function () {
                var oRouter = this.getRouter();

                oRouter.getRoute("RouteNewsDetail").attachMatched(this._onRouteMatched, this);
            },

            _onRouteMatched: function (oEvent) {
                var oArgs, oView;

                oArgs = oEvent.getParameter("arguments");
                oView = this.getView();

                oView.bindElement({
                    path: "/NewsDetail(" + "id=" + oArgs.NewsId + ")",
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
            }

        });
    });