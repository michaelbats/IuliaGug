import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  HostListener,
} from '@angular/core';
import { EncryptionService } from '../../services/encryption.service';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  constructor(public encryptionService: EncryptionService) {}
  @Output() changed = new EventEmitter();
  timerSubscription: Subscription;
  @HostListener('mouseenter', ['$event'])
  onEnter($event) {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    $event.preventDefault();
    this.changed.emit(true);
  }

  @HostListener('mouseleave', ['$event'])
  onLeave($event) {
    this.timerSubscription = timer(80).subscribe(() => {
      $event.preventDefault();
      this.changed.emit(false);
      this.timerSubscription.unsubscribe();
    });
  }
}
