/**
 * 首页面板
 */
Ext.define('Desktop.view.Viewport', {
    extend : 'Ext.container.Viewport',
    requires : ['Desktop.view.Container', 'Desktop.view.Header',
            'Desktop.view.Navigation'],
    layout : 'border',
    initComponent : function() {


        this.ipeHd=Ext.create('Desktop.view.Header',{parent:this});
        this.ipeCon=Ext.create('Desktop.view.Container',{parent:this});
        this.ipeNav=Ext.create('Desktop.view.Navigation',{parent:this});
        this.footer=Ext.create('Desktop.view.Footer',{parent:this});

        this.items=[this.ipeHd,this.ipeCon,this.ipeNav,this.footer];
        this.callParent();
    }
});