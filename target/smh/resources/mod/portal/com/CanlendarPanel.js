/**
 * 工作日历
 * Created by tangdu on 14-2-15.
 */
Ext.define("Pot.com.CanlendarPanel",{
    extend:'Ext.Panel',
    layout:'fit',
    border:false,
    initComponent:function(){
        this.panel=Ext.create('Sys.tool.CalendarPanel',{
            border:false,
            readOnly:true,
            activeItem:0
        });

        this.items=this.panel;
        this.callParent();
    }
});