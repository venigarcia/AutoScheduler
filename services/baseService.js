(function (){
    angular.module('cdg').service('baseService', ['$q', 'dbService', BaseService]);
    function BaseService($q, dbService){
        return{
            getBases: getBases,
            getById: getBasesById,
            create: createBase,
            update: updateBase,
            destroy: deleteBase
        };
        function getBases(){
            var deferred = $q.defer();
            var query = "SELECT * FROM base";
            dbService.query(query, function(err, rows){
                if(err)deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise; 
        }
        function getBasesById(id){
            var deferred = $q.defer();
            var query = "SELECT * FROM base WHERE cod=?";
            dbService.query(query, [id], function(err, rows){
                if(err) deferred.reject(err);
                console.log(rows);
                deferred.resolve(rows);
            });
            return deferred.promise;
        }
        function createBase(base){
            var deferred = $q.defer();
            var query = "INSERT INTO base SET ?";
            dbService.query(query, base, function(err, res){
                if(err)deferred.reject(err);
                console.log(res.insertId);
                deferred.resolve(res.insertId);
            });
            return deferred.promise;
        }
        function updateBase(base){

        }
        function deleteBase(id){
            var deferred = $q.defer();
            var query = "DELETE FROM base WHERE cod = ?";
            dbService.query(query, [id], function(err, res){
                if(err) deferred.reject(err);
                deferred.resolve(res.affectedRows);
            });            
            return deferred.promise;
        }
    }
})();  