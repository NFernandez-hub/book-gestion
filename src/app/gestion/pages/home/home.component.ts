import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
    hr{
      border-color: black;
      border-top: 1px
    }
    .container {
      margin: 10px
    }
    .example-container {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
    .example-is-mobile .example-toolbar {
      position: fixed;
      z-index: 2;
    }
    .example-sidenav-container {
      flex: 1;
    }
    .logo-container {
        height: 100%;
        width: 200px;
        display: inline-block;
        font-weight: 600;
        text-align: left;
        align-self: center;

    }
  `]
})
export class HomeComponent implements OnInit {

  get usuario() {
    return this.authService.usuario;
  }

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
  }
  
  logout() {
    this.authService.logout();
  }
}
