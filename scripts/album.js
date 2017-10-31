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
	       var songNumber = parseInt($(this).attr('data-song-number'));
         if (currentlyPlayingSongNumber !== null) {
		        // Revert to song number for currently playing song because user started playing new song.
		        var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
		        currentlyPlayingCell.html(currentlyPlayingSongNumber);
	       }
	       if (currentlyPlayingSongNumber !== songNumber) {
		         // Switch from Play -> Pause button to indicate new song is playing.
		         $(this).html(pauseButtonTemplate);
		         currentlyPlayingSongNumber = songNumber;
             currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
             updatePlayerBarSong();
	       } else if (currentlyPlayingSongNumber === songNumber) {
		          // Switch from Pause -> Play button to pause currently playing song.
		          $(this).html(playButtonTemplate);
              $('.main-controls .play-pause').html(playerBarPlayButton);
		          currentlyPlayingSongNumber = null;
              currentSongFromAlbum = null;
	        }
      };
      var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(playButtonTemplate);
        }
      };

      var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(songNumber);
        }

        console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);

      };
      // #1
      $row.find('.song-item-number').click(clickHandler);
      // #2
      $row.hover(onHover, offHover);
      // #3
      return $row;
};


var setCurrentAlbum = function(album) {
   currentAlbum = album;
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

var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
};

//update player bar
var updatePlayerBarSong = function() {
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
    $('.main-controls .play-pause').html(playerBarPauseButton);
};

var nextSong = function () {

    // Question: is index a built into Javascript? Does it automatically return the index?
    var getLastSongNumber = function(index) {
       return index == 0 ? currentAlbum.songs.length : index;
    };

    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex++;

    // if the index is greater than the # of songs in album, make it start at the beginning
    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }

    // setting the next song as the current song
    currentlyPlayingSongNumber = currentSongIndex + 1
    /* Question: we have not changed currentSongIndex, so this should return the actual current song and not the next song */
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    // update the Player Bar information -
    updatePlayerBarSong();

    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $nextSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');

    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

var previousSong = function() {

    /* if the index is equal to the last song on the list, then return 1, if it does not, return the index +2. Question: Why is it +2? */
    var getLastSongNumber = function(index) {
       return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
    };

    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }

    // why is it + 1 and not - 1?
    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    // Update the Player bar information
    updatePlayerBarSong();
    $('.main-controls .play-pause').html(playerBarPauseButton);

    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $nextSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');

    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};



var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';


// Store state of playing songs
var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');
//we want to add an event listener when user clicks album cover (albumImage)
$(document).ready(function() {
    //default current album when page loads
    setCurrentAlbum(albumPicasso);
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
});
    //create an array for the possible album objects
/**
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
**/
