
Ext.define('Sys.resource.ResourceChoosePanel',{
    //title:'资源列表',
    region:'center',
    extend:'Ext.tree.Panel',
    animate: true,
    rootVisible: false,
    multiSelect: true,
    singleExpand: true,
    useArrows: true,
    initComponent:function(){
        this.store= Ext.create('Ext.data.TreeStore', {
            //nodeParam:'pid',
            autoLoad:true,
            model:'Sys.model.ResourceModel',
            folderSort: true,
            remoteSort:true,
            root: {
                text: '根节点',
                id:'root',
                expanded: true
            },
            listeners:{
                'beforeload':function(store,oper){
                    var record=oper.node.data;
                    if(record.id!='root'){
                        oper.params.pid=record.id;
                    }
                }
            }
        });

        this.columns=[{xtype: 'rownumberer'},{
            text:'资源名称',dataIndex:'resourceName',xtype:'treecolumn',width:300
        },{
            text:'资源类型',dataIndex:'resourceType',renderer:ipe.fuc.resourceDt
        },{
            text:'资源路径',dataIndex:'resourceUrl',width:300
        }];
        this.callParent();
    }
});


Ext.define('Sys.resource.ResourceChooseWin',{
    extend:'Ext.Window',
    layout:'fit',
    width:500,
    height:400,
    initComponent:function(){
        this.menuTree=Ext.create('Sys.resource.ResourceChoosePanel',{parent:this});
        this.items=[this.menuTree];

        this.buttons=[{
            text:'确定',
            iconCls:'btn-Save',
            scope:this,
            handler:this.saveData
        },{
            text:'取消',
            iconCls:'btn-Cancel',
            scope:this,
            handler:this.close
        }];
        this.callParent();
    },
    saveData:function(){
        if(this.nameField && this.valueField){
            var records=this.menuTree.getSelectionModel().getSelection();
            if(records.length>0){
                this.nameField.setValue(records[0].data.resourceName);
                this.valueField.setValue(records[0].data.id);
                this.close();
            }else{
                Ext.Msg.alert('提示','请选择记录!');
            }
        }
    }
});