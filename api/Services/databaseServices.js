const { query } = require('express')
const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'database-1.cq2tdanrz2by.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'password',
    database: 'profilelist'
})
module.exports = {
    CheckUser: function (username) {
        return new Promise((resolve, reject) => {
            // connection.connect();
            let query = "select * from userprofile where Uname='" + username + "'";
            console.log(query);
            connection.query(query, (err, rows, fields) => {
                if (err) {
                    console.log(query);
                    reject(err.message)
                }
                else {
                    console.log(rows.length);
                    if (rows.length==0) {
                        console.log('test')
                        resolve({ message: 'user does not exists ' });
                    }
                    else {
                        resolve(rows);
                    }
                }
            })
        });
    },
    UploadUser:function(name,emailid,contactno,address,description,techskills){
        return new Promise((resolve,reject)=>{
            let query1='insert into userprofile(Uname,emailID,contactNO,address,profileDescription,Skills) values(?,?,?,?,?,?)';
            connection.query(query1,[name,emailid,contactno,address,description,techskills],(err,result)=>{
                if(err){
                    console.error('Error inserting data into MySQL:', err);
                    resolve({ error: 'Server error' }); 
                }
                else{
                    console.log(result)
                    resolve({message:'data inserted'});
                }
            })
        })
    },
    addEducation:function(name, degree, major, collegeName, duration){
        return new Promise((resolve,reject)=>{
            let query2='insert into education(Uname,degree, major, collegeName, duration) values(?,?,?,?,?)';
            connection.query(query2,[name, degree, major, collegeName, duration],(err,result)=>{
                if(err){
                    console.error('Error inserting data into MySQL:', err);
                    resolve({ error: 'Server error' }); 
                }
                else{
                    console.log(result)
                    resolve({message:'data inserted'});
                }
            })
        })
    },
    addWorkExp:function(name ,ProjectName ,ProjectDescription ,CompanyName ,designation ,duration ){
        return new Promise((resolve,reject)=>{
            let query3='insert into WorkExperience(Uname,ProjectName,ProjectDescription,CompanyName,designation,duration ) values(?,?,?,?,?,?)';
            connection.query(query3,[name,ProjectName,ProjectDescription,CompanyName,designation,duration],(err,result)=>{
                if(err){
                    console.error('Error inserting data into MySQL:', err);
                    resolve({ error: 'Server error' }); 
                }
                else{
                    console.log(result)
                    resolve({message:'data inserted'});
                }
            })
        })
    },
    FetchEducationData: function(name){
        return new Promise((resolve,reject)=>{
            let query4="select * from education where Uname='"+name+"'";
            connection.query(query4, (err, rows, fields) => {
                if (err) {
                    reject(err.message)
                }
                else {
                        resolve(rows);
                }
            })
        })
    },
    fetchworkExp: function(name){
        return new Promise((resolve,reject)=>{
            let query4="select * from WorkExperience where Uname='"+name+"'";
            connection.query(query4, (err, rows, fields) => {
                if (err) {
                    reject(err.message)
                }
                else {
                        resolve(rows);
                }
            })
        })
    }

}