import {Injectable} from "@angular/core";

@Injectable()
export class HomeService {
  ngOnDestroy() {
    console.log('destroyed')
  }
}
