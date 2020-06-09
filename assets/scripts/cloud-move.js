const VELOCITY_INIT = 1;

cc.Class({
    extends: cc.Component,

    properties: {},

    update: function() {
        this.node.x -= VELOCITY_INIT;

        const size = cc.view.getDesignResolutionSize();

        if (this.node.x < - size.width / 2) {
            this.node.x += size.width;
        }
    },
});