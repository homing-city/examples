import { ReactivePage } from '@homing/wechat';
import { flushRun } from 'homing';
import { couponStore } from '../../store/index';
import { buildData } from '../../utils/data';
import { consoleTime } from '../../utils/util';

ReactivePage({
  data: {
    get usableList() {
      return couponStore.usableList;
    },
    get invalidList() {
      return couponStore.invalidList;
    },
    invalid: false
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: 'Homing'
    });
  },
  addUsable100() {
    consoleTime('addUsable100', () => {
      this.data.invalid = false;
      couponStore.usableList.push(...buildData(100));
    });
  },
  addUsable1000() {
    consoleTime('addUsable1000', () => {
      this.setData({
        invalid: false
      });
      couponStore.usableList.push(...buildData(1000));
    });
  },
  updateUsable() {
    consoleTime('updateUsable', () => {
      this.setData({
        invalid: false
      });
      couponStore.usableList[0].amount++;
    });
  },
  updateUsableAll() {
    consoleTime('updateUsableAll', () => {
      this.setData({
        invalid: false
      });
      flushRun(() => {
        const usableList = couponStore.usableList;
        usableList.forEach(function (item: any) {
          item.amount++;
        });
      });
    });
  },
  deleteUsable() {
    consoleTime('deleteUsable', () => {
      this.setData({
        invalid: false
      });
      couponStore.usableList.shift();
    });
  },
  deleteUsableAll() {
    consoleTime('deleteUsableAll', () => {
      this.setData({
        invalid: false
      });
      couponStore.usableList = [];
    });
  },
  addInvalidLot1000() {
    consoleTime('addInvalidLot1000', () => {
      this.setData({
        invalid: true
      });
      couponStore.invalidList.push(...buildData(1000, true));
    });
  },
  addInvalidLot5000() {
    consoleTime('addInvalidLot5000', () => {
      this.setData({
        invalid: true
      });
      couponStore.invalidList.push(...buildData(5000, true));
    });
  },
  toggleList() {
    this.setData({ invalid: !this.data.invalid });
  }
});
