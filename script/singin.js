const login = document.querySelectorAll(".singin")
const sinup = document.querySelector("#singUp")
const name = document.querySelector("#name")
const email = document.querySelector("#email")
const password = document.querySelector("#password")

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};

function validate(){
    if(!name.value){
        alert("Ism kiritilishi shart")
        name.focus()
        return false
    }
    if(!email.value){
        alert("Email kiritilishi shart")
        name.focus()
        return false
    }
    if(!password.value){
        alert("Parol kiritilishi shart")
        name.focus()
        return false
    }
    if(!validateEmail(email.value)){
        alert("Email xato kiritildi")
        email.value = ""
        email.focus();
        return false
    }


    return true
}

sinup.addEventListener("click", function(){
    let url = window.location.href
    let num = url.indexOf("/pages")
    let newUrl = url.substring(0,num);
    window.location.href = `${newUrl}/pages/singup.html`;
})

login.forEach(element => {
    element.addEventListener("click", function(){
        if(validate()){
            let userInfo ={
                username: name.value,
                email: email.value,
                password: password.value,
            }
            fetch("https://auth-rg69.onrender.com/api/auth/signin", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo),
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Network response was not ok.');
                }
            })
            .then(data => {
                console.log(data);
                localStorage.setItem("userInfo", JSON.stringify(data))
                let url = window.location.href
                let num = url.indexOf("/pages")
                let newUrl = url.substring(0,num);
                window.location.href = `${newUrl}/index.html?${data.accessToken}`;

            })
            .catch(err =>{
                console.log(err);
            });
        }
    })
});