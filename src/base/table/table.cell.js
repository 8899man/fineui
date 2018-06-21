/**
 *
 * 表格
 *
 * Created by GUY on 2015/9/22.
 * @class BI.TableCell
 * @extends BI.Single
 */
BI.TableCell = BI.inherit(BI.Widget, {
    _defaultConfig: function () {
        return BI.extend(BI.TableCell.superclass._defaultConfig.apply(this, arguments), {
            baseCls: "bi-table-cell",
            textAlign: "left",
            text: ""
        });
    },

    _init: function () {
        BI.TableCell.superclass._init.apply(this, arguments);
        var o = this.options;
        BI.createWidget({
            type: "bi.label",
            element: this,
            whiteSpace: o.whiteSpace || "nowrap",
            textAlign: this.options.textAlign,
            height: this.options.height,
            text: this.options.text,
            value: this.options.value,
            lgap: o.lgap,
            rgap: o.rgap,
            hgap: o.hgap || 5
        });
    }
});

BI.shortcut("bi.table_cell", BI.TableCell);