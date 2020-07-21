# SoundCloud-API-WebApp
##### This a Music webApp build by using SoundCloud APIs.

# Implementation
To implememt the API in your own webApp you can add the code to your files.

```html
  <script src="https://connect.soundcloud.com/sdk/sdk-3.3.2.js"></script>
    <script>
    SC.initialize({
      client_id: 'YOUR_CLIENT_ID'
    });

    // find all sounds of buskers licensed under 'creative commons share alike'
    SC.get('/tracks', {
      q: 'buskers', license: 'cc-by-sa'
    }).then(function(tracks) {
      console.log(tracks);
    });
 </script>
```

# Adding Tracks to a Playlist

```html
  <script>
   SC.oEmbed('https://soundcloud.com/forss/flickermood', {
      auto_play: true
   }).then(function(embed){
    console.log('oEmbed response: ', embed);
    });
  </script>
```

OR

```html
    <div id="putTheWidgetHere"></div>  
    <script type="text/javascript">
          SC.oEmbed('https://soundcloud.com/forss/sets/soulhack', {
            element: document.getElementById('putTheWidgetHere')
          });
    </script>
```

# Example Project
See the Example Site for this Project ([SoundCloud App](https://kapansa.github.io/SoundCloud-API-WebApp/)).

