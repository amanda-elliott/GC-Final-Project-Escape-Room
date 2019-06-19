import { Component, OnInit, Input } from "@angular/core";
import { Room1Service } from "../room1.service";
import { GameProgressionService } from "../game-progression.service";
import { MatchService } from "../match.service";
import { InventoryService } from "../inventory.service";

@Component({
  selector: "room1front",
  templateUrl: "./room1front.component.html",
  styleUrls: ["./room1front.component.css"]
})
export class Room1frontComponent implements OnInit {
  items: any;
  unlockItems: any;
  inventoryItems: any[];
  itemsToMatch: any[] = [];
  isShowing: boolean = false;
  gameProgress: string;
  door: any;
  doorName: string;
  doorImage: any;

  constructor(
    private room1Service: Room1Service,
    private gameProgressionService: GameProgressionService,
    private matchService: MatchService,
    private inventoryService: InventoryService
  ) {}

  ngOnInit() {
    this.room1Service.getRoomOneItems().subscribe(response => {
      this.items = response;
      // console.log(this.items);
      this.room1Service.setItems(response);
    });
    this.room1Service.getRoomOneUnlockItems().subscribe(response => {
      this.unlockItems = response;
      // console.log(this.unlockItems);
      this.door = this.unlockItems[0];
      this.doorName = this.door.item_name;
      this.doorImage = this.door.item_image;
      
      this.room1Service.setUnlockItems(response);
    });
    // this.inventoryItems = this.inventoryService.inventoryItems;
    this.itemsToMatch = this.matchService.itemsToMatch;
    // console.log(this.inventoryItems);
  }

  selectItem(inventoryItem) {
    // console.log("Match item name:", inventoryItem.match_item_name);
    this.inventoryService.collectItem(inventoryItem);
  }

  removeItem(index) {
    this.room1Service.deleteItem(index);
    // console.log(itemName);
    // console.log(index);
  }

  toggleShow() {
    this.isShowing = !this.isShowing;
  }

  // need to set game progress when advancing to next level
  setGameProgress(): void {
    this.gameProgressionService.setGameProgress(this.gameProgress);
  }

  matchItems2(itemToUnlock) {
    // console.log(itemToUnlock);
    this.matchService.setUnlockItemToMatch(itemToUnlock);
    // this.matchService.itemsToMatch.splice(1, 1, itemToUnlock);
    this.matchService.checkMatch();
    // console.log(this.itemsToMatch);
  }
}
