import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import 'jquery';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public menuItems: any[];
  public brandMenu: any;
  isCollapsed = true;

  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  logout() {
    this.afAuth.auth.signOut();
    $('div#signup-form').css('display', 'none');
  }

}
