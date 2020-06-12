const INIT_BIG_Y = 18;
const INIT_SMALL_Y = 11;
const SPEED_INIT = 5;

const TREE_TYPE = cc.Enum ({
    BIG: 0,
    SMALL: 1,
});

cc.Class({
    extends: cc.Component,

    properties: {
        treeType: {
            type: cc.Enum(TREE_TYPE),
            default: TREE_TYPE.BIG,
        }
    },

    onLoad: function() {
        const size = cc.view.getDesignResolutionSize();

        this.speed = window.speed;

        GameEvent.on(GameEventType.ALL_UPDATE_SPEED, ({ speed }) => {
            this.speed = speed;
            console.log('tree speed:' + this.speed)
        });

        this.isEnemy = false;

        this.node.on(NodeEventType.ENEMY_ACTIVE, () => {
            this.startPosition();
            this.isEnemy = true;

            console.log('enemy acti')
        });
    },

    startPosition: function() {
        const size = cc.view.getDesignResolutionSize();

        this.node.x = size.width / 2;

        switch (this.treeType) {
            case TREE_TYPE.BIG:
                this.node.y = INIT_BIG_Y;
                break;
            case TREE_TYPE.SMALL:
                this.node.y = INIT_SMALL_Y;
                break;
        }
    },

    update: function() {
        if (!this.isEnemy) {
            return;
        }

        const size = cc.view.getDesignResolutionSize();

        if (this.node.x < - size.width / 2 - this.node.width / 2) {
            this.node.destroy();
        }

        this.node.x -= this.speed;
    },
});