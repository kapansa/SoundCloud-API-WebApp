// 1. Search for Track...

var UI = {};

UI.handleSearch = function(){
    document.querySelector(".input-search").addEventListener("keydown", function(e){
        if(e.keyCode === 13){
            var inputValue = e.target.value;
            document.querySelector(".js-search-results").innerHTML = "";
            soundCloudAPI.getTrack(inputValue);
            document.querySelector(".js-search").value = "";
        }
    });
}

UI.handleSearch();

UI.handlePress = function(){
    document.querySelector(".js-submit").addEventListener("click", function(e){
        var inputValue = document.querySelector(".js-search").value;
        document.querySelector(".js-search-results").innerHTML = "";
        soundCloudAPI.getTrack(inputValue);
        document.querySelector(".js-search").value = "";
    });
}

UI.handlePress();


// 2. Query for tracks from SoundCloudAPI

var soundCloudAPI = {};

soundCloudAPI.init = function() {
    SC.initialize({
        client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
    });
}

soundCloudAPI.init();

soundCloudAPI.getTrack = function(track){
    // find all sounds of buskers licensed under 'creative commons share alike'
    SC.get('/tracks', {
        q: track
    }).then(function(tracks) {
        console.log(tracks);
        soundCloudAPI.renderTracks(tracks);
    });
}

// 3. Display the tracks

soundCloudAPI.renderTracks = function(tracks){

    tracks.forEach(function(track){
        //card
        var card = document.createElement("div");
        card.classList.add("card");

        // image
        var image = document.createElement("div");
        image.classList.add("image");

        var img = document.createElement("img");
        img.classList.add("image_img");
        img.src = track.artwork_url || "https://i.ibb.co/6F9BPbv/Soundcloud.jpg";

        image.appendChild(img);

        // content
        var content = document.createElement("div");
        content.classList.add("content");

        var header = document.createElement("div");
        header.classList.add("header");

        var link = document.createElement("a");
        link.href = track.permalink_url;
        link.target = "_blank";
        link.innerHTML = track.title;

        header.appendChild(link);

        // button 
        var button = document.createElement("div");
        button.classList.add("ui", "bottom", "attached", "button", "js-button");

        button.addEventListener("click", function(){
            soundCloudAPI.getEmbed(track.permalink_url);
        });

        var i = document.createElement("i");
        i.classList.add("add", "icon");

        var span = document.createElement("span");
        span.innerHTML = "Add to playlist";

        content.appendChild(header);

        button.appendChild(i);
        button.appendChild(span);

        card.appendChild(image);
        card.appendChild(content);
        card.appendChild(button);

        var searchResults = document.querySelector(".js-search-results");
        searchResults.appendChild(card);

    });
    
}

// 4. Add to playlist.
soundCloudAPI.getEmbed = function(trackUrl){
    SC.oEmbed(trackUrl, {
        auto_play: true
    }).then(function(embed){
        var sidebar = document.querySelector(".js-playlist");
        var inner = document.createElement("div");
        inner.classList.add("inner");
        inner.innerHTML = embed.html;
        sidebar.insertBefore(inner, sidebar.firstChild);
        localStorage.setItem("key", sidebar.innerHTML);
    });
}

var sidebar = document.querySelector(".js-playlist");
sidebar.innerHTML = localStorage.getItem("key");