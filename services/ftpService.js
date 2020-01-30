(function (){
    angular.module('cdg').service('ftpService', ['$q', FtpService]);
    function FtpService($q){
        var fs = require('fs');
        var ftp = require('ftp');
        var config = {
            host:'192.168.1.108',
            user:'gabriel',
            password:'123viplab'
        };
        conn = new ftp();
        //Transform = require('stream').Transform;
        var self = this;
        self.listDir = listDir;
        self.put = put;
        self.get = get;
        self.delete = destroy;
        conn.connect({
            host:'192.168.1.108',
            user:'gabriel',
            password:'123viplab'
        });
        /*conn.trackProgress(info => {
            console.log("File", info.name)
            console.log("Type", info.type)
            console.log("Transferred", info.bytes)
            console.log("Transferred Overall", info.bytesOverall)
        });*/
        function destroy(path){
            conn.delete(path, function(err){
                if(err) throw err;
            });
        }
        function put(uploadfile, nomebase){
            var deferred = $q.defer();
            conn.put(uploadfile, 'bases/'+nomebase+'.tar', function(err) {
                if (err)deferred.reject(err);
                deferred.resolve('bases/'+nomebase+'.tar')
              });
            return deferred.promise;    
        }
        function listDir(){
            var deferred = $q.defer();
            conn.list(function(err, list){
                if(err)deferred.reject(err);
                deferred.resolve(list);
            });
            return deferred.promise;
        }
        function get(){
            var deferred = $q.defer();
            conn.get('bases/aa.tar', function(err, stream) {
                if (err)deferred.reject(err);
                stream.once('close', function() { conn.end(); });
                stream.pipe(fs.createWriteStream('aa.tar'));
                deferred.resolve(stream);            
            });
            return deferred.promise;
        }
        /*
        function passThrough(){
            var passthrough = new Transform();
            passthrough._transform = function(arquivo, encoding, done) {
                console.log(arquivo);
                this.push(arquivo);
                done();
            };
            return passthrough;
        }
        conn.on('ready', function(){
            conn.put('./aa.txt', 'gabriel.ftp.bases', function(err){
                if(err) throw err;
                conn.end();
            });
        });*/
    }
})();