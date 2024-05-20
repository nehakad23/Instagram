$('#login-form').submit(function (e) { 
    e.preventDefault();
    let username =$('#login-form #username').val();
    let password =$('#login-form #password').val();
    
        let data =  { 
                        "username": username,
                        "password": password      
                    }
        $.ajax({
            type: "POST",
            url: "http://localhost:9000/user/login",
            data: JSON.stringify(data),
            dataType: "json",
            contentType : "application/json",
            complete: function (response) {
                console.log(response);
                if(response.responseText=="Incorrect"){
                    alert("Incorrect username or password. Please enter valid credentials!");
                }
                else{
                    sessionStorage.setItem("username",response.responseText);
                    $('#content').load('home/home.html');
                    $('#logout-btn').css("visibility", "visible");
                    $("#bottom").show();
               }
         }
        });
});
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
$("#sign-up-link").click(function (e) {
    e.preventDefault();
    $("#content").load("register/register.html"); 
});
