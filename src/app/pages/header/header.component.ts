import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MockService } from 'src/app/services/mock.service';
import { TranslateService } from '@ngstack/translate';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  languages = [
    { code: 'en', label: 'English' },
    { code: 'ko', label: '한국어' },
  ];
  current_lang: string;

  current_user: any = {};
  current_user_role: any = {};

  constructor(private userService: UserService,
              private mockService: MockService,
              private translate: TranslateService
  ) { }

  ngOnInit() {
    this.userService.getUserSession().subscribe(data => {
      this.current_user = data['user'];
      this.current_user_role = data['role'];
    }
      ,
      (err) => {
        console.log(err, err.message);
      }
    );
    
    this.translate.activeLangChanged.subscribe(
      (event: { previousValue: string; currentValue: string }) => {
        console.log('prev'+event.previousValue);
        console.log('current'+event.currentValue);
      }
    )

    this.translate.load

    /***
     * browserlang 
     * defalut language is set app.module 
     * templory set active language is browserlanguage
     
      this.translate.activeLang = this.translate.getBrowserLanguage();
    */
    
    this.current_lang = this.translate.activeLang;
    console.log("translate.activeLang:" + this.translate.activeLang);
  }

  changeLang(lang: string) {
    this.translate.activeLang = lang;
    this.current_lang = lang;
  }



}
