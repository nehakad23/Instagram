$.ajax({
    type: "GET",
    url: "http://localhost:9000/user/view-profile/"+sessionStorage.getItem("username"),
    dataType: "json",
    complete: function (response) {
        $('#update-form #name').val(response.responseJSON["name"]);
        $('#update-form #username').val(response.responseJSON["username"]);
        $('#update-form #email').val(response.responseJSON["email"]);
        $('#update-form #password').val(response.responseJSON["password"]);
        $('#update-form #number').val(response.responseJSON["number"]);
        $('#update-form #gender').val(response.responseJSON["gender"]);
        $('#update-form #bio').val(response.responseJSON["bio"]);
    }
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

$("#update-form").submit(function (e) { 
    e.preventDefault();
    let name = $('#update-form #name').val();
    let email = $('#update-form #email').val();
    let password = $('#update-form #password').val();
    let number = $('#update-form #number').val();
    let gender = $('#update-form #gender').val();
    let bio = $('#update-form #bio').val();

        let data = {
                "name":name,
                "email":email,
                "password": password,
                "number":number,
                "gender": gender,
                "bio":bio
            }

        $.ajax({
            type: "PUT",
            url: "http://localhost:9000/user/update-profile/"+sessionStorage.getItem("username"),
            data: JSON.stringify(data),
            dataType: "json",
            contentType : "application/json",
            complete: function (response) {
                if(response.status== 500){
                    alert(response.responseText);
                }
                else{
                    loader('profile/profile.html');
                }
            }
        });
});