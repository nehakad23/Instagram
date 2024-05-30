var likerListMap = new Map();

$.ajax({
    type: "GET",
    url: "http://localhost:9000/post/home?username=" + sessionStorage.getItem("username"),
    dataType: "json",
    complete: function (response) {
        if (response.responseJSON == null || response.responseJSON.length == 0) {
            $("#no-content").css("display", "block");
        }
        else {
            let arr = response.responseJSON;
            for (let i = 0; i < arr.length; i++) {

                $.ajax({
                    type: "GET",
                    url: "http://localhost:9000/like/view-likes?postId=" + arr[i]["postId"],
                    dataType: "json",
                    complete: function (response) {
                        let likerList = [];
                        response.responseJSON.forEach(e => likerList.push(e["username"]));
                        likerListMap.set(arr[i]["postId"], likerList);
                        likedBy(arr[i]["postId"], likerList);
                    }
                });

                let likeBtn;
                $.ajax({
                    type: "GET",
                    url: "http://localhost:9000/like/is-liked?postId=" + arr[i]["postId"] + "&username=" + sessionStorage.getItem("username"),
                    dataType: "json",
                    async: false,
                    complete: function (response) {
                        if (response.responseJSON == true) {
                            likeBtn = `<a class="unlike-btn" style="color: red;" onclick="unlike(this)">
                                                        <i class="fa-solid fa-heart"></i></a>`;
                        }
                        else {
                            likeBtn = `<a class="like-btn" onclick="like(this)">
                            <i class="fa-regular fa-heart"></i></a>`;
                        }
                    }
                });

                let viewCommentLink;
                $.ajax({
                    type: "GET",
                    url: "http://localhost:9000/comment/view-comments?postId=" + arr[i]["postId"],
                    dataType: "json",
                    async: false,
                    complete: function (response) {
                        let len = response.responseJSON.length;
                        if (len == 0) {
                            viewCommentLink = `<a class="comments-link disabled" onclick="comment(this)">No comments yet</a>`
                        }
                        else {
                            viewCommentLink = `<a class="comments-link" onclick="comment(this)">view all ${len} comments</a>`;
                        }
                    }
                });

                $("#home-content").append(
                    `<div class="post-div" value="${arr[i]["postId"]}">
                                        <span class="post-username" onclick="viewProfile(this)">${arr[i]["username"]}</span>
                                        <img class="post-img" src='data:image/png;base64,${arr[i]["image"]}'>
                                        ${likeBtn}
                                        <a class="comment-btn" onclick="comment(this)"><i class="fa-regular fa-comment"></i></a>
                                        <a class="likers-link" onclick="likers(this)"></a>
                                        <span class="post-description"><b>${arr[i]["username"]}</b> ${arr[i]["description"]}</span>
                                        ${viewCommentLink}
                                        <span class="post-date"><span style="color: rgb(32, 32, 32); font-size: .8rem;">Posted on </span> ${new Date(arr[i]["postDate"]).toDateString()}</span>
                                        </div>`);

            }
        }
    }
});

function likedBy(id, likerList) {
    let len = likerList.length;
    if (len == 0) {
        $(`.post-div[value=${id}]`).find(".likers-link").html("No likes yet");
        $(`.post-div[value=${id}]`).find(".likers-link").addClass("disabled");
    }
    else if (len == 1) $(`.post-div[value=${id}]`).find(".likers-link").html(`Liked by <b>${likerList[0]}</b>`);
    else $(`.post-div[value=${id}]`).find(".likers-link").html(`Liked by <b>${likerList[0]}</b> and <b>${len - 1} others</b>`);

}

function like(e) {
    let id = $(e).closest(".post-div").attr("value");
    $.ajax({
        type: "POST",
        url: "http://localhost:9000/like/like?postId=" + id + "&username=" + sessionStorage.getItem("username"),
        dataType: "json",
        complete: function (response) {
            $(e).closest(".post-div").find(".like-btn").replaceWith(`<a class="unlike-btn" style="color: red;" onclick="unlike(this)">
                                                <i class="fa-solid fa-heart"></i></a>`);
            let likerList = likerListMap.get(parseInt(id));
            likerList.push(sessionStorage.getItem("username"));
            likedBy(id, likerList);
        }
    });
}

function unlike(e) {
    let id = $(e).closest(".post-div").attr("value");
    $.ajax({
        type: "DELETE",
        url: "http://localhost:9000/like/unlike?postId=" + id + "&username=" + sessionStorage.getItem("username"),
        dataType: "json",
        complete: function (response) {
            $(e).closest(".post-div").find(".unlike-btn").replaceWith(`<a class="like-btn" onclick="like(this)">
                                                <i class="fa-regular fa-heart"></i></a>`);
            let likerList = likerListMap.get(parseInt(id));
            let i = likerList.indexOf(sessionStorage.getItem("username"));
            likerList.splice(i, 1);
            likedBy(id, likerList);
        }
    });
}

function likers(e) {
    if (!$(e).hasClass("disabled")) {
        let id = $(e).closest(".post-div").attr("value");
        sessionStorage.setItem("post", id);
        loader("likers/likers.html");
    }
}

function comment(e) {
    if (!$(e).hasClass("disabled")) {
        let postUser = $(e).closest(".post-div").find(".post-username").text();
        let id = $(e).closest(".post-div").attr("value");
        sessionStorage.setItem("profile", postUser);
        sessionStorage.setItem("post", id);
        loader("comments/comments.html");
    }
}

function viewProfile(e) {
    sessionStorage.setItem("profile", $(e).text());
    loader("profile/profile.html");
}