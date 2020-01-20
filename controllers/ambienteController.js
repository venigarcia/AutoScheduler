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
        self.getAllBibliotecas = getAllBibliotecas; //uma função que retorna todas as bibliotecas inseridas no banco
        self.addSelect = addSelect; //adiciona as options da tag select na view ambiente
        self.adicionarBiblioteca = adicionarBiblioteca; //função para adicionar o registro de um biblioteca na variável global colletion

        //FUNÇÃO PARA EXIBIÇÃO DE TELA CADASTRO OU EDIÇÃO
        self.showModal = showModal; //mostrar a tela de cadastro ou edição
        //INICIALIZAR COM A PÁGINA
        getAllAmbientes();
        getAllBibliotecas();
        
        function getAllAmbientes(){
            ambienteService.getAmbientes().then(function(ambientes){
               $scope.ambientes = ambientes;
            });
        }
        function getAllBibliotecas(){
            ambienteService.getAllBibliotecas().then(function(bibliotecas){
               self.lista = [].concat(bibliotecas);
               console.log(self.lista);
               addSelect();
            });            
        }
        function getBibliotecas(id){
            ambienteService.getBibliotecas(id).then(function(biblioteca){
                var _temp = [];
                _temp = [].concat(biblioteca);
                $scope.bibliotecas = _temp;
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
        function addSelect(){
            $("#listadebibliotecas option").each(function(){
                $(this).remove();
            });
            for(var i=0; i<self.lista.length;i++){
                console.log(self.lista[i].nome);
                var z = document.createElement("option");
                z.setAttribute("value", self.lista[i].cod);
                var t = document.createTextNode(self.lista[i].nome+"  "+self.lista[i].versao);
                z.appendChild(t);
                document.getElementById("listadebibliotecas").appendChild(z);
            }            
        }
        function adicionarBiblioteca(){
            var element = document.getElementById("listadebibliotecas");
            var selectedValue = element.options[element.selectedIndex].value;
            ambienteService.getBibliotecasById(selectedValue).then(function(rows){
                _colletion.push(rows);
                console.log(_colletion);
            });
            $scope.addbibliotecas = _colletion;
        }
        $scope.deleteMe = function(i){
            $scope.addbibliotecas.splice(i,1);
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
            _colletion = [];
            $scope.addbibliotecas = null;
            $scope.bibliotecas = null;
            $scope.ambiente = {};
        }   
    }
})();