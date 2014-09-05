'use strict';

angular.module('openeyesApp')
	.directive('procedureSelection', function (Procedure) {

		return {
			restrict: 'E', //E = element, A = attribute, C = class, M = comment
			scope: {
				model: '=ngModel',
				id: '=id'
			},
			templateUrl: 'views/directives/procedureselection.html',
			link: function ($scope) {
				$scope.placeholder = 'Choose a procedure...';
				Procedure.getProcedures()
					.success(function(data) {
						$scope.options = data;
					})
					.error(function(data, status, headers, config) {
						console.log(data, status, headers, config);
					});
			}
		};
	});
