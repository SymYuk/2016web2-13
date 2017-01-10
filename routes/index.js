var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	//DBに接続
	var Connection=require('tedious'),Connection;
	var config={
		userName: 'symyuk',
		password: 'UraNyan1000',
		server:'2016web2-sym',
		options: {encrypt: true, database: '2016web2-13'}
	};
	var connection=new Connection(config);
	connection.on('connect',function(err){
		if(err){
 			 res.render('index', { title:"はｚっぜぜいじめてんとBD",message:err });
		}else{
			console.log("Connected");
			executeStatement();
		}
});
	
var Request=require('tedious').Request;
var TYPES=require('tedious').TYPES;
	
function executeStatement(){
	request=new Request("SELECT TOP(10) CompanyName FROM SalesLT.Customer;",function(err){
		if(err){
			console.log(err);}
	});
	
	var result='<table>';
	
	request.on('row',function(columns){//データの取得毎に呼ぶ
		result+='<tr>';
		columns.forEach(function(column){
			if(column.value===null){
				console.log('NULL');
			}else{
				result+='<td>'+column.value+'</td>';
			}
			result+='</tr>';
		});
	});
	
	request.on('doneProc',function(rowCount,more,returnStatus,rows){//完了時に呼ぶ
		result+="</table>";
		res.render('index',{title:"はじめてのDataBase",message:result});
		});
		
	connection.execSql(request);
	}
});
	
module.exports = router;
