/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

	
Handlebars.registerHelper("debug", function(optionalValue) {
  console.log("Current Context");
  console.log("====================");
  console.log(this);
 
  if (optionalValue) {
    console.log("Value");
    console.log("====================");
    console.log(optionalValue);
  }
});





var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },


    blog: function(){
        function getBlogs() {
            var dfd = $.Deferred();
            $.ajax({
                url: 'http://wetu.co.zw/intwasa/api/get_category_posts/?json=get_category_posts&id=7&count=70',
                type: 'GET',
                dataType: 'jsonp',
                success: function(data){
                    var source   = $("#lineup-temp").html();
                    var template = Handlebars.compile(source);
                    var blogData = template(data);
                    $('.eventslist').html(blogData);
                    $('.eventslist').trigger('create');
                    dfd.resolve(data);

                },
                error: function(data){
                    console.log(data);
                }
            });
            return dfd.promise();
        };

        getBlogs().then(function(data){
            $('.eventslist').on('click','li', function(e){                
                localStorage.setItem('postData', JSON.stringify(data.posts[$(this).index()]));
            });
        });

        
    },
    single: function() {
        
            var postDataStorage = localStorage.getItem('postData');
            var source   = $("#single-template").html();
            var template = Handlebars.compile(source);
            var postData = template(JSON.parse(postDataStorage));    
            $('#single-item').html(postData);

    },

};

$(function (){
		$('.feed').feeds({
			feeds : {
				facebook : 'http://www.facebook.com/feeds/page.php?format=atom10&id=170699959653256',
				twitter : 'https://script.google.com/macros/s/AKfycbwQ2ZourXi3AUdlgbz1xgh4YRFndy_-enCWFTZssqnY3Rux06Th/exec?513546024510443521'
			},
			
			max: 14,
			entryTemplate : 'entryTmpl',
			onComplete : function(entries) {
				$(this).find('a').attr('target', '_blank');
				 $(function() {
					  $('.feed .facebook a').each(function() {
						var href = $(this).attr('href');
						$(this).attr('href', 'http://facebook.com' + href);
					  });
					});
			}
		});
		
		$('#selfie').click(function() {
			$('.rotate').hide();
			$(this).delay( 600 ).hide().delay(400).html('<i class=" fa fa-camera-retro"></i> Take another').fadeIn(200);
		});
			
});

var locations = [
      ['<h3>Bulawayo Theatre</h3><a class="maplink" target="_blank" href="https://www.google.com/maps/dir/-20.155113, 28.592129">Get Directions <i class="fa fa-location-arrow"></i></a>', -20.155113, 28.592129, 4],
      ['<h3>National Art Gallery</h3><a class="maplink" class="maplink" href="https://www.google.com/maps/dir/-20.153156, 28.582722">Get Directions <i class="fa fa-location-arrow"></i></a>', -20.153156, 28.582722, 5],
      ['<h3>Chibuku Stage</h3><a class="maplink" target="_blank" href="https://www.google.com/maps/dir/-20.155138, 28.585911">Get Directions <i class="fa fa-location-arrow"></i></a>', -20.155138, 28.585911, 3],
      ['<h3>Rainbow Hotel</h3><a class="maplink" target="_blank" href="https://www.google.com/maps/dir/-33.80010128657071, 151.28747820854187">Get Directions <i class="fa fa-location-arrow"></i></a>', -33.80010128657071, 151.28747820854187, 2],
      ['<h3>City Hall Car Park</h3><a class="maplink" target="_blank" href="https://www.google.com/maps/dir/-20.154831, 28.585885">Get Directions <i class="fa fa-location-arrow"></i></a>', -20.154831, 28.585885, 1],
	  ['<h3>The Hope Centre</h3><a class="maplink" target="_blank" href="https://www.google.com/maps/dir/-20.153780, 28.583611">Get Directions <i class="fa fa-location-arrow"></i></a>', -20.153780, 28.583611, 6],
	  ['<h3>The Zone</h3><a class="maplink" target="_blank" href="https://www.google.com/maps/dir/-20.155130, 28.584169">Get Directions <i class="fa fa-location-arrow"></i></a>', -20.155130, 28.584169, 7]
    ];

    var map = new google.maps.Map(document.getElementById('map-canvas'), {
      zoom: 15,
      center: new google.maps.LatLng(-20.154464, 28.587559),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
	  styles:[{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":60}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"visibility":"on"},{"lightness":30}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ef8c25"},{"lightness":40}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#b6c54c"},{"lightness":40},{"saturation":-40}]},{}]
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;
	var image = 'img/marker.png';
    for (i = 0; i < locations.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map,
		icon:image
      });
	
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
	
$(document).ready(function(){
   $('#rot-right').click(function(){
      $('#smallImage').rotate(90);
	  $('#reset').fadeIn();
	});  
	
   $('#rot-left').click(function(){
      $('#smallImage').rotate(-90);
	  $('#reset').fadeIn();
   });
   
   $('#reset').click(function(){
      $('#smallImage').rotate(0);
	  $('#reset').fadeOut();
   });
   
   $('.add a').click(function(){
	$('.add').hide();
	$('.nav-tabs li').removeClass('active');
	$('.nav-tabs li a').each(function(index, element) {
		if($(element).attr("href") == "#myevents")
		{
			$(element).parent('li').addClass('active');
		}
	});
	})
   
   $('.nav-tabs li a').each(function(index, element) {
		if($(element).attr("href") == "#myevents")
		{
			$(this).on("click", function(){
				$('.add').hide();
			});
		}
		else
		{
			$(this).on("click", function(){
				$('.add').fadeIn();
			});
		}
	});
	
	
	
	
	
	
	
});