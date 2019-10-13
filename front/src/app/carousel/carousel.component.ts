import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {4
  // Some random event list
  event_list = [
    {
      event:' Event 1',
      eventLocation:'Bangalore',
      eventDescription:'Bangalore event',
      img: 'https://picsum.photos/900/500?random&t=1',
      eventStartDate: new Date('2019/05/20'),
      eventEndingDate: new Date('2019/05/24')
    },
     {
      event:' Event 2',
      eventLocation:'Dubai',
      eventDescription:'Dubai event',
      img: 'https://picsum.photos/900/500?random&t=3',
      eventStartDate: new Date('2019/07/28'),
      eventEndingDate: new Date('2019/07/30')
    },
     {
      event:' Event 3',
      eventLocation:'New York',
      eventDescription:'NewYork event',
      img: 'https://picsum.photos/900/500?random&t=4',
      eventStartDate: new Date('2020/05/20'),
      eventEndingDate: new Date('2020/05/24')
    },
     {
      event:' Event 4',
      eventLocation:'Singapore',
      eventDescription:'Singapore event',
      img: 'https://picsum.photos/900/500?random&t=6',
      eventStartDate: new Date('2018/05/20'),
      eventEndingDate: new Date('2018/05/24')
    },
    {
      event:' Event 5',
      eventLocation:'Berlin',
      eventDescription: 'Berlin event',
      img: 'https://picsum.photos/900/500?random&t=7',
      eventStartDate: new Date('2017/07/10'),
      eventEndingDate: new Date('2017/08/14')
    },
    {
      event:' Event 6',
      eventLocation:'Mumbai',
      eventDescription:'Mumbai event',
      img: 'https://picsum.photos/900/500?random&t=8',
      eventStartDate: new Date(),
      eventEndingDate: new Date()
    },
    {
      event:' Event 7',
      eventLocation:'Barcelona',
      eventDescription:'Barcelona event',
      img: 'https://picsum.photos/900/500?random&t=6',
      eventStartDate: new Date(),
      eventEndingDate: new Date()
    },
  ]
  
  past_events = this.event_list.filter(event => event.eventEndingDate < new Date());
 
  constructor() {
  }
  ngOnInit() {
  }
}
