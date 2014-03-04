Ext.define('Sys.tool.ShortcutList',{
    extend:'Ext.grid.Panel',
    alias : 'widget.shortcutlist',
    enableColumnMove : false,
    columnLines : true,
    viewConfig : {
        loadingText : '正在加载代理数据列表',
        scrollOffset:0,
        autoFit: true,
        forceFit:true,
        enableRowBody:true
    },
    pageSize : 20,
    initComponent:function(){
        this.columns=[{xtype: 'rownumberer'},
            {
                header:'快捷名称',
                dataIndex:'shortcutName',
                width:200,
                sortable:true
            },{
                header:'快捷码',
                dataIndex:'shortcutCode',
                width:300,
                sortable:true
            },{
                header:'实例化类',
                dataIndex:'shortcutClass',
                width:300,
                sortable:true
            },{
                header:'状态',
                dataIndex:'enabled',
                sortable:true,
                width:40,
                renderer:ipe.fuc.enabledDt
            },{
                header:'描述',
                dataIndex:'shortcutDesc',
                width:350,
                sortable:true
            }];

        this.tbar=[{
            text:'新增',
            iconCls:ipe.sty.add,
            scope:this,
            handler:this.addShortcut
        },{
            text:'编辑',
            iconCls:ipe.sty.edit,
            scope:this,
            handler:this.editShortcut
        },{
            text:'删除',
            iconCls:ipe.sty.del,
            scope:this,
            handler:this.delShortcut
        }];

        this.store=Ext.create('Ext.data.JsonStore', {
            proxy: {
                type: 'ajax',
                url: 'shortcut/list',
                reader: {
                    root: 'rows'
                }
            },
            remoteSort : true,
            autoLoad:true,
            fields : ['shortcutName','shortcutCode','shortcutClass','enabled','shortcutDesc','id']
        });

        this.bbar=Ext.create('Ipe.PagingToolbar',{
            store:this.store,pageSize:this.pageSize
        });

        this.callParent();
    },addShortcut:function(){
        var parent=this.parent;
        parent.shortcutEditForm.expand(true);
        parent.shortcutEditForm.show();
        parent.shortcutEditForm.getForm().reset();
        parent.shortcutEditForm.setTitle("新增快捷码");
        parent.shortcutEditForm.oper="add";
        parent.doLayout();
    },editShortcut:function(){
        var record=this.getSelectionModel().getSelection();
        var parent=this.parent;
        if(record.length>0){
            parent.shortcutEditForm.expand(true);
            parent.shortcutEditForm.show();
            parent.shortcutEditForm.setTitle("编辑快捷码");
            parent.shortcutEditForm.oper="edit";
            parent.shortcutEditForm.setData(record[0]);
            parent.doLayout();
        }else{
            Ext.Msg.alert('提示','请选择要编辑的记录!');
        }
    },delShortcut:function(){
        var me=this;
        var record=this.getSelectionModel().getSelection();
        if(record.length>0){
            Ext.Msg.show({
                title:'提示',
                msg: '你确认删除此记录?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                scope:this,
                fn:function(bt){
                    if(bt=='yes'){
                        Ext.Ajax.request({
                            url: 'shortcut/del',
                            params: {
                                ids:record[0].data.id
                            },
                            success: function(response){
                                var resp =Ext.decode(response.responseText) ;
                                if(resp.success){
                                    me.parent.shortcutList.getStore().reload();
                                }else{
                                    Ext.Msg.alert('提示',resp.rows);
                                }
                            }
                        });
                    }
                }
            });
        }else{
            Ext.Msg.alert('提示','请选择要删除的记录!');
        }
    }
});

/**
 * Created by tangdu on 14-2-20.
 */
Ext.define('Sys.tool.ShortcutEditForm',{
    extend:'Ext.FormPanel',
    url:'shortcut/add',
    waitTitle:'请稍候....',
    defaults:{
        anchor:'98%'
    },
    frame:true,
    plain:true,
    bodyPadding: 5,
    border:false,
    defaultType:'textfield',
    initComponent:function(){
        this.items=[
            {
                fieldLabel:'快捷名称',
                maxLength:100,
                xtype:'textfield',
                allowBlank:false,
                name:'shortcutName'
            },{
                fieldLabel:'快捷码',
                maxLength:50,
                xtype:'textfield',
                allowBlank:false,
                name:'shortcutCode'
            },{
                fieldLabel:'实例化类',
                maxLength:100,
                xtype:'textfield',
                allowBlank:false,
                name:'shortcutClass'
            },{
                fieldLabel:'状态',xtype:'combo',name:'enabled',store:ipe.store.enabledStore,originalValue:'1',
                displayField:'value',valueField:'key',hiddenName:'enabled',triggerAction:'all',editable:false,queryMode:'local'
            },{
                fieldLabel:'快捷描述',
                maxLength:200,
                xtype:'textarea',
                name:'shortcutDesc'
            },{xtype:'hidden',name:'id'}];

        this.buttons=[{
            text:'保存',
            iconCls:ipe.sty.save,
            scope:this,
            handler:this.saveData
        },{
            text:'取消',
            iconCls:ipe.sty.cancel,
            scope:this,
            handler:this.hide
        }];

        this.callParent();
    },setData:function(record){
        this.loadRecord(record);
    },saveData:function(){
        var me=this;
        if(this.getForm().isValid()){
            if(this.oper=="add"){
                this.getForm().submit({
                    success:function(re){
                        Ext.Msg.alert('提示', '保存成功');
                        me.parent.shortcutList.getStore().load();
                        me.parent.shortcutList.getSelectionModel().deselectAll();
                        me.hide();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('提示', '保存失败');
                    }
                });
            }else if(this.oper=="edit"){
                this.getForm().submit({
                    url:'shortcut/edit',
                    success:function(re){
                        Ext.Msg.alert('提示', '修改成功');
                        me.parent.shortcutList.getStore().load();
                        me.parent.shortcutList.getSelectionModel().deselectAll();
                        me.hide();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('提示', '修改失败');
                    }
                });
            }
        }else{
            Ext.Msg.alert('提示','必填项为空或是输入值受限！');
        }
    }
});

Ext.define('Sys.tool.ShortCutMainPanel',{
    extend:'Ext.Panel',
    layout:{type:'border',align:'stretch'},
    initComponent:function(){
        this.shortcutList=Ext.create('Sys.tool.ShortcutList',{parent:this,region:'center'});
        this.shortcutEditForm=Ext.create('Sys.tool.ShortcutEditForm',{parent:this,region:'east',width:400,hidden:true,split:true});

        this.items=[this.shortcutList,this.shortcutEditForm];
        this.callParent();
    }
});