/**
 * 首页JS
 */
Ext.define('Desktop.view.Container', {
    alias: 'widget.ipeContainer',
    extend : 'Ext.tab.Panel',
    requires : ['Ext.ux.TabReorderer','Ext.ux.TabCloseMenu'],
    activeTab : 0,
    enableTabScroll : true,
    //animScroll : true,
    border : true,
    //autoScroll : true,
    region : 'center',
    defaults: {
        bodyPadding: 5
    },
    //split : true,
    plugins : [
        Ext.create('Ext.ux.TabReorderer'),
        Ext.create('Ext.ux.TabCloseMenu',{
            closeTabText: '关闭面板',
            closeOthersTabsText: '关闭其他',
            closeAllTabsText: '关闭所有'
        })
    ],
    initComponent:function(){
        this.items = [{title:'首页',iconCls:'btn_home'}];
        this.callParent();
    }
});