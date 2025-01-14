import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Room3Service {
  items: any;
  uItems: any;
  isShowing: boolean = true;
  
  constructor(private http: HttpClient) { }
  getRoomThreeItems() {
    return this.http.get("/room-3-items", { responseType: "json" });
  }

  getRoomThreeUnlockItems() {
    return this.http.get("/room-3-unlock-items", { responseType: "json" });
  }

  setUnlockItems(uItemList) {
    this.uItems = uItemList;
  }

  deleteItem(index) {
    this.items.splice(index,1);
  }

  setItems(itemList) {
    this.items = itemList;
  }

  hidePrompt() {
    this.isShowing = false;
  }
}
