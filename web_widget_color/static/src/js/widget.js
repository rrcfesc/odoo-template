odoo.define('web_widget_color.web_widget_color',function(require) {
    'use strict';
    console.log("Si estoy pasando por aqui ---");
    var basic_fields = require('web.basic_fields'),
        field_registry = require('web.field_registry');
    var FieldColor = basic_fields.FieldChar.extend({
        template : 'FieldColor',
        widget_class : 'oe_form_field_color',
        _renderReadonly : function() {

        },
        _renderEdit : function() {
            this.$input = this.$el.find('input');
            this.color  = new jscolor(this.$input[0], {hash : true});
        }
    });
    field_registry.add('color', FieldColor);
    ListRender.include({
        unselectRow : function() {
            var canUnselect = true;
            if(this.currentRow != null) {
                var record = this.state.data(this.currentRow);
                var recordWidgets = this.allFieldWidgets[record.id];
                canUnselect = !_.some(recordWidgets, function(widget) {
                    var $el = widget.getFocusableElement();
                    return ($el instanceof jQuery && $el.hasClass('jscolor-active'));
                });
            }
            if (canUnselect) {
                return this._super.apply(this, arguments);
            } else {
                return $.Def0erred().resolve();
            }
        }
    });

    return FieldColor;
});