var Trackster = {};
const API_KEY = 'd888c634dcc94aca3fe3862eb8ad1cdb';

$(document).ready(function(){
  $('.btn-search').click(function(){
    Trackster.searchTracksByTitle($('input[name=search_str]').val());
  });

  $('input[name=search_str]').click(function(){
    $(this).select();
  })

  $('input[name=search_str]').keypress(function(event){
    if (event.which == 13) {
      Trackster.searchTracksByTitle($('input[name=search_str]').val());
    };
  });

  $('.glyphicon-remove').click(function(){
    $('input[name=search_str]').val('');
  })
});

/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks.
*/
Trackster.renderTracks = function(tracks) {
  $("#list-data").empty();
  for (var i=0; i<tracks.length; i++){
    var mediumAlbumArt = tracks[i].image[1]["#text"];
    var itemStructure = '<div class="row">'+
            '<div class="col-sm-4"> <a href="' + tracks[i].url + '" target="_blank"><span class="glyphicon glyphicon-play-circle"></span></a>' + tracks[i].name + '</div>'+
            '<div class="col-sm-3">' + tracks[i].artist + '</div>'+
            '<div class="col-sm-3"> <img src="' + mediumAlbumArt + '" alt=""> </div>'+
            '<div class="col-sm-2">' + Number(tracks[i].listeners).toLocaleString("latn") +'</div>'+
          '</div>';
    $("#list-data").append(itemStructure);
  };
};

/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracksByTitle = function(title) {
  $('.title').animate({
    opacity: 0.5
  }, 1000, function(){ $('.title').css('opacity', 1)});
  $.ajax({
    url: 'https://ws.audioscrobbler.com/2.0/?method=track.search&track='+title+'&api_key='+API_KEY+'&format=json',
    success: function(data){
      Trackster.renderTracks(data.results.trackmatches.track);
    }
  });
};
