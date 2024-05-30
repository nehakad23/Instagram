$("#register-form").submit(function (e) { 
    e.preventDefault();
    let name = $('#register-form #name').val();
    let username = $('#register-form #username').val();
    let email = $('#register-form #email').val();
    let password = $('#register-form #password').val();
    let number = $('#register-form #number').val();
    let gender = $('#register-form #gender').val();
    let bio = $('#register-form #bio').val();
    let pic = $('#register-form #pic').prop('files')[0];

        let userDto = {
                "name":name,
                "username": username,
                "email":email,
                "password": password,
                "number":number,
                "gender": gender,
                "bio":bio
            }
        let data = new FormData();
        let f = new Blob([JSON.stringify(userDto)], {
                    type: "application/json"
                });
        data.append("userDto",f);
        data.append("profilePic",pic);

        $.ajax({
            type: "POST",
            url: "http://localhost:9000/user/create-user",
            data: data,
            dataType: "json",
            contentType: false,
            processData: false,
            complete: function (response) {
                if(response.status== 500){
                    alert(response.responseText);
                }
                else{
                    sessionStorage.setItem("username",username);
                    loader('home/home.html');
                    $('#logout-btn').css("visibility", "visible");
                    $("#bottom").show();
                }
            }
        });
});

function showPassword() {
    let type = $('#password').attr('type');
    if(type=="password") { 
        $('#password').attr('type','text');
    }
    else
    {
        $('#password').attr('type','password');
    }
}

$("#log-in-link").click(function (e) {
    e.preventDefault();
    loader("login/login.html"); 
});