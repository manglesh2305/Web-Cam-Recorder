setTimeout(() => {
    if (db) {
        //Videos Retrieval
        let dbTransaction = db.transaction("video", "readonly");
        let videoStore = dbTransaction.objectStore("video");
        let videoRequest = videoStore.getAll();  //Event Driven
        videoRequest.onsuccess = (e) => {
            let videoResult = videoRequest.result;
            let galleryCont = document.querySelector(".gallery");
            videoResult.forEach((videoObj) => {
                let mediaElem = document.createElement("div");
                mediaElem.setAttribute("class", "media-cont");
                mediaElem.setAttribute("id", videoObj.id);
                let url = URL.createObjectURL(videoObj.blobData);
                mediaElem.innerHTML = `
                <div class="media">
                    <video autoplay loop src="${url}"></video>
                </div>
                <div class="download action-btn">Download</div>
                <div class="delete action-btn">Delete</div>`
                galleryCont.appendChild(mediaElem);

                let deleteBtn = mediaElem.querySelector(".delete");
                deleteBtn.addEventListener("click",deleteListener);
                let downloadBtn = mediaElem.querySelector(".download");
                downloadBtn.addEventListener("click",downloadListener);
            })
        }

        //Images Retrieval
        let dbImageTransaction = db.transaction("image", "readonly");
        let imageStore = dbImageTransaction.objectStore("image");
        let imageRequest = imageStore.getAll();  //Event Driven
        imageRequest.onsuccess = (e) => {
            let imageResult = imageRequest.result;
            let galleryCont = document.querySelector(".gallery");
            imageResult.forEach((imageObj) => {
                let mediaElem = document.createElement("div");
                mediaElem.setAttribute("class", "media-cont");
                mediaElem.setAttribute("id", imageObj.id);
                let url = imageObj.url;
                mediaElem.innerHTML = `
                <div class="media">
                    <img src="${url}">
                </div>
                <div class="download action-btn">Download</div>
                <div class="delete action-btn">Delete</div>`
                galleryCont.appendChild(mediaElem);

                let deleteBtn = mediaElem.querySelector(".delete");
                deleteBtn.addEventListener("click",deleteListener);
                let downloadBtn = mediaElem.querySelector(".download");
                downloadBtn.addEventListener("click",downloadListener);
            })
        }
    }
},
    100)


function deleteListener(e) {
    let id = e.target.parentElement.getAttribute("id");
    let type = id.slice(0,3);
    // DB removal
    if(type === "vid"){
        let dbTransaction = db.transaction("video", "readwrite");
        let videoStore = dbTransaction.objectStore("video");
        videoStore.delete(id);
    }
    else if(type === "img"){
        let dbImageTransaction = db.transaction("image", "readwrite");
        let imageStore = dbImageTransaction.objectStore("image");
        imageStore.delete(id);
    }
    //UI removal
    e.target.parentElement.remove();
}

function downloadListener(e) {
    let id = e.target.parentElement.getAttribute("id");
    let type = id.slice(0,3);
    if(type === "vid"){
        let dbTransaction = db.transaction("video", "readwrite");
        let videoStore = dbTransaction.objectStore("video");
        let videoRequest = videoStore.get(id);
        videoRequest.onsuccess = (e) => {
            let videoResult = videoRequest.result;
            let url = URL.createObjectURL(videoResult.blobData);
            let a = document.createElement("a");
            a.href = url;
            a.download = "stream.mp4";
            a.click();
        }
    }
    else if(type === "img"){
        let imagedbTransaction = db.transaction("image", "readwrite");
        let imageStore = imagedbTransaction.objectStore("image");
        let imageRequest = imageStore.get(id);
        imageRequest.onsuccess = (e) => {
            let imageResult = imageRequest.result;
            let url = imageResult.url;
            let a = document.createElement("a");
            a.href = url;
            a.download = "img.jpg";
            a.click();
        }
    }
}