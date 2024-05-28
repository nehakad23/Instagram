$(document).ready(function(){
    if(sessionStorage.getItem('username')==null)
    {
        $('#content').load('login/login.html');
    }
    else
    {
        $('#content').load('home/home.html');
        $('#logout-btn').css("visibility", "visible");
        $("#bottom").show();
    }

    $("#search-link").click(function (e) {
        e.preventDefault();
        $("#content").load("search/search.html"); 
    });

    $("#profile-link").click(function (e) {
        e.preventDefault();
        sessionStorage.setItem("profile",sessionStorage.getItem("username"));
        $("#content").load("profile/profile.html");
    });

    $("#post-link").click(function (e) {
        e.preventDefault();
        $("#content").load("post/post.html");
    });
});

function logout() { 
    sessionStorage.clear();
    $('#content').load('login/login.html');
    $('#logout-btn').css("visibility", "hidden");
    $("#bottom").hide();
};

