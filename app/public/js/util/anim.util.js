"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var animations_1 = require("@angular/animations");
var DIALOG_STYLE_IN = {
    transform: 'scale(1)',
    opacity: 1
};
var DIALOG_STYLE_OUT = {
    transform: 'scale(0.1)',
    opacity: 0
};
var DIALOG_ANIM_DURATION = 200;
var FADE_STYLE_IN = { opacity: 1 };
var FADE_STYLE_OUT = { opacity: 0 };
var FADE_STYLE_ABSOLUTE_OUT = {
    opacity: 0,
    position: 'absolute'
};
var FADE_ANIM_DURATION = 200;
// bouncing
var EASE_IN_BACK = 'cubic-bezier(0.600, -0.280, 0.735, 0.045)';
var EASE_OUT_BACK = 'cubic-bezier(0.175, 0.885, 0.320, 1.275)';
var DialogAnim = (function () {
    function DialogAnim() {
    }
    return DialogAnim;
}());
DialogAnim.dialog = animations_1.trigger('dialog', [
    animations_1.state('in', animations_1.style(DIALOG_STYLE_IN)),
    animations_1.transition('void => *', [
        animations_1.style(DIALOG_STYLE_OUT),
        animations_1.animate(DIALOG_ANIM_DURATION + 'ms ' + EASE_OUT_BACK)
    ]),
    animations_1.transition('* => void', [
        animations_1.animate(DIALOG_ANIM_DURATION + 'ms ' + EASE_IN_BACK, animations_1.style(DIALOG_STYLE_OUT))
    ])
]);
DialogAnim.dialogSlow = animations_1.trigger('dialogSlow', [
    animations_1.state('in', animations_1.style(DIALOG_STYLE_IN)),
    animations_1.transition('void => *', [
        animations_1.style(DIALOG_STYLE_OUT),
        animations_1.animate((DIALOG_ANIM_DURATION * 2) + 'ms ' + EASE_OUT_BACK)
    ]),
    animations_1.transition('* => void', [
        animations_1.animate((DIALOG_ANIM_DURATION * 2) + 'ms ' + EASE_IN_BACK, animations_1.style(DIALOG_STYLE_OUT))
    ])
]);
exports.DialogAnim = DialogAnim;
var FadeAnim = (function () {
    function FadeAnim() {
    }
    return FadeAnim;
}());
FadeAnim.fade = animations_1.trigger('fade', [
    animations_1.state('in', animations_1.style(FADE_STYLE_IN)),
    animations_1.transition('void => *', [
        animations_1.style(FADE_STYLE_OUT),
        animations_1.animate(FADE_ANIM_DURATION + 'ms ease-in-out')
    ]),
    animations_1.transition('* => void', [
        animations_1.animate(FADE_ANIM_DURATION + 'ms ease-in-out', animations_1.style(FADE_STYLE_OUT))
    ])
]);
FadeAnim.fadeAbsolute = animations_1.trigger('fadeAbsolute', [
    animations_1.state('in', animations_1.style(FADE_STYLE_IN)),
    animations_1.transition('void => *', [
        animations_1.style(FADE_STYLE_ABSOLUTE_OUT),
        animations_1.animate(FADE_ANIM_DURATION + 'ms ease-in-out')
    ]),
    animations_1.transition('* => void', [
        animations_1.animate(FADE_ANIM_DURATION + 'ms ease-in-out', animations_1.style(FADE_STYLE_ABSOLUTE_OUT))
    ])
]);
exports.FadeAnim = FadeAnim;

//# sourceMappingURL=anim.util.js.map
