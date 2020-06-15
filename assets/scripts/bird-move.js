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

    onLoad: function() {
        this.frameCounter = 0;
        this.frameIdx = 0;

        this.speed = window.speed;

        this.sprite = this.node.getComponent(cc.Sprite);
        this.collider = this.node.getComponent(cc.BoxCollider);

        GameEvent.on(GameEventType.ALL_UPDATE_SPEED, ({ speed }) => {
            this.speed = speed;
        });

        this.isEnemy = false;

        this.node.on(NodeEventType.ENEMY_ACTIVE, () => {
            this.startPosition();
            this.isEnemy = true;
        });

        this.node.on(NodeEventType.ENEMY_HIDE, () => {
            this.hide()
        })
    },

    update: function() {
        if (!this.isEnemy) {
            return;
        }

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

        const nextCollider = nextNode.getComponent(cc.BoxCollider);
        this.collider.offset = nextCollider.offset;
        this.collider.size = nextCollider.size;

        this.frameIdx++;
    },

    updatePosition: function() {
        const size = cc.view.getDesignResolutionSize();

        if (this.node.x < - size.width / 2 - this.node.width / 2) {
            this.isEnemy = false;

            this.node.emit(NodeEventType.ENEMY_DEACTIVE);
        }

        this.node.x -= this.speed;
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
    },

    hide: function() {
        const size = cc.view.getDesignResolutionSize();

        this.node.x = - size.width / 2 - this.node.width / 2;
    },
});