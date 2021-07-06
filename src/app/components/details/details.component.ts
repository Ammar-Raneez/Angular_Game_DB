import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/models/game';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  public gameRating : number;
  public gameId : string;
  public game!: Game;
  public routeSub : Subscription;
  public gameSub : Subscription;

  constructor(private activatedRoute : ActivatedRoute, private httpService : HttpService) {
    this.gameRating = 0;
    this.gameId = "";
    this.routeSub = new Subscription();
    this.gameSub = new Subscription();
  }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params
      .subscribe((params : Params) => {
        this.gameId = params['id'];
        this.getGameDetails(this.gameId);
      })
  }

  getGameDetails(id : string) : void {
    this.gameSub = this.httpService.getGameDetails(id)
      .subscribe(( gameResp : Game ) => {
        this.game = gameResp;

        // display after a second for animation
        setTimeout(() => {
          this.gameRating = this.game.metacritic;
        }, 1000)
      })
  }

  getColor(value : number) : string {
    if (value > 75) {
      return '#5EE432';
    } else if (value > 50) {
      return '#FFFA50';
    } else if (value > 30) {
      return '#F7AA38'; 
    }
    return '#EF4655';
  }

  ngOnDestroy() : void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }
  }
}
