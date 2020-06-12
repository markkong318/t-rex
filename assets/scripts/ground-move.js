const SPEED_INIT = 5;

cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad: function () {
        const size = cc.view.getDesignResolutionSize();

        this.startX = this.node.width / 2 - size.width / 2;
        this.speed = SPEED_INIT;

        this.node.x = this.startX;

        GameEvent.on(GameEventType.ALL_UPDATE_SPEED, ({ speed }) => {
            this.speed = speed;
        });
    },

    update: function() {
        this.node.x -= this.speed;

        if ((this.startX - this.node.x) > this.node.width / 2) {
            this.node.x = this.startX;
        }

        GameEvent.emit(GameEventType.T_REX_MOVE_DISTANCE, { distance: this.speed });
    }
});