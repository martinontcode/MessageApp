import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  user: User;

  getUserProperties(): void {
    // Get uid from URL
    const uid = this.route.snapshot.paramMap.get('uid');
    this.userService.getUserProperties()
        .subscribe(userproperties => this.user = userproperties);
  }

  saveUserSettings(displayPicture: string, displayName: string, email: string): void {

    displayPicture = displayPicture.trim();
    displayName = displayName.trim();
    email = email.trim();

    if(!displayPicture || !displayName || !email) {
      return;
    }

    // Get uid from URL
    const uid = this.route.snapshot.paramMap.get('uid');

    this.userService.saveUserSettings( {uid, email, displayName, displayPicture} as User );
  }

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        const uid = +params['uid'];
        this.getUserProperties();
      }
    )
  }

}
