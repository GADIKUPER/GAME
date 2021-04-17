
//יורש מהבורד
class Tile extends Board {
    constructor(props) {//בנאי שיורש מהבורד את כל הנתונים
        super(props)//מייבא את הנתונים מהבורד
        this.tileValue = 2//2 שקופץ לאחר תזוזה
        this.board = Board.getBoard()//הצגת הלוח מהאבא של טייל
    }

    random() {//בחירת מיקום ראנדומלי מתוך הלוח הנוכחי
        let tile = {
            x: Math.floor(Math.random() * (liveGame.size)),
            y: Math.floor(Math.random() * (liveGame.size))
        }
        return tile//החזרת משתנה עם מיקום על הלוח
    }


    isValid(x, y) {//אם זה בסדר לשים במיקום הנוכחי מספר
        return !this.board[x][y]
    }

    get() {//קבלת המספר 
        let tile = this.random()
        if (this.isValid(tile.x, tile.y)) {//אם המיקום ריק תכנס ותזרוק את המספר על הלוח
            return tile
        } else {//תמצא מיקום חדש ריק
            return this.get()
        }
    }

    set(x, y) {
        if (!this.board[x][y]) {//בדיקה אם אין במיקום מספר 
            this.board[x][y] = this.tileValue//תכניס למיקום את 
        }
    }

    clear(x, y) {
        this.board[x][y] = null//ניקיון המיקום הנוכחי לאחר תזוזה 
    }

    hasEmpty(row, col, toCheckRow, toCheckColumn) {// אם המיקום הנוכחי ריק ממספר
        return !(this.board[row + toCheckRow][col + toCheckColumn])
    }

    hasSameValue(row, col, toCheckRow, toCheckColumn) {// בדיקה אם קיים ערך דומה באותה שורה או באותה עמודה
        return (this.board[row][col] === this.board[row + toCheckRow][col + toCheckColumn])
    }
}