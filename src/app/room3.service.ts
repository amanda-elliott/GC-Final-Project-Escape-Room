import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Room3Service {

  constructor(private http: HttpClient) { }
  getItems() {
    return this.http.get("/room-3-items", { responseType: "json" });
  }

  getUnlockItems() {
    return this.http.get("/room-3-unlock-items", { responseType: "json" });
  }
}
