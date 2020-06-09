cc.Class({
    extends: cc.Component,

    properties: {
    },

    start: function () {
        const size = cc.view.getDesignResolutionSize();

        this.node.on(cc.Node.EventType.TOUCH_START, (e) =>  {
            if (e.getLocation().y > size.height / 2) {
                console.log("jump s");
                GameEvent.emit(GameEventType.JUMP_START);
            } else {
                console.log("couch s");
                GameEvent.emit(GameEventType.CROUCH_START);
            }
        });

        this.node.on(cc.Node.EventType.TOUCH_END, (e) =>  {
            if (e.getLocation().y > size.height / 2) {
                console.log("jump e");
                GameEvent.emit(GameEventType.JUMP_END);
            } else {
                console.log("couch e");
                GameEvent.emit(GameEventType.CROUCH_END);
            }
        });
    },

});