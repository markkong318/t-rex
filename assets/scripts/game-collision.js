cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function () {
        const manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDebugDraw = true;
    },
});