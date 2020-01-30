(function(){
    "USE STRICT";
    angular.module('cdg').controller('ambienteController', ['ambienteService', '$q', '$compile', '$scope', '$injector', AmbienteController]);
    function AmbienteController(ambienteService, $q, $mdDialog, $scope, $compile, $injector){
        //VARIÁVEIS GLOBAIS
        util = require('util');
        _colletion = [];

        //VARIÁVEIS THIS
        var self = this;
        self.ifCadastroAmbiente = null;       
        self.lista = [];

        //FUNÇÕES AMBIENTE
        self.createAmbiente = createAmbiente; //uma função para chamar ambienteService e inserir um ambiente no banco
        self.deleteAmbiente = deleteAmbiente; //uma função para chamar ambienteService e deletar um ambiente do banco
        self.updateAmbiente = updateAmbiente; //uma função para atualizar o registro do ambiente no banco

        //FUNÇÕES BIBLIOTECA
        self.createBiblioteca = createBiblioteca; //função para adicionar um biblioteca ao banco  
        
        self.getBibliotecas = getBibliotecas; //uma função para listar todas as bibliotecas possuidas por um ambiente específico 

        //FUNÇÃO PARA EXIBIÇÃO DE TELA CADASTRO OU EDIÇÃO
        self.showModal = showModal; //mostrar a tela de cadastro ou edição
        self.showModalBibliotecas = showModalBibliotecas; //mostrar a tela de cadastro ou edição
        //INICIALIZAR COM A PÁGINA
        getAllAmbientes();
        
        function getAllAmbientes(){
            ambienteService.getAmbientes().then(function(ambientes){
               $scope.ambientes = ambientes;
            });
        }
        function getBibliotecas(id){
            ambienteService.getBibliotecas(id).then(function(biblioteca){
                var _temp = [];
                var biblioteca_ = [];
                _temp = biblioteca[0].descricao.split(' ');
                console.log(_temp);
                for(var i=0; i<_temp.length;i++){
                    var dict = {};
                    var nome = _temp[i].split('==')[0];
                    var versao = _temp[i].split('==')[1];
                    dict = {
                        nome: nome,
                        versao: versao
                    }
                    biblioteca_ = biblioteca_.concat(dict);             
                }
                $scope.bibliotecas = biblioteca_;
            });
        }
        function createAmbiente(ambiente){
            ambienteService.create(ambiente).then(function(id){             
                if(!util.isNull(_colletion)){
                    var dados = {}
                    dados.cod_ambiente = id;
                    for(var i=0; i<_colletion.length; i++){                       
                        dados.cod_biblioteca = _colletion[i][0].cod;
                        ambienteService.createAmbBib(dados);
                    }
                }
                getAllAmbientes();
                $scope.limpaListaBiblioteca();
            });
        }
        function updateAmbiente(ambiente){
            ambienteService.updateAmbiente(ambiente).then(function(id){
                if(!util.isNull(_colletion)){
                    console.log('entrei no if');
                    var dados = {}
                    dados.cod_ambiente = ambiente.cod;
                    console.log(_colletion.length);
                    for(var i=0; i<_colletion.length; i++){             
                        dados.cod_biblioteca = _colletion[i][0].cod;
                        ambienteService.createAmbBib(dados);
                    }
                }
                getAllAmbientes();
                $scope.limpaListaBiblioteca();
            });            
        }
        $scope.saveAmbiente = function(ambiente){
            if(self.ifCadastroAmbiente){
                createAmbiente(ambiente);
            }else{
                updateAmbiente(ambiente);
            }            
        }
        function deleteAmbiente(id){
            ambienteService.destroy(id).then(function(res){
                console.log(res);
                getAllAmbientes();
            });
        }
        function showModal(dados){
            $scope.ambiente = dados;
            $('#modalAmbiente').modal('show');
        }
        function createBiblioteca(){
            ambienteService.createBiblioteca($scope.biblioteca).then(function(res){
                console.log(res);
            });
            getAllBibliotecas();
        }        
        $scope.eventCriarAmbiente = function(flag){
            if(util.isNull(self.ifCadastroAmbiente)&& flag===true){
                self.ifCadastroAmbiente = flag;
            }else if(util.isNull(self.ifCadastroAmbiente) && flag==false){
                self.ifCadastroAmbiente = flag;
            }else if((flag===true || flag===false)&&(self.ifCadastroAmbiente!=flag)){
                self.ifCadastroAmbiente = !self.ifCadastroAmbiente;
            }
            console.log(self.ifCadastroAmbiente);            
        }
        $scope.limpaListaBiblioteca = function(){
            $scope.bibliotecas = null;
            //$scope.ambiente = {};
        }
        function showModalBibliotecas(dados){
            $scope.ambiente = dados;
            $('#modalBibliotecas').modal('show');
        }   
    }
})();