var profile = sessionStorage.getItem("profile");
var username = sessionStorage.getItem("username");

$.ajax({
    type: "GET",
    url: "http://localhost:9000/user/view-profile/"+profile,
    dataType: "json",
    complete: function (response) {
        $("#profile-pic>img").attr("src",`data:image/png;base64,${response.responseJSON["profilePic"]}`);
        $("#bio-div>span").text(response.responseJSON["username"]);
        $("#bio-div>#name").text(response.responseJSON["name"]);
        $("#bio-div>#bio").text(response.responseJSON["bio"]);
        $("#picModal .modal-body>img").attr("src",`data:image/png;base64,${response.responseJSON["profilePic"]}`);
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
        }
        else
        {
            let arr = response.responseJSON;
            $("#post-cnt").text(arr.length);
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
    complete: function (response) {
        $("#follower-cnt").text(response.responseJSON.length);
    }
});

$.ajax({
    type: "GET",
    url: "http://localhost:9000/follow/my-following?follower="+profile,
    dataType: "json",
    complete: function (response) {
        $("#following-cnt").text(response.responseJSON.length);
    }
});

if (username!=profile)
{
    $(".edit-btns").hide();
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
    loader("followers/followers.html"); 
}

function following() {
    loader("following/following.html"); 
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
    loader('login/login.html');
    $('#logout-btn').css("visibility", "hidden");
    $("#bottom").hide();
}

function updateProfile() {
    loader("update-profile/update-profile.html");
}

function viewPost(e) {
    sessionStorage.setItem("post",$(e).attr("value"));
    loader("view-post/view-post.html");
}