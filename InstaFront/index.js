$(document).ready(function(){
    if(sessionStorage.getItem('username')==null)
    {
        loader('login/login.html');
    }
    else
    {
        loader('home/home.html');
        $('#logout-btn').css("visibility", "visible");
        $("#bottom").show();
    }

    $("#search-link").click(function (e) {
        e.preventDefault();
        loader("search/search.html"); 
    });

    $("#profile-link").click(function (e) {
        e.preventDefault();
        sessionStorage.setItem("profile",sessionStorage.getItem("username"));
        loader("profile/profile.html");
    });

    $("#post-link").click(function (e) {
        e.preventDefault();
        loader("post/post.html");
    });
});

function loader(page) {
    $("#content").hide();

    $(".loader").show();
    $("#content").load(page);
    
    $(".loader").fadeOut(1000);
    $("#content").fadeIn(2000);
}

function logout() { 
    sessionStorage.clear();
    loader('login/login.html');
    $('#logout-btn').css("visibility", "hidden");
    $("#bottom").hide();
};

