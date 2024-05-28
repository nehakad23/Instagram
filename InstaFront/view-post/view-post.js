$.ajax({
    type: "GET",
    url: "http://localhost:9000/post/view-post/"+sessionStorage.getItem("post"),
    dataType: "json",
    complete: function (response) {
        $(".post-username").text(response.responseJSON["username"]);
        $(".post-img").attr("src","data:image/png;base64,"+response.responseJSON["image"]);
        $(".post-description").html(`<b>${response.responseJSON["username"]}</b> ${response.responseJSON["description"]}`);
        $(".post-date").append(` ${new Date(response.responseJSON["postDate"]).toDateString()}`)
    }
});

$.ajax({
    type: "GET",
    url: "http://localhost:9000/like/is-liked?postId="+sessionStorage.getItem("post")+"&username="+sessionStorage.getItem("username"),
    dataType: "json",
    complete: function (response) {
        if(response.responseJSON==true)
        {
            $(".like-btn").replaceWith(`<a class="unlike-btn" style="color: red;" onclick="unlike()">
                                        <i class="fa-solid fa-heart"></i></a>`);
        }
    }
})

$.ajax({
    type: "GET",
    url: "http://localhost:9000/like/view-likes?postId="+sessionStorage.getItem("post"),
    dataType: "json",
    complete: function (response) {
        let arr = response.responseJSON;
        if (arr.length==0) {
            $(".likers-link").html("No likes yet");
            $(".likers-link").addClass("disabled");
        }
        else if(arr.length==1) {
            $(".likers-link").html(`Liked by <b>${arr[0]["username"]}</b>`);
        }
        else {
            $(".likers-link").html(`Liked by <b>${arr[0]["username"]}</b> and <b>${arr.length-1} others</b>`);
        }
    }
});

$.ajax({
    type: "GET",
    url: "http://localhost:9000/comment/view-comments?postId="+sessionStorage.getItem("post"),
    dataType: "json",
    complete: function (response) {
        let len = response.responseJSON.length;
        if(len==0)
        {
            $(".comments-link").text("No comments yet");
            $(".comments-link").addClass("disabled");
        }
        else
        {
            $(".comments-link").text(`view all ${len} comments`);
        }
        
    }
});

function like() {
    $.ajax({
        type: "POST",
        url: "http://localhost:9000/like/like?postId="+sessionStorage.getItem("post")+"&username="+sessionStorage.getItem("username"),
        dataType: "json",
        complete: function (response) {
            $(".like-btn").replaceWith(`<a class="unlike-btn" style="color: red;" onclick="unlike()">
                                                <i class="fa-solid fa-heart"></i></a>`);
        }
    });
}

function unlike() {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:9000/like/unlike?postId="+sessionStorage.getItem("post")+"&username="+sessionStorage.getItem("username"),
        dataType: "json",
        complete: function (response) {
            $(".unlike-btn").replaceWith(`<a class="like-btn" onclick="like()">
                                                <i class="fa-regular fa-heart"></i></a>`);
        }
    });
}

function likers() {
    if(!$(".likers-link").hasClass("disabled"))
    {
        $("#content").load("likers/likers.html");
    }
}

function comment(e) {
    if(!$(e).hasClass("disabled"))
    {
        let postUser = $(e).closest(".post-div").find(".post-username").text();
        sessionStorage.setItem("profile",postUser);
        $("#content").load("comments/comments.html");
    }
}

function viewProfile(e)
{
    $("#content").load("profile/profile.html");
}