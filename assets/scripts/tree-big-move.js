const INIT_Y = 18;
const VELOCITY_INIT = 5;

cc.Class({
    extends: cc.Component,

    properties: {},

    start: function() {
        const size = cc.view.getDesignResolutionSize();

        this.node.x = size.width / 2;
        this.node.y = INIT_Y;
    },

    update: function() {
        const size = cc.view.getDesignResolutionSize();

        if (this.node.x < - size.width / 2 - this.node.width / 2) {
            // return;
            this.node.destroy();
        }

        this.node.x -= VELOCITY_INIT;

        this.node.on(NodeEventType.ENEMY_RESTART, () => {
            this.restart();
        });
    },

    remove: function() {

    },
});