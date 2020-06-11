const SECOND_INIT = 3;
const SECOND_BASE = 4;
const SECOND_OFFSET = 1.5;

cc.Class({
    extends: cc.Component,

    properties: {
        enemies: [cc.Node],
    },

    start: function() {
        this.counter = 0;
        this.counterMax = 3;
    },

    update: function(dt) {
        this.counter += dt;

        if (this.counter > this.counterMax) {
            this.lottery();
            this.counter = 0;
            this.counterMax = SECOND_BASE + (Math.random() * SECOND_OFFSET - SECOND_OFFSET / 2);

            console.log("next counter: " + this.counterMax);
        }
    },

    lottery: function() {
        const canvas = cc.find("Canvas");
        

        const idx = Math.floor(Math.random() * this.enemies.length);
        const enemy = this.enemies[idx];

        const node = cc.instantiate(enemy);
        node.active = true;
        node.parent = canvas;
    }
});