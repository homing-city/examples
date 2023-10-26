import { observable } from 'homing';

class CouponStore {
  usableList: any[] = [];
  invalidList: any[] = [];

  constructor() {
    return observable(this);
  }
}

export const couponStore = new CouponStore();
