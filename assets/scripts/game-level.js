const SPEED_INIT = 5;

cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function() {
        window.speed = SPEED_INIT;


        const callback = () => {
            window.speed += 0.1;

            console.log('speed update: ' + speed);

            GameEvent.emit(GameEventType.ALL_UPDATE_SPEED, { speed });
        };

        GameEvent.on(GameEventType.T_REX_START, () => {
            window.speed = SPEED_INIT;

            this.schedule(callback, 1);
        });

        GameEvent.on(GameEventType.T_REX_DEAD, () => {
            this.unschedule(callback);
        })
    }
});