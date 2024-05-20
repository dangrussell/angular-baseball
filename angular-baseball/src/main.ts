import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationRef, enableProdMode, importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication, enableDebugTools } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { httpInterceptorProviders } from './app/http-interceptors';
import { pitchReducer } from './app/reducers/pitch.reducer';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      AppRoutingModule,
      StoreModule.forRoot({ pitch: pitchReducer }),
      StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
      EffectsModule.forRoot([]),
    ),
    httpInterceptorProviders,
    provideHttpClient(withInterceptorsFromDi()),
  ]
}).then((applicationRef: ApplicationRef) => {
  if (!environment.production) {
    enableDebugTools(applicationRef.injector.get(ApplicationRef).components[0]);
  }
}).catch(err => console.error(err));
