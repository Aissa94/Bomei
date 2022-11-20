import {
  Component,
  OnInit,
  Renderer2,
  HostListener,
  Inject
} from "@angular/core";

import { Location } from "@angular/common";
import { DOCUMENT } from "@angular/common";
import { Subscription } from 'rxjs';
import {CommonService} from './common.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})

export class AppComponent implements OnInit {
  isCollapsed = true;
  navColor: string[];
  subscription: Subscription;
  constructor(
    private renderer: Renderer2,
    public location: Location,
    private userService : CommonService,
    @Inject(DOCUMENT) document
  ) {

  }
  @HostListener("window:scroll", ["$event"])
  onWindowScroll(e) {
    if (window.pageYOffset > 80) {
      var element = document.getElementById("navbar-top");
      if (element) {
        element.classList.add("bg-danger");
        element.classList.remove("navbar-transparent");
      }
    } else {
      var element = document.getElementById("navbar-top");
      if (element) {
        element.classList.add("navbar-transparent");
        element.classList.remove("bg-danger");
      }
    }
  }

  addNavActive(e) {
    const links = document.querySelectorAll('.nav-item');
    
    if (links.length) {
      links.forEach((link) => {
        link.addEventListener('click', (e) => {
          links.forEach((link) => {
              link.classList.remove('active');
          });
          e.preventDefault();
          link.classList.add('active');
        });
      });
    }
  }

  ngOnInit() {
    this.onWindowScroll(event);
    this.addNavActive(event);
  }
}

