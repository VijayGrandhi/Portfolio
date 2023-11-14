import { Component, OnInit } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formfield',
  templateUrl: './formfield.component.html',
  styleUrls: ['./formfield.component.css']
})
export class FormfieldComponent implements OnInit {
  index=1;
  Profile:any={
    name:'',
    emailID:'',
    contactNo:'',
    address:'',
    description:'',
}
  educationExperience:any[]=[];
  workExperience:any[]=[];
  academicExperience:any[]=[];
  skills:any[]=[];
  skill='';
  workexp={
    ProjectName :'' ,
    ProjectDescription :'',
    CompanyName :'',
    designation :'',
    duration :''
  };
  education={
    degree:'',
    major:'',
    collegeName:'',
  graduationYear:''};
  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
  }
  AddEducation(){
    this.educationExperience.push(this.education);
    this.education={
      degree:'',
      major:'',
      collegeName:'',
      graduationYear:''
    }
  }
  AddWorkExp(){
    this.workExperience.push(this.workexp);
    this.workexp={
      ProjectName :'' ,
      ProjectDescription :'',
      CompanyName :'',
      designation :'',
      duration :''
    };
  }
  AddAcademicExp(){
    this.academicExperience.push(this.workexp);
    this.workexp={
      ProjectName :'' ,
      ProjectDescription :'',
      CompanyName :'',
      designation :'',
      duration :''
    };
  }
  NextPage(){
    this.index=this.index+1;
  }
  backPage(){
    this.index=this.index-1;
  }
  finalSubmit(){
    this.Profile.techskills=this.skills;
    this.Profile.EducationExp=this.educationExperience;
    this.Profile.AcademicExp=this.academicExperience;
    this.Profile.WorkExp=this.workExperience;
    console.log(JSON.stringify(this.Profile));
    this.http.post("http://localhost:3000/upload",this.Profile).subscribe((data)=>{
        console.log(data);
        this.Profile={
          name:'',
          emailID:'',
          contactNo:'',
          address:'',
          description:'',
      };
      this.router.navigateByUrl("/");
      })
             
  }
  onEnter(event: any): void {
    if (event instanceof KeyboardEvent && event.key === 'Enter') {
      this.skills.push(this.skill);
      console.log(this.skills);
      this.skill='';
    }
  }
  removeEdu(value:any){
    console.log(value);
    this.educationExperience.splice(value,1);
  }

}
