var app = angular.module('cdg', ['ngRoute', 'angularUtils.directives.dirPagination']);

app.config(function($routeProvider){
	$routeProvider
	.when('/cadastro', {
		templateUrl : "views/cadastroUsuario.html",
		controller : "usuarioController",
		controllerAs: '_ctrl',
        access: { requiredLogin: false }
	})
	.when('/', {
		templateUrl: "views/home.html",
		controller: "homeController",
		controllerAs: "_ctrlHome",
		access:{ requiredLogin: false}
	});
});