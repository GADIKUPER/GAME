//שיוך אירוע טעינה לדף פרופיל
function profilePageLoaded() {
    var loggedUser = JSON.parse(sessionStorage.getItem(`login_user`));
    console.log('logged user to show', loggedUser);
    //בדיקה שאין משתמש מחובר
    if (!loggedUser) {
        console.log('no logged user was found');
        location.href = `/html/login.htm`
        return;
    }

    //session שליפת הפרטים של המשתמש מתוך ה
    //כתיבת ההודעה
    $(`#name`).html(`${loggedUser.FirstName} ${loggedUser.LastName}`)
    $(`#welcomeM`).html(`Welcome ${loggedUser.FirstName} ${loggedUser.LastName} `)
    $(`#email`).html(`${loggedUser.YourEmail} `)
    $(`#stret`).html(`${loggedUser.street}, ${loggedUser.city}`)
    $(`#birthdate`).html(`${loggedUser.Birthdate} `)
    loggedUser.best = localStorage.getItem('login_user');
    var cat = localStorage.getItem('user');
    if (cat > 4000) {
        $(`#best`).html(`The best score in the game ever is : ${cat}, let's break this record !`)
    }
    else {
        $(`#best`).html(`The best score in the game ever is : 4000, let's break this record !`)
    }
    $(`#profPic`).attr({//לקוח את התמונה מתוך החיבור לאותו סשן של היוזר
        src: loggedUser.yourpicture
    })

}

//שיוך אירוע טעינה לדף התחברות
function loginPageLoaded() {

    //בדיקה שיש משתמש מחובר
    if (sessionStorage.getItem(`login_user`) != null) {
        location.href = `/html/index.html`
    }
}

function RegisterPageLoaded() {//בזמן רישום קריאה לפוקציה להמרת התמונה
    convertPic();
}

function editPageLoaded() {//שייך לטעינת עריכת פרופיל גם מתוך דף האדמין וגם מתוך עריכה של היוזר הפשוט
    let Luser = JSON.parse(sessionStorage.getItem('login_user'));
    let Auser = JSON.parse(sessionStorage.getItem('editUser'));
    if (!!Luser) {
        let showPic = document.querySelector(`.imgPreImg`)
        showPic.style.display = 'block';
        $(`.imgPreImg`).attr({
            src: Luser.yourpicture
        })
        convertPic();
    }
    else if (!!Auser) {
        let showPic = document.querySelector(`.imgPreImg`)
        showPic.style.display = 'block';
        $(`.imgPreImg`).attr({
            src: Auser.yourpicture
        })
        convertPic();
    }

}

//פנוקציה להמרה של העלאת תמונה
function convertPic() {
    const inputFile = document.getElementById(`your-picture`)//משתנה של קבלת התמונה
    const conteiner = document.getElementById(`imgPrev`)//המסגרת של התמונה בהעלאה
    const previw = conteiner.querySelector(`.imgPreImg`)// משתנה הצגת התמונה

    inputFile.addEventListener(`change`, function () {
        const file = this.files[0];
        if (file) {//אם יש קובץ טעון
            const reader = new FileReader();//קריאה של האובייקט
            previw.style.display = 'block';
            reader.addEventListener(`load`, function () {
                sessionStorage.setItem(`img`, JSON.stringify(this.result))
                previw.setAttribute(`src`, this.result)
            })
            reader.readAsDataURL(file)//יצירת קישור לטובת הצגת התמונה
        }
    })
}


