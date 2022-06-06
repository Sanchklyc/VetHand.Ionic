import { Observable } from 'rxjs';
import { CommonHttpService } from './../http/common-http.service';
import { Injectable } from '@angular/core';
import { DataResponseModel } from 'src/app/models/abstract/dataResponseModel';
import { VetWithDistanceDto } from 'src/app/models/concrete/vet/vetWithDistanceDto';

@Injectable({
  providedIn: 'root',
})
export class VetService {
  constructor(private httpService: CommonHttpService) {}

  getVetsByCoordinates(lat: number, long: number): Observable<DataResponseModel<VetWithDistanceDto[]>> {
    return this.httpService.get<DataResponseModel<VetWithDistanceDto[]>>(
      `vet/get-by-distance?latitude=${lat}&longitude=${long}`
    );
  }
}
