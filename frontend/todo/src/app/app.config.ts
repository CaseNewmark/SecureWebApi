import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { provideRouter } from '@angular/router';
import { routeConfig } from './routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      enableBearerInterceptor: true,
      config: {
        url: 'http://localhost:8080',
        realm: 'woodvillage',
        clientId: 'woodvillage-api-client-id'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      }
    });
}

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      deps: [KeycloakService],
      multi: true,
    },
    importProvidersFrom(KeycloakAngularModule),
    provideRouter(routeConfig),
    provideHttpClient(withInterceptorsFromDi()),
    provideZoneChangeDetection({ eventCoalescing: true })
  ]
};
