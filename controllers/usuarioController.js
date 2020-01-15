(function(){
  "USE STRICT";
  angular.module('cdg').controller('usuarioController', ['usuarioService', '$q', UsuarioController]);
  function UsuarioController(usuarioService, $q, $mdDialog, $scope){
    var self = this;
    self.usuarios = [];
    self.usuario = {};
    self.createUsuario = createUsuario;
    self.deleteUsuario = deleteUsuario;
    self.updateUsuario = updateUsuario;
    getAllUsuarios();

    function getAllUsuarios(){
      usuarioService.getUsuarios().then(function (usuarios){
        self.usuarios = [].concat(usuarios);
        console.log(self.usuarios);
      })
    }
    function createUsuario(){
      usuarioService.create(self.usuario).then(function (id){
        console.log(id);
        self.usuario = {};
        getAllUsuarios();
      });
    }
    function deleteUsuario(id){
      usuarioService.destroy(id).then(function(res){
        console.log(res);
        getAllUsuarios();
      });
    }
    function updateUsuario(dados){
      self.usuario = dados;
      $('#modalPessoa').modal('show');
      /*$scope.editar = function(dados){
        $scope.pessoa = dados;
        $('#modalPessoa').modal('show');
      }*/
    }
  }
  /*
  app.controller("cadastroUsuarioController", function($scope, $location, dbService){
    $scope.listaPessoas = function(){
      dbService.query("SELECT * FROM Vendedor", function(data){
        $scope.pessoas = data;			
      });
      console.log('a')
    }
    $scope.salvar = function(){
      dbService.query('INSERT INTO Vendedor SET ?', $pessoa, (err, res)=>{
        if(err) throw err;
      });
    }  
  });*/
})();