import { MediaMatcher } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TimerObservable } from 'rxjs-compat/observable/TimerObservable';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';

@Component({
  selector: 'app-landing-home',
  templateUrl: './landing-home.component.html',
  styleUrls: ['./landing-home.component.css']
})
export class LandingHomeComponent implements OnInit, OnDestroy,AfterViewInit {
  private _mobileQueryListener: () => void;
    mobileQuery: MediaQueryList;
    showSpinner: boolean;
    userName: string;
    isAdmin: boolean;

    private autoLogoutSubscription: Subscription;

    constructor(private changeDetectorRef: ChangeDetectorRef,
        private media: MediaMatcher,
        public spinnerService: SpinnerService,
        private authService: AuthenticationService,
        private authGuard: AuthGuard) {

        this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        // tslint:disable-next-line: deprecation
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit(): void {
        const user = this.authService.getCurrentUser();

        this.isAdmin = user.isAdmin;
        this.userName = user.fullName;

        // Auto log-out subscription
        const timer = TimerObservable.create(2000, 5000);
        this.autoLogoutSubscription = timer.subscribe(t => {
            this.authGuard.canActivate();
        });
    }

    ngOnDestroy(): void {
        // tslint:disable-next-line: deprecation
        this.mobileQuery.removeListener(this._mobileQueryListener);
        this.autoLogoutSubscription.unsubscribe();
    }

    ngAfterViewInit(): void {
        this.changeDetectorRef.detectChanges();
    }
}
