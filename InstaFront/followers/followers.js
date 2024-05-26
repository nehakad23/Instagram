$.ajax({
    type: "GET",
    url: "http://localhost:9000/my-followers?username="+sessionStorage.getItem("profile"),
    dataType: "json",
    complete: function (response) {
        if(response.responseJSON == null || response.responseJSON.length==0){
            $("#follower-list").append(`<li id="no-content"><span>No results found.</span></li>`);
        }
        else{
            let arr = response.responseJSON;
            for (let i = 0; i < arr.length; i++) { 
                $("#follower-list").append(`<li><div onclick="viewProfile(this)" value="${arr[i]["username"]}">
                <img class="follower-img" src="https://source.unsplash.com/random/35x35"></img>
                <div><span class="follower-username">${arr[i]["username"]}</span>
                <span class="follower-name">${arr[i]["name"]}</span></div></div>
                <button class="remove-follower" onClick="remove(this)">Remove</button>
                </li>
                `);
            }
            if (sessionStorage.getItem("profile")!=sessionStorage.getItem("username")) {
                $(".remove-follower").hide();
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

function remove(e)
{
    let follower = $(e).closest("li").children().first().attr("value");
    $.ajax({
        type: "DELETE",
        url: "http://localhost:9000/remove/"+follower+"?username="+sessionStorage.getItem("username")
    });
    $(e).closest("li").remove();
}