const db = require('./databaseServices');
module.exports = {
    personalDetails: function (name, emailid, contactno, address, description, techskills) {
        return new Promise((resolve, reject) => {
            db.CheckUser(name).then((data) => {
                if (data.message == 'user does not exists ') {
                    db.UploadUser(name, emailid, contactno, address, description, techskills).then((data1) => {
                        if (data1.message == 'data inserted') {
                            resolve({ message: 'datauploaded' });
                        }
                        else {
                            resolve({ message: 'personal details have not been uploaded' })
                        }
                    })
                }
                else{
                    resolve({message:'user exists'})
                }
            })
        })
    },
    educationDetails: function (name, degree, major, collegeName, duration) {
        return new Promise((resolve, reject) => {
            db.addEducation(name, degree, major, collegeName, duration).then((data) => {
                if (data.message == 'data inserted') {
                    resolve({ message: 'datauploaded' });
                }
                else {
                    resolve({ message: 'education data have not been uploaded' })
                }
            })
        })
    },
    workDetails: function(name ,ProjectName ,ProjectDescription ,CompanyName ,designation ,duration ){
        return new Promise((resolve,reject)=>{
            db.addWorkExp(name ,ProjectName ,ProjectDescription ,CompanyName ,designation ,duration).then((data)=>{
                if (data.message == 'data inserted') {
                    resolve({ message: 'datauploaded' });
                }
                else {
                    resolve({ message: 'personal details have not been uploaded' })
                }
            })
        })
    },
    fetchData: function(name,email){
        return new Promise((resolve,reject)=>{
            db.CheckUser(name).then((data)=>{
                if (data.message != 'user does not exists ') {
                  console.log(data);
                  let ArrayData=data[0];
                  console.log(data[0].Skills);
                  if (data[0].Skills !== undefined) {
                  ArrayData.Skills=data[0].Skills.split(',');
                  }
                  console.log(JSON.stringify(ArrayData.Skills));
                  db.FetchEducationData(ArrayData.Uname).then((data1)=>{     
                    ArrayData.EducationExp=data1;
                    var CollegeName=[];
                    for(let i=0;i<data1.length;i++){
                        CollegeName.push(data1[i].collegeName);
                    }
                    console.log("collegeName:"+CollegeName);
                   // console.log("edudata"+JSON.stringify(ArrayData));
                    db.fetchworkExp(ArrayData.Uname).then((data2)=>{
                        console.log(JSON.stringify(data2));
                        this.divideAcademicExp(data2,CollegeName).then((workdata)=>{
                            console.log("work"+workdata.data);
                            console.log("acadex"+workdata.AcademicExp);
                            ArrayData.WorkExp=workdata.data;
                            ArrayData.AcademicExp=workdata.AcademicExp;
                            resolve(ArrayData);
                        });
                    })
                   
                  })
                 
                }  
                else{
                    resolve(data);
                }
            })
        })
    },
    divideAcademicExp: function (data, collegeName) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log("got data:" + data.length);
                console.log(collegeName);
    
                let AcademicExp = [];
                let indicesToRemove = [];
    
                for (let i = 0; i < data.length; i++) {
                    for (let j = 0; j < collegeName.length; j++) {
                        console.log("companyname:" + data[i].CompanyName.toUpperCase());
                        console.log("collegename" + collegeName[j].toUpperCase());
    
                        if (data[i].CompanyName.toUpperCase() === collegeName[j].toUpperCase()) {
                            console.log("i");
                            AcademicExp.push(data[i]);
                            indicesToRemove.push(i);
                            console.log("acade" + AcademicExp);
                        }
                    }
                }
    
                // Remove items from the original data array
                for (let i = indicesToRemove.length - 1; i >= 0; i--) {
                    data.splice(indicesToRemove[i], 1);
                }
    
                resolve({ data, AcademicExp });
            }, 1000);
        });
    }
}