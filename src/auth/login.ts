import {EventAggregator} from 'aurelia-event-aggregator';
import {Router} from 'aurelia-router';
import {AuthService} from '../common/services/auth-service';
import {inject} from 'aurelia-framework';

@inject(EventAggregator, Router, AuthService)
export class Login {
  ea;
  router;
  authService;
  name: string;
  error: string;

  constructor(EventAggregator, Router, AuthService) {
    this.ea = EventAggregator;
    this.router = Router;
    this.authService = AuthService;
  }

  activate() {
    this.error = null;
  }

  login() {
    this.error = null;
    this.authService.login(this.name).then(data => {
      this.ea.publish('user', data.name);
      this.router.navigateToRoute('home');
    }).catch(error => {
      this.error = error.message;
    });
  }
}
