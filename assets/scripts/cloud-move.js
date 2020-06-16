cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function() {
        this.speed = window.speed / 5;

        GameEvent.on(GameEventType.ALL_UPDATE_SPEED, ({ speed }) => {
            this.speed = speed / 5;
        });
    },

    update: function() {
        this.node.x -= this.speed;

        if (this.node.x < - this.node.parent.width / 2 - this.node.width / 2) {
            this.node.x += this.node.parent.width + this.node.width / 2;
        }
    },
});