import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userthere:boolean=false;

  constructor(private router:Router) {
    var username=sessionStorage.getItem('name');
    if(username!=null || username==' ')    {
     this.router.navigateByUrl("/personal");
     this.userthere=true;
    }
   }

  ngOnInit(): void {
    var username=sessionStorage.getItem('name');
    if(username!=null || username==' ')
    {
      console.log("t");
     this.router.navigateByUrl("/");
     this.userthere=true;
    }
   
  }
  create(){
       this.router.navigateByUrl("/formfield");
  }
  logout(){
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("data");
    this.router.navigateByUrl("/");
    this.userthere=false;
  }

}
