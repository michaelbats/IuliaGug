import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from '@angular/fire/firestore';
import { ISkill } from '../../../models/skill.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsComponent {
  skillsCollection: AngularFirestoreCollection<ISkill>;
  skillDocs: Observable<ISkill[]>;

  constructor(private afs: AngularFirestore) {
    this.skillsCollection = this.afs.collection('skills');
    this.skillDocs = this.skillsCollection.valueChanges().pipe(
      map(el => {
        return el.map(el => {
          el.firstUsed = el.firstUsed.toMillis() as any;
          return el;
        });
      }),
    );
  }
}
