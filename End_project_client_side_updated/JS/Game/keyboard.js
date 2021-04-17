
//יורש ממחלקת משחק
class Keyboard extends liveGame {
    constructor(props) {
        super(props)//הוא לקוח את כל הנותנים מהחלקה שהוא יורש ממנה
        this.board = Board.getBoard()
    }
    keyInput(input) {
        switch (input) {//לחצנים לטובת תזוזת המספרים על הלוח
            case 37: // left
                return this.moveLeft()
            case 38: // up
                return this.moveUp()
            case 39: // right
                return this.moveRight()
            case 40: // down
                return this.moveDown()
            default:
                return
        }
    }
    moveLeft() {
        this.board.map((column, row) => { //מיפוי של עמודה ושורה על הלוח
            for (let i = 1; i < column.length; i++) {
                if (this.board[row][i]) {
                    while (i > 0 && Tile.hasEmpty(row, i, 0, -1)) {//כל עוד האינדקס של העמודה גדול מ-0
                        //0  וגם האריך בעמודה שאליה אנחנו רוצים לזוז הוא ריק אז הקוביה הנוכחית עם המספר תזוז שמאלה עד שאין מספר זהה לידה
                        this.board[row][i - 1] = this.board[row][i]
                        Tile.clear(row, i)//ניקוי המספר הקוביה הנוכחית לאחר תזוזה 
                        i--
                    }
                    if (Tile.hasSameValue(row, i, 0, -1)) {//אם יש ערך זהה בין שני הקוביות תכנס
                        this.board[row][i - 1] += this.board[row][i]//סיכום 2 המספרים
                        score += this.board[row][i - 1]
                        document.getElementById("score")
                            .innerText = score
                        if (best <= score) {
                            best = score
                        }
                        document.getElementById("best")
                            .innerText = best
                        Tile.clear(row, i)//נקיון הקוביה הימנית
                    }
                }
            }
        })
    }
    moveRight() {
        this.board.map((column, row) => {
            for (let i = 0; i < column.length; i++) {
                if (this.board[row][i]) {
                    while (i < column.length - 1 && Tile.hasEmpty(row, i, 0, 1)) {
                        this.board[row][i + 1] = this.board[row][i]
                        Tile.clear(row, i)
                        i++
                    }
                    if (Tile.hasSameValue(row, i, 0, 1)) {
                        this.board[row][i + 1] += this.board[row][i]
                        score += this.board[row][i + 1]
                        document.getElementById("score")
                            .innerText = score
                        if (best <= score) {
                            best = score
                        }
                        document.getElementById("best")
                            .innerText = best
                        Tile.clear(row, i)
                    }
                }
            }
        })
    }
    moveDown() {
        for (let x = this.board.length - 1; x >= 0; x--) {//מתחילים מהסוף מכיוון שאנחנו רוצים לבדוק מה יש למטה האם יש קוביה שמפריעה
            let column = x
            for (let i = this.board[0].length - 1; i >= 0; i--) {
                if (this.board[i][column]) {
                    while (i < this.board[0].length - 1 && Tile.hasEmpty(i, column, 1, 0)) {
                        this.board[i + 1][column] = this.board[i][column]
                        Tile.clear(i, column)
                        i++
                    }
                    if (i < this.board[0].length - 1 && Tile.hasSameValue(i, column, 1, 0)) {
                        this.board[i + 1][column] += this.board[i][column]
                        score += this.board[i + 1][column]
                        document.getElementById("score")
                            .innerText = score
                        if (best <= score) {
                            best = score
                        }
                        document.getElementById("best")
                            .innerText = best
                        Tile.clear(i, column)
                    }
                }
            }
        }
    }
    moveUp() {
        this.board.map((row, column) => {//בדיקה מלמטה למעלה והאם יש קוביה שמפריעה בדרך
            for (let i = 1; i < row.length; i++) {
                if (this.board[i][column]) {
                    while (i > 0 && Tile.hasEmpty(i, column, -1, 0)) {
                        this.board[i - 1][column] = this.board[i][column]
                        Tile.clear(i, column)
                        i--
                    }
                    if (i > 0 && Tile.hasSameValue(i, column, -1, 0)) {
                        this.board[i - 1][column] += this.board[i][column]
                        score += this.board[i - 1][column]
                        document.getElementById("score")
                            .innerText = score
                        if (best <= score) {
                            best = score
                        }
                        document.getElementById("best")
                            .innerText = best
                        Tile.clear(i, column)
                    }
                }
            }
        })
    }
}
