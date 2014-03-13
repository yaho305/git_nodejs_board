/*
 * GET users listing.
 */
 
var mysql = require('mysql');
 
var dbconn = mysql.createConnection({
    host     : 'localhost', // 기본포트가 3306으로 되어있는 경우에는 포트 설정이 필요없다.
    user     : 'test',
    password : 'test123',
    database: 'test'
});

exports.list = function(req, res){
    // 쿼리부분
    dbconn.query('SELECT * FROM USER ', function(err, result){
        if(err) throw err;
        
        res.render('list', { userList : result });
    });
};

exports.login = function(req, res){
    // 쿼리부분
    dbconn.query('SELECT * FROM USER WHERE id=? and password=?',[req.body.id,req.body.password], function(err, result){
        if(err) throw err;
        
        if(result.length > 0)
            res.redirect("/list");
        else
            res.send("로그인 실패");
    });
};
    
exports.view = function(req, res){
    // 쿼리부분
    dbconn.query('SELECT * FROM USER WHERE id=? ',[req.param("id")], function(err, result){
        if(err) throw err;

        res.render('view', { id : result[0].id , name : result[0].name, password : result[0].password } );
        
    });
};    

exports.insertForm = function(req, res){
    res.render('insert');
};

exports.insert = function(req, res){
    
    // 쿼리부분
    dbconn.query('INSERT INTO USER (`id`,`password`,`name`) VALUES ( ?, ?, ?) ',[req.body.id,req.body.password,req.body.name], function(err, result){
        if(err) throw err;
        
        res.redirect("/list");
    });
};  

exports.del = function(req, res){
    
    // 쿼리부분
    dbconn.query('DELETE FROM USER WHERE id=? ',[req.param("id")], function(err, result){
        if(err) throw err;
        
        res.redirect("/list");
    });
}; 
