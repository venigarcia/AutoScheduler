const request = require('request-promise');
const cmd = require('node-run-cmd');
const mysql = require('mysql');
const db = mysql.createConnection({
    host: '0.0.0.0',
    port: '3306',
    user: 'root',
    password: 'Info@1234',
    database: 'Projeto_AutoScheduler'
});

request('http://localhost:5000/job').then(function(data){
    var job = JSON.parse(data);
    console.log(job.cod_base);
    cmd.run(`wget codigo.rar ftp://gabriel:123viplab@192.168.1.108/${job.path_codigo}`, {cwd:__dirname+'/codigo/', onDone: function(){
        cmd.run('unrar e codigo.rar', {cwd:__dirname+'/codigo/', onDone: function(){
            db.query("SELECT nome from base where cod=?", [job.cod_base], function(err, rows){
                console.log(rows[0].nome);
                cmd.run(`python3 main.py --base /home/viplab/ftp/bases/${rows[0].nome}.rar`, {cwd:`${__dirname}/codigo/`, onDone: function(){
                    cmd.run(`rar d codigo.rar`, {cwd:__dirname+'/codigo/', onDone:function(){
                        console.log(job.cod_usuario);
                        console.log(job.cod);
                        cmd.run(`rar a ${job.cod_usuario}${job.cod}.rar codigo`, {cwd:__dirname, onDone:function(){
                            cmd.run(`wput ${job.cod_usuario}${job.cod}.rar ftp://gabriel:123viplab@192.168.1.108/codigos/`, {cwd:__dirname, onDone: function(){
                                db.query("UPDATE experimento set cod_status=2 where cod=?", [job.cod], function(err, res){
                                    cmd.run('rm -rf codigo', {cwd:__dirname, onDone: function(){
                                        cmd.run(`rar d ${job.cod_usuario}${job.cod}.rar`, {cwd:__dirname, onDone:function(){
                                            cmd.run('mkdir codigo', {cwd:__dirname});
                                        }});
                                    }});
                                });
                            }});
                        }});
                    }});
                }});
            });
        }});
    }});
});

/*
var command = `python3 ${__dirname}/codigo/main.py --base '${__dirname}'`;
console.log(command);
cmd.run(`python3 main.py --base ${__dirname}`, {cwd: __dirname+'/codigo/', onDone: function(){
    console.log("finalizado");
}});
request('http://localhost:5000/job').then(function(data){
    var job = JSON.parse(data);
    console.log(job.cod_base);
    cmd.run(`wget codigo.rar ftp://gabriel:123viplab@192.168.1.108/${job.path_codigo}`, {cwd:__dirname+'/codigo/', onDone: function(){
        cmd.run('unrar e codigo.rar', {cwd:__dirname+'/codigo/', onDone: function(){
            db.query("SELECT nome from base where cod=?", [job.cod_base], function(err, rows){
                console.log(rows[0].nome);
                var command = 'python3 main.py --base /home/viplab/';
                cmd.run(command, {cwd:`${__dirname}/codigo/`, onDone: function(){
                    console.log("finalizado");
                }});
            });
        }});
    }});
});
cmd.run(`python3 main.py --base ${__dirname}/bases/${rows}/`, {cwd:__dirname, onDone: function(){
                    cmd.run(`rar d codigo.rar`, {cwd:__dirname+'/codigo/', onDone:function(){
                        cmd.run(`rar a ${job.cod_usuario+job.cod}.rar codigo`, {cwd:__dirname, onDone:function(){
                            cmd.run(`wput ${job.cod_usuario+job.cod}.rar ftp://gabriel:123viplab@192.168.1.108/codigos/`, {cwd:__dirname, onDone: function(){
                                db.query("UPDATE experimento set cod_status=2", function(err, res){
                                    
                                });
                            }});
                        }});
                    }});
                }})
*/