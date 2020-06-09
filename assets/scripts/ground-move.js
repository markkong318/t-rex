const VELOCITY_INIT = 5;

cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad: function () {
        const size = cc.view.getDesignResolutionSize();

        this.startX = this.node.width / 2 - size.width / 2;
        this.velocity = VELOCITY_INIT;

        this.node.x = this.startX;
    },

    update: function() {
        this.node.x -= this.velocity;

        if ((this.startX - this.node.x) > this.node.width / 2) {
            this.node.x = this.startX;
        }
    }
});