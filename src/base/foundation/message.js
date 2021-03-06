/**
 * z-index在1亿层级
 * 弹出提示消息框，用于模拟阻塞操作（通过回调函数实现）
 * @class BI.Msg
 */
BI.Msg = function () {

    var messageShow, $mask, $pop;

    var toastStack = [];

    return {
        alert: function (title, message, callback) {
            this._show(false, title, message, callback);
        },
        confirm: function (title, message, callback) {
            this._show(true, title, message, callback);
        },
        prompt: function (title, message, value, callback, min_width) {
            // BI.Msg.prompt(title, message, value, callback, min_width);
        },
        toast: function (message, options, context) {
            options = options || {};
            context = context || BI.Widget._renderEngine.createElement("body");
            var level = options.level || "normal";
            var autoClose = BI.isNull(options.autoClose) ? true : options.autoClose;
            var toast = BI.createWidget({
                type: "bi.toast",
                cls: "bi-message-animate bi-message-leave",
                level: level,
                autoClose: autoClose,
                text: message,
                listeners: [{
                    eventName: BI.Toast.EVENT_DESTORY,
                    action: function () {
                        BI.remove(toastStack, toast.element);
                        var _height = 10;
                        BI.each(toastStack, function (i, element) {
                            element.css({"top": _height});
                            _height += element.outerHeight() + 10;
                        });
                    }
                }]
            });
            var height = 10;
            BI.each(toastStack, function (i, element) {
                height += element.outerHeight() + 10;
            });
            BI.createWidget({
                type: "bi.absolute",
                element: context,
                items: [{
                    el: toast,
                    left: "50%",
                    top: height
                }]
            });
            toastStack.push(toast.element);
            toast.element.css({"margin-left": -1 * toast.element.outerWidth() / 2});
            toast.element.removeClass("bi-message-leave").addClass("bi-message-enter");

            autoClose && BI.delay(function () {
                toast.element.removeClass("bi-message-enter").addClass("bi-message-leave");
                toast.destroy();
            }, 5000);
        },
        _show: function (hasCancel, title, message, callback) {
            $mask = BI.Widget._renderEngine.createElement("<div class=\"bi-z-index-mask\">").css({
                position: "absolute",
                zIndex: BI.zIndex_tip - 2,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.5
            }).appendTo("body");
            $pop = BI.Widget._renderEngine.createElement("<div class=\"bi-message-depend\">").css({
                position: "absolute",
                zIndex: BI.zIndex_tip - 1,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            }).appendTo("body");
            var close = function () {
                messageShow.destroy();
                $mask.remove();
            };
            var controlItems = [];
            if (hasCancel === true) {
                controlItems.push({
                    el: {
                        type: "bi.button",
                        text: BI.i18nText("BI-Basic_Cancel"),
                        level: "ignore",
                        handler: function () {
                            close();
                            if (BI.isFunction(callback)) {
                                callback.apply(null, [false]);
                            }
                        }
                    }
                });
            }
            controlItems.push({
                el: {
                    type: "bi.button",
                    text: BI.i18nText("BI-Basic_OK"),
                    handler: function () {
                        close();
                        if (BI.isFunction(callback)) {
                            callback.apply(null, [true]);
                        }
                    }
                }
            });
            var conf = {
                element: $pop,
                type: "bi.center_adapt",
                items: [
                    {
                        type: "bi.border",
                        cls: "bi-card",
                        items: {
                            north: {
                                el: {
                                    type: "bi.border",
                                    cls: "bi-message-title bi-background",
                                    items: {
                                        center: {
                                            el: {
                                                type: "bi.label",
                                                cls: "bi-font-bold",
                                                text: title || BI.i18nText("BI-Basic_Prompt"),
                                                textAlign: "left",
                                                hgap: 20,
                                                height: 40
                                            }
                                        },
                                        east: {
                                            el: {
                                                type: "bi.icon_button",
                                                cls: "bi-message-close close-font",
                                                //                                                    height: 50,
                                                handler: function () {
                                                    close();
                                                    if (BI.isFunction(callback)) {
                                                        callback.apply(null, [false]);
                                                    }
                                                }
                                            },
                                            width: 60
                                        }
                                    }
                                },
                                height: 40
                            },
                            center: {
                                el: {
                                    type: "bi.label",
                                    vgap: 10,
                                    hgap: 20,
                                    whiteSpace: "normal",
                                    text: message
                                }
                            },
                            south: {
                                el: {
                                    type: "bi.absolute",
                                    items: [{
                                        el: {
                                            type: "bi.right_vertical_adapt",
                                            lgap: 10,
                                            items: controlItems
                                        },
                                        top: 0,
                                        left: 20,
                                        right: 20,
                                        bottom: 0
                                    }]

                                },
                                height: 44
                            }
                        },
                        width: 450,
                        height: 200
                    }
                ]
            };

            messageShow = BI.createWidget(conf);
        }
    };
}();