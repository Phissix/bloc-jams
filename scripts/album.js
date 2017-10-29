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

     var $row = $(template);

     var clickHandler = function() {
        // get the song data
        var songNum = $(this).attr('data-song-number');
        //check if objects points to anything
        if (currentlyPlayingSong !== null) {
          //change data to currentlyPlayingSong when user plays new song
          var current = $('song-item-number[data-song-number=""' + currentlyPlayingSong + '"]');
          //change to currentlyPlayingSong
          current.html(currentlyPlayingSong);
        }
        //intiate play to pause
        if (currentlyPlayingSong !== songNum) {
          //use pause
          $(this).html(pauseButtonTemplate);
          currentlyPlayingSong = songNum;

        } else if (currentlyPlayingSong === songNum) {
          //from pause to play
          $(this).html(playButtonTemplate);
          //set default to null
          currentlyPlayingSong = null;
        }
    };

     var onHover = function(event) {
         // get row object
         var row = $(this).find('.song-item-number');
         //row's attribute
         var songNum = row.attr('data-song-number');
         //use play/pause
         if (songNum !== currentlyPlayingSong) {
           row.html(playButtonTemplate);
         }
     };
     var offHover = function(event) {
         var row2 = $(this).find('.song-item-number');
         var songNum2 = row2.attr('.data-song-number');
         if (songnum2 !== currentlyPlayingSong) {
           // return contents
           row2.html(songNum2);
         }
     };

     // #1
     $row.find('.song-item-number').click(clickHandler);
     // #2
     $row.hover(onHover, offHover);
     // #3
     return $row;
};
// #1 make contents global so we can access from window.onload

var setCurrentAlbum = function(album) {
   var $albumTitle = $('.album-view-title');
   var $albumArtist = $('.album-view-artist');
   var $albumReleaseInfo = $('.album-view-release-info');
   var $albumImage = $('.album-cover-art');
   var $albumSongList = $('.album-view-song-list');
    // #2
   $albumTitle.text(album.title);
   $albumArtist.text(album.artist);
   $albumReleaseInfo.text(album.year + ' ' + album.label);
   $albumImage.attr('src', album.albumArtUrl);

    // #3
   $albumSongList.empty();

    // #4
   for (var i = 0; i < album.songs.length; i++) {
      var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
      $albumSongList.append($newRow);
   }
};
/*** write a findParentByClassName function that keeps
traversing the DOM upward until a parent with a specified class name is found. ***/




var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

// Store state of playing songs
var currentlyPlayingSong = null;
//we want to add an event listener when user clicks album cover (albumImage)
$(document).ready(function() {
    //default current album when page loads
    setCurrentAlbum(albumPicasso);
});
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
