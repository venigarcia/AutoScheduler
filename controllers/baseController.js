(function(){
    "USE STRICT";
    angular.module('cdg').controller('baseController', ['baseService', 'ftpService', '$q', '$scope', BaseController]);
    function BaseController(baseService, ftpService, $q, $scope){
        util = require('util');
        fs = require('fs');
        var self = this;
        self.ifCadastroBase = null;
        self.createBase = createBase;
        self.updateBase = updateBase;
        self.deleteBase = deleteBase;
        $scope.valorprogresso = 40;
        getAllBases();

        function getAllBases(){
            baseService.getBases().then(function(bases){
                $scope.bases = bases;
            });
        }
        $scope.saveBase = function(base){
            if(self.ifCadastroBase){
                createBase(base);
            }else{
                delete base.conteudo;
                updateBase(base);
            }            
        }
        function createBase(base){
            console.log($scope.fileArray[0].name);
            var uploadedSize = 0;
            uploadfile = fs.createReadStream($scope.fileArray[0].path);
            uploadfile.on('data', function(buffer){
                var segmentLength = buffer.length;
                uploadedSize += segmentLength;
                $scope.valorprogresso = Math.floor(uploadedSize/$scope.fileArray[0].size*100);
                console.log($scope.valorprogresso);
                //$scope.valorprogresso = (uploadedSize/$scope.fileArray[0].size*100).toFixed(2);
                //console.log("Progress:\t" + ((uploadedSize/$scope.fileArray[0].size*100).toFixed(2) + "%"));
            });
            ftpService.put(uploadfile, base.nome).then(function(res){
                base.path = res;
                console.log(base);
                baseService.create(base).then(function(id){
                    console.log(id);
                    getAllBases()
                });
            });
            /*
            baseService.create(base).then(function(id){             
                getAllBases();
            });*/
        }
        function updateBase(base){
            baseService.updateBase(base).then(function(id){
                getAllBases();
            });            
        }
        function deleteBase(id){
            baseService.getById(id).then(function(rows){
                console.log(rows[0].path);
                ftpService.delete(rows[0].path);
                baseService.destroy(id).then(function(res){
                    getAllBases();
                });
            });            
        }
        $scope.eventCriarBase = function(flag){
            if(util.isNull(self.ifCadastroBase)&& flag===true){
                self.ifCadastroBase = flag;
            }else if(util.isNull(self.ifCadastroBase) && flag==false){
                self.ifCadastroBase = flag;
            }else if((flag===true || flag===false)&&(self.ifCadastroBase!=flag)){
                self.ifCadastroBase= !self.ifCadastroBase;
            }
            console.log(self.ifCadastroBase);            
        }
    }
})();