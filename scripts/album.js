// Example Album
var albumPicasso = {
     title: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [
         { title: 'Blue', duration: '4:26' },
         { title: 'Green', duration: '3:14' },
         { title: 'Red', duration: '5:01' },
         { title: 'Pink', duration: '3:21'},
         { title: 'Magenta', duration: '2:15'}
     ]
};

 // Another Example Album
var albumMarconi = {
     title: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'Hello, Operator?', duration: '1:01' },
         { title: 'Ring, ring, ring', duration: '5:01' },
         { title: 'Fits in your pocket', duration: '3:21'},
         { title: 'Can you hear me now?', duration: '3:14' },
         { title: 'Wrong phone number', duration: '2:15'}
     ]
};
//Assignment album
var  albumHeartbreak = {
      title: '808s & Heartbreak',
      artist: 'Kanye West',
      label: 'Roc-A-Fella Records',
      year: '2008',
      albumArtUrl: 'assets/images/album_covers/18.png',
      songs: [
          { title: 'Say You Will', duration: '6:18' },
          { title: 'Welcome to Heartbreak', duration: '4:23' },
          { title: 'Heartless', duration: '3:31'},
          { title: 'Amazing', duration: '3:58' },
          { title: 'Love Lockdown', duration: '4:31'}
     ]
};

var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '<td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;

     return template;
};
// #1 make contents global so we can access from window.onload
var albumTitle = document.getElementsByClassName('album-view-title')[0];
var albumArtist = document.getElementsByClassName('album-view-artist')[0];
var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
var albumImage = document.getElementsByClassName('album-cover-art')[0];
var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

var setCurrentAlbum = function(album) {
    // #2
    albumTitle.firstChild.nodeValue = album.title;
    albumArtist.firstChild.nodeValue = album.artist;
    albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
    albumImage.setAttribute('src', album.albumArtUrl);

    // #3
    albumSongList.innerHTML = '';

    // #4
    for (var i = 0; i < album.songs.length; i++) {
        albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
    }
};
/*** write a findParentByClassName function that keeps
traversing the DOM upward until a parent with a specified class name is found. ***/
var findParentByClassName = function(x, y) {
  //use switch and case
  var target = x.parentElement;
  switch(target) {
    case target.className == y:
      return target;
    case null:
      console.log("No parent found");
      break;
    case target.className !== y.className && target.className !== null:
      target = x.parentElement // is this line redundant?
      return;
    case target.className !== y.className:
      console.log("No parent found with that class name")
      break;
    default:
      return;
  }
};

var getSongItem = function(element) {
  //use a switch statement
  //if element.className ....
  switch(element.className) {
    // case similar to "=="
    case 'album-song-button':
    case 'ion-play':
    case 'ion-pause':
      return findParentByClassName(element, '.song-item-number');
    case 'album-view-song-item':
      return element.querySelector('.song-item-number');
    case 'song-item-number':
    case 'song-item-title' :
      return findParentByClassName(element, '.song-item-number');
    case 'song-item-number':
      return element;
    default:
      return;
  }
};

var clickHandler = function(targetElement) {
  var songItem = getSongItem(targetElement);

  if (currentlyPlayingSong === null) {
         songItem.innerHTML = pauseButtonTemplate;
         currentlyPlayingSong = songItem.getAttribute('data-song-number');
  } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
         songItem.innerHTML = playButtonTemplate;
         currentlyPlayingSong = null;
  } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
         var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
         currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
         songItem.innerHTML = pauseButtonTemplate;
         currentlyPlayingSong = songItem.getAttribute('data-song-number');
  }

 };


var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

// Store state of playing songs
var currentlyPlayingSong = null;
//we want to add an event listener when user clicks album cover (albumImage)
window.onload = function() {
    //default current album when page loads
    setCurrentAlbum(albumPicasso);
    songListContainer.addEventListener('mouseover', function(event) {
         // #1
         if (event.target.parentElement.className === 'album-view-song-item') {
             // Change the content from the number to the play button's HTML
             event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
             //get the song's item
             var item = getSongItem(event.target);
             //check if item is not the current song
             if (item.getAttribute('song-item-number') !== currentlyPlayingSong) {
               item.innerHTML = currentlyPlayingSong;
             }
         }
     });

     for (var i = 0; i < songRows.length; i++) {
         songRows[i].addEventListener('mouseleave', function(event) {
           // #1
           var songItem = getSongItem(event.target);
           var songItemNumber = songItem.getAttribute('data-song-number');
           // #2
           if (songItemNumber !== currentlyPlayingSong) {
                 songItem.innerHTML = songItemNumber;
             }
         });

         songRows[i].addEventListener('click', function(event) {
             // Event handler call
              clickHandler(event.target);
         });
     }
    //create an array for the possible album objects
    var currentAlbum = [albumMarconi, albumHeartbreak, albumPicasso];
    //default index starts at albumMarconi when clicked
    var i = 0;
    //add the event listener
    albumImage.addEventListener("click", function(foo) {
        //toggle b/w objects
        setCurrentAlbum(currentAlbum[i]);
        i += 1;
        //if user keeps infinetly clicking
        if (i == currentAlbum.length) {
          //reset the index
          i = 0;
        }
    });
};
