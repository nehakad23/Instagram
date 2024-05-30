var likerList = [];
$.ajax({
    type: "GET",
    url: "http://localhost:9000/post/view-post/" + sessionStorage.getItem("post"),
    dataType: "json",
    complete: function (response) {
        $(".post-username").text(response.responseJSON["username"]);
        $(".post-img").attr("src", "data:image/png;base64," + response.responseJSON["image"]);
        $(".post-description").html(`<b>${response.responseJSON["username"]}</b> ${response.responseJSON["description"]}`);
        $(".post-date").append(` ${new Date(response.responseJSON["postDate"]).toDateString()}`)

        if (response.responseJSON["username"] == sessionStorage.getItem("username")) {
            $(".post-div").append(`<div class="post-icon">
                                        <i class="fa-solid fa-pen" data-bs-toggle="modal" data-bs-target="#updateModal"></i>
                                        <i class="fa-solid fa-trash" data-bs-toggle="modal" data-bs-target="#deleteModal"></i>
                                       </div>`)
        }
    }
});

$.ajax({
    type: "GET",
    url: "http://localhost:9000/like/is-liked?postId=" + sessionStorage.getItem("post") + "&username=" + sessionStorage.getItem("username"),
    dataType: "json",
    complete: function (response) {
        if (response.responseJSON == true) {
            $(".like-btn").replaceWith(`<a class="unlike-btn" style="color: red;" onclick="unlike()">
                                        <i class="fa-solid fa-heart"></i></a>`);
        }
    }
})


$.ajax({
    type: "GET",
    url: "http://localhost:9000/like/view-likes?postId=" + sessionStorage.getItem("post"),
    dataType: "json",
    complete: function (response) {
        let arr = response.responseJSON;
        arr.forEach(e => likerList.push(e["username"]));
        likedBy();
    }
});

function likedBy() {
    let len = likerList.length;
    if (len == 0) {
        $(".likers-link").html("No likes yet");
        $(".likers-link").addClass("disabled");
    }
    else if (len == 1) $(".likers-link").html(`Liked by <b>${likerList[0]}</b>`);
    else $(".likers-link").html(`Liked by <b>${likerList[0]}</b> and <b>${len - 1} others</b>`);

}

$.ajax({
    type: "GET",
    url: "http://localhost:9000/comment/view-comments?postId=" + sessionStorage.getItem("post"),
    dataType: "json",
    complete: function (response) {
        let len = response.responseJSON.length;
        if (len == 0) {
            $(".comments-link").text("No comments yet");
            $(".comments-link").addClass("disabled");
        }
        else {
            $(".comments-link").text(`view all ${len} comments`);
        }

    }
});

function like() {
    $.ajax({
        type: "POST",
        url: "http://localhost:9000/like/like?postId=" + sessionStorage.getItem("post") + "&username=" + sessionStorage.getItem("username"),
        dataType: "json",
        complete: function (response) {
            $(".like-btn").replaceWith(`<a class="unlike-btn" style="color: red;" onclick="unlike()">
                                                <i class="fa-solid fa-heart"></i></a>`);
            likerList.push(sessionStorage.getItem("username"));
            likedBy();
        }
    });
}

function unlike() {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:9000/like/unlike?postId=" + sessionStorage.getItem("post") + "&username=" + sessionStorage.getItem("username"),
        dataType: "json",
        complete: function (response) {
            $(".unlike-btn").replaceWith(`<a class="like-btn" onclick="like()">
                                                <i class="fa-regular fa-heart"></i></a>`);
            let i = likerList.indexOf(sessionStorage.getItem("username"));
            likerList.splice(i, 1);
            likedBy();
        }
    });
}

function likers() {
    if (!$(".likers-link").hasClass("disabled")) {
        loader("likers/likers.html");
    }
}

function comment(e) {
    if (!$(e).hasClass("disabled")) {
        let postUser = $(e).closest(".post-div").find(".post-username").text();
        sessionStorage.setItem("profile", postUser);
        loader("comments/comments.html");
    }
}

function deletePost() {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:9000/post/delete-post/" + sessionStorage.getItem("post"),
        complete: function (response) {
            sessionStorage.removeItem("post");
            $('#deleteModal').modal('hide');
            loader("profile/profile.html");
        }
    });
}

function updatePost() {
    let data = {
        "description": $("#update-desc").val()
    }
    $.ajax({
        type: "PUT",
        url: "http://localhost:9000/post/update-post/" + sessionStorage.getItem("post"),
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        complete: function (response) {
            $('#updateModal').modal('hide');
            loader("view-post/view-post.html");
        }
    });
}

function viewProfile(e) {
    loader("profile/profile.html");
}