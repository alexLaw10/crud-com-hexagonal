import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-menu',
  template: `
    <header class="header">
      <div class="header__container">
        <div class="header__brand">
          <h1 class="header__title">CRUD Hexagonal</h1>
        </div>
        
        <nav class="header__nav">
          <ul class="header__nav-list">
            <li class="header__nav-item">
              <a routerLink="/" class="header__nav-link" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
                Posts
              </a>
            </li>
          </ul>
        </nav>

        <button class="header__menu-toggle" (click)="toggleMobileMenu()" [class.active]="isMobileMenuOpen">
          <span class="header__hamburger"></span>
          <span class="header__hamburger"></span>
          <span class="header__hamburger"></span>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div class="header__mobile-menu" [class.active]="isMobileMenuOpen">
        <nav class="header__mobile-nav">
          <ul class="header__mobile-nav-list">
            <li class="header__mobile-nav-item">
              <a routerLink="/" class="header__mobile-nav-link" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="closeMobileMenu()">
                Posts
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  `,
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements OnInit {
  public isMobileMenuOpen = false;

  constructor() { }

  public ngOnInit(): void {
  }

  public toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  public closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }
}
