const SPEED_INIT = 5;

cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function() {
        let speed = SPEED_INIT;

        const callback = () => {
            speed += 0.5;
        };

        GameEvent.on(GameEventType.T_REX_START, () => {
            speed = SPEED_INIT;
        });


    }
});