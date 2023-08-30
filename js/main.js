const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '67bc891487msh83d7f6087e5baa4p137206jsn95c6efd2fc62',
        'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
    }
};

let menuIcon = document.querySelector(".menu-icon");
let sidebar = document.querySelector(".sidebar");
let container = document.querySelector(".main-container");

menuIcon.addEventListener('click', () => {
    sidebar.classList.toggle('small-sidebar')
    container.classList.toggle('large-container')
})


fetch("json/Videos.json", options)
    .then(res => res.json())
    .then(response => {
        let selecion = document.querySelector("#myVideos");
        selecion.insertAdjacentHTML("beforeend", /*html*/`
            ${response.contents.map((video) => /*html*/`
                <div class="list-video">
                    <div class="thumbnails">
                    <a href="index-playvideo.html?videoId=${video.video.videoId}"><img src="${video.video.thumbnails[video.video.thumbnails.length - 1].url}" alt="videos" class="img-miniatura"/></a>
                    </div>
                    <div class="video-info">
                        <a href="index-playvideo.html">${video.video.title}</a>
                        <p>${video.video.stats.views} Views &bull; ${video.video.publishedTimeText}</p>
                    </div>
                </div>
            `).join(" ")}
        `);
    })
    .catch(err => console.log(err));

fetch("json/Videos.json", options)
	.then(res => res.json())
	.then(response => {
		let selecion = document.querySelector("#myPageplay");
		selecion.insertAdjacentHTML("beforeend", /*html*/`
			${response.contents.map((video) => /*html*/`
			<div class="side-video" >
				<a href="index-playvideo.html?videoId=${video.video.videoId}" class="small-img-sidebar"><img src="${video.video.thumbnails[video.video.thumbnails.length - 1].url}" alt=""></a>
				<div class="video-side-info">
					<a href="index-playvideo.html?videoId=${video.video.videoId}" class="name-other-video">${video.video.title}</a>
					<p class="name-chanel-sidebar">CreativeCode</p>
					<p class="info-views">${video.video.stats.views} views &bull; ${video.video.publishedTimeText}</p>
				</div>
			</div>
			`).join(" ")}
		`);
	})
	.catch(err => console.log(err));



const randomNum = Math.floor(Math.random() * 100) + 1;
const url = window.location.href;
	
const videoId = url.split('?')[1]?.split('=')[1];
	
	
if (videoId) {
	const videoContainer = document.querySelector("#play-video-final");
	
		
	fetch("json/Videos.json")
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