$("#search-bar").on("input", function(e) {
    e.preventDefault();
    $("#search-list").empty();
    if(this.value!="")
    {
        $.ajax({
            type: "GET",
            url: "http://localhost:9000/user/search?query="+this.value,
            dataType: "json",
            complete: function (response) {
                
                if(response.responseJSON == null || response.responseJSON.length==0){
                    $("#search-list").append(`<li id="no-content"><span>No results found.</span></li>`);
                }
                else{
                    let arr = response.responseJSON;
                    for (let i = 0; i < arr.length; i++) { 
                        $("#search-list").append(`<li onclick="viewProfile(this)" value="${arr[i]["username"]}">
                        <img class="search-img" src='data:image/png;base64,${arr[i]["profilePic"]}'></img>
                        <div><span class="search-username">${arr[i]["username"]}</span>
                        <span class="search-name">${arr[i]["name"]}</span></div>
                        </li>`);
                    }
                }
            }
        });
    }
});

function viewProfile(e)
{
    sessionStorage.setItem("profile",$(e).attr("value"));
    loader("profile/profile.html");
}