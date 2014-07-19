var SERVER = 'budyup.herokuapp.com';
var map;

$( document ).ready(function() {

function initialize() {
  var mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(43.7000, -79.4000)
    /*center: new google.maps.LatLng(myLat, myLong)*/
  };
  
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  getUserData(function(res){
        console.log(res[res.length-1].studying);
        getUserStudying(res[res.length-1].studying, function(data){
          console.log(data);
          for (var i = 0; i<data.length;i++){
            var longu = parseInt(data[i].location.long);// + 0.1*Math.random() -0.1;
            var lati = parseInt(data[i].location.lat);// + 0.1*Math.random()*0.1 + 0.33;
            var studentname = data[i].username;
            var isStudying = data[i].studying;
            console.log(lati+'  '+longu);
            createMarker(lati,longu, studentname);
            addToList(studentname, isStudying);
          }
    });
  });
  getLocation();
 }

google.maps.event.addDomListener(window, 'load', initialize);
});

$(function() {
  $("#home-image").click(function(){
  });
});
 
// function replaceSubject(subject){
//   var subject = subject;
//   $("#studying").update(subject);
// }

function getUserStudying(studying, callback){
  $.get("http://"+SERVER+"/data/get/getUserWith/"+studying,function(data,status){
    callback(data);
  });
}

function addToList(studentname, isStudying) {
  var studentname = studentname;
  var isStudying = isStudying;
  var menu = $("#menu");
  menu.append("<div class='btn btn-default studyList'></div>")
  $('.studyList:last').append(studentname + ' is currently studying ' + isStudying)
}

function getUserData(callback){
  $.get("http://"+SERVER+"/data/get/getUser",function(data,status){
    callback(data);
  });
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  var myLat = position.coords.latitude;
  var myLong = position.coords.longitude; 
  console.log('i am here '+myLat +' '+myLong)
  createMarker(myLat, myLong, "You are here");
}

function createMarker (lat, lng, Message) {
  var latlng = new google.maps.LatLng(lat, lng);
  var marker = new google.maps.Marker({
    position: latlng,
    map: map, 
    title: Message
  })
}

function postUserData() {
  var name = $("#name").val();
  var studying = $("#studying").val();
  currentUser = new User(name, 42.3384, -83.0458, studying);
  $.ajax({
    type: "POST",
    url: "http://"+SERVER+"/data/post/user",
    //dataType: 'json',
    data: { 'username' : currentUser.name, 'longitude' : currentUser.lng, 'latitude' : currentUser.lat, 'studying' : currentUser.studying},
    success: function(result) {
       console.log(result);
       findBuddies(currentUser);
    }
  });
}

function User(name, lat, lng, studying) {
  this.name = name;
  this.lat = lat;
  this.lng = lng;
  this.studying = studying;

  return this;
}

function addBuddy(){
	// pull up existing map
  window.open("map.html","_self");
  //add new buddy!
}

function findBuddies(currentUser) {
	// pull up existing map
  window.open("map.html","_self");
  currentUser = currentUser;
}

function changeSubject() {
  window.open("index.html","_self");
}







