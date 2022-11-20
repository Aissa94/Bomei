import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import {CommonService} from '../../common.service';

@Component({
  selector: "app-index",
  templateUrl: "index.component.html",
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  date = new Date();
  pagination = 3;
  pagination1 = 1;
  user: String;
  password: String;
  email: string;
  
  constructor(private userService : CommonService, private router: Router) {}

  scrollToDownload(element: any) {
    element.scrollIntoView({ behavior: "smooth" });
  }
  ngOnInit() {
    this.userService.getData().subscribe(data => {
        console.log(data);
    })
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("index-page");
  }

  registerUser() {
    const user = document.querySelector('#user') as HTMLInputElement
    const password = document.querySelector('#password') as HTMLInputElement
    this.user = user.value;
    this.password = password.value;
    this.userService.registerUser({user: this.user, password: this.password}).subscribe(data => {
      if (data.success) {
        alert("User registred")
      } else {
        alert("User already exist")
      }
    })
  }

  editUser() {
    const user = document.querySelector('#user') as HTMLInputElement
    const password = document.querySelector('#password') as HTMLInputElement
    this.user = user.value;
    this.password = password.value;
    this.userService.updateUser({user: this.user, password: this.password}).subscribe(data => {
      if (data.success) {
        alert("User updated")
      } else {
        alert("User doesn't exist !")
      }
    })
  }

  deleteUser() {
    const user = document.querySelector('#user') as HTMLInputElement
    this.user = user.value;
    this.userService.deleteUser({user: this.user}).subscribe(data => {
      if (data.success) {
        alert("User deleted")
      } else {
        alert("User doesn't exist !")
      }
    })
  }

  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("index-page");
  }
}
