(function (){
    angular.module('cdg').service('usuarioService', ['$q', 'dbService', UsuarioService]);

    function UsuarioService($q, dbService){
        return{
            getUsuarios: getUsuarios,
            getById: getUsuariosById,
            getByName: getUsuariosByName,
            create: createUsuarios,
            destroy: deleteUsuarios,
            update: updateUsuarios
        };

        function getUsuarios(){
            var deferred = $q.defer();
            var query = "SELECT * FROM usuario";
            dbService.query(query, function (err, rows){
                if(err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        }
        function getUsuariosById(id){
            var deffered = $q.defer();
            var query = "SELECT * FROM usuario WHERE matricula = ?";
            dbService.query(query, [id], function (err, rows){
                if(err) deffered.reject(err);
                deferred.resolve(rows);
            });
            return deffered.promise;
        }
        function getUsuariosByName(name){
            var deferred = $q.defer();
            var query = "SELECT * FROM usuario WHERE nome LIKE  '" + name + "%'";
            dbService.query(query, [name], function(err, rows){
                if(err) deferred.reject(err);
                deferred.resolve(rows);
            })
            return deferred.promise;
        }
        function createUsuarios(usuario){
            var deferred = $q.defer();
            var query = "INSERT INTO usuario SET ?";
            dbService.query(query, usuario, function(err, res){
                if(err) deferred.reject(err);
                deferred.resolve(res.insertId);
            });
            return deferred.promise;
        }
        function deleteUsuarios(id){
            var deferred = $q.defer();
            var query = "DELETE FROM usuario WHERE matricula = ?";
            dbService.query(query, [id], function(err, res){
                if(err) deferred.reject(err);
                deferred.resolve(res.affectedRows);
            });
            return deferred.promise;
        }
        function updateUsuarios(usuario){
            var deferred = $q.defer();
            var query = "UPDATE usuario SET nome=? WHERE matricula = ?";
            dbService.query(query, [usuario.nome, usuario.matricula], function(err, res){
                if(err) deferred.reject(err);
                deferred.resolve(res);
            });
            return deferred.promise;
        }
    }
})();