import { Component, OnInit } from '@angular/core';
import { Item } from '../entities/item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private items: Array<Item> = [
    {
      name: 'Cykel',
      description: 'Gammel cykel, kører fint'
    },
    {
      name: 'Sofa',
      description: 'Ret ny sofa'
    }
  ]

  constructor() { }

  ngOnInit() {
    console.log(this.items)
  }

}
