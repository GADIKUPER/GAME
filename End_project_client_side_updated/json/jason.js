fetch('/json/israel-cities.json')
    .then(res => res.json())
    .then((data) => {
        //הגדרת משתנה מסוג מחרוזת שיכיל את כל האפשרויות
        let options = ``

        //מעבר על כל האובייקטים במערך שקיבלנו
        data.forEach(city => {
            options += `<option>${city.name}</option>`
        })

        //html מטמיע את האופציות בתוך ה
        document.querySelector(`#cities`).innerHTML = options
    })
    .catch((error) => { console.log(error) })