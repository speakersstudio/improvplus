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
var router_1 = require("@angular/router");
var app_component_1 = require("./app.component");
var user_service_1 = require("../service/user.service");
var LoginScreenComponent = (function () {
    function LoginScreenComponent(_app, router, userService) {
        this._app = _app;
        this.router = router;
        this.userService = userService;
    }
    LoginScreenComponent.prototype.ngOnInit = function () {
        if (this.userService.getLoggedInUser()) {
            this.router.navigate(['/app/dashboard']);
        }
        else {
            this._app.showBackground(true);
            this._app.login();
        }
    };
    return LoginScreenComponent;
}());
LoginScreenComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "login-screen",
        template: "<div class=\"page\"></div>"
    }),
    __metadata("design:paramtypes", [app_component_1.AppComponent,
        router_1.Router,
        user_service_1.UserService])
], LoginScreenComponent);
exports.LoginScreenComponent = LoginScreenComponent;

//# sourceMappingURL=login-screen.component.js.map
