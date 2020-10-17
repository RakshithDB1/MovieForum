import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-pass',
  templateUrl: './admin-pass.component.html',
  styleUrls: ['./admin-pass.component.css']
})
export class AdminPassComponent implements OnInit {

  errorStatus: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  accept(passForm: NgForm){
    if(passForm.value.passCode == "adminofmovies12345"){
      this.errorStatus = false;
      this.router.navigate(['../admin']);
    } else {
      this.errorStatus = true;
    }
  }

  setErrorStatus(){
    this.errorStatus = false;
  }

}
