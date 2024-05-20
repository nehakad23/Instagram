$(document).ready(function(){
    if(sessionStorage.getItem('username')==null)
    {
        $('#content').load('login/login.html');
    }
    else
    {
        $('#content').load('home/home.html');
        $('#logout-btn').css("visibility", "visible");
    }
});

function logout() { 
    sessionStorage.removeItem("username");
    $('#content').load('login/login.html');
    $('#logout-btn').css("visibility", "hidden");

};


