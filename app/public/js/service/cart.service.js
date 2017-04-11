"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/toPromise");
var app_http_1 = require("../data/app-http");
var purchase_1 = require("../model/purchase");
var user_service_1 = require("./user.service");
var CartService = (function () {
    function CartService(http, userService) {
        this.http = http;
        this.userService = userService;
        this.chargeUrl = "/charge";
        this.signupUrl = "/signup";
        this.cart = [];
    }
    CartService.prototype.reset = function () {
        this.cart = [];
    };
    CartService.prototype.addPackage = function (pack) {
        var purchase = new purchase_1.Purchase();
        if (this.userService.isLoggedIn()) {
            purchase.user = this.userService.getLoggedInUser()._id;
        }
        purchase.type = 'package';
        purchase.total = pack.price;
        purchase.package = pack;
        this.cart.push(purchase);
        return this.cart;
    };
    CartService.prototype.setUser = function (user) {
        this.user = user;
    };
    CartService.prototype.charge = function (token) {
        return this.http.post(this.chargeUrl, {
            stripeToken: token,
            cart: this.cart,
            user: this.user
        }).toPromise()
            .then(function (result) {
            return result.json();
        });
    };
    CartService.prototype.signup = function (token, email, password, pack, userName, teamName) {
        this.addPackage(pack);
        return this.http.post(this.signupUrl, {
            stripeToken: token,
            cart: this.cart,
            email: email,
            password: password,
            userName: userName,
            teamName: teamName
        }).toPromise()
            .then(function (result) {
            return result.json();
        });
    };
    return CartService;
}());
CartService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [app_http_1.AppHttp,
        user_service_1.UserService])
], CartService);
exports.CartService = CartService;

//# sourceMappingURL=cart.service.js.map
