var app = angular.module('cdg', ['ngRoute', 'angularUtils.directives.dirPagination', 'ngMaterial', 'ngAnimate']);
app.config(function($routeProvider){
	$routeProvider
	.when('/usuario', {
		templateUrl : "views/usuario.html",
		controller : "usuarioController",
		controllerAs: '_ctrl',
        access: { requiredLogin: false }
	})
	.when('/', {
		templateUrl: "views/home.html",
		controller: "homeController",
		controllerAs: "_ctrlHome",
		access:{ requiredLogin: false}
	})
	.when('/ambiente',{
		templateUrl: "views/ambiente.html",
		controller: "ambienteController",
		controllerAs: "_ctrlAmb",
		access: {requiredLogin: false}
  })
  .when('/base', {
    templateUrl: "views/base.html",
		controller: "baseController",
		controllerAs: "_ctrlBase",
		access: {requiredLogin: false}
  });
});

app.directive('compile', ['$compile', function ($compile) {
    return function(scope, element, attrs) {
      scope.$watch(
        function(scope) {
          // watch the 'compile' expression for changes
          return scope.$eval(attrs.compile);
        },
        function(value) {
          // when the 'compile' expression changes
          // assign it into the current DOM
          element.html(value);

          // compile the new DOM and link it to the current
          // scope.
          // NOTE: we only compile .childNodes so that
          // we don't get into infinite loop compiling ourselves
          $compile(element.contents())(scope);
        }
    );
  };
}]);

angular.module("cdg").directive("selectNgFiles", function() {
  return {
    require: "ngModel",
    link: function postLink(scope,elem,attrs,ngModel) {
      elem.on("change", function(e) {
        var files = elem[0].files;
        ngModel.$setViewValue(files);
      })
    }
  }
});