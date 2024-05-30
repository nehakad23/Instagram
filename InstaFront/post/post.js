$("#post-form").submit(function (e) { 
    e.preventDefault();
    let description = $('#description').val();
    let pic = $('#post-form #pic').prop('files')[0];

        let postDto = {
                "description":description
            }
        let data = new FormData();
        let f = new Blob([JSON.stringify(postDto)], {
                    type: "application/json"
                });
        data.append("postDto",f);
        data.append("image",pic);

        $.ajax({
            type: "POST",
            url: "http://localhost:9000/post/create-post/"+sessionStorage.getItem("username"),
            data: data,
            dataType: "json",
            contentType: false,
            processData: false,
            complete: function (response) {
                loader("home/home.html");
            }
        });
});