
import { SearchAll } from "./bucar.js";
document.querySelector("#chartSearch").addEventListener("input",(e)=>{//We can use input or change
    SearchAll(e.target.value);
});



let menuIcon = document.querySelector(".menu-icon");
let sidebar = document.querySelector(".sidebar");
let container = document.querySelector(".main-container");

menuIcon.addEventListener('click', () => {
    sidebar.classList.toggle('small-sidebar')
    container.classList.toggle('large-container')
})




const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '2c014407bcmshb6ebf5a0e507adfp14d616jsn135730e786a0',
        'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    }
};





const randomNum = Math.floor(Math.random() * 100) + 1;
const url = window.location.href;

const videoId = url.split('?')[1]?.split('=')[1];
console.log(videoId);

if (videoId) {
    const videoContainer = document.querySelector("#play-video-final");


    fetch("https://youtube138.p.rapidapi.com/channel/videos/?id=UC8fkwsjcI_MhralEX1g4OBw&hl=en&gl=US",options)
        .then(res => res.json())
        .then(response => {
            const video = response.contents.find(video => video.video.videoId === videoId);
            if (video) {
                const videoTitle = video.video.title;
                const views = video.video.stats.views;
                const timeago = video.video.publishedTimeText
                videoContainer.insertAdjacentHTML("beforeend",/*html*/`
                <a><iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowFullscreen="true"></iframe></a>
                <p class="title-video">${videoTitle}</p>
                <div class="play-video-info">
                    <div class="info-chanel">
                        <img src="images/CreativeCode.jpg" alt="">
                        <div class="name-chanel">
                            <p>CreativeCode</p>
                            <p class="subscritores">495 suscriptores</p>
                        </div>
                    </div>
                    <div class="joined">
                        <p class="unirse">Unirse</p>
                        <p class="suscribirme">Suscribirme</p>
                    </div>
                    <div class="options-video">
                        <div class="like-dislike">
                            <a href=""><img src="images/like.png" alt=""><span id="randomNumero" style="padding-left: 1vw;">${randomNum}</span></a>
                            <a href=""><img src="images/dislike.png" alt=""></a>
                        </div>
                        <a href="" class="share"><img src="images/share.png" alt="">Compartir</a>
                        <a href="" class="download"><img src="images/descargar.png" alt="">Descargar</a>
                        <a href=""><img src="images/puntos-suspensivos-del-circulo (1).png" alt=""
                                class="more-info"></a>
                    </div>
                </div>
                <div class="views-playpage">
                    <p>${views} Views &bull; ${timeago}</p>
                </div>`)
            } else {
                console.log("Video no encontrado en el JSON.");
            }
        })
        .catch(error => {
            console.error("Error al obtener información del JSON:", error);
        });
    }



fetch("json/jsonVideos.json", options)
.then(res => res.json())
.then(response => {
    let selecion = document.querySelector("#myPageplay");
    selecion.insertAdjacentHTML("beforeend", /*html*/`
        ${response.contents.map((video) => /*html*/`
        <div class="side-video" >
            <a href="pages.html?videoId=${video.video.videoId}" class="small-img-sidebar"><img src="${video.video.thumbnails[video.video.thumbnails.length - 1].url}" alt=""></a>
            <div class="video-side-info">
                <a href="pages.html?videoId=${video.video.videoId}" class="name-other-video">${video.video.title}</a>
                <p class="name-chanel-sidebar">CreativeCode</p>
                <p class="info-views">${video.video.stats.views} views &bull; ${video.video.publishedTimeText}</p>
            </div>
        </div>
        `).join(" ")}
    `);
})
.catch(err => console.log(err));