$("#search-bar").on("input", function(e) {
    e.preventDefault();
    $.ajax({
        type: "GET",
        url: "http://localhost:9000/user/search?query="+this.value,
        dataType: "json",
        complete: function (response) {
            $("#search-list").html("");
            
            if(response.responseJSON == null || response.responseJSON.length==0){
                $("#search-list").append(`<li><span>No results found.</span></li>`);
            }
            else{
                let arr = response.responseJSON;
                for (let i = 0; i < arr.length; i++) { 
                    $("#search-list").append(`<li>
                    <img class="search-img" src="https://source.unsplash.com/random/35x35"></img>
                    <div><span class="search-username">${arr[i]["username"]}</span>
                    <span class="search-name">${arr[i]["name"]}</span></div>
                    </li>`);
                }
            }
        }
    });
});