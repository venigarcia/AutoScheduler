(function (){
    angular.module('cdg').service('ambienteService', ['$q', 'dbService', AmbienteService]);
    function AmbienteService($q, dbService){
        return{
            getAmbientes: getAmbientes,
            getById: getAmbientesById,
            getByName: getAmbientesByName,
            create: createAmbiente,
            destroy: deleteAmbiente,
            getBibliotecas: getBibliotecas,
            updateAmbiente: updateAmbiente
        };
        function getAmbientes(){
            var deferred = $q.defer();
            var query = "SELECT * FROM ambiente";
            dbService.query(query, function(err, rows){
                if(err)deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        }
        function getBibliotecas(id){
            var deferred = $q.defer();
            var query = "SELECT ambiente.descricao FROM ambiente where cod = ?";
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
            var deferred = $q.defer();
            var query = "DELETE FROM ambiente WHERE cod = ?"
            dbService.query(query, [id], function(err, res){
                if(err) deferred.reject(err);
                deferred.resolve(res.affectedRows);
            });            
            return deferred.promise;
        }
        function updateAmbiente(ambiente){
            var deferred = $q.defer();
            var query = "UPDATE ambiente SET nome=? WHERE cod = ?";
            dbService.query(query, [ambiente.nome, ambiente.cod], function(err, res){
                if(err) deferred.reject(err);
                console.log(res);
                deferred.resolve(res);
            });
            return deferred.promise;
        }
    }
})();    