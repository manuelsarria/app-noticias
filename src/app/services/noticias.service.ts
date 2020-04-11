import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor( private http: HttpClient) { }

  getTopHeadlines() {
    return this.http.get<RespuestaTopHeadlines>
    (`http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=7400a01127004619a9607a40dc235df0`);
  }
}
