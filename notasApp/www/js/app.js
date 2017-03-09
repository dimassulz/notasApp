(function () {
    var app = angular.module('notas', ['ionic', 'notas.notaservice']);
        
    app.controller('listaCtrl', function ($scope, NotasFactory) {
        $scope.notas = NotasFactory.listar();
        $scope.remover = function(idDaNota){
            NotasFactory.remover(idDaNota);
        };
    });

    app.controller('adicionarCtrl', function ($scope, $state, NotasFactory) {
        $scope.nota = {
            id: new Date().getTime().toString(),
            titulo: '',
            descricao: ''
        };
        
        $scope.salvar = function () {
            NotasFactory.adicionar($scope.nota);
            $state.go('listar');
        };
    });

    app.controller('editarCtrl', function ($scope, $state, NotasFactory) {
        //Recebendo o id da nota via parametro
        $scope.nota = angular.copy(NotasFactory.buscarPorId($state.params.notaId));

        $scope.salvar = function () {
            NotasFactory.atualizar($scope.nota);
            $state.go('listar');
        };
    });

    app.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

        //Traduzindo o botão Back
        $ionicConfigProvider.backButton.text('');

        $stateProvider.state('listar', {
            url: '/listar',
            templateUrl: 'templates/listar.html'
        });

        $stateProvider.state('adicionar', {
            url: '/adicionar',
            templateUrl: 'templates/adicionar.html'
        });

        $stateProvider.state('editar', {
            url: '/editar/:notaId',
            templateUrl: 'templates/editar.html'
        });

        $urlRouterProvider.otherwise('/listar');

    });
    app.run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })
}());