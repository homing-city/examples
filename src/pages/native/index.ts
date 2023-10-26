import { buildData } from '../../utils/data';
import { consoleTime } from '../../utils/util';

Page({
  data: {
    usableList: [] as any,
    invalidList: [] as any,
    invalid: false
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: 'WeChat'
    });
  },
  addUsable100() {
    consoleTime('addUsable100', () => {
      this.setData({
        invalid: false,
        usableList: this.data.usableList.concat(buildData(100))
      });
    });
  },
  addUsable1000() {
    consoleTime('addUsable1000', () => {
      this.setData({
        invalid: false,
        usableList: this.data.usableList.concat(buildData(1000))
      });
    });
  },
  updateUsable() {
    consoleTime('updateUsable', () => {
      const listData = this.data.usableList;
      if (listData[0]) {
        listData[0].amount++;
        this.setData({
          invalid: false,
          usableList: listData
        });
      }
    });
  },
  updateUsableAll() {
    consoleTime('updateUsableAll', () => {
      const listData = this.data.usableList;
      listData.forEach(function (item: any) {
        item.amount++;
      });
      this.setData({
        invalid: false,
        usableList: listData
      });
    });
  },
  deleteUsable() {
    consoleTime('deleteUsable', () => {
      const listData = this.data.usableList;
      listData.shift();
      this.setData({
        invalid: false,
        usableList: listData
      });
    });
  },
  deleteUsableAll() {
    consoleTime('deleteUsableAll', () => {
      this.setData({
        invalid: false,
        usableList: []
      });
    });
  },
  addInvalidLot1000() {
    consoleTime('addInvalidLot1000', () => {
      this.setData({
        invalid: true,
        invalidList: this.data.invalidList.concat(buildData(1000, true))
      });
    });
  },
  addInvalidLot5000() {
    consoleTime('addInvalidLot5000', () => {
      this.setData({
        invalid: true,
        invalidList: this.data.invalidList.concat(buildData(5000, true))
      });
    });
  },
  toggleList() {
    this.setData({ invalid: !this.data.invalid });
  }
});
