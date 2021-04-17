import User from "../../models/user.js";

let Luser = JSON.parse(sessionStorage.getItem('login_user'));//משתמש הפשוט
let Auser = JSON.parse(localStorage.getItem(`editUser`));//אדמין

let oldBirth
if (!!Luser) {//במידה והיוזר הוא לא מוגדר או ריק ממיר לפסוק אמת ומוציא לי את הנתונים
    $(`#First-Name`).val(Luser.FirstName)
    $(`#Last-Name`).val(Luser.LastName)
    $(`#password`).val(Luser.password)
    $(`#Confirm-Password`).val(Luser.ConfirmPassword)
    $(`#UserName`).val(Luser.UserName)
    oldBirth = Luser.Birthdate
    oldBirth = oldBirth.substring(oldBirth.length - 4) + `-` + oldBirth.substring(3, 5) + `-` + oldBirth.substring(0, 2)
    $(`#Birthdate`).val(oldBirth)
    $(`#Your-Email`).val(Luser.YourEmail)
    $(`#city`).val(Luser.city)
    $(`#street`).val(Luser.street)
    $(`#home-Number`).val(Luser.homeNumber)
}
else if (!!Auser) {
    $(`#First-Name`).val(Auser.FirstName)
    $(`#Last-Name`).val(Auser.LastName)
    $(`#password`).val(Auser.password)
    $(`#Confirm-Password`).val(Auser.ConfirmPassword)
    $(`#UserName`).val(Auser.UserName)
    oldBirth = Auser.Birthdate
    oldBirth = oldBirth.substring(oldBirth.length - 4) + `-` + oldBirth.substring(3, 5) + `-` + oldBirth.substring(0, 2)
    $(`#Birthdate`).val(oldBirth)
    $(`#Your-Email`).val(Auser.YourEmail)
    $(`#city`).val(Auser.city)
    $(`#street`).val(Auser.street)
    $(`#home-Number`).val(Auser.homeNumber)
}



//אירוע לחיצה לשמירת שינוי נתונים
$(document).on(`submit`, `#SAVE-form`, function () {

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
        alert("Sorry your age can not exceed 120")
        massage++;
    }
    // בדיקת שם משתמש 
    if (UserName.length > 60) {
        alert("Username cannot contain more than 60 characters")
        massage++;
    }
    for (let i = 0; i <= UserName.length; i++) {
        if (UserName[i] >= 'א' && UserName[i] <= 'ת') {
            alert("Username cannot contain Hebrew characters.\nOnly English characters can be contained")
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
            alert("the street can be text in Hebrew only")
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
    //תקלת מחיקה של הטבלה באדמין
    if (massage == 0) {
        let users = JSON.parse(localStorage.getItem(`users`));
        var eUser = new User(FirstName, LastName, password, ConfirmPassword, UserName, Birthdate, YourEmail, city, street, homeNumber, yourpicture)
        for (let i = 0; i < users.length; i++) {
            if (users[i].UserName == eUser.UserName) {
                users[i] = eUser;
            }
        }
        localStorage.setItem(`users`, JSON.stringify(users))
        if (!(sessionStorage.getItem(`login_user`) == null)) {
            sessionStorage.setItem(`login_user`, JSON.stringify(eUser));
            location.href = "/html/profile_page.htm"
        }
        else {
            location.href = "/html/admin_page.htm"
        }
    }
})





