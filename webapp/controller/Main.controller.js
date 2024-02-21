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

        return BaseController.extend("numenit.com.hack2buildgenai.controller.Main", {

            onInit: function (evt) {
            },

            onNavToNewsList: function () {
                var rawMaterial = this.getView().byId("rawMaterialInput").getValue();
                var region = this.getView().byId("regionInput").getValue();
                var newsModel = this.getView().getModel("newsModel");

                var requestHeaders = {
                    "Content-Type": "application/json",
                    "X-Api-Key": "35688e4e32d44002beeec326abee2973"
                }

                var requestOptions = {
                    method: 'GET',
                    headers: requestHeaders
                }

                var urlToFetch = "https://api.worldnewsapi.com/search-news?text=" + rawMaterial + " " + region;
                fetch(urlToFetch, requestOptions)
                    .then(response => response.json())
                    .then(result => newsModel.setData(result))
                    .catch(error => console.log('api get error:', error));

                this.getRouter().navTo("RouteList", {
                    RawMaterial: rawMaterial,
                    Region: region
                });
            },

            onNavToNotFound: function () {
                this.getRouter().getTargets().display("NotFound", {
                    fromTarget: "TargetMain"
                });
            }

        });
    });
