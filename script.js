const NONE = 'transparent';
const RED = 'rgba(255, 68, 0, 0.8)';
const GREEN = 'rgba(153, 205, 50, 0.8)';
const YELLOW = 'rgba(255, 255, 0, 0.9)';
var queryEnded = true;
const _BOARD0 = [
    [{fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}], 
    [{fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}], 
    [{fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}], 
    [{fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}], 
    [{fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}], 
    [{fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}], 
    [{fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}], 
    [{fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}] 
];
const _BOARD = [
    [{fig: -4, bg:NONE}, {fig: -2, bg:NONE}, {fig: -3, bg:NONE}, {fig: -5, bg:NONE}, {fig: -9, bg:NONE}, {fig: -3, bg:NONE}, {fig: -2, bg:NONE}, {fig: -4, bg:NONE}],
    [{fig: -1, bg:NONE}, {fig: -1, bg:NONE}, {fig: -1, bg:NONE}, {fig: -1, bg:NONE}, {fig: -1, bg:NONE}, {fig: -1, bg:NONE}, {fig: -1, bg:NONE}, {fig: -1, bg:NONE}],
    [{fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}], 
    [{fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}], 
    [{fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}], 
    [{fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}, {fig: 0, bg:NONE}], 
    [{fig: 1, bg:NONE}, {fig: 1, bg:NONE}, {fig: 1, bg:NONE}, {fig: 1, bg:NONE}, {fig: 1, bg:NONE}, {fig: 1, bg:NONE}, {fig: 1, bg:NONE}, {fig: 1, bg:NONE}],
    [{fig: 4, bg:NONE}, {fig: 2, bg:NONE}, {fig: 3, bg:NONE}, {fig: 9, bg:NONE}, {fig: 5, bg:NONE}, {fig: 3, bg:NONE}, {fig: 2, bg:NONE}, {fig: 4, bg:NONE}]    
];
/* VUE JS */
vue1 = new Vue({
    el: '#vue1',
    data: {
        board: [],
        activeCell: false,
        turn: 1,
        figColor: 1,
        i2: -1,
        j2: -1,
        i_YELLOW: -1,
        j_YELLOW: -1,
        i_YELLOW2: -1,
        j_YELLOW2: -1,
        isSwitch: false,
    },

    beforeMount() {
        this.board = _BOARD0;
    },

    methods: {
        reset()
        {
            console.log('RESET');
            get('server.php', {
                type: 'POST',
                board: _BOARD,
            });
        },
        cellAction(i, j)
        {
            if(this.turn == this.figColor)
            {
                if (this.board[i][j].fig != 0 && this.turn * this.board[i][j].fig > 0)
                {
                    this.clearBoard();
                    this.showMoves(i, j, this.board[i][j]);
                    this.i2 = i;
                    this.j2 = j;
                    this.activeCell = true;
                }
                else if (this.activeCell)
                {
                    this.figureMove(i, j, this.i2, this.j2);
                    this.clearBoard();
                    this.activeCell = false;
                }
                else this.clearBoard();
            }
        },
        clearBoard()
        {
            for (let i = 0; i < 8; i++)
                for (let j = 0; j < 8; j++)
                    this.board[i][j].bg = NONE;
            if (this.i_glow > -1 && this.j_glow > -1) this.board[this.i_glow][this.j_glow].bg = YELLOW;
            if (this.i_glow2 > -1 && this.j_glow2 > -1) this.board[this.i_glow2][this.j_glow2].bg = YELLOW;
        },
        figureMove(i, j, i2, j2)
        {
            if(this.board[i][j].bg == GREEN || this.board[i][j].bg == RED)
            {
                this.board[i][j].fig = this.board[i2][j2].fig;
                this.board[i2][j2].fig = 0;
                this.i_glow2 = i2;
                this.j_glow2 = j2;
                this.i_glow = i;
                this.j_glow = j;
                this.turn = 0;

                if(this.board[i][j].fig == -1 && i == 7) this.board[i][j].fig = -5; // QUEEN CHECK
                else if(this.board[i][j].fig == 1 && i == 0) this.board[i][j].fig = 5; // QUEEN CHECK

                this.clearBoard();
                
                queryEnded = false;
                get('server.php', {
                    type: 'POST',
                    board: this.board,
                }).then(result => {
                    queryEnded = true;
                    // console.log('queryEnded');
                });
            }
        },
        showMoves(i, j)
        {
            this.board[i][j].bg = YELLOW;
            switch (this.board[i][j].fig) {
                /* PAWN */
                case -1:
                    if (i+1 < 8 && this.board[i+1][j].fig == 0) this.board[i+1][j].bg = GREEN; // CLASSIC 
                    if (i == 1 && this.board[i+2][j].fig == 0 && this.board[i+1][j].fig == 0) this.board[i+2][j].bg = GREEN; // DOUBLE
                    if (i+1 < 8 && j-1 > -1 && this.board[i+1][j-1].fig > 0) this.board[i+1][j-1].bg = RED; // BEAT
                    if (i+1 < 8 && j+1 < 8 && this.board[i+1][j+1].fig > 0) this.board[i+1][j+1].bg = RED; // BEAT
                break;
                case 1:
                    if (i-1 > -1 && this.board[i-1][j].fig == 0) this.board[i-1][j].bg = GREEN; // CLASSIC 
                    if (i == 6 && this.board[i-2][j].fig == 0 && this.board[i-1][j].fig == 0) this.board[i-2][j].bg = GREEN; // DOUBLE
                    if (i-1 > -1 && j-1 > -1 && this.board[i-1][j-1].fig < 0) this.board[i-1][j-1].bg = RED; // BEAT
                    if (i-1 > -1 && j+1 < 8 && this.board[i-1][j+1].fig < 0) this.board[i-1][j+1].bg = RED; // BEAT
                break;
                /* BISHOP */
                case -3:
                case 3:
                    for(let k = 1; k < 8 && i+k < 8 && j+k < 8; k++)
                    {
                        if(this.board[i+k][j+k].fig == 0) this.board[i+k][j+k].bg = GREEN;
                        else
                        {
                            if(this.board[i+k][j+k].fig * this.turn < 0) this.board[i+k][j+k].bg = RED;
                            k = 9;
                        }
                    } // DOWN RIGHT
                    for(let k = 1; k < 8 && i+k < 8 && j-k > -1; k++)
                    {
                        if(this.board[i+k][j-k].fig == 0) this.board[i+k][j-k].bg = GREEN;
                        else
                        {
                            if(this.board[i+k][j-k].fig * this.turn < 0) this.board[i+k][j-k].bg = RED;
                            k = 9;
                        }
                    } // DOWN LEFT
                    for(let k = 1; k < 8 && i-k > -1 && j-k > -1; k++)
                    {
                        if(this.board[i-k][j-k].fig == 0) this.board[i-k][j-k].bg = GREEN;
                        else
                        {
                            if(this.board[i-k][j-k].fig * this.turn < 0) this.board[i-k][j-k].bg = RED;
                            k = 9;
                        }
                    } // UP LEFT
                    for(let k = 1; k < 8 && i-k > -1 && j+k < 8; k++)
                    {
                        if(this.board[i-k][j+k].fig == 0) this.board[i-k][j+k].bg = GREEN;
                        else
                        {
                            if(this.board[i-k][j+k].fig * this.turn < 0) this.board[i-k][j+k].bg = RED;
                            k = 9;
                        }
                    } // UP RIGHT
                break;
                /* ROOK */
                case -4:
                case 4:
                    for(let k = 1; k < 8 && i+k < 8; k++)
                    {
                        if(this.board[i+k][j].fig == 0) this.board[i+k][j].bg = GREEN;
                        else
                        {
                            if(this.board[i+k][j].fig * this.turn < 0) this.board[i+k][j].bg = RED;
                            k = 9;
                        }
                    } // DOWN
                    for(let k = 1; k < 8 && i-k > -1; k++)
                    {
                        if(this.board[i-k][j].fig == 0) this.board[i-k][j].bg = GREEN;
                        else
                        {
                            if(this.board[i-k][j].fig * this.turn < 0) this.board[i-k][j].bg = RED;
                            k = 9;
                        }
                    } // UP
                    for(let k = 1; k < 8 && j+k < 8; k++)
                    {
                        if(this.board[i][j+k].fig == 0) this.board[i][j+k].bg = GREEN;
                        else
                        {
                            if(this.board[i][j+k].fig * this.turn < 0) this.board[i][j+k].bg = RED;
                            k = 9;
                        }
                    } // RIGHT
                    for(let k = 1; k < 8 && j-k > -1; k++)
                    {
                        if(this.board[i][j-k].fig == 0) this.board[i][j-k].bg = GREEN;
                        else
                        {
                            if(this.board[i][j-k].fig * this.turn < 0) this.board[i][j-k].bg = RED;
                            k = 9;
                        }
                    } // LEFT
                break;
                /* KING */
                case -9:
                case 9:
                    for(let k = -1; k < 2; k++)
                    {
                        for(let l = -1; l < 2; l++)
                        {
                            if(i+k > -1 && i+k < 8 && j+l > -1 && j+l < 8 && this.board[i+k][j+l].fig == 0) this.board[i+k][j+l].bg = GREEN;
                            if(i+k > -1 && i+k < 8 && j+l > -1 && j+l < 8 && this.board[i+k][j+l].fig * this.turn < 0) this.board[i+k][j+l].bg = RED;
                        }
                    }
                break;
                /* KNIGHT */
                case -2:
                case 2:
                    for(let k = -1; k < 2; k += 2)
                    {
                        for(let l = -2; l < 3; l += 4)
                        {
                            if(i+k > -1 && i+k < 7 && j+l > -1 && j+l < 8 && this.board[i+k][j+l].fig == 0) this.board[i+k][j+l].bg = GREEN;
                            if(i+k > -1 && i+k < 7 && j+l > -1 && j+l < 8 && this.board[i+k][j+l].fig * this.turn < 0) this.board[i+k][j+l].bg = RED;
                            if(i+l > -1 && i+l < 7 && j+k > -1 && j+k < 8 && this.board[i+l][j+k].fig == 0) this.board[i+l][j+k].bg = GREEN;
                            if(i+l > -1 && i+l < 7 && j+k > -1 && j+k < 8 && this.board[i+l][j+k].fig * this.turn < 0) this.board[i+l][j+k].bg = RED;
                        }
                    }
                break;
                /* QUEEN */
                case -5:
                case 5:
                    for(let k = 1; k < 8 && i+k < 8 && j+k < 8; k++)
                    {
                        if(this.board[i+k][j+k].fig == 0) this.board[i+k][j+k].bg = GREEN;
                        else
                        {
                            if(this.board[i+k][j+k].fig * this.turn < 0) this.board[i+k][j+k].bg = RED;
                            k = 9;
                        }
                    } // DOWN RIGHT
                    for(let k = 1; k < 8 && i+k < 8 && j-k > -1; k++)
                    {
                        if(this.board[i+k][j-k].fig == 0) this.board[i+k][j-k].bg = GREEN;
                        else
                        {
                            if(this.board[i+k][j-k].fig * this.turn < 0) this.board[i+k][j-k].bg = RED;
                            k = 9;
                        }
                    } // DOWN LEFT
                    for(let k = 1; k < 8 && i-k > -1 && j-k > -1; k++)
                    {
                        if(this.board[i-k][j-k].fig == 0) this.board[i-k][j-k].bg = GREEN;
                        else
                        {
                            if(this.board[i-k][j-k].fig * this.turn < 0) this.board[i-k][j-k].bg = RED;
                            k = 9;
                        }
                    } // UP LEFT
                    for(let k = 1; k < 8 && i-k > -1 && j+k < 8; k++)
                    {
                        if(this.board[i-k][j+k].fig == 0) this.board[i-k][j+k].bg = GREEN;
                        else
                        {
                            if(this.board[i-k][j+k].fig * this.turn < 0) this.board[i-k][j+k].bg = RED;
                            k = 9;
                        }
                    } // UP RIGHT
                    for(let k = 1; k < 8 && i+k < 8; k++)
                    {
                        if(this.board[i+k][j].fig == 0) this.board[i+k][j].bg = GREEN;
                        else
                        {
                            if(this.board[i+k][j].fig * this.turn < 0) this.board[i+k][j].bg = RED;
                            k = 9;
                        }
                    } // DOWN
                    for(let k = 1; k < 8 && i-k > -1; k++)
                    {
                        if(this.board[i-k][j].fig == 0) this.board[i-k][j].bg = GREEN;
                        else
                        {
                            if(this.board[i-k][j].fig * this.turn < 0) this.board[i-k][j].bg = RED;
                            k = 9;
                        }
                    } // UP
                    for(let k = 1; k < 8 && j+k < 8; k++)
                    {
                        if(this.board[i][j+k].fig == 0) this.board[i][j+k].bg = GREEN;
                        else
                        {
                            if(this.board[i][j+k].fig * this.turn < 0) this.board[i][j+k].bg = RED;
                            k = 9;
                        }
                    } // RIGHT
                    for(let k = 1; k < 8 && j-k > -1; k++)
                    {
                        if(this.board[i][j-k].fig == 0) this.board[i][j-k].bg = GREEN;
                        else
                        {
                            if(this.board[i][j-k].fig * this.turn < 0) this.board[i][j-k].bg = RED;
                            k = 9;
                        }
                    } // LEFT
                break;
            }
        },
    },
    mounted() {
        setInterval(() => {
            if(queryEnded) 
            {
                get('server.php', {
                type: 'GET'
                })
                .then(RES => {
                    let IsEqual = true;
                    for (let i = 0; i < 8 && IsEqual; i++)
                        for (let j = 0; j < 8 && IsEqual; j++)
                            if (this.board[i][j].fig != RES[i][j].fig) IsEqual = false;
                    
                    if(!IsEqual || this.isSwitch)
                    {
                        // console.log('UPDATE');
                        this.turn = 1;
                        this.board = RES;
                        this.i_glow = -1;
                        this.j_glow = -1;
                        this.i_glow2 = -1;
                        this.j_glow2 = -1;
                        this.isSwitch = false;

                        for (let i = 0; i < 8; i++)
                            for (let j = 0; j < 8; j++)
                                if(RES[i][j].bg == YELLOW && RES[i][j].fig == 0)
                                {
                                    this.i_glow2 = i;
                                    this.j_glow2 = j;
                                }
                                else if(RES[i][j].bg == YELLOW && RES[i][j].fig != 0)
                                {
                                    this.i_glow = i;
                                    this.j_glow = j;
                                    this.turn = (RES[i][j].fig > 0) ? -1 : 1;
                                }
                    }
                    // else console.log('SAME');
                })
            }
            
        }, 1000);
    },
});

var get = async (file, obj) =>
{
    let json = JSON.stringify(obj);
    let resp = await fetch(encodeURI(`/chess_online/${file}?data=${json}`));
    if(obj.type == 'GET') return await resp.json();
}