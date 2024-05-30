$.ajax({
    type: "GET",
    url: "http://localhost:9000/comment/view-comments?postId="+sessionStorage.getItem("post"),
    dataType: "json",
    complete: function (response) {
        if(response.responseJSON == null || response.responseJSON.length==0){
            $("#comments-list").append(`<li id="no-content"><span>No comments yet.</span></li>`);
        }
        else{
            let arr = response.responseJSON;
            for (let i = 0; i < arr.length; i++) { 
                $("#comments-list").append(`<li value=${arr[i]["id"]}>
                <div class="comments-content">
                <div class="comments-header">
                <span class="comments-username">${arr[i]["username"]}</span>
                <span class="comments-date">${new Date(arr[i]["date"]).toDateString()}</span>
                </div>
                <span class="comments-message">${arr[i]["message"]}</span>
                </div>
                <i class="fa fa-trash" onclick="deleteComment(this)"></i>
                </li>
                `);
            }
            if (sessionStorage.getItem("profile")!=sessionStorage.getItem("username")) {
                $(".fa-trash").hide();
            }
        }
    }
});

function postComment() {
    let data = {
        "message": $("#comment").val()
    }
    $.ajax({
        type: "POST",
        url: "http://localhost:9000/comment/comment?postId="+sessionStorage.getItem("post")+"&username="+sessionStorage.getItem("username"),
        data: JSON.stringify(data),
        dataType: "json",
        contentType: "application/json",
        complete: function (response) {
            $("#comments-list").append(`<li value=${response.responseJSON["id"]}>
                <div class="comments-content">
                <div class="comments-header">
                <span class="comments-username">${response.responseJSON["username"]}</span>
                <span class="comments-date">${new Date(response.responseJSON["date"]).toDateString()}</span>
                </div>
                <span class="comments-message">${response.responseJSON["message"]}</span>
                </div>
                <i class="fa fa-trash" onclick="deleteComment(this)"></i>
                </li>
                `);

            $("#comment").val("");
        }
    });
}

function deleteComment(e) {
    let id = $(e).closest("li").attr("value");
    $.ajax({
        type: "DELETE",
        url: "http://localhost:9000/comment/delete-comment?commentId="+id,
        dataType: "json",
        complete: function (response) {
            $(e).closest("li").remove();
        }
    });
}

$("#close").click(function (e) { 
    e.preventDefault();
    loader("view-post/view-post.html");
});