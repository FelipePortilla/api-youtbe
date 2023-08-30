import { SearchAll } from "./bucar.js";
document.querySelector("#chartSearch").addEventListener("input",(e)=>{//se puede usar input o change
    SearchAll(e.target.value)
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
        'X-RapidAPI-Key': '9c292a8e22mshc7918ad00472565p1e1b26jsn796eac206a31',
        'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    }
};




fetch("json/Videos.json", options)
    .then(res => res.json())
    .then(response => {
        let selecion = document.querySelector("#myVideos");
        selecion.insertAdjacentHTML("beforeend", /*html*/`
            ${response.contents.map((video) => /*html*/`
                <div class="list-video">
                    <div class="thumbnails">
                    <a href="pages.html?videoId=${video.video.videoId}"><img src="${video.video.thumbnails[video.video.thumbnails.length - 1].url}" alt="videos" class="img-miniatura"/></a>
                    </div>
                    <div class="video-info">
                        <a href="pages.html?videoId=${video.video.videoId}">${video.video.title}</a>
                        <p>${video.video.stats.views} Views &bull; ${video.video.publishedTimeText}</p>
                    </div>
                </div>
            `).join(" ")}
        `);
    })
    .catch(err => console.log(err));