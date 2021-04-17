
// מחלקה ראשית שהבורד ומחלקת מקשים יורשים אותה
class liveGame {
    constructor() {//בנאי ליצרת לוח משחק בגודל 4*4
        this.size = 4
    }

    startGame() { //קבלה ממחלקה טייל את האריכים הראשוניים הרנדומלים עפ''י מיקום ראנדומלי
        for (let i = 0; i < 2; i++) {
            const tile = Tile.get()
            Tile.set(tile.x, tile.y)
        }
        this.drawUpdate()//עדכון הלוח לאחר הוספת האריכים הרנדולמים
    }

    drawUpdate() {//עדכון הלוח
        let counter = 0
        this.board = Board.getBoard()//קבלת הלוח ממחלקת בורד
        this.board.map((column, row) => {//פונקציה למיפוי שורות ועמודות 
            column.map((tile, col) => {//למיפוי עמודה ואריך
                tile = document.getElementById(row + '-' + col)
                tile.innerText = this.board[row][col]
                tile.value = parseInt(tile.innerText) || null//המרה למספר שלם של הערך 
                if (!(this.board[row][col] == null)) {
                    counter++
                    if (counter == 16) {
                        if (!(//זה עובד על השורות
                            this.board[0][0] == this.board[0][1] || this.board[0][1] == this.board[0][2] || this.board[0][2] == this.board[0][3] ||
                            this.board[1][0] == this.board[1][1] || this.board[1][1] == this.board[1][2] || this.board[1][2] == this.board[1][3] ||
                            this.board[2][0] == this.board[2][1] || this.board[2][1] == this.board[2][2] || this.board[2][2] == this.board[2][3] ||
                            this.board[3][0] == this.board[3][1] || this.board[3][1] == this.board[3][2] || this.board[3][2] == this.board[3][3] ||
                            //עובד על העמודות
                            this.board[0][0] == this.board[1][0] || this.board[1][0] == this.board[2][0] || this.board[2][0] == this.board[3][0] ||
                            this.board[0][1] == this.board[1][1] || this.board[1][1] == this.board[2][1] || this.board[2][1] == this.board[3][1] ||
                            this.board[0][2] == this.board[1][2] || this.board[1][2] == this.board[2][2] || this.board[2][2] == this.board[3][2] ||
                            this.board[0][3] == this.board[1][3] || this.board[1][3] == this.board[2][3] || this.board[2][3] == this.board[3][3])) {
                            setTimeout(function () {
                                alert('Game-over, try again and break your record');
                            }, 600);
                        }
                    }
                }
                if (!tile.value) {//אם לא  הערך ריק
                    tile.className = "grid-tile"
                }
                else if (tile.value <= 2048) {//אם יש מספר בערך של המשתנה
                    tile.className = "grid-tile tile-" + tile.value
                    if (tile.value == 2048) {
                        alert(`You win, you reach the tile 2048, continue to play and get the next target 4096 !`)
                    }
                }
                else {//המספר הכי גבוה שנוצר על הלוח
                    tile.className = "grid-tile tile-max"
                }
            })
        })
    }
}

