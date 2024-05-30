$.ajax({
    type: "GET",
    url: "http://localhost:9000/like/view-likes?postId="+sessionStorage.getItem("post"),
    dataType: "json",
    complete: function (response) {
        if(response.responseJSON == null || response.responseJSON.length==0){
            $("#likers-list").append(`<li id="no-content"><span>No likes yet.</span></li>`);
        }
        else{
            let arr = response.responseJSON;
            for (let i = 0; i < arr.length; i++) { 
                $("#likers-list").append(`<li><div onclick="viewProfile(this)" value="${arr[i]["username"]}">
                <img class="likers-img" src='data:image/png;base64,${arr[i]["profilePic"]}'></img>
                <div><span class="likers-username">${arr[i]["username"]}</span>
                <span class="likers-name">${arr[i]["name"]}</span></div></div>
                </li>
                `);
            }
        }
    }
});

$("#close").click(function (e) { 
    e.preventDefault();
    loader("view-post/view-post.html");
});

function viewProfile(e)
{
    sessionStorage.setItem("profile",$(e).attr("value"));
    loader("profile/profile.html");
}