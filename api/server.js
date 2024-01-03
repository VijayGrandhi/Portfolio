const express = require('express')
const app = express()
const path = require('path');
const port = process.env.PORT || 3000;
const ud=require('./Services/userdataService')
var cors = require('cors')
const bodyparser= require('body-parser');
app.use(cors())
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());
//app.use(express.static('public', { extensions: ['html', 'js'] }));
//app.use(express.static(path.join(__dirname, '/Users/vijayrahul/Portfolio/portfolioUI/dist')));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../portfolioUI/dist/portfolio-ui/index.html'));
// });
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.post('/api/fetchData',(req,res)=>{
    let uname=req.body.name;
    let email=req.body.email;
    ud.fetchData(uname,email).then((data)=>{
        console.log(data);
        res.send(data);
    })
})
app.post('/api/upload',(req,res)=>{
    console.log(req.body.EducationExp.length);
    var educationInfo=req.body.EducationExp;
    var workExp=req.body.WorkExp;
    var academicExp=req.body.AcademicExp;
    var len=req.body.EducationExp.length
    console.log("academic EXP:"+academicExp );
    var leng=0;
    ud.personalDetails(req.body.name,req.body.emailID,req.body.contactNo,req.body.address,req.body.description,req.body.techskills.toString()).then((data)=>{
       // console.log("data"+data)
        if(data.message=="datauploaded"){
            for (var i=0;i<len;i++){
                ud.educationDetails(req.body.name,educationInfo[i].degree,educationInfo[i].major,educationInfo[i].collegeName,educationInfo[i].graduationYear).then((data)=>{
                    console.log(data);
                })
                if(i== len-1){
                    for(var j=0;j<workExp.length;j++){
                        
                        ud.workDetails(req.body.name,workExp[j].ProjectName,workExp[j].ProjectDescription,workExp[j].CompanyName,workExp[j].designation,workExp[j].duration).then((data1)=>{
                            console.log(data1);
                            console.log("length"+leng);
                            leng=leng+1; 
                        });
 
                }              
                }
            }
            asyncFunction3(req.body.name,academicExp);

            res.send({'message':'working'});
        }
        else{
            res.send(data);
        }
    })
})
const asyncFunction3 = (uname,data) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            for(var z=0;z<data.length;z++){
                ud.workDetails(uname,data[z].ProjectName,data[z].ProjectDescription,data[z].CompanyName,data[z].designation,data[z].duration).then((data2)=>{
                    console.log("academic exp"+data2);
                })
            }
            resolve('data Uploaded');
        }, 1000);
    });
};

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
