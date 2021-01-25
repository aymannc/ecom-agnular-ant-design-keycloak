import {Injectable} from '@angular/core';
import {KeycloakInstance} from 'keycloak-js';

declare var Keycloak: any;

@Injectable({
  providedIn: 'root'
})
export class KeycloakSecurityService {
  public kc: KeycloakInstance;
  token = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJjZnFxTWt0RF92a2pCTTdRZkU2WWcyR2FSU3dJQ2JjMmVHeGFnRWlaRHd3In0.eyJleHAiOjE2MTM2NzUyNzgsImlhdCI6MTYxMTA4MzI3OCwianRpIjoiNWVhMDdiM2MtNzhkNy00MmQyLWE3ZWMtMmEyMDJmZWU4Y2MwIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL2Vjb20tYXBwIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjE0YjkzOWZmLTE1MzctNGE4MS1hZWNhLWIwYmRmNDk0MjAyYiIsInR5cCI6IkJlYXJlciIsImF6cCI6Im1pY3JvLXNlcnZpY2VzIiwic2Vzc2lvbl9zdGF0ZSI6IjcwNGQ4Y2RiLTk3MGItNGI5Ni1hNmNkLTViODI5YWU4MjQzNyIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDo0MjAwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJCSUxMSU5HX01BTkFHRVIiLCJQUk9EVUNUX01BTkFHRVIiLCJvZmZsaW5lX2FjY2VzcyIsIkNVU1RPTUVSX01BTkFHRVIiLCJ1bWFfYXV0aG9yaXphdGlvbiIsIkFETUlOIiwiVVNFUiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiQXltYW4gTmFpdCBDaGVyaWYiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhbmMiLCJnaXZlbl9uYW1lIjoiQXltYW4iLCJmYW1pbHlfbmFtZSI6Ik5haXQgQ2hlcmlmIiwiZW1haWwiOiJheW1hbi5uYWl0MjFAZ21haWwuY29tIn0.EBeawTNAN5zDk-wa02Uatn16M8nDiyyaXnfi0UigQPIYt7PcClI33CWDrzAmisP9Hcy6vBngLg3hePgYtgl5jyBGTqa78ExpmPcydAB4lNFWL0ogiA3K2SXT3x_o8-2rAe-GukIgSvPbiuxmBcpMgE1AlX-G1iOfyL7uLBUzkH6MNPgzpNdm_6YQOsPSlfb_A5fQ-wD_mQU--MUG79lcQ_VKQsZn0RZbDZOwKSgtQaKPx9ALFOLOjXbsfDszIAsYQpZkIUPRtxAlR6WRzV7qMT-IFHA306aUHM4I90a-nPe2VC9sl5ZLqBYX_m7R_SUCAqH5NbJvnLwOxqGkHefF6A';

  constructor() {
  }

  public async init(): Promise<void> {
    console.log('Init Keycloak');
    this.kc = Keycloak(
      {
        realm: 'ecom-app',
        url: 'http://localhost:8080/auth/',
        clientId: 'micro-services'
      });
    await this.kc.init({
      // onLoad: 'login-required',
      onLoad: 'check-sso'
    });
  }

  public isBillingManager(): boolean {
    return this.kc.hasRealmRole('BILLING_MANAGER');
    // return true;
  }

  public isCustomerManager(): boolean {
    return this.kc.hasRealmRole('CUSTOMER_MANAGER');
    // return true;
  }

  public isProductManager(): boolean {
    return this.kc.hasRealmRole('PRODUCT_MANAGER');
    // return true;
  }

}
