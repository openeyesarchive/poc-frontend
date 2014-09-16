'use strict';

/**
 * @ngdoc function
 * @name openeyesApp.service:Event
 * @description
 * # Event
 * Service of the openeyesApp
 */
angular.module('openeyesApp')
  .factory('Event', ['$http', 'ENV', function($http, ENV) {

  	var form;

    return {
      eventStack: [],
      setForm: function(f) {
      	form = f;
      },
      getForm: function() {
      	return form;
      },
      getEventsForPatient: function(patientId){
        var apiCall = ENV.host + ENV.apiEndpoints.patientEvents.replace(':id', patientId);
        return $http({
          method: 'GET',
          url: apiCall
        });
      },
      getEvent: function(eventId){
        var apiCall = ENV.host + ENV.apiEndpoints.laserEvent.replace(':id', eventId);
        return $http({
          method: 'GET',
          url: apiCall
        });
      },
      create: function(body){
        var apiCall = ENV.host + ENV.apiEndpoints.createLaserEvent;
        return $http({
          method: 'POST',
          url: apiCall,
          data: body
        });
      },
      addToEventStack: function(data){
        this.eventStack.push(data);
      },
      getEventStack: function(){
        return this.eventStack;
      },
      clearEventStack: function(){
        this.eventStack = [];
      },
      getLayoutConfig: function(eventType){
        var layoutConfig = {
          eventType1: [
            'laserSite',
            'procedures',
            'eyedraw',
            'treatment'
          ],
          eventType2: [
            'procedures',
            'eyedraw',
            'laserSite',
          ]
        };

        return layoutConfig[eventType];
      },
      getValidationRules: function(name) {

      	var rules = {
      		laserSite: {
						laser: {
							required: {
								value: true,
								msg: 'Laser is required.'
							}
						},
						site: {
							required: {
								value: true,
								msg: 'Site is required.'
							}
						},
						operator: {
							required: {
								value: true,
								msg: 'Operator is required.'
							}
						},
					},
					procedures: {
						procedureLeft: {
							required: {
								value: true,
								msg: 'At least one procedure is required.'
							}
						},
						procedureRight: {
							required: {
								value: true,
								msg: 'At least one procedure is required.'
							}
						}
					},
					treatment: {
						'pre-injection-antiseptic-leftEye': {
							required: true
						},
						'pre-injection-antiseptic-rightEye': {
							required: true
						},
						'pre-injection-skin-cleanser-leftEye': {
							required: true
						},
						'pre-injection-skin-cleanser-rightEye': {
							required: true
						},
						'drug-leftEye': {
							required: true
						},
						'drug-rightEye': {
							required: true
						},
						'injection-time-leftEye': {
							required: true
						},
						'injection-time-rightEye': {
							required: true
						},
						'injection-person-leftEye': {
							required: true
						},
						'injection-person-rightEye': {
							required: true
						},
						'batch-expiry-date-leftEye': {
							required: true
						},
						'batch-expiry-date-rightEye': {
							required: true
						},
						'batch-number-rightEye': {
							required: true
						},
						'batch-number-leftEye': {
							required: true
						},
						'number-injections-leftEye': {
							required: true
						},
						'number-injections-rightEye': {
							required: true
						}
					}
				};

				return name ? rules[name] : rules;
      },
      getComponentMappings: function(mode){
        var componentMappings = {
          edit: {
            laserSite: '<section class="element panel panel-default"><div class="panel-heading"><h3 class="panel-title">Site</h3></div><div class="panel-body"><lasersite ng-model="laserDetails"></lasersite></div></section>',
            procedures: '<section class="element panel panel-default"><div class="panel-heading"><h3 class="panel-title">Treatment</h3></div><div class="panel-body"><div class="row"><div class="col-xs-6"><procedure-selection data-id="procedure-right" data-name="procedureRight" data-side="rightEye" ng-model="procedures"></procedure-selection></div><div class="col-xs-6"><procedure-selection data-id="procedure-left" data-side="leftEye" data-name="procedureLeft" ng-model="procedures"></procedure-selection></div></div></div></section>',
            eyedraw: '<section class="element panel panel-default"><div class="panel-heading"><h3 class="panel-title">Anterior Segment</h3></div><div class="panel-body"><div class="row"><div class="col-xs-6"><eyedraw data="data" data-side="rightEye" options="anterior" mode="{{mode}}"></eyedraw></div><div class="col-xs-6"><eyedraw data="data" data-side="leftEye" options="anterior" mode="{{mode}}"></eyedraw></div></div></div></section>',
            treatment: '<section class="element panel panel-default"><div class="panel-heading"><h3 class="panel-title">Treatment</h3></div><div class="panel-body"><div class="row"><div class="col-xs-6"><treatment data-side="rightEye"></treatment></div><div class="col-xs-6"><treatment data-side="leftEye"></treatment></div></div></div></section>'
          },
          view: {
            laserSite: '<section class=""><div class="row"><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">Site</h3></div><div class="panel-body"><div class="row"><div class="col-xs-2">Site:</div><div class="col-xs-4">{{ event.site.label }}</div></div><div class="row"><div class="col-xs-2">Laser:</div><div class="col-xs-4">{{ event.laser.label }}</div></div><div class="row"><div class="col-xs-2">Operater:</div><div class="col-xs-4">{{ event.laserOperator.firstName }} {{ event.laserOperator.surname }}</div></div></div></div></div></section>',
            procedures: '<section class=""><div class="row"><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">Treatment</h3></div><div class="panel-body"><div class="row"><div class="col-xs-6"><div class="row" ng-if="event.rightEye.procedures && event.rightEye.procedures.length"><div class="col-xs-4">Procedures:</div><div class="col-xs-8"><ul><li ng-repeat="procedure in event.rightEye.procedures">{{procedure.label}}</li></ul></div></div></div><div class="col-xs-6"><div class="row" ng-if="event.leftEye.procedures && event.leftEye.procedures.length"><div class="col-xs-4">Procedures:</div><div class="col-xs-8"><ul><li ng-repeat="procedure in event.leftEye.procedures">{{procedure.label}}</li></ul></div></div></div></div></div></div></div></section>',
            eyedraw: '<section class=""><div class="row"><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">Anterior Segment</h3></div><div class="panel-body"><div class="row"><div class="col-xs-6"><eyedraw data="{{ event.rightEye.anteriorSegment.data }}" options="anterior" mode="view"></eyedraw></div><div class="col-xs-6"><eyedraw data="{{ event.leftEye.anteriorSegment.data }}" options="anterior" mode="view"></eyedraw></div></div></div></div></div></section>'
          }

        };

        return componentMappings[mode];
      }
    };

  }]);
