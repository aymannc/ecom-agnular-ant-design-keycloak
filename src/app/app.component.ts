import {Component, OnInit} from '@angular/core';
import {KeycloakSecurityService} from './_core/services/keycloak-security.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ANC SHop';
  token: any;
  isAuthenticated: boolean;

  constructor(public kcService: KeycloakSecurityService) {
  }

  ngOnInit(): void {
    this.token = (this.kcService?.kc?.tokenParsed as any);
    this.isAuthenticated = this.kcService.kc.authenticated;
    console.log(this.kcService.kc.tokenParsed.realm_access.roles);
  }

  logout() {
    this.kcService.kc.logout();
  }

  accountManagement() {
    this.kcService.kc.accountManagement();
  }

  login() {
    this.kcService.kc.login();
  }

  changePassword() {
    this.kcService.kc.accountManagement();
  }
}
