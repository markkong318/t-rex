const SECOND_INIT = 3;
const SECOND_BASE = 1.3;
const SECOND_OFFSET = 0.7;

cc.Class({
    extends: cc.Component,

    properties: {
        enemies: [cc.Node],
    },

    start: function() {
        this.startCounter();

        GameEvent.on(GameEventType.T_REX_START, () => {
            this.clean();
            this.startCounter();
        });

        this.pool = [];

        for (let i = 0; i < this.enemies.length; i++) {
            const enemy = this.enemies[i];

            const parent = cc.find("Canvas/Enemy");

            const node = cc.instantiate(enemy);
            node.parent = parent;

            node.on(NodeEventType.ENEMY_DEACTIVE, () => {
                this.pool.push(node);
            });

            this.pool.push(node);
        }
    },

    startCounter: function() {
        this.counter = 0;
        this.counterMax = SECOND_INIT;
    },

    update: function(dt) {
        this.counter += dt;

        if (this.counter > this.counterMax) {
            this.lottery();
            this.counter = 0;
            this.counterMax = SECOND_BASE + (Math.random() * SECOND_OFFSET - SECOND_OFFSET / 2);
        }
    },

    lottery: function() {
        const idx = Math.floor(Math.random() * this.pool.length);
        const node = this.pool[idx];

        this.pool.splice(idx, 1);

        node.emit(NodeEventType.ENEMY_ACTIVE);
    },

    clean: function() {
        const parent = cc.find("Canvas/Enemy");

        for (let i = 0; i < parent.children.length; i++) {
            const child = parent.children[i];

            child.emit(NodeEventType.ENEMY_HIDE);
        }
    }
});