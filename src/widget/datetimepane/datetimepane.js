BI.DynamicDateTimePane = BI.inherit(BI.Widget, {

    props: {
        baseCls: "bi-dynamic-date-pane"
    },

    render: function () {
        var self = this, o = this.options;
        return {
            type: "bi.vtape",
            items: [{
                el: {
                    type: "bi.linear_segment",
                    cls: "bi-split-bottom",
                    height: 30,
                    items: BI.createItems([{
                        text: BI.i18nText("BI-Multi_Date_YMD"),
                        value: BI.DynamicDateTimePane.Static
                    }, {
                        text: BI.i18nText("BI-Basic_Dynamic_Title"),
                        value: BI.DynamicDateTimePane.Dynamic
                    }], {
                        textAlign: "center"
                    }),
                    listeners: [{
                        eventName: BI.ButtonGroup.EVENT_CHANGE,
                        action: function () {
                            var value = this.getValue()[0];
                            self.dateTab.setSelect(value);
                            switch (value) {
                                case BI.DynamicDateTimePane.Static:
                                    var date = BI.DynamicDateHelper.getCalculation(self.dynamicPane.getValue());
                                    self.ymd.setValue({
                                        year: date.getFullYear(),
                                        month: date.getMonth() + 1,
                                        day: date.getDate()
                                    });
                                    break;
                                case BI.DynamicDateTimePane.Dynamic:
                                    self.dynamicPane.setValue({
                                        year: 0
                                    });
                                    break;
                                default:
                                    break;
                            }
                        }
                    }],
                    ref: function () {
                        self.switcher = this;
                    }
                },
                height: 30
            }, {
                type: "bi.tab",
                ref: function () {
                    self.dateTab = this;
                },
                showIndex: BI.DynamicDateTimePane.Static,
                cardCreator: function (v) {
                    switch (v) {
                        case BI.DynamicDateTimePane.Static:
                            return {
                                type: "bi.static_date_time_pane_card",
                                behaviors: o.behaviors,
                                listeners: [{
                                    eventName: "EVENT_CHANGE",
                                    action: function () {
                                        self.fireEvent("EVENT_CHANGE");
                                    }
                                }],
                                ref: function () {
                                    self.ymd = this;
                                }
                            };
                        case BI.DynamicDateTimePane.Dynamic:
                        default:
                            return {
                                type: "bi.dynamic_date_card",
                                listeners: [{
                                    eventName: "EVENT_CHANGE",
                                    action: function () {
                                        if(self._checkValue(self.getValue())) {
                                            self.fireEvent("EVENT_CHANGE");
                                        }
                                    }
                                }],
                                ref: function () {
                                    self.dynamicPane = this;
                                }
                            };
                    }
                }
            }]
        };
    },

    mounted: function () {
        this.setValue(this.options.value);
    },

    _checkValueValid: function (value) {
        return BI.isNull(value) || BI.isEmptyObject(value) || BI.isEmptyString(value);
    },

    _checkValue: function (v) {
        switch (v.type) {
            case BI.DynamicDateCombo.Dynamic:
                return BI.isNotEmptyObject(v.value);
            case BI.DynamicDateCombo.Static:
            default:
                return true;
        }
    },

    setValue: function (v) {
        v = v || {};
        var type = v.type || BI.DynamicDateTimePane.Static;
        var value = v.value || v;
        this.switcher.setValue(type);
        this.dateTab.setSelect(type);
        switch (type) {
            case BI.DynamicDateTimePane.Dynamic:
                this.dynamicPane.setValue(value);
                break;
            case BI.DynamicDateTimePane.Static:
            default:
                if (this._checkValueValid(value)) {
                    var date = BI.getDate();
                    this.ymd.setValue({
                        year: date.getFullYear(),
                        month: date.getMonth() + 1
                    });
                } else {
                    this.ymd.setValue(value);
                }
                break;
        }
    },

    getValue: function () {
        return {
            type: this.dateTab.getSelect(),
            value: this.dateTab.getValue()
        };
    }
});
BI.shortcut("bi.dynamic_date_time_pane", BI.DynamicDateTimePane);

BI.extend(BI.DynamicDateTimePane, {
    Static: 1,
    Dynamic: 2
});