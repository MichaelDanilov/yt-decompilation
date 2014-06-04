'use strict';

/* Controllers */

angular.module('YtDc.controllers', [])
	.controller('YtDc-Create', function ($scope, $location) {
		$scope.url = '';

		$scope.addVideo = function() {
			$scope.url = 'http://ytdc.dnlv.co/#/';
			$scope.url += $scope.ytdc.videoid + '/';
			$scope.url += $scope.ytdc.starttime + '/';
			$scope.url += $scope.ytdc.endtime;
			$scope.result = true;
		}
	})
	.controller('YtDc-Video', ['$scope', '$routeParams', '$window',
		function($scope, $routeParams, $window) {
			$scope.url = 'lol?';
			var videoid = String($routeParams.video);
			var starttime = Number($routeParams.start);
			if (typeof starttime === undefined || isNaN(starttime)) {
				starttime = 0;
			};
			var endtime = Number($routeParams.end);
			if (typeof endtime === undefined || isNaN(endtime)) {
				endtime = 0;
			};

			$scope.url = 'http://ytdc.dnlv.co/#/';
			$scope.url += videoid + '/';
			$scope.url += starttime + '/';
			$scope.url += endtime;

			setTimeout(function(){
				$scope.yt_player = new $window.YT.Player(
					'ytShownotesPlayer',
					{
						height: '510',
						width: '854',
						playerVars: {
							'rel': 0,
							'showinfo':	0,
							'hidecontrols': 1
						},
						events: {
							'onReady': function(e) {
								e.target.loadVideoById(
									{
										videoId: videoid,
										startSeconds: starttime,
										endSeconds: endtime
									}
								);
								e.target.playVideo();
							}
						}
					}
				);
				new $window.Ya.share({
	        element: 'ya_share_video',
	        l10n: 'en',
	        elementStyle: {
            'quickServices': ['vkontakte','facebook','twitter','gplus']
          },
          link: $scope.url
				});
			},500);
			
		}
	]);