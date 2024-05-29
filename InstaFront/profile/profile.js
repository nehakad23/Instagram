var profile = sessionStorage.getItem("profile");
var username = sessionStorage.getItem("username");

$.ajax({
    type: "GET",
    url: "http://localhost:9000/user/view-profile/"+profile,
    dataType: "json",
    complete: function (response) {
        $("#profile-pic").append(`<img data-bs-toggle="modal" data-bs-target="#picModal" src = 'data:image/png;base64,${response.responseJSON["profilePic"]}'>`);
        $("#bio-div").append(`<span style="font-weight: 600; font-size: 1.1rem">${response.responseJSON["username"]}</span>`);
        $("#bio-div").append(`<small>${response.responseJSON["name"]}</small>`);
        $("#bio-div").append(`<small>${response.responseJSON["bio"]}</small>`);
        $("#picModal .modal-body").append(`<img src = 'data:image/png;base64,${response.responseJSON["profilePic"]}'>`);
    }
});

$.ajax({
    type: "GET",
    url: "http://localhost:9000/post/view-all-post/"+profile,
    dataType: "json",
    async: false,
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
                $("#posts").append(`<img value=${arr[i]["postId"]} src = 'data:image/png;base64,${arr[i]["image"]}' onclick="viewPost(this)">`);
            }
        }
    }
});

$.ajax({
    type: "GET",
    url: "http://localhost:9000/follow/my-followers?username="+profile,
    dataType: "json",
    async: false,
    complete: function (response) {
        $("#counts").append(`<div onclick="followers()"><span>${response.responseJSON.length}</span><small>followers</small></div>`);
    }
});

$.ajax({
    type: "GET",
    url: "http://localhost:9000/follow/my-following?follower="+profile,
    dataType: "json",
    async: false,
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
    $(".fa-pen").hide();
    $.ajax({
        type: "GET",
        url: "http://localhost:9000/follow/my-following?follower="+username,
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

function updateProfilePic() {
    $("#profile-pic").find("input[type=file]").click();
}

function submitProfilePic() {
    let pic = $('input[type=file]').prop('files')[0];
    let data = new FormData();
    data.append("profilePic",pic);

    $.ajax({
        type: "PUT",
        url: "http://localhost:9000/user/update-profile-pic/"+username,
        data: data,
        dataType: "json",
        contentType: false,
        processData: false,
        complete: function (response) {
            if(response.status==500)
            {
                alert(response.responseText);
            }
            else
            {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $("#profile-container img").attr("src", e.target.result);
                }
                reader.readAsDataURL(pic);
            }
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
        url: "http://localhost:9000/follow/unfollow/"+profile+"?follower="+username
    });
    $("#unfollow-btn").replaceWith(`<button id="follow-btn" style="background-color: #45adff;
                                color: white;" onclick="follow()">Follow</button>`);
}

function follow() {
    $.ajax({
        type: "POST",
        url: "http://localhost:9000/follow/follow/"+profile+"?follower="+username
    });
    $("#follow-btn").replaceWith(`<button id="unfollow-btn" 
                                onclick="unfollow()">Unfollow</button>`);
}

function deleteProfile() {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:9000/user/delete-user/"+username
    });
    //logout
    sessionStorage.clear();
    $('#content').load('login/login.html');
    $('#logout-btn').css("visibility", "hidden");
    $("#bottom").hide();
}

function updateProfile() {
    $("#content").load("update-profile/update-profile.html");
}

function viewPost(e) {
    sessionStorage.setItem("post",$(e).attr("value"));
    $("#content").load("view-post/view-post.html");
}