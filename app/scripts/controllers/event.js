'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.controller:EventCtrl
 * @description
 * # EventCtrl
 * Controller of the openeyesApp
 */
angular.module('openeyesApp')
	.controller('EventCtrl', ['$scope', '$window', '$routeParams', '$location', '$rootScope', 'Event', function ($scope, $window, $routeParams, $location, $rootScope, Event) {

		$scope.event = null;
		$scope.mode = 'edit';
		$scope.formName = 'form';
		$scope.submitted = false;

		function loadEvent(eventId){
			Event.getEvent(eventId)
				.success(function(data) {
					$scope.event = data;
	      })
	      .error(function(data, status, headers, config) {
					console.log(data, status, headers, config);
		    });
		}

		if($routeParams.patientId && $routeParams.eventId){
			$scope.mode = 'view';
			loadEvent($routeParams.eventId);
		}

		$scope.cancel = function() {
			$window.history.back();
		};

		$scope.navToPatient = function(){
			$location.path('/patient/' + $routeParams.patientId);
		};

		$scope.save = function(){
			$rootScope.$broadcast('event.save', {patientId: $routeParams.patientId});
		};

		$scope.$on('event.save.complete', $scope.navToPatient);

	}]);
