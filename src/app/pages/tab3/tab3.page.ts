import { VetWithDistanceDto } from './../../models/concrete/vet/vetWithDistanceDto';
import { Component, OnInit } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';
import { VetService } from 'src/app/services/vet/vet.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  vets: VetWithDistanceDto[] = [];
  constructor(private vetService: VetService) {}

  ionViewWillEnter() {
    this.getLocation().then((data) => {
      this.getVets(data.coords.latitude, data.coords.longitude);
    });
  }
  ngOnInit(): void {
    this.getLocation().then((data) => {
      this.getVets(data.coords.latitude, data.coords.longitude);
    });
  }
  getLocation(): Promise<Position> {
    return Geolocation.getCurrentPosition();
  }
  getVets(lat: number, long: number) {
    this.vetService.getVetsByCoordinates(lat, long).subscribe((response) => {
      if (response.success) this.vets = response.data;
    });
  }
  getDistance(item: VetWithDistanceDto) {
    return Math.floor(item.distance);
  }
}
