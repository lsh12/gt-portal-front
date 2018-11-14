import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'app-home-footer',
  templateUrl: './home-footer.component.html',
  styleUrls: ['./home-footer.component.css']
})
export class HomeFooterComponent implements OnInit {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconInNamespace(
      'assets', 'genesis',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/genesis/GENESIS_LOGO_signature_hw.svg')
    );
  }

  ngOnInit() {
  }

}
