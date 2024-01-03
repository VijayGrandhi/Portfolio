import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public baseUrl = 'http://localhost:3000/api'; // Update with your Express.js server URL

  constructor(private http: HttpClient) {}

  // Implement methods to interact with your Express.js API using HttpClient
}