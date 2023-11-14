import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/services/data.service';
import { UserModel } from '../model/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name: string = '';
  email: string = '';
  usermodel:UserModel | void | undefined;
  constructor( private router:Router,private http:HttpClient,private dataservice:DataService ) { 
    var username=sessionStorage.getItem('name');
    console.log(username);
    if(username!=null || username==' ')
    {
      console.log("true");
     this.router.navigateByUrl("/personal")
    }
  }

  ngOnInit(): void {
    var username=sessionStorage.getItem('name');
    console.log(username);
    if(username!=null || username==' ')
    {
      console.log("true");
     this.router.navigateByUrl("/personal")
    }
  }
  fetchData(){
    let userData={
      name: '',
      email:''
    };
    userData.name=this.name;
    userData.email=this.email;
    //sessionStorage.setItem('name',this.name);
    console.log(this.email);
    this.http.post<UserModel>('http://localhost:3000/fetchData',userData).subscribe((data:UserModel)=>{
      console.log("fetchData:"+JSON.stringify(data.Uname));
      if( data.Uname != undefined || data.Uname !=null) {
      sessionStorage.setItem('name',this.name);
      this.usermodel=data;
      this.dataservice.setUserData(this.usermodel)
       location.reload();
       //this.router.navigateByUrl("/personal")
      }   
    })
  }
  newProfile(){
    this.router.navigateByUrl("/formfield");
  }
}
