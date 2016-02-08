// script.js

    // create the module and name it recoApp
        // also include ngRoute for all our routing needs
    var recoApp = angular.module('recoApp', ['ngRoute','chart.js']);

    // configure our routes
    recoApp.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/list', {
                templateUrl : 'pages/list.html',
                controller  : 'mainController'
            })

            // route for the table page
            .when('/table', {
                templateUrl : 'pages/table.html',
                controller  : 'tableController'
            })

            // route for the chart page
            .when('/chart', {
                templateUrl : 'pages/chart.html',
                controller  : 'chartController'
            });
    });

    recoApp.controller('mainController', function($scope,$http) {        
       $scope.handleClick= function() {
        $('.nav-links').show();
	$('#list_view_button').prop('disabled', true);

	var str=0;
	var video_id="";
	var video_title="";
	var video_stats="";
	var video_thumb="";
        var video_array = [];
        $scope.video_array = [];
                var channel_id=$('#channel_id').val();
                var request_url = 'https://content.googleapis.com/youtube/v3/search?channelId='+ channel_id +'&part=snippet&key=AIzaSyC5jNUcy4swKurDFIoPpTZCfNIJpAMoxIk'
		$http({method : 'GET',url : request_url})
		.success(function(data, status) {
		str = JSON.parse(JSON.stringify(data));
		for(var i=0; i<str.items.length; i++) {
		video_id = str.items[i].id.videoId;
		var video_str=0;
                var request_url = 'https://content.googleapis.com/youtube/v3/videos?id='+ video_id +'&part=snippet%2Cstatistics&key=AIzaSyC5jNUcy4swKurDFIoPpTZCfNIJpAMoxIk'
		$http({method : 'GET',url : request_url})
		.success(function(data, status) {
			    video_str = JSON.parse(JSON.stringify(data));
                            video_id = video_str.items[0].id;
                            video_title = video_str.items[0].snippet.title;
                            video_stats = video_str.items[0].statistics.viewCount;
                            video_thumb = video_str.items[0].snippet.thumbnails.default.url;
                            video_array.push({id: video_id,title: video_title,stats: video_stats,thumb: video_thumb});
                            $scope.video_array = video_array;
		})
		.error(function(data, status) {
		alert("Error");
		})
		}
		})
		.error(function(data, status) {
		alert("Error");
		})
                window.location.href = '../#/list';
		}
       $scope.change_view= function(target_view) {
         if(target_view == 'list'){
	$('#list_view_button').prop('disabled', true);
	$('#chart_view_button').prop('disabled', false);
	$('#table_view_button').prop('disabled', false);
           window.location.href = '../#/list';
         }
         else if(target_view == 'table'){
	$('#list_view_button').prop('disabled', false);
	$('#chart_view_button').prop('disabled', false);
	$('#table_view_button').prop('disabled', true);
           window.location.href = '../#/table';
         }
         else if(target_view == 'chart'){
	$('#list_view_button').prop('disabled', false);
	$('#chart_view_button').prop('disabled', true);
	$('#table_view_button').prop('disabled', false);
           window.location.href = '../#/chart';
         }
       }
    });

    recoApp.controller('tableController', function($scope) {
	setTimeout(function () {
	   angular.element("#datatable").DataTable();
	  }, 10);
    });

    recoApp.controller('chartController', function($scope) {
        var array=[];
        var view_array = [];
        var title_array = [];
        array=$scope.video_array;
array.forEach( function (arrayItem)
{
          view_array.push(arrayItem.stats);
          title_array.push(arrayItem.title);
});
console.log(view_array);
$scope.labels = ['1','2','3','4','5'];

  $scope.data = [view_array];
    });

