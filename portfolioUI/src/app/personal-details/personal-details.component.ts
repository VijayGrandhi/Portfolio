import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/services/data.service';
import { UserModel } from '../model/user.model';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit {
usermodel:UserModel | null | undefined;
skills:any=[];
  constructor(private router:Router,private dataService: DataService) {
    var username=sessionStorage.getItem('name');
    if(username==''|| username==null)
    {
     this.router.navigateByUrl("/")
    }
  }

  ngOnInit(): void {
    this.dataService.getUserData().subscribe((data)=>{
      this.usermodel=data;
      this.skills=this.usermodel?.Skills;
    })
  }

}
