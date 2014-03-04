/**
 *标头
 */
function showMyTask(){
    alert('');
}

function showMyMsg(){
    alert('');
}

Ext.define('Desktop.view.Header', {
    extend : 'Ext.Container',
    height : 60,
    region : 'north',
    border:false,
    layout:{type:'hbox',align:'stretch'},
    //split : true,
    initComponent : function(){
        this.title=Ext.create('Ext.Container',{flex:6,html:'IPE系统平台'});

        this.topbar=Ext.create('Ext.Toolbar',{
            flex:2,
            cls:'toolbar',
            border:false,
            items:[
                {xtype:'label',html:'<a href="javascript:showMyTask()">待办项&nbsp;<span style="color: red">(0)</span></a>'},
                '-',
                {xtype:'label',html:'<a href="javascript:showMyMsg()">消息&nbsp;<span style="color: red">(0)</span></a>'},
                '-',
                {xtype:'button',text:'办公日历',iconCls:ipe.sty.calendar, handler:this.workCanlendar},
                '->',{
                    id:'search-field',xtype:'scutTrigger'
                },{width:50,xtype:'tbspacer'}
            ]
        });
        this.buttombar=Ext.create('Ext.Toolbar',{flex:2,border:false,cls:'toolbar',items:[
            '->',
            {
                text:user.userName,
                iconCls:ipe.sty.user,
                menu:[
                    {text:'修改密码',scope:this,handler:this.upPwd},
                    {iconCls : 'icon-power-off',text:'退出',handler:this.logout}
                ]
            },{width:50,xtype:'tbspacer'}
        ]});
        this.opera=Ext.create('Ext.Container',{
            flex:4,
            layout:{type:'vbox',align:'stretch'},
            items:[this.topbar,this.buttombar]
        });
        this.items=[this.title,this.opera];
        this.callParent();
    },
    logout:function(){
        window.location.href="logout";
    },
    upPwd:function(){
        var win=Ext.create('Desktop.view.UpPwdWin',{parent:this});
        win.show();
        win.form.getForm().findField('userName').setValue(user.userName);
    },
    workCanlendar:function(){
        var panel=Ext.create('Sys.tool.CalendarPanel');
        var win=Ext.getCmp("c_CalendarPanel");
        if(!win){
            win=Ext.create('Ext.Window',{id:'c_CalendarPanel',title:'办公日历',closeAction:'hide',items:[panel],maximizable:true,height:600,width:600,layout:'fit',buttons:[{text:'取消',iconCls:ipe.sty.cancel,handler:function(){win.hide();}}]});
        }
        win.show();
    }
});

