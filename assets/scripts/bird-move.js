const INIT_Y = 11;
const VELOCITY_INIT = 5;

const FRAME_SPEED = 15;

const FLY_LOW_ID = 0;
const FLY_MIDDLE_ID = 1;
const FLY_HIGH_ID = 2;

const FLY_LOW_Y = 16;
const FLY_MIDDLE_Y = 46;
const FLY_HIGH_Y = 63;

cc.Class({
    extends: cc.Component,

    properties: {
        flyNodes: [cc.Node],
    },

    start: function() {
        this.frameCounter = 0;
        this.frameIdx = 0;

        this.sprite = this.node.getComponent(cc.Sprite);
        this.collider = this.node.getComponent(cc.PolygonCollider);

        // this.node.on(NodeEventType.ENEMY_RESTART, () => {
        //     this.restart();
        // });

        // GameEvent.emit(GameEventType.ENEMY_EXIT, {node: this.node});

        this.startPosition();
    },

    update: function() {
        this.updateFrame();
        this.updatePosition();
    },

    updateFrame: function() {
        this.frameCounter++;

        if (this.frameCounter % FRAME_SPEED) {
            return;
        }

        this.frameCounter = 0;

        const idx = this.frameIdx % this.flyNodes.length;

        const nextNode = this.flyNodes[idx];

        const nextSprite = nextNode.getComponent(cc.Sprite);
        this.sprite.spriteFrame = nextSprite.spriteFrame;

        const nextCollider = nextNode.getComponent(cc.PolygonCollider);
        this.collider.points = nextCollider.points;

        this.frameIdx++;
    },

    updatePosition: function() {
        const size = cc.view.getDesignResolutionSize();

        if (this.node.x < - size.width / 2 - this.node.width / 2) {
            // return;
            this.node.destroy();
        }

        this.node.x -= VELOCITY_INIT;
    },

    startPosition: function() {
        const size = cc.view.getDesignResolutionSize();

        this.node.x = size.width / 2;

        const flyId = Math.floor(Math.random() * 3);
        switch (flyId) {
            case FLY_LOW_ID:
                this.node.y = FLY_LOW_Y;
                break;
            case FLY_MIDDLE_ID:
                this.node.y = FLY_MIDDLE_Y;
                break;
            case FLY_HIGH_ID:
                this.node.y = FLY_HIGH_Y;
                break;
        }

        console.log("fly id: "+ flyId);
    },

    remove: function() {
        const size = cc.view.getDesignResolutionSize();

        this.node.x = - size.width / 2;
    },
});