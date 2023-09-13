setTimeout(() => {
    if (db) {
        //Videos Retrieval
        let dbTransaction = db.transaction("video");
        let videoStore = dbTransaction.objectStore("video");
        let videoRequest = videoStore.getAll();
        videoRequest.onsuccess = (e) => {
            let videoResult = videoRequest.result;
           
        }
    }
},
    100)
