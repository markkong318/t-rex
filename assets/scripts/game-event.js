cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function() {
        window.GameEvent = new cc.EventTarget();

        window.GameEventType = {
            JUMP_START: "JUMP_START",
            JUMP_END: "JUMP_END",
            CROUCH_START: "CROUCH_START",
            CROUCH_END: "CROUCH_END",
        };
    }

});