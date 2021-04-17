export default class User {
    //תכונות
    FirstName
    LastName
    password
    ConfirmPassword
    UserName
    Birthdate
    YourEmail
    city
    street
    homeNumber
    yourpicture

    //בנאי
    constructor(FirstName, LastName, password, ConfirmPassword, UserName, Birthdate, YourEmail, city, street, homeNumber, yourpicture) {
        this.FirstName = FirstName
        this.LastName = LastName
        this.password = password
        this.ConfirmPassword = ConfirmPassword
        this.UserName = UserName
        this.Birthdate = Birthdate
        this.YourEmail = YourEmail
        this.city = city
        this.street = street
        this.homeNumber = homeNumber
        this.yourpicture = yourpicture      
    }
}