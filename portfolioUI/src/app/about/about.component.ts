import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/services/data.service';
import { EducationModel } from '../model/education.model';
import { UserModel } from '../model/user.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  usermodel:UserModel | null | undefined;
  education:EducationModel[] | undefined;
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
      this.education=data?.EducationExp;
      console.log(JSON.stringify(this.education));
    })
  }

}
