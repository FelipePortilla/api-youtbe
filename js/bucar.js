export const SearchAll = async (p1)=> {
    const peticion = await fetch("ChannelSearch.json");
    const json = await peticion.json ();
    let cont=0;
    let array = json.contents.map((value,id)=>{
        if(value.playlist) return undefined;
        cont++;
        if(cont<=10) h+=30*cont;
        return `<div class="result-searching"><a href=""><p>${value.video.title}</p></a></div>`
    })
    document.querySelector("#active").setAttribute("style",``)
    document.querySelector("#active").innerHTML = null;
    document.querySelector("#SearchAll").insertAdjacentElement("beforeend",array.join(" "));
}