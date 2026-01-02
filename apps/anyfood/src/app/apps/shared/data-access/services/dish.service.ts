import {Injectable} from "@angular/core";

@Injectable()
export class DishService {
  ngOnDestroy() {
    console.log('destroyed')
  }
}
