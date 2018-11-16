import { NgModule } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateModule, TranslateLoader, TranslateService, TranslatePipe} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';


export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, 'assets/i18n/', '.json');
}


@NgModule({
  declarations: [
  ],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [TranslatePipe],
  providers: [TranslateModule]
})
export class SharedModule {
  constructor(private translate: TranslateService) {
    translate.addLangs(["en","ko"]);
    let browserLang = translate.getBrowserLang();
    console.log(browserLang);
    translate.use(browserLang);
  }
}
