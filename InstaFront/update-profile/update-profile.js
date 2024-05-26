$("#update-form").submit(function (e) { 
    e.preventDefault();
    let name = $('#update-form #name').val();
    let username = $('#update-form #username').val();
    let email = $('#update-form #email').val();
    let password = $('#update-form #password').val();
    let number = $('#update-form #number').val();
    let gender = $('#update-form #gender').val();
    let bio = $('#update-form #bio').val();

        let userDto = {
                "name":name,
                "username": username,
                "email":email,
                "password": password,
                "number":number,
                "gender": gender,
                "bio":bio
            }

        $.ajax({
            type: "PUT",
            url: "http://localhost:9000/user/update-user",
            data: userDto,
            dataType: "json",
            contentType: false,
            processData: false,
            complete: function (response) {
                if(response.status== 500){
                    alert(response.responseText);
                }
                else{
                    sessionStorage.setItem("username",username);
                    $('#content').load('home/home.html');
                    $('#logout-btn').css("visibility", "visible");
                    $("#bottom").show();
                }
            }
        });
});