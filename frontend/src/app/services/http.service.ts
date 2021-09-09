import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { environment } from 'src/environments/environment';
import { Asset, History } from '../asset.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  getHistory(id: string): Observable<History[]> {
    return this.http.get<History[]>(`${environment.baseUrl}getAssetHistory?userId=tom&org=Org1MSP&id=${id}`);
  }
  updateAsset(result: any) {
    let data = {
      org: "Org1MSP",
      userId: "tom",
      data: result
    }

    console.log(data)
    return this.http.post(`${environment.baseUrl}updateAsset`, data)
  }
  deleteAsset(id: string) {
    let data = {
      org: "Org1MSP",
      userId: "tom",
      data: {
        id
      }
    }

    return this.http.post(`${environment.baseUrl}deleteAsset`, data)
  }
  createAsset(asset: Asset) {

    let data = {
      org: "Org1MSP",
      userId: "tom",
      data: asset
    }

    console.log(data)
    return this.http.post(`${environment.baseUrl}createAsset`, data)
  }

  constructor(private http: HttpClient) { }

  getAssets() {
    return this.http.get(environment.baseUrl + "getAllAssets?userId=tom&org=Org1MSP");
  }
}
