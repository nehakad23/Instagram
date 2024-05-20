$.ajax({
    type: "GET",
    url: "http://localhost:9000/user/view-profile/"+sessionStorage.getItem("profile"),
    dataType: "json",
    complete: function (response) {
       if(response.responseJSON == null){
       }
       else
       {
        $("#profile-container > div").append(`<img src = 'data:image/bmp;base64,${response.responseJSON["profilePic"]}'>`);
        $("#profile-container").append(`<span>${response.responseJSON["username"]}</span>`);
        $("#profile-container").append(`<span>${response.responseJSON["name"]}</span>`);
        $("#profile-container").append(`<span>${response.responseJSON["bio"]}</span>`);
       }
    }
});