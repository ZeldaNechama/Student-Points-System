import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private scoreSubject = new BehaviorSubject<number>(10);
  score$ = this.scoreSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();



  setScore(newScore: number): void {
    this.scoreSubject.next(newScore);
  }

  setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
  }
}
