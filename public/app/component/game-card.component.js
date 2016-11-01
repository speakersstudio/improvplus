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
var core_1 = require('@angular/core');
require('rxjs/Subscription');
var app_component_1 = require('./app.component');
var game_database_service_1 = require('../service/game-database.service');
var game_1 = require('../model/game');
var GameCardComponent = (function () {
    function GameCardComponent(gameDatabaseService, toolService) {
        this.gameDatabaseService = gameDatabaseService;
        this.toolService = toolService;
        this.showTags = false;
        this.tags = [];
    }
    GameCardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.gameDatabaseService.getPlayerCountById(this.game.PlayerCountID)
            .then(function (playercount) { return _this.playerCount = playercount; });
        this.gameDatabaseService.getDurationById(this.game.DurationID)
            .then(function (duration) { return _this.duration = duration; });
        this.toolSubscription = this.toolService.tool$.subscribe(function (tool) { return _this.onToolClicked(tool); });
    };
    GameCardComponent.prototype.loadTags = function () {
        var _this = this;
        this.game.TagGames.forEach(function (tagGame) {
            _this.gameDatabaseService.getTagById(tagGame.TagID)
                .then(function (tag) { return _this.tags.push(tag); });
        });
    };
    GameCardComponent.prototype.onToolClicked = function (tool) {
        switch (tool.name) {
            case "showTags":
                this.showTags = tool.active;
                if (tool.active && this.tags.length === 0) {
                    this.loadTags();
                }
                break;
        }
    };
    GameCardComponent.prototype.ngOnDestroy = function () {
        this.toolSubscription.unsubscribe();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', game_1.Game)
    ], GameCardComponent.prototype, "game", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], GameCardComponent.prototype, "showTags", void 0);
    GameCardComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: '.ng-game-card',
            templateUrl: '../template/game-card.component.html'
        }), 
        __metadata('design:paramtypes', [game_database_service_1.GameDatabaseService, app_component_1.ToolService])
    ], GameCardComponent);
    return GameCardComponent;
}());
exports.GameCardComponent = GameCardComponent;

//# sourceMappingURL=game-card.component.js.map