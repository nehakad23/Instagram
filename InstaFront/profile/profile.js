var profile = sessionStorage.getItem("profile");
var username = sessionStorage.getItem("username");

$.ajax({
    type: "GET",
    url: "http://localhost:9000/user/view-profile/"+profile,
    dataType: "json",
    complete: function (response) {
        $("#profile-pic").append(`<img src = 'https://source.unsplash.com/random/400x400'>`);
        $("#bio-div").append(`<span style="font-weight: 600; font-size: 1.1rem">${response.responseJSON["username"]}</span>`);
        $("#bio-div").append(`<small>${response.responseJSON["name"]}</small>`);
        $("#bio-div").append(`<small>${response.responseJSON["bio"]}</small>`);
    }
});

$.ajax({
    type: "GET",
    url: "http://localhost:9000/post/view-all-post/"+profile,
    dataType: "json",
    complete: function (response) {
        if(response.responseJSON==null || response.responseJSON.length==0)
        {
            $("#no-content").css("display", "block");
            $("#counts").append(`<div><span>0</span><small>posts</small></div>`);
        }
        else
        {
            let arr = response.responseJSON;
            $("#counts").append(`<div><span>${arr.length}</span><small>posts</small></div>`);
            for (let i = 0; i < arr.length; i++) { 
                $("#posts").append(`<img src = "https://source.unsplash.com/random/400x400">`);
            }
        }
    }
});

$.ajax({
    type: "GET",
    url: "http://localhost:9000/my-followers?username="+profile,
    dataType: "json",
    complete: function (response) {
        $("#counts").append(`<div onclick="followers()"><span>${response.responseJSON.length}</span><small>followers</small></div>`);
    }
});

$.ajax({
    type: "GET",
    url: "http://localhost:9000/my-following?follower="+profile,
    dataType: "json",
    complete: function (response) {
        $("#counts").append(`<div onclick="following()"><span>${response.responseJSON.length}</span><small>following</small></div>`);
    }
});

if (username==profile)
{
    $("#btn-div").append(`<button onclick ="updateProfile()">Update Profile</button>`);
    $("#btn-div").append(`<button data-bs-toggle="modal" data-bs-target="#deleteModal">Delete Profile</button>`);
}
else
{
    $.ajax({
        type: "GET",
        url: "http://localhost:9000/my-following?follower="+username,
        dataType: "json",
        complete: function (response) {
            let follow = false;
            for (let i = 0; i < response.responseJSON.length; i++) {
                if(response.responseJSON[i].username == profile)
                {
                    follow = true;
                    break;
                }
            }
            if(follow==true) $("#btn-div").append(`<button id="unfollow-btn" onclick="unfollow()">Unfollow</button>`);
            else $("#btn-div").append(`<button id="follow-btn" style="background-color: #45adff; color: white;" onclick="follow()">Follow</button>`);
        }
    });
}

function followers(){ 
    $("#content").load("followers/followers.html"); 
}

function following() {
    $("#content").load("following/following.html"); 
}

function unfollow() {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:9000/unfollow/"+profile+"?follower="+username
    });
    $("#unfollow-btn").replaceWith(`<button id="follow-btn" style="background-color: #45adff;
                                color: white;" onclick="follow()">Follow</button>`);
}

function follow() {
    $.ajax({
        type: "POST",
        url: "http://localhost:9000/follow/"+profile+"?follower="+username
    });
    $("#follow-btn").replaceWith(`<button id="unfollow-btn" 
                                onclick="unfollow()">Unfollow</button>`);
}

function deleteProfile() {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:9000/user/delete-user/"+username
    });
    logout();
}

function logout() { 
    sessionStorage.removeItem("username");
    $('#content').load('login/login.html');
    $('#logout-btn').css("visibility", "hidden");
    $("#bottom").hide();
};

function updateProfile() {
    $("#content").load("update-profile/update-profile.html");
}