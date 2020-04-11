import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-Key': apiKey
});


@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor( private http: HttpClient) { }

  private ejecutarQuery<T>( query: string ) {

    query = apiUrl + query;

    return this.http.get<T>( query, { headers } );

  }

  getTopHeadlines() {

    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us`);
    // return this.http.get<RespuestaTopHeadlines>
    //  (`http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=7400a01127004619a9607a40dc235df0`);
  }

  getTopHeadlinesCategory( categoria: string ) {

    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&category=${ categoria }`);

    // return this.http.get(`https://newsapi.org/v2/top-headlines?country=de&category=business&apiKey=7400a01127004619a9607a40dc235df0`);

  }
}
