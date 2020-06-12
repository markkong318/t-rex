cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function() {
        window.GameEvent = new cc.EventTarget();

        window.GameEventType = {
            T_REX_START: 'T_REX_START',
            T_REX_JUMP_START: 'T_REX_JUMP_START',
            T_REX_JUMP_END: 'T_REX_JUMP_END',
            T_REX_CROUCH_START: 'T_REX_CROUCH_START',
            T_REX_CROUCH_END: 'T_REX_CROUCH_END',
            T_REX_DEAD: 'T_REX_DEAD',
            T_REX_MOVE_DISTANCE: 'T_REX_MOVE_DISTANCE',
            ALL_UPDATE_SPEED: 'ALL_SPEED_UP',
            ALL_FETCH_SPEED: 'ALL_FETCH_SPEED',
        };

        window.NodeEventType = {
            ENEMY_ACTIVE: 'ENEMY_ACTIVE',
        };
    }

});