import { Component, OnDestroy, OnInit } from '@angular/core';
import { TopNavComponent } from "../top-nav/top-nav.component";
import { ScoreService } from '../../services/score.service';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-change-score',
  imports: [ TopNavComponent,FormsModule,InputNumberModule],
  templateUrl: './change-score.component.html',
  styleUrl: './change-score.component.scss'
})
export class ChangeScoreComponent implements OnInit, OnDestroy {

  currentScore: number = 0; 
  private subscription!: Subscription; 

  constructor(private scoreService: ScoreService) {}

  ngOnInit(): void {
    this.subscription = this.scoreService.score$.subscribe((score) => {
      this.currentScore = score;
    });
  }

  changeScore(newScore: number): void {
    this.scoreService.setScore(newScore);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
