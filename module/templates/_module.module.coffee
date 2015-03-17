do (module=angular.module "<%= fullModuleName %>", [
  'ui.router'
]) ->
  module.config ($stateProvider) ->
    $stateProvider.state '<%= name %>',
      url: '/<%= subPath %><%= lowerModuleName %>',
      views:
        "main":
          controller: '<%= capitalModuleName %>Controller as model'
          templateUrl: '<%= subPath %><%= name %>/<%= name %>.tpl.html'
      data:
        pageTitle: '<%= name %>/<%= name %>.tpl.html'

