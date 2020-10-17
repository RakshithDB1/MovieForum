import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  movies: any[];
  errorText: string = '';
  successText: string = '';
  update: boolean = false;
  constructor(private http: HttpClient,
              private router: Router) { }
  
  ngOnInit() {

    this.http.post("http://localhost:1025/table/load", "hello").subscribe((responseData) => {
      if(responseData["status"] == "success"){
        this.movies = responseData['data'];
      }
    })

  }

  accept(form: NgForm) {
    console.log(this.movies);
    if(form.value.name && form.value.genre && form.value.tlink && form.value.ilink && form.value.description)
    {

      var movieTable = {name: form.value.name};
      var movie = {
        name: form.value.name,
        genre: form.value.genre,
        tlink: form.value.tlink,
        ilink: form.value.ilink,
        description: form.value.description
      }

      this.http.post('http://localhost:1025/table/save', movieTable).subscribe((responseData) => {
        if(responseData["status"] == "success"){
          console.log(responseData["data"])
          this.errorText = '';
          this.successText = "Movie added successfully";
        } 
        if(responseData["status"] == "fail"){
          this.errorText = 'Movie already exists';
          this.successText = '';
        }
      })
      this.http.post('http://localhost:1025/movie/save', movie).subscribe((responseData) => {
        console.log("Saved data\n",responseData);
        this.update = true;
        console.log("Data successfully loaded update status is ", this.update);
        this.http.post("http://localhost:1025/table/load", "hello").subscribe((responseData) => {
          if(responseData["status"] == "success"){
            this.movies = responseData['data'];
            this.update = false;
        }
      })
      
      console.log("all complete")
    })


    } else {
      this.errorText = 'Please Specify All Fields';
      this.successText = '';
    }
  }

  open(name: string){
    this.router.navigate(['../movie',name,'Admin'])
  }
}