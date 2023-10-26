Component({
  data: {
    selected: false
  },
  properties: {
    info: {
      type: Object,
      default: {}
    }
  },
  methods: {
    toggleSelect: function () {
      if (this.data.info.valid) {
        this.setData({
          selected: !this.data.selected
        });
      }
    }
  }
});
