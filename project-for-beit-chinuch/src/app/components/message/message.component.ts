import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { ScoreService } from '../../services/score.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-message',
  imports: [CommonModule,RouterLink],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent implements OnInit {
  currentUser: User | null = null;
  score: number = 10;

  constructor(private scoreService: ScoreService) { }

  ngOnInit(): void {
    this.scoreService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    })

    this.scoreService.score$.subscribe((s) => {
      this.score = s;
    })

  }

}
