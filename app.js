// Event binding on Add new feed
var addBtn = document.getElementById("new_feed_btn");
addBtn.addEventListener("click" , pushNewFeed , false);
// Feed Container
var feedContainer = document.getElementById("container");
function pushNewFeed(){
    //count total video
    var countVidTag = document.getElementsByTagName("video").length;
    console.log("Total Videos:",countVidTag);
    var vidElement = document.createElement("video");
    vidElement.setAttribute("id", "videoElement"+countVidTag);
    vidElement.setAttribute("controls", "");
    vidElement.setAttribute("autoplay", "true");
    publishFeed(vidElement);
}

function publishFeed(vidEle){
    var vidDivElement = document.createElement("div");
    vidDivElement.setAttribute("class", "item");
    var vidDivContentElement = document.createElement("div");
    vidDivContentElement.setAttribute("class", "content");
    
    vidDivContentElement.appendChild(vidEle);
    vidDivElement.appendChild(vidDivContentElement);
    feedContainer.appendChild(vidDivElement);
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            vidEle.srcObject = stream;
            resizeContainerAndItems();
        })
        .catch(function (err0r) {
            console.log("Something went wrong!");
            console.log(err0r)
        });
    }
}

function resizeContainerAndItems(){
    var count = document.getElementsByTagName("video").length;
    console.log("Total Videos:",count);
    if(count == 1)
        feedContainer.style.gridTemplateColumns = ("repeat(auto-fill, minmax(90%,1fr))")
    else if(count == 2)
        feedContainer.style.gridTemplateColumns = ("repeat(auto-fill, minmax(40%,1fr))")
    else if(count <= 4)
        feedContainer.style.gridTemplateColumns = ("repeat(auto-fill, minmax(20%,1fr))")
    else
        feedContainer.style.gridTemplateColumns = ("repeat(auto-fill, minmax(250px,1fr))")
}