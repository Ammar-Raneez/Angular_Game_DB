import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment.prod';
import { APIResponse } from '../models/api_response';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http : HttpClient) { }

  // in this case, it will return an APIResponse (array) of Game's
  public getGameList(ordering : string, search? : string) : Observable<APIResponse<Game>> {
    // set url params
    let params = new HttpParams().set("ordering", ordering);

    if (search) {
      params = new HttpParams().set("ordering", ordering).set("search", search);
    }

    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, {
      params
    })
  }
}
