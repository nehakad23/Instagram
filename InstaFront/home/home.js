$.ajax({
    type: "GET",
    url: "http://localhost:9000/post/home?username="+sessionStorage.getItem("username"),
    dataType: "json",
    complete: function (response) {
       if(response.responseJSON == null || response.responseJSON.length==0){
            $("#no-content").css("display", "block");
       }
       else
       {
            let arr = response.responseJSON;
            for (let i = 0; i < arr.length; i++) { 
                $("#home-content").append(
                `<div class="post-div">
                    <span class="post-username">${arr[i]["username"]}</span>
                    <img class="post-img" src="https://source.unsplash.com/random/400x400">
                    <a class="like-btn"><i class="fa-regular fa-heart"></i></a>
                    <a class="comment-btn"><i class="fa-regular fa-comment"></i></a>
                    <a href="" class="post-like-list">likers</a>
                    <span class="post-description">${arr[i]["description"]}</span>
                    <a href="" class="post-comment-list">view comment</a>
                    <span class="post-date">${new Date(arr[i]["postDate"]).toDateString()}</span>
                    </div>`);    
            }
        }
    }
});