(function(){
  "USE STRICT";
  angular.module('cdg').controller('usuarioController', ['usuarioService', '$q', UsuarioController]);
  function UsuarioController(usuarioService, $q, $mdDialog, $scope){    
    create = true;
    originalFormaMatricula = document.getElementById('matricula');
    var self = this;
    self.usuarios = [];
    self.usuario = {};    
    self.createUsuario = createUsuario;
    self.updateUsuario = updateUsuario;
    self.saveUsuario = saveUsuario;
    self.deleteUsuario = deleteUsuario;
    self.novoUsuarioForm = novoUsuarioForm;
    self.updateUsuarioForm = updateUsuarioForm;
    getAllUsuarios();
    function getAllUsuarios(){
      usuarioService.getUsuarios().then(function (usuarios){
        self.usuarios = [].concat(usuarios);
        console.log(self.usuarios);
      })
    }    
    function createUsuario(dados){
      usuarioService.create(dados).then(function (id){
        console.log(id);
        self.usuario = {};
        getAllUsuarios();
      });
    }
    function updateUsuario(dados){
      usuarioService.update(dados).then(function (res){
        console.log(res);
        self.usuario = {}
        getAllUsuarios();
      });
    }
    function saveUsuario(){
      var usuario_dado = null;
      usuario_dado = self.usuario;
      if(create===true){
        console.log(self.usuario.matricula);        
        createUsuario(usuario_dado);              
      }else{
        updateUsuario(usuario_dado);
      }
      getAllUsuarios();
    }
    function deleteUsuario(id){
      usuarioService.destroy(id).then(function(res){
        console.log(res);
        getAllUsuarios();
      });
    }
    function updateUsuarioForm(dados){
      self.usuario = dados;
      if(create===true){
        var formaMatricula = $('#matricula');
        var label = $('<div/>',{
          text :self.usuario.matricula,
          id : formaMatricula.attr('id')
        });
        $('#matricula').replaceWith(label);
        document.getElementById('inputsenha').setAttribute("type", "hidden");
        document.getElementById('labelsenha').setAttribute("hidden", "");
      }
      if(create===false){
        document.getElementById('matricula').textContent = self.usuario.matricula;
      }
      create = false;      
      $('#modalPessoa').modal('show');     
    }
  }
  /*function changeCreateToFalse(){
    
    console.log(self.create);
  }*/
  function novoUsuarioForm(){
    if(create===false){
      create = true;
      document.getElementById('inputsenha').setAttribute("type", "password");
      document.getElementById('labelsenha').removeAttribute("hidden", "");
      $('#matricula').replaceWith(self.originalFormaMatricula);
    }
    $('#modalPessoa').modal('show');
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