var score = 0
var best = sessionStorage.getItem(`user`, best)
$('#best').html(best)
//קריאה לארבעת המחלקות והפעלת לוח משחק + 2 מספרים ראנדומלים
window.onload = () => {
    liveGame = new liveGame()
    Board = new Board()
    Tile = new Tile()
    Keyboard = new Keyboard()
    liveGame.startGame()
    document.onkeydown = (e) => {
        Keyboard.keyInput(e.keyCode)
        const newTile = Tile.get()
        Tile.set(newTile.x, newTile.y)
        liveGame.drawUpdate()
        $('.btn').click(function () {
            sessionStorage.setItem('user', $('#best').html())
            localStorage.setItem('user', $('#best').html())
            location.reload()
        });
    }
}