odoo.define('academy.animal', function(require) {
    'use strict';
    var Widget          = require('web.Widget');
    var core            = require('web.core');
    var rpc             = require('web.rpc');
    require('web.dom_ready');

    var RpcButton = Widget.extend({
        events : {
            'click .rpc-button' :  'onClick'
        },
        init : function(parent, options) {
            this._super.apply(this, arguments);
            this.options = _.extend(options || {}, {});
        },
        onClick : function(ev) {
            console.log("Clicked");
            rpc.query({
                model : 'openacademy.teachers',
                method : 'search_read',
                args: [[['id', '=', this.$el.data('teacher-id')]], ['biografy']],
            }).then(function(data) {
                if (data.length) {
                    console.log(data);
                    $('.biografy').html(data[0].biografy);
                }
            });
        }
    });
    if (!$('.rpc-container').length) {
        return $.Defferred().reject("Dom does not contain .rpc-container");
    }
    $(".rpc-container").each(function(idx) {
        var $elem = $(this);
        var button = new RpcButton(null, $elem.data());
        button.attachTo($elem);
    });
    return RpcButton;
});