const T_REX_STATUS_JUMP = Symbol();
const T_REX_STATUS_RUN = Symbol();
const T_REX_STATUS_CROUCH = Symbol();
const T_REX_STATUS_DEAD = Symbol();

const SPRITE_SPEED = 5;
const JUMP_SPEED = 400;
const GRAVITY = 1000;

cc.Class({
    extends: cc.Component,

    properties: {
        jumpNodes: [cc.Node],
        runNodes: [cc.Node],
        crouchNodes: [cc.Node],
        deadNodes: [cc.Node],
    },

    onLoad: function () {
        this.spriteCounter = 0;
        this.spriteIdx = 0;

        this.status = T_REX_STATUS_RUN;

        this.sprite = this.node.getComponent(cc.Sprite);
        this.collider = this.node.getComponent(cc.BoxCollider);

        GameEvent.on(GameEventType.T_REX_JUMP_START, () => {
            this.jump();
        });

        GameEvent.on(GameEventType.T_REX_CROUCH_START, () => {
            this.crouchStart()
        });

        GameEvent.on(GameEventType.T_REX_CROUCH_END, () => {
            this.crouchEnd()
        });

        this.speedY = 0;
        this.initY = this.node.y;
    },

    update: function (dt) {
        this.updateSprite(dt);
        this.updateJump(dt);
    },

    updateSprite: function(dt) {
        this.spriteCounter++;

        if (this.spriteCounter % SPRITE_SPEED) {
            return;
        }

        this.spriteCounter = 0;

        let nextNodes;
        switch (this.status) {
            case T_REX_STATUS_JUMP:
                nextNodes = this.jumpNodes;
                break;
            case T_REX_STATUS_RUN:
                nextNodes = this.runNodes;
                break;
            case T_REX_STATUS_CROUCH:
                nextNodes = this.crouchNodes;
                break;
            case T_REX_STATUS_DEAD:
                nextNodes = this.deadNodes;
                break;
        }

        const idx = this.spriteIdx % nextNodes.length;

        if (!idx) {
            this.spriteIdx = 0;
        }

        const nextNode = nextNodes[idx];

        const nextSprite = nextNode.getComponent(cc.Sprite);
        this.sprite.spriteFrame = nextSprite.spriteFrame;

        const nextCollider = nextNode.getComponent(cc.BoxCollider);
        this.collider.offset = nextCollider.offset;
        this.collider.size = nextCollider.size;

        this.spriteIdx++;
    },

    updateJump: function(dt) {
        if (this.status !== T_REX_STATUS_JUMP) {
            return;
        }

        this.speedY = this.speedY - GRAVITY * dt;

        this.node.y += this.speedY * dt;

        if (this.node.y < this.initY) {
            this.node.y = this.initY;
            this.status = T_REX_STATUS_RUN;
        }
    },

    jump: function() {
        if (this.status !== T_REX_STATUS_RUN && this.status !== T_REX_STATUS_JUMP) {
            return;
        }

        switch (this.status) {
            case T_REX_STATUS_RUN:
                this.speedY = JUMP_SPEED;
                break;
            case T_REX_STATUS_JUMP:
                this.speedY = -JUMP_SPEED;
                break;
        }

        this.status = T_REX_STATUS_JUMP;
    },

    crouchStart: function() {
        if (this.status !== T_REX_STATUS_RUN) {
            return;
        }

        this.status = T_REX_STATUS_CROUCH;
    },

    crouchEnd: function() {
        if (this.status !== T_REX_STATUS_CROUCH) {
            return;
        }

        this.status = T_REX_STATUS_RUN;
    },

    onCollisionEnter: function (other, self) {
        GameEvent.emit(GameEventType.T_REX_DEAD);
    },
});