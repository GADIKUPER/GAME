var users = JSON.parse(localStorage.getItem(`users`));

let table = `<table id="mytable" class="table">`;

for (let i = 0; i < 1; i++) {
    table += `<tr>`
    for (let j = 0; j <= 8; j++) {
        if (j == 0) {
            table += `<th>Pic</th>`;
        }
        if (j == 1) {
            table += `<th>Username</th>`;
        }
        if (j == 2) {
            table += `<th>First name</th>`;
        }
        if (j == 3) {
            table += `<th>Last name</th>`;
        }
        if (j == 4) {
            table += `<th>Birthdate</th>`;
        }
        if (j == 5) {
            table += `<th>Street</th>`;
        }
        if (j == 6) {
            table += `<th>City</th>`;
        }
        if (j == 7) {
            table += `<th>Email</th>`;
        }
        if (j == 8) {
            table += `<th>Actions</th>`;
        }
    }
    table += `</tr>`
}
for (let i = 0; i < users.length; i++) {
    table += `<tr>`;
    for (let j = 0; j <= 8; j++) {
        if (j == 0) {
            table += `<td><img src="" id="${i}" class="adminPic"></td>`
        }
        if (j == 1) {
            table += `<td>${users[i].UserName}</td>`
        }
        if (j == 2) {
            table += `<td>${users[i].FirstName}</td>`
        }
        if (j == 3) {
            table += `<td>${users[i].LastName}</td>`
        }
        if (j == 4) {
            table += `<td>${users[i].Birthdate}</td>`
        }
        if (j == 5) {
            table += `<td>${users[i].street}</td>`
        }
        if (j == 6) {
            table += `<td>${users[i].city}</td>`
        }
        if (j == 7) {
            table += `<td>${users[i].YourEmail}</td>`
        }
        if (j == 8) {
            let userEdit = `<button value="${users[i].UserName}"> <img src="/images/edit.png" class="imgEdit" ></button>`;
            table += `<td>${userEdit}</td>`;
            let userTrash = `<button class="imgDel" value="${users[i].UserName}"> <img src="/images/delete-icon.jpg" class="imgDel" ></button>`;
            table += `<td>${userTrash}</td>`;
        }
    }
    table += `</tr>`;
}
table += `</table>`;
$('#mytable').html(table);

for (let i = 0; i < users.length; i++) {
    $(`#${i}`).attr({
        src: users[i].yourpicture
    })
}

//פונקצית עריכה
$(document).on(`click`, `.imgEdit`, (e) => {
    var users = JSON.parse(localStorage.getItem(`users`));
    var clickedUserName = e.target.parentElement.value;
    console.log(clickedUserName);
    var userToEdit;
    users.forEach(user => {
        if (user.UserName === clickedUserName) {
            userToEdit = user;
        }
    });
    if (!!userToEdit) {
        sessionStorage.setItem('editUser', JSON.stringify(userToEdit))
        localStorage.setItem('editUser', JSON.stringify(userToEdit))
        location.href = `/html/edit_profile.htm`
    } else {
        alert('no user found to edit!');
    }
});


//פונקצית מחיקה
$(document).on(`click`, `.imgDel`, (e) => {
    var users = JSON.parse(localStorage.getItem(`users`));
    var clickedUserName = e.target.parentElement.value;
    var tempArr = [];
    for (let i = 0; i < users.length; i++) {
        if (!(users[i].UserName == clickedUserName)) {
            tempArr.push(users[i]);
        }
    }
    sessionStorage.setItem(`users`, JSON.stringify(tempArr))
    location.href = `admin_page.htm`
    localStorage.setItem(`users`, JSON.stringify(tempArr))

});