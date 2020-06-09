const VELOCITY_INIT = 5;

cc.Class({
    extends: cc.Component,

    properties: {},

    update: function () {
        const size = cc.view.getDesignResolutionSize();

        if (this.node.x < -size.width) {
            return;
        }

        this.node.x -= this.velocity;
    },
});