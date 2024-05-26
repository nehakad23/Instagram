$.ajax({
    type: "GET",
    url: "http://localhost:9000/my-following?follower="+sessionStorage.getItem("profile"),
    dataType: "json",
    complete: function (response) {
        if(response.responseJSON == null || response.responseJSON.length==0){
            $("#follower-list").append(`<li id="no-content"><span>No results found.</span></li>`);
        }
        else{
            let arr = response.responseJSON;
            for (let i = 0; i < arr.length; i++) { 
                $("#following-list").append(`<li><div onclick="viewProfile(this)" value="${arr[i]["username"]}">
                <img class="following-img" src="https://source.unsplash.com/random/35x35"></img>
                <div><span class="following-username">${arr[i]["username"]}</span>
                <span class="following-name">${arr[i]["name"]}</span></div></div>
                <button class="unfollow" onClick="unfollow(this)">Unfollow</button>
                </li>
                `);
            }
            if (sessionStorage.getItem("profile")!=sessionStorage.getItem("username")) {
                $(".unfollow").hide();
            }
        }
    }
});

$("#close").click(function (e) { 
    e.preventDefault();
    $("#content").load("profile/profile.html");
});

function viewProfile(e)
{
    sessionStorage.setItem("profile",$(e).attr("value"));
    $("#content").load("profile/profile.html");
}

function unfollow(e) {
    let user = $(e).closest("li").children().first().attr("value");
    $.ajax({
        type: "DELETE",
        url: "http://localhost:9000/unfollow/"+user+"?follower="+sessionStorage.getItem("username")
    });
    $(e).closest("li").find(".unfollow").replaceWith(`<button class="follow" 
                                    onClick="follow(this)">Follow</button>`);
}

function follow(e) {
    let user = $(e).closest("li").children().first().attr("value");
    $.ajax({
        type: "POST",
        url: "http://localhost:9000/follow/"+user+"?follower="+sessionStorage.getItem("username")
    });
    $(e).closest("li").find(".follow").replaceWith(`<button class="unfollow" 
                                    onClick="unfollow(this)">Unfollow</button>`);
}