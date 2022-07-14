import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutesConstants } from 'src/app/services/route-constants';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  private _redirect: string = '';

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        console.log(params); 
        this._redirect = params['redirect'] ?? undefined;
    });

    localStorage.clear();
    this.router.navigateByUrl(this._redirect ?? RoutesConstants.Home);
  }

}
