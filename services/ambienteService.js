(function (){
    angular.module('cdg').service('ambienteService', ['$q', 'dbService', AmbienteService]);
    function AmbienteService($q, dbService){
        return{
            getAmbientes: getAmbientes,
            getById: getAmbientesById,
            getByName: getAmbientesByName,
            create: createAmbiente,
            createBiblioteca: createBiblioteca,
            createAmbBib : createAmbBib,
            destroy: deleteAmbiente,
            getBibliotecas: getBibliotecas,
            getBibliotecasById: getBibliotecasById,
            getAllBibliotecas: getAllBibliotecas,
            updateAmbiente: updateAmbiente
        };
        function createAmbBib(dados){
            console.log(dados.cod_ambiente);
            console.log(dados.cod_biblioteca);
            var deferred = $q.defer();
            var query = "INSERT INTO ambiente_biblioteca SET ?";
            dbService.query(query, [dados], function(err, res){
                if(err)deferred.reject(err);
                deferred.resolve(res.insertId);
            });
            return deferred.promise;
        }
        function getAmbientes(){
            var deferred = $q.defer();
            var query = "SELECT * FROM ambiente";
            dbService.query(query, function(err, rows){
                if(err)deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        }
        function getAllBibliotecas(){
            var deferred = $q.defer();
            var query = "SELECT * FROM biblioteca";
            dbService.query(query, function(err, rows){
                if(err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        }
        function getBibliotecas(id){
            var deferred = $q.defer();
            var query = "SELECT biblioteca.nome, biblioteca.versao FROM ambiente, ambiente_biblioteca, biblioteca WHERE ambiente.cod = ambiente_biblioteca.cod_ambiente and biblioteca.cod = ambiente_biblioteca.cod_biblioteca and ambiente.cod = ?";
            dbService.query(query, [id], function(err, rows){
                if(err) deferred.reject(err);
                deferred.resolve(rows);
                console.log(rows);
            });
            return deferred.promise;
        }
        function getBibliotecasById(id){
            var deferred = $q.defer();
            var query = "SELECT * FROM biblioteca WHERE cod=?";
            dbService.query(query, [id], function(err, rows){
                if(err) deferred.reject(err);
                deferred.resolve(rows);
                console.log(rows);
            });
            return deferred.promise;
        }
        function getAmbientesById(id){
            var deferred = $q.defer();
            var query = "SELECT * FROM ambiente WHERE cod=?";
            dbService.query(query, [id], function(err, rows){
                if(err) deferred.reject(err);
                console.log(rows);
                deferred.resolve(rows);
            });
            return deferred.promise;
        }
        function getAmbientesByName(name){
            var deferred = $q.defer();
            var query = "SELECT * FROM ambiente WHERE nome LIKE '" + name + "%'";
            dbService.query(query, [name], function(err, rows){
                if(err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        }
        function createAmbiente(ambiente){
            var deferred = $q.defer();
            var query = "INSERT INTO ambiente SET ?";
            dbService.query(query, ambiente, function(err, res){
                if(err)deferred.reject(err);
                console.log(res.insertId);
                deferred.resolve(res.insertId);
            });
            return deferred.promise;
        }
        function deleteAmbiente(id){
            var util = require('util')
            var deferred = $q.defer();
            var query = "DELETE FROM ambiente_biblioteca WHERE cod_ambiente = ?";
            //var query_exp = "SELECT * FROM experimento WHERE cod_ambiente = ?";
            var query_amb = "DELETE FROM ambiente WHERE cod = ?"
            dbService.query(query, [id], function(err, res){
                if(err) deferred.reject(err);
                deferred.resolve(res.affectedRows);
                dbService.query(query_amb, [id], function(err, res){
                    if(err) deferred.reject(err)
                    deferred.resolve(res.affectedRows);
                });
            });            
            /*            
            dbService.query(query_exp, [id], function(err, rows){
                if(err) deferred.reject(err);
                deferred.resolve(rows) 
                if(util.isNull(rows)){
                    
                }else{
                    alert("Existem Experimentos que utilizam esse ambiente");
                }
            });*/
            return deferred.promise;
        }
        function createBiblioteca(biblioteca){
            var deferred = $q.defer();
            var query = "INSERT INTO biblioteca SET ?";
            dbService.query(query, biblioteca, function(err, res){
                if(err)deferred.reject(err);
                deferred.resolve(res.insertId);
            });
            return deferred.promise;
        }
        function updateAmbiente(ambiente){
            var deferred = $q.defer();
            var query = "UPDATE ambiente SET nome=?, descricao=? WHERE cod = ?";
            dbService.query(query, [ambiente.nome, ambiente.descricao, ambiente.cod], function(err, res){
                if(err) deferred.reject(err);
                console.log(res);
                deferred.resolve(res);
            });
            return deferred.promise;
        }
    }
})();    