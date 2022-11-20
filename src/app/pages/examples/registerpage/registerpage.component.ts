import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import {CommonService} from '../../../common.service';

@Component({
  selector: "app-registerpage",
  templateUrl: "registerpage.component.html"
})
export class RegisterpageComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  focus;
  focus1;
  focus2;
  constructor(private userService : CommonService) {}
  @HostListener("document:mousemove", ["$event"])
  onMouseMove(e) {
    var squares1 = document.getElementById("square1");
    var squares2 = document.getElementById("square2");
    var squares3 = document.getElementById("square3");
    var squares4 = document.getElementById("square4");
    var squares5 = document.getElementById("square5");
    var squares6 = document.getElementById("square6");
    var squares7 = document.getElementById("square7");
    var squares8 = document.getElementById("square8");

    var posX = e.clientX - window.innerWidth / 2;
    var posY = e.clientY - window.innerWidth / 6;

    squares1.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares2.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares3.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares4.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares5.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares6.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.05 +
      "deg) rotateX(" +
      posY * -0.05 +
      "deg)";
    squares7.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.02 +
      "deg) rotateX(" +
      posY * -0.02 +
      "deg)";
    squares8.style.transform =
      "perspective(500px) rotateY(" +
      posX * 0.02 +
      "deg) rotateX(" +
      posY * -0.02 +
      "deg)";
  }

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("register-page");

    this.onMouseMove(event);
  }

  register() {
    const user = document.querySelector('#user') as HTMLInputElement
    const password = document.querySelector('#password') as HTMLInputElement
    this.userService.registerUser({user: user.value, password: password.value}).subscribe(data => {
      if (data.success) {
        alert("User registred")
      } else {
        alert("User already exist")
      }
    })
  }

  login() {
    const user = document.querySelector('#user') as HTMLInputElement
    const password = document.querySelector('#password') as HTMLInputElement
    this.userService.updateUser({user: user.value, password: password.value}).subscribe(data => {
      if (data.success) {
        alert("User updated")
      } else {
        alert("User doesn't exist !")
      }
    })
  }

  isLogged() {
    const user = document.querySelector('#user') as HTMLInputElement
    this.userService.deleteUser({user: user.value}).subscribe(data => {
      if (data.success) {
        alert("User deleted")
      } else {
        alert("User doesn't exist !")
      }
    })
  }

  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("register-page");
  }
}
