import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/services/data.service';
import { UserModel } from '../model/user.model';
import { WorkExperienceModel } from '../model/work-experience.model';

@Component({
  selector: 'app-academicexp',
  templateUrl: './academicexp.component.html',
  styleUrls: ['./academicexp.component.css']
})
export class AcademicexpComponent implements OnInit {
  usermodel:UserModel | null |undefined;
  workexp:WorkExperienceModel[] | undefined;
  toggle:Boolean=false;
  constructor(private router:Router,private dataService:DataService) { 
    var username=sessionStorage.getItem('name');
    if(username==''|| username==null)
    {
     this.router.navigateByUrl("/")
    }
  }

  ngOnInit(): void {
    this.dataService.getUserData().subscribe((data)=>{
      this.usermodel=data;
      this.workexp=data?.AcademicExp;
      console.log(this.workexp);
      if(this.workexp==undefined || this.workexp == null ){
        this.toggle=true;
      }
    })
  }

}
