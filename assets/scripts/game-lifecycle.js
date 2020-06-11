cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function() {
        GameEvent.on(GameEventType.T_REX_DEAD, () => {
            cc.director.pause();

            const gameOver = cc.find('Canvas/GameOver');
            gameOver.active = true;
        });

        GameEvent.on(GameEventType.T_REX_START, () => {


            cc.director.resume();
        });
    }

});