import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { LoggingInterceptor } from './core/interceptors/loggingInterceptor';
import { GlobalErrorHandler } from './core/errorHandlers/globalErrorHandler';
import { authProviders } from './auth/auth.config';

export const appConfig: ApplicationConfig = {
  providers: [
    GlobalErrorHandler,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()), provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
    provideHttpClient(withInterceptorsFromDi()),
    ...authProviders
  ]
};
