/**
 * Created by Dailer on 2017/7/13.
 */
Demo.TimeInterval = BI.inherit(BI.Widget, {
    props: {
        baseCls: ""
    },

    render: function () {
        var self = this;
        var items = BI.deepClone(Demo.CONSTANTS.TREE);
        return {
            type: "bi.horizontal_auto",
            items: [{
                type: "bi.date_interval",
                ref: function (_ref) {
                    self.dateInterval = _ref;
                },
                value: {
                    start: {
                        type: 2,
                        value: {
                            year: -1,
                            position: 2
                        }
                    },
                    end: {
                        type: 1,
                        value: {
                            year: 2018,
                            month: 1,
                            day: 12
                        }
                    }
                },
                width: 300
            }, {
                type: "bi.button",
                text: "getValue",
                handler: function () {
                    BI.Msg.toast(JSON.stringify(self.dateInterval.getValue()));
                },
                width: 300
            }, {
                type: "bi.time_interval",
                ref: function (_ref) {
                    self.interval = _ref;
                },
                value: {
                    start: {
                        type: 2,
                        value: {
                            year: -1,
                            position: 2
                        }
                    },
                    end: {
                        type: 1,
                        value: {
                            year: 2018,
                            month: 1,
                            day: 12
                        }
                    }
                },
                width: 400
            }, {
                type: "bi.button",
                text: "getValue",
                handler: function () {
                    BI.Msg.toast(JSON.stringify(self.interval.getValue()));
                },
                width: 300
            }, {
                type: "bi.time_periods",
                value: {
                    start: {
                        hour: 7,
                        minute: 23,
                        second: 14
                    },
                    end: {
                        hour: 23,
                        minute: 34,
                        second: 32
                    }
                },
                ref: function (_ref) {
                    self.periods = _ref;
                },
                width: 180
            }, {
                type: "bi.button",
                text: "getValue",
                handler: function () {
                    BI.Msg.toast(JSON.stringify(self.periods.getValue()));
                },
                width: 300
            }],
            vgap: 20
        };
    }
});

BI.shortcut("demo.time_interval", Demo.TimeInterval);