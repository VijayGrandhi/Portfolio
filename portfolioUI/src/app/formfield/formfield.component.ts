import { Component, OnInit } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { PdfReaderService } from '../services/pdfreader.service';


@Component({
  selector: 'app-formfield',
  templateUrl: './formfield.component.html',
  styleUrls: ['./formfield.component.css']
})
export class FormfieldComponent implements OnInit {
  index=1;
  selectedFile: File | null = null;
  Profile:any={
    name:'',
    emailID:'',
    contactNo:'',
    address:'',
    description:'',
}
pdfText: string | null = null;

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
  constructor(private http:HttpClient,private router:Router ,public api:ApiService ,private pdfReaderService: PdfReaderService) { }

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
    this.http.post(this.api.baseUrl+'/upload',this.Profile).subscribe((data)=>{
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
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      // Check if the selected file is a PDF
      if (file.type !== 'application/pdf') {
        //this.errorMessage = 'Please select a PDF file.';
        this.selectedFile = null;
      } else {
        this.selectedFile = file;
       // this.errorMessage = null;
      }
    }
  }
  onUpload(): void {
    if (this.selectedFile) {
      if (this.selectedFile && this.selectedFile.type === 'application/pdf') {
        this.pdfReaderService.readPdf(this.selectedFile)
          .then(text => {
            this.pdfText = text;
          })
          .catch(error => {
            console.error('Error reading PDF:', error);
          });
      } else {
        console.error('Invalid file format. Please select a PDF file.');
      }
      // this.fileUploadService.uploadFile(this.selectedFile).subscribe(
      //   response => {
      //     console.log('File uploaded successfully:', response);
      //   },
      //   error => {
      //     console.error('Error uploading file:', error);
      //   }
      //);
    }
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
