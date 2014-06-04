'use strict';

angular
	.module('YtDc', [
		'ngRoute',
		'YtDc.controllers'
		])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
		.when(
			'/create',
			{
				templateUrl: 'templates/create.html',
				controller: 'YtDc-Create'
			}
			)
		.when(
			'/:video',
			{
				templateUrl: 'templates/video.html',
				controller: 'YtDc-Video'
			}
			)
		.when(
			'/:video/:start',
			{
				templateUrl: 'templates/video.html',
				controller: 'YtDc-Video'
			}
			)
		.when(
			'/:video/:start/:end',
			{
				templateUrl: 'templates/video.html',
				controller: 'YtDc-Video'
			}
			)
		.otherwise(
		{
			redirectTo: '/create'
		}
		);
	}])
	.directive('videoid', function() {
		return {
			require: 'ngModel',
			link: function(scope, elm, attrs, ctrl) {
				ctrl.$parsers.unshift(function(viewValue) {
					var id;
					if (typeof viewValue === undefined) {
						ctrl.$setValidity('videoid', false);
						return undefined;
					} else if (viewValue.match(/^(?:(?:http(?:s)?:)?\/\/)?(?:www.)?youtube.com\/watch/gi) && viewValue.match(/((\?)|(\&))v=(.{11})/gi)) {
						id = viewValue.match(/((\?)|(\&))v=(.{11})/gi)[0];
						id = id.match(/(.{11})$/gi)[0];
						ctrl.$setValidity('videoid', true);
						return id;
					} else if (viewValue.match(/^(?:(?:http:)?\/\/)?youtu.be\/(.{11})$/gi)) {
						id = viewValue.match(/(.{11})$/gi)[0];
						ctrl.$setValidity('videoid', true);
						return id;
					} else {
						ctrl.$setValidity('videoid', false);
						return undefined;
					}
				});
			}
		};
	})
	.directive('starttime', function() {
		return {
			require: 'ngModel',
			link: function(scope, elm, attrs, ctrl) {
				ctrl.$parsers.unshift(function(viewValue) {
					if (typeof viewValue === undefined) {
						ctrl.$setValidity('starttime', false);
						return '0';
					} else if (viewValue.match(/^(\d)+$/gi)) {
					  ctrl.$setValidity('starttime', true);
						return Number(viewValue.match(/^(\d)+$/gi)[0]);
					} else if (viewValue.match(/^(\d)+:\d(?:\d)?$/gi)) {
					  var min, sec;
					  min = Number(viewValue.match(/^(\d)+:/gi)[0].match(/(\d)+/gi)[0]);
					  if (min < 0) {
					    ctrl.$setValidity('starttime', false);
							return '0';
					  } else {
					    min = min * 60;
					    sec = Number(viewValue.match(/:\d(?:\d)?/gi)[0].match(/\d(?:\d)?/gi)[0]);
					    if (sec > 59 || sec < 0) {
					      ctrl.$setValidity('starttime', false);
								return '0';
					    } else {
					      sec += min;
					      ctrl.$setValidity('starttime', true);
								return sec;
					    }
					  }
					} else {
					  ctrl.$setValidity('starttime', false);
						return '0';
					}
				});
			}
		};
	})
	.directive('endtime', function() {
		return {
			require: 'ngModel',
			link: function(scope, elm, attrs, ctrl) {
				ctrl.$parsers.unshift(function(viewValue) {
					if (typeof viewValue === undefined) {
						ctrl.$setValidity('endtime', false);
						return '0';
					} else if (viewValue.match(/^(\d)+$/gi)) {
					  ctrl.$setValidity('endtime', true);
						return Number(viewValue.match(/^(\d)+$/gi)[0]);
					} else if (viewValue.match(/^(\d)+:\d(?:\d)?$/gi)) {
					  var min, sec;
					  min = Number(viewValue.match(/^(\d)+:/gi)[0].match(/(\d)+/gi)[0]);
					  if (min < 0) {
					    ctrl.$setValidity('endtime', false);
							return '0';
					  } else {
					    min = min * 60;
					    sec = Number(viewValue.match(/:\d(?:\d)?/gi)[0].match(/\d(?:\d)?/gi)[0]);
					    if (sec > 59 || sec < 0) {
					      ctrl.$setValidity('endtime', false);
								return '0';
					    } else {
					      sec += min;
					      ctrl.$setValidity('endtime', true);
								return sec;
					    }
					  }
					} else {
					  ctrl.$setValidity('endtime', false);
						return '0';
					}
				});
			}
		};
	});