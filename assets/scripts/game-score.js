cc.Class({
    extends: cc.Component,

    properties: {
        hi: cc.Node,
        now: cc.Node,
    },

    onLoad: function() {
        this.hiScore = 0;
        this.nowScore = 0;

        this.hiScorePlaying = false;
        this.nowScorePlaying = false;
        this.scorePassing = false;

        this.updateScore();

        GameEvent.on(GameEventType.T_REX_MOVE_DISTANCE, ({ distance }) => {
            this.nowScore += distance / 5 ;

            if (this.nowScore > 99999) {
                this.nowScore = 99999;
            }

            this.updateScore();

            if (this.nowScore > 0) {
                if (Math.floor(this.nowScore) % 1000 === 0) {
                    this.playNowScore();
                } 
                
                if (this.hiScore > 0 && !this.scorePassing) {
                    if (this.nowScore > this.hiScore) {
                        this.playNowScore();
                        this.scorePassing = true;
                    }
                }
            }
        });

        GameEvent.on(GameEventType.T_REX_START, () => {
            this.nowScore = 0;
            this.scorePassing = false;

            this.updateScore();
        });

        GameEvent.on(GameEventType.T_REX_DEAD, () => {
            if (this.nowScore <= this.hiScore) {
                return;
            }

            this.hiScore = this.nowScore;

            this.updateScore();
            this.playHiScore();
        });
    },

    updateScore: function() {
        const hiScore = Math.floor(this.hiScore);
        const nowScore = Math.floor(this.nowScore);

        if (!this.nowScorePlaying) {
            const nowLabel = this.now.getComponent(cc.Label);
            nowLabel.string = ('0000' + nowScore).slice(-5);
        }

        if (!this.hiScorePlaying) {
            const hiLabel = this.hi.getComponent(cc.Label);
            hiLabel.string = ('0000' + hiScore).slice(-5);
        }
    },

    playNowScore: function() {
        if (this.nowScorePlaying) {
            return;
        }

        this.nowScorePlaying = true;

        let count = 0;

        const id = setInterval(() => {
            count++;

            this.now.active = !this.now.active;

            if (count === 6) {
                this.nowScorePlaying = false;
                clearInterval(id);
            }
        }, 300);
    },

    playHiScore: function() {
        if (this.hiScorePlaying) {
            return;
        }

        this.hiScorePlaying = true;

        let count = 0;

        const id = setInterval(() => {
            count++;

            this.hi.active = !this.hi.active;

            if (count === 6) {
                this.hiScorePlaying = false;
                clearInterval(id);
            }
        }, 300);
    },
});