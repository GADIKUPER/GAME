import User from "../../models/user.js";
//יצירת אירוע להרשמה

$(document).on(`submit`, `#form`, (event) => {
    event.preventDefault(); //מונע את הריענון של הדף
    //שליפת הנתונים מתוך השדות של טופס ההרשמה
    let FirstName = $(`#First-Name`).val()
    let LastName = $(`#Last-Name`).val()
    let password = $(`#password`).val()
    let ConfirmPassword = $(`#Confirm-Password`).val()
    let UserName = $(`#UserName`).val()
    let Birthdate = $(`#Birthdate`).val()
    let year = Birthdate.substring(0, 4);
    var d = new Date();
    var n = d.getFullYear();
    Birthdate = Birthdate.substring(Birthdate.length - 2) + `/` + Birthdate.substring(5, 7) + `/` + Birthdate.substring(0, 4);
    let YourEmail = $(`#Your-Email`).val()
    let city = $(`#city`).val()
    let street = $(`#street`).val()
    let homeNumber = $(`#home-Number`).val()
    let yourpicture = JSON.parse(sessionStorage.getItem(`img`));

    //משתנה להודעה 
    let massage = 0;

    // בדיקת תאריך
    if (n - year <= 0) {
        alert("Sorry your age cant be less than or equal to 0 years")
        massage++;
    }
    if (n - year >= 120) {
        alert("Sorry your age can not exceed 120 years")
        massage++;
    }

    // בדיקת שם משתמש 
    if (UserName.length > 60) {
        alert("UserName cannot contain more than 60 characters")
        massage++;
    }
    for (let i = 0; i <= UserName.length; i++) {
        if (UserName[i] >= 'א' && UserName[i] <= 'ת') {
            alert("UserName cannot contain Hebrew characters.\nOnly English characters can be contained")
            massage++;
            break;
        }
    }
    //בדיקת תקינות סיסמא
    if (password.length < 7 || password.length > 12) {
        alert("The password can contain between 7-12 characters,\n must contain at least one special character,\n uppercase letter and number")
        massage++;
    }
    let x = 0;
    for (let i = 0; i <= password.length; i++) {
        if (password[i] >= 'א' && password[i] <= 'ת') {
            x = 0;
            break;
        }
        if (password[i] >= 'A' && password[i] <= 'Z') {
            x++;
        }
        if (password[i] >= '!' && password[i] <= '/' || password[i] >= ':' && password[i] <= '@' || password[i] >= '[' && password[i] <= '`' || password[i] >= '{' && password[i] <= '~') {
            x++;
        }
    }
    if (x == 0) {
        alert("The password must contain at least one special character,\n uppercase letter and number\n and the password nust be in english")
        massage++;
    }

    //השוואת הסיסמאות
    if (password !== ConfirmPassword) {
        alert("The password dont much")
        massage++;
    }

    //טיפול שם פרטי
    for (let i = 0; i < FirstName.length; i++) {
        if (!(FirstName[i] >= 'a' && FirstName[i] <= 'z' || FirstName[i] >= 'A' && FirstName[i] <= 'Z')) {
            alert("the First name can be text in english only")
            massage++;
            break;
        }
        else {
            continue
        }
    }
    //טיפול שם משפחה
    for (let i = 0; i < LastName.length; i++) {
        if (!(LastName[i] >= 'a' && LastName[i] <= 'z' || LastName[i] >= 'A' && LastName[i] <= 'Z')) {
            alert("the last name can be text in english only")
            massage++;
            break;
        }
    }
    //טיפול ברחוב 
    for (let i = 0; i < street.length; i++) {
        if (street[i] == ' ' || street[i] >= 'א' && street[i] <= 'ת') {
        }
        else {
            alert("The letter is not only Hebrew")
            massage++;
            break;
        }
    }

    // טיפול במספר בית
    for (let i = 0; i <= homeNumber.length; i++) {
        if (homeNumber[i] < 0) {
            alert("The homeNumber number cannot be less than 0")
            massage++;
            break;
        }
    }

    //בדיקה אם הכל היה תקין
    if (massage == 0) {
        var user = new User(FirstName, LastName, password, ConfirmPassword, UserName, Birthdate, YourEmail, city, street, homeNumber, yourpicture)
        var users = []
        if (!(localStorage.getItem(`users`, user) == null)) {//במידה ויש כבר יוזר רשום ואנחנו רוצים לצרף למערך עוד יוזר למחסן המקומי
            users = JSON.parse(localStorage.getItem(`users`))
            users.push(user)
            localStorage.setItem(`users`, JSON.stringify(users))
            sessionStorage.removeItem(`img`);
            //חזרה לדף לוגין
            location.href = "/html/login.htm"
        }
        else {//במידה וזה היוזר הראשון שנכנס למערכת
            users.push(user)
            localStorage.setItem(`users`, JSON.stringify(users))
            sessionStorage.removeItem(`img`);
            //חזרה לדף לוגין
            location.href = "/html/login.htm"
        }
    }
});

//יצירת אירוע להתחברות
$(document).on(`submit`, `#login_form`, (event) => {
    event.preventDefault(); //מונע את הריענון של הדף
    //שליפת הנתונים מתוך השדות של טופס ההתחברות
    let UserName = $(`#UserName`).val()
    let password = $(`#password`).val()

    //שולף את המידע של המשתמש שנרשם מקודם
    //JSON.parse() --> הופך את הטקסט לאובייקט
    let user = JSON.parse(localStorage.getItem(`users`))
    //בדיקה ששם המשתמש והסיסמה זהים
    if (UserName == "admin" && password == "admin1234admin") {
        location.href = `/html/admin_page.htm`
    }
    else {
        var userFound = false;//לטובת בדיקה אם יש יוזר כזה או לא 
        for (let i = 0; i < user.length; i++) {
            if (UserName == user[i].UserName && password == user[i].password) {
                console.log('adding user to logged session', user);
                //Session יוצרים
                sessionStorage.setItem(`login_user`, JSON.stringify(user[i]))
                //הפנייה לדף פרופיל
                location.href = `/html/profile_page.htm`
                userFound = true;
            }
        }
        if (!userFound) alert(`check your details`)
    }
})


//אירוע לחיצה על כפתור התנתקות
$(document).on(`click`, `#Logout`, () => {
    //session מחיקה של ה
    sessionStorage.clear();
    //חזרה לדף התחברות
    location.href = `/html/index.htm`
});