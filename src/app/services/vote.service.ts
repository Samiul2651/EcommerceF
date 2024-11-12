import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(
    private http: HttpClient
  ){}

  private url = "https://localhost:7276/api/Vote/";

  getVote(productId : string, userId : string){
    return this.http.get(this.url + "getVote/" + productId + "/" + userId);
  }
}
