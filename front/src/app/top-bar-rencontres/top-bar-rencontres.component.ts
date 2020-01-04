import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar-rencontres',
  templateUrl: './top-bar-rencontres.component.html',
  styleUrls: ['./top-bar-rencontres.component.css']
})
export class TopBarRencontresComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  deconnexionUtilisateur() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('discussion');
    this.router.navigate(['/']);
  }

}
