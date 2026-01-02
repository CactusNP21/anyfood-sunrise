import {inject, Injectable} from '@angular/core';
import {SERVER_URL} from "../../constant/server.constant";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IngredientClient {
  http = inject(HttpClient);

  get serverUrl(): string {
    return SERVER_URL + '/ingredient';
  }

  getAllIngredients() {
    return this.http.get(this.serverUrl);
  }

  searchIngredients(name: string) {
    return this.http.post(this.serverUrl, {name});
  }

}

