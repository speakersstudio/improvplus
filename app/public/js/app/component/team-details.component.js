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
var common_1 = require("@angular/common");
var app_component_1 = require("../../component/app.component");
var team_1 = require("../../model/team");
var user_service_1 = require("../../service/user.service");
var team_service_1 = require("../service/team.service");
var time_util_1 = require("../../util/time.util");
var anim_util_1 = require("../../util/anim.util");
var TeamDetailsComponent = (function () {
    function TeamDetailsComponent(_app, router, route, userService, teamService, pathLocationStrategy, _location) {
        this._app = _app;
        this.router = router;
        this.route = route;
        this.userService = userService;
        this.teamService = teamService;
        this.pathLocationStrategy = pathLocationStrategy;
        this._location = _location;
        this.selectedTab = 'team';
        this.adminActions = [
            'team_subscription_invite',
            'team_invite',
            'team_edit',
            'team_user_promote',
            'team_purchases_view'
        ];
        this._tools = [
            {
                icon: "fa-sign-out",
                name: "leave",
                text: "Leave Team",
                active: false
            }
        ];
        this._timeUtil = time_util_1.TimeUtil;
    }
    TeamDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user = this.userService.getLoggedInUser();
        this.route.params.forEach(function (params) {
            var id = params['id'];
            _this.getTeam(id);
        });
    };
    TeamDetailsComponent.prototype.onToolClicked = function (tool) {
        switch (tool.name) {
            case "leave":
                this.leave();
                break;
        }
    };
    TeamDetailsComponent.prototype.goBack = function () {
        this._location.back();
    };
    TeamDetailsComponent.prototype.selectTab = function (tab) {
        this.selectedTab = tab.id;
    };
    TeamDetailsComponent.prototype.getDate = function (date) {
        return time_util_1.TimeUtil.simpleDate(date);
    };
    TeamDetailsComponent.prototype.getTime = function (date) {
        return time_util_1.TimeUtil.simpleTime(date);
    };
    TeamDetailsComponent.prototype.getTeam = function (id) {
        var _this = this;
        this.teamService.getTeam(id)
            .then(function (team) { return _this.setTeam(team); });
    };
    TeamDetailsComponent.prototype.can = function (action) {
        var can = this.userService.can(action);
        if (this.adminActions.indexOf(action)) {
            return can && this.isUserAdmin();
        }
        else {
            return can;
        }
    };
    TeamDetailsComponent.prototype.isUserAdmin = function () {
        return this.userService.isAdminOfTeam(this.team);
    };
    TeamDetailsComponent.prototype.setTeam = function (team) {
        var _this = this;
        this.team = team;
        this.calculateSubs();
        if (this.isUserAdmin()) {
            this.teamService.fetchPurchases(this.team).then(function (p) {
                _this.purchases = p;
            });
        }
        this.teamService.fetchSubscription(this.team).then(function (s) {
            _this.subscription = s;
        });
        this.title = team.name;
        this.tabs = [
            {
                name: 'Team Details',
                id: 'team',
                icon: 'users'
            },
            {
                name: 'Members',
                id: 'members',
                icon: 'user-plus'
            }
        ];
        if (this.can('team_purchases_view')) {
            this.tabs.push({
                name: 'Team Subscription',
                id: 'subscription',
                icon: 'id-card-o'
            });
            this.tabs.push({
                name: 'Purchase History',
                id: 'purchases',
                icon: 'money'
            });
        }
    };
    TeamDetailsComponent.prototype.calculateSubs = function () {
        this.pendingInvites = this.team.subscription.invites ? this.team.subscription.invites.length : 0;
        this.remainingSubs = this.team.subscription.subscriptions - (this.team.subscription.children.length || 0) - this.pendingInvites;
    };
    TeamDetailsComponent.prototype.saveEditName = function (name) {
        this.team.name = name;
        this.teamService.saveTeam(this.team);
    };
    TeamDetailsComponent.prototype.saveEditPhone = function (phone) {
        this.team.phone = phone;
        this.teamService.saveTeam(this.team);
    };
    TeamDetailsComponent.prototype.saveEditEmail = function (email) {
        this.team.email = email;
        this.teamService.saveTeam(this.team);
    };
    TeamDetailsComponent.prototype.saveEditUrl = function (url) {
        this.team.url = url;
        this.teamService.saveTeam(this.team);
    };
    TeamDetailsComponent.prototype.saveEditCompany = function (company) {
        this.team.company = company;
        this.teamService.saveTeam(this.team);
    };
    TeamDetailsComponent.prototype.saveEditAddress = function (address) {
        this.team.address = address.address;
        this.team.city = address.city;
        this.team.state = address.state;
        this.team.zip = address.zip;
        this.team.country = address.country;
        this.teamService.saveTeam(this.team);
    };
    TeamDetailsComponent.prototype.showEditDescription = function () {
        if (this.can('team_edit')) {
            this.newDescriptionText = this.team.description;
            this.editDescriptionShown = true;
        }
    };
    TeamDetailsComponent.prototype.cancelDescription = function () {
        this.editDescriptionShown = false;
    };
    TeamDetailsComponent.prototype.saveDescription = function () {
        this.team.description = this.newDescriptionText;
        this.teamService.saveTeam(this.team);
        this.cancelDescription();
    };
    TeamDetailsComponent.prototype.selectUser = function (user) {
        if (this.selectedUser !== user) {
            this.selectedUser = user;
        }
        else {
            this.selectedUser = null;
        }
    };
    TeamDetailsComponent.prototype.invite = function () {
        this._app.backdrop(true);
        this.showInviteDialog = true;
        this.inviteEmail = '';
    };
    TeamDetailsComponent.prototype.cancelInviteDialog = function () {
        this._app.backdrop(false);
        this.showInviteDialog = false;
        this.inviteStatus = '';
    };
    TeamDetailsComponent.prototype.submitInvite = function () {
        var _this = this;
        this.isPosting = true;
        this.inviteError = '';
        this.teamService.invite(this.team, this.inviteEmail)
            .then(function (invite) {
            _this.isPosting = false;
            _this.inviteStatus = 'wait';
            _this.inviteModel = invite;
            if (invite) {
                _this.team.subscription.invites.push(invite);
                _this.calculateSubs();
                setTimeout(function () {
                    if (!invite.inviteUser || !invite.inviteUser.subscription) {
                        _this.inviteStatus = 'new';
                    }
                    else {
                        _this.inviteStatus = 'exists';
                    }
                }, 300);
            }
        }, function (error) {
            _this.isPosting = false;
            var response = error.json();
            if (response.error && response.error == 'invite already exists') {
                _this.inviteError = 'That email address has already been invited to ' + _this.team.name + '.';
            }
            else if (response.error && response.error == 'user already in team') {
                _this.inviteError = 'That user is already in your team.';
            }
            else if (response.error && response.error == 'user type mismatch') {
                if (_this.subscription.type == 'improviser') {
                    _this.inviteError = 'At this time, you cannot invite a Facilitator to an Improv Team.';
                }
                else {
                    _this.inviteError = 'At this time, you cannot invite an Improviser to a Facilitator Team.';
                }
            }
            else {
                _this.inviteError = 'There was some sort of problem sending that invite.';
            }
        });
    };
    TeamDetailsComponent.prototype.selectInvite = function (invite) {
        if (this.selectedInvite && this.selectedInvite._id == invite._id) {
            this.selectedInvite = null;
        }
        else {
            this.selectedInvite = invite;
        }
    };
    TeamDetailsComponent.prototype.cancelInvite = function (invite) {
        var _this = this;
        this.selectedInvite = invite;
        this._app.dialog('Cancel an Invitation', 'Are you sure you want to revoke your invitation to ' + invite.email + '? We already sent them the invite, but the link inside will no longer work. We will not notify them that it was cancelled.', 'Yes', function () {
            _this.userService.cancelInvite(invite).then(function (done) {
                if (done) {
                    var index = _this.team.subscription.invites.indexOf(invite);
                    _this.team.subscription.invites.splice(index, 1);
                    _this.calculateSubs();
                }
            });
        });
    };
    TeamDetailsComponent.prototype.leave = function () {
        var _this = this;
        var body = "\n            <p>Are you sure you want to leave this team? You will no longer have access to any of the team's resources.</p>\n        ";
        if (this.user.subscription.parent == this.team.subscription._id) {
            body += "\n                <p class=\"error\"><strong>Warning: Your subscription is inherited from " + this.team.name + ". If you leave the team, you will have to purchase a new subscription to keep using ImprovPlus.</strong></p>\n            ";
        }
        this._app.dialog('Leave ' + this.team.name + '?', body, 'Yes', function () {
            _this.userService.leaveTeam(_this.team).then(function (user) {
                _this.router.navigate(['/app/dashboard']);
                setTimeout(function () {
                    _this._app.dialog('It is done', 'You have successfully left ' + _this.team.name + '.');
                }, 500);
            });
        });
    };
    TeamDetailsComponent.prototype.buySubscription = function () {
        this._app.toast("This button doesn't work yet. Soon, though. Soon.");
    };
    TeamDetailsComponent.prototype.getUserName = function (user) {
        return user.firstName ? user.firstName : 'this user';
    };
    TeamDetailsComponent.prototype.removeUserFromTeam = function (user) {
        var _this = this;
        this._app.dialog('Remove ' + this.getUserName(user) + ' from the Team?', 'Are you sure you want to remove them from the Team?', 'Yes', function () {
            _this.teamService.removeUserFromTeam(_this.team, user).then(function (team) {
                _this.setTeam(team);
            });
        });
    };
    TeamDetailsComponent.prototype.promoteUser = function (user) {
        var _this = this;
        this._app.dialog('Promote ' + this.getUserName(user) + ' to Team Admin?', 'As a Team Admin, they will be able to view the Team\'s purchase history, add or remove users, and make purchases for the Team.', 'Yes', function () {
            _this.teamService.promoteUser(_this.team, user).then(function (team) {
                _this.setTeam(team);
            });
        });
    };
    TeamDetailsComponent.prototype.demoteUser = function (user) {
        var _this = this;
        this._app.dialog('Demote ' + this.getUserName(user) + '?', 'This user will no longer have Team Admin privelages.', 'Yes', function () {
            _this.teamService.demoteUser(_this.team, user).then(function (team) {
                _this.setTeam(team);
            });
        });
    };
    return TeamDetailsComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", team_1.Team)
], TeamDetailsComponent.prototype, "team", void 0);
TeamDetailsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "team-details",
        templateUrl: "../template/team-details.component.html",
        animations: [anim_util_1.DialogAnim.dialog]
    }),
    __metadata("design:paramtypes", [app_component_1.AppComponent,
        router_1.Router,
        router_1.ActivatedRoute,
        user_service_1.UserService,
        team_service_1.TeamService,
        common_1.PathLocationStrategy,
        common_1.Location])
], TeamDetailsComponent);
exports.TeamDetailsComponent = TeamDetailsComponent;

//# sourceMappingURL=team-details.component.js.map
