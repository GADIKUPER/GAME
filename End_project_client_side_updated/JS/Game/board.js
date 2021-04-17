
//מייצרת לוח משחק עם מערך שורות ריקות
class Board extends liveGame {
    constructor(props) {
        super(props)
        this.board = this.grid()
    }
    
    grid() {//יצירת לוח פיזית עם אריכים ריקים 
        let x = []
        for (let i = 0; i < this.size; i++) {
            let row = []
            for (let j = 0; j < this.size; j++) {
                row.push(null)
            }
            x.push(row)
        }
        return x
    }
    getBoard() {//משיכת הלוח הנוכחי
        return this.board
    }
}