//Constrain Setting for multiple Size Video for testing
const constraintsArray = [
    {
        video: {
            width: {
            min: 360,
            ideal: 360,
            max: 360,
            },
            height: {
            min: 360,
            ideal: 360,
            max: 360
            },
            facingMode: 'user'
        }
    },
    {
        video: {
            width: {
            min: 900,
            ideal: 450,
            max: 1800,
            },
            height: {
            min: 1600,
            ideal: 800,
            max: 3200
            },
            facingMode: 'user'
        }
    },
    {
        video: {
            width: {
            min: 1280,
            ideal: 1920,
            max: 2560,
            },
            height: {
            min: 720,
            ideal: 1080,
            max: 1440
            },
            facingMode: 'user'
        }
    },
    {
        video: {
            width: {
            min: 200,
            ideal: 400,
            max: 600,
            },
            height: {
            min: 400,
            ideal: 800,
            max: 1200
            },
            facingMode: 'user'
        }
    }
];

// Event binding on Add new feed
var addBtn = document.getElementById("new_feed_btn");
addBtn.addEventListener("click" , pushNewFeed , false);
// Feed Container
var feedContainer = document.getElementById("container");

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

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

function publishFeed(vidEle,id){
    constraintSetting = getRandomInt(3);
    const constraints = constraintsArray[constraintSetting];
    var vidDivElement = document.createElement("div");
    vidDivElement.setAttribute("class", "item");
    var vidDivContentElement = document.createElement("div");
    vidDivContentElement.setAttribute("class", "content");
    
    vidDivContentElement.appendChild(vidEle);
    vidDivElement.appendChild(vidDivContentElement);
    feedContainer.appendChild(vidDivElement);
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(constraints)
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
        feedContainer.style.margin = ("0% 15%") ;
        // feedContainer.style.gridTemplateColumns = ("(minmax(70%,1fr))")
    else{
        feedContainer.style.margin = ("10px") ;
        if(count <= 4)
            feedContainer.style.gridTemplateColumns = ("repeat(auto-fill, minmax(40%,1fr))")
        // else if(count == 4)
        //     feedContainer.style.gridTemplateColumns = ("repeat(auto-fill, minmax(20%,1fr))")
        else
            feedContainer.style.gridTemplateColumns = ("repeat(auto-fill, minmax(250px,1fr))")
    }
    resizeGrids();
}

function resizeGrids(){
    var vidContainerItems = document.querySelectorAll('.item');
    var vidContainers = document.querySelectorAll('.content');
    for(var i = 0; i < vidContainers.length ; i++){
        vidContainerItems[i].style.gridRowEnd = 'span ' + Math.ceil( vidContainers[i].getBoundingClientRect().height)
    }
}