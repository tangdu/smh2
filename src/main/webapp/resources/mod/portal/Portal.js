
/**
 * @class Ext.app.Portal
 * @extends Object
 * A sample portal layout application class.
 */
Ext.define('Pot.Portal', {
    extend: 'Ext.Panel',
    layout:'fit',
    getTools: function(){
        return [{
            xtype: 'tool',
            type: 'refresh',
            handler: function(e, target, header, tool){
                var portlet = header.ownerCt;
                portlet.setLoading('Loading...');
                Ext.defer(function() {
                    portlet.setLoading(false);
                }, 2000);
            }
        }];
    },
    requires: ['Pot.basic.PortalPanel', 'Pot.basic.PortalColumn'],
    initComponent: function(){
        this.items=Ext.create('Pot.basic.PortalPanel',{
            border:false,
            items:[{
                items: [{
                    title: '待办任务',
                    tools: this.getTools(),
                    height:300,
                    items: Ext.create('Pot.com.TaskPanel',{parent:this}),
                    listeners: {
                        'close': Ext.bind(this.onPortletClose, this),
                        'render': Ext.bind(this.onPortletShow, this)
                    }
                }]
            },{
                items: [{
                    title: '我的消息',
                    height:300,
                    tools: this.getTools(),
                    items: Ext.create('Pot.com.MessagePanel',{parent:this}),
                    listeners: {
                        'close': Ext.bind(this.onPortletClose, this),
                        'render': Ext.bind(this.onPortletShow, this)
                    }
                }]
            },{
                items: [{
                    title: '系统公告',
                    height:300,
                    tools: this.getTools(),
                    items: Ext.create('Pot.com.MessagePanel',{parent:this}),
                    listeners: {
                        'close': Ext.bind(this.onPortletClose, this),
                        'render': Ext.bind(this.onPortletShow, this)
                    }
                }]
            }]
        });

        this.callParent(arguments);
    },
    onPortletShow:function(portlet){
        portlet.setLoading('Loading...');
        Ext.defer(function() {
            portlet.setLoading(false);
        }, 2000);
    },
    onPortletClose: function(portlet) {
        ipe.Msg.show({header:'提醒',content:portlet.title +" removed"});
        ipe.Sok.sendMsg("go 来了，。");
    }
});
