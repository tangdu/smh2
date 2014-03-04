/**
 * Created by tangdu on 14-2-6.
 */

/**
 * Excel导入模板
 */
Ext.define('Sys.tool.ExlImptplList',{
    extend:'Ext.grid.Panel',
    alias : 'widget.exlImptpllist',
    enableColumnMove : false,
    columnLines : true,
    viewConfig : {
        loadingText : '正在加载代理数据列表',
        scrollOffset:0,
        autoFit: true,
        forceFit:true,
        enableRowBody:true
    },
    border:false,
    pageSize : 20,
    initComponent:function(){
        this.columns=[{xtype: 'rownumberer'},
            {
                header:'模板名称',
                dataIndex:'exlName',
                sortable:true
            },{
                header:'模板编号',
                dataIndex:'exlCode',
                sortable:true
            },{
                header:'映射表名',
                width:200,
                dataIndex:'mappingTable',
                sortable:true,
                renderer:function(val,cttr,record){
                    return val+"("+record.data.tableCot+")";
                }
            },{
                header:'Excel开始行',
                dataIndex:'startrowIndex',
                sortable:true
            },{
                header:'Excel开始列',
                dataIndex:'startcolIndex',
                sortable:true
            },{
                header:'Sheet索引',
                dataIndex:'sheetIndex',
                sortable:true
            },{
                header:'状态',
                dataIndex:'enabled',
                sortable:true,
                width:40,
                renderer:ipe.fuc.enabledDt
            },{
                header:'Excel文件',
                width:150,
                dataIndex:'exlFile'
            },{
                header:'创建日期',
                width:150,
                dataIndex:'createdDate',
                sortable:true
            },{
                header:'备注',
                dataIndex:'remark',
                sortable:true
            }];

        this.tbar=[{
            text:'新增',
            iconCls:ipe.sty.add,
            scope:this,
            handler:this.addExlImptpl
        },{
            text:'编辑',
            iconCls:ipe.sty.edit,
            scope:this,
            handler:this.editExlImptpl
        },{
            text:'删除',
            iconCls:ipe.sty.del,
            scope:this,
            handler:this.delExlImptpl
        },'-',{text:'导入',scope:this,handler:this.impExldata}];

        this.store=Ext.create('Ext.data.JsonStore', {
            proxy: {
                type: 'ajax',
                url: 'exlImptpl/list',
                reader: {
                    root: 'rows'
                }
            },
            remoteSort : true,
            autoLoad:true,
            fields : ['exlName','exlCode','mappingTable','startrowIndex','startcolIndex','sheetIndex','enabled','createdDate','remark','exlFile','tableCot']
        });

        this.bbar=Ext.create('Ipe.PagingToolbar',{
            store:this.store,pageSize:this.pageSize
        });

        this.callParent();
    },addExlImptpl:function(){
        var win=Ext.create('Sys.tool.ExcelImpConfigWin',{parent:this});
        win.show();
    },editExlImptpl:function(){
        var record=this.getSelectionModel().getSelection();
        if(record.length>0){
            var win=Ext.create('Sys.tool.ExcelImpConfigWin',{record:record[0],oper:'edit',parent:this});
            win.show();
        }else{
            Ext.Msg.alert('提示','请选择要编辑的记录!');
        }
    },delExlImptpl:function(){
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
                            url: 'exlImptpl/del',
                            params: {
                                ids:record[0].data.id
                            },
                            success: function(response){
                                var resp =Ext.decode(response.responseText) ;
                                if(resp.success){
                                    me.getStore().load();
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
    },impExldata:function(){
        var record=this.getSelectionModel().getSelection();
        if(record.length>0){
            var win=Ext.create('Sys.tool.ExcelImpWin',{parent:this});
            win.show();
            win.setData(record[0]);
        }else{
            Ext.Msg.alert('提示','请选择要执行导入的记录!');
        }
    }
});
/**
 * 录入表单
 */
Ext.define('Sys.tool.ExlImpEditForm',{
    extend:'Ext.FormPanel',
    url:'exlImptpl/impexcel',
    waitTitle:'请稍候....',
    defaults:{
        anchor:'98%'
    },
    isFileUpload:true,
    frame:true,
    border:false,
    layout:{type:'vbox',align:'stretch'},
    initComponent:function(){
        this.items=[
            {xtype:'fieldset',title:'Excel上传',layout:'column',flex:1,items:[
                {columnWidth:.25,fieldLabel:'Sheet索引',allowBlank:false,xtype:'numberfield',name:'sheetIndex',value:1},
                {columnWidth:.65,fieldLabel:'文件',allowBlank:false,clearOnSubmit:false,xtype:'filefield',buttonText:"浏览",name:'file',anchor:'95%'},
                {columnWidth:.1,xtype:'button',text:'上传',iconCls:ipe.sty.up,handler:this.uploadExcel,scope:this}]},
            {xtype:'fieldset',title:'预览',flex:9,items:[
                {xtype:'container',id:'container-view'}
            ]}];
        this.callParent();
    },uploadExcel:function(){
        var me=this;
        this.getForm().submit({
            //clientValidation: false,
            success:function(a,re){
                Ext.getCmp("container-view").getEl().update("");
                var result=re.result;
                me.collength=result.rows.collength;
                var tables="<table border=1 cellpadding=0 cellspacing = 0>";
                var data=result.rows.data;
                for(i=0;i<data.length;i++){
                    tables+="<tr>";
                    var t=data[i].length;

                    for(j=0;j<me.collength;j++){
                        tables+="<td>"+data[i][j]+"</td>";
                    }
                    tables+="</tr>";
                }
                tables+="</table>";
                Ext.getCmp("container-view").getEl().update(tables);
            },
            failure: function(form, action) {
                Ext.Msg.alert('提示', '导入失败');
            }
        });
    }
});

Ext.define('Sys.tool.ExlImpEditList',{
    extend:'Ext.grid.Panel',
    enableColumnMove : false,
    columnLines : true,
    viewConfig : {
        loadingText : '正在加载列表',
        scrollOffset:0,
        autoFit: true,
        forceFit:true,
        enableRowBody:true
    },
    pageSize : 20,
    plugins:[
        Ext.create('Ext.grid.plugin.CellEditing',{
            clicksToEdit:1
        })
    ],
    initComponent:function(){
        var comboData=[
            ['varchar(2000)','字符类型'],
            ['date','日期类型'],
            ['integer','整数类型'],
            ['double(12,4)','浮点类型']
        ];

        this.columns=[{xtype: 'rownumberer'},{
            header:'Excel索引',
            width:200,
            dataIndex:'exlCol',
            editor:{xtype:'numberfield',maxLength:50}
        },{
            header:'表字段',
            width:250,
            dataIndex:'tableCol',
            editor:{xtype:'textfield',maxLength:30}
        },{
            header:'字段类型',
            width:150,
            dataIndex:'colType',
            editor:new Ext.form.ComboBox({
                store: new Ext.data.SimpleStore({
                    fields:['value','text'],
                    data: comboData
                }),
                emptyText: '请选择',
                hideField:'colType',
                mode: 'local',
                triggerAction: 'all',
                valueField: 'value',
                displayField: 'text',
                editable: false
            })
        },{
            header:'默认值',
            width:150,
            dataIndex:'defValue',
            editor:{}
        },{dataIndex:'id',hidden:true}];

        Ext.define('ExlImpDetails',{
            extend: 'Ext.data.Model',
            fields : ['id','exlCol','defValue','colType','tableCol']
        });
        this.store=Ext.create('Ext.data.JsonStore', {
            proxy: {
                type: 'ajax',
                url: 'exlImptplDetailes/getByTplId',
                reader: {
                    root: 'rows'
                }
            },
            remoteSort : true,
            model:'ExlImpDetails'
        });
        this.tbar=[{text:'添加',iconCls:ipe.sty.add,scope:this,handler:this.addRow},{text:'删除',iconCls:ipe.sty.del,scope:this,handler:this.delRow}];
        this.callParent();
    },addRow:function(){
        var cot=this.getStore().getCount()+1;
        var record=Ext.create('ExlImpDetails',{
            id:'',exlCol:cot,tableCol:'po'+cot,colType:'varchar(2000)',defValue:''
        });
        this.getStore().add(record);
    },delRow:function(){
        Ext.Msg.confirm('提示','确定要删除？',function(btn){
            if(btn=='yes'){
                var sm = this.getSelectionModel().getSelection();
                if(sm.length>0){
                    this.getStore().remove(sm[0]);
                }
            }
        },this);
    }
});

Ext.define('Sys.tool.ExlImptplEditForm',{
    extend:'Ext.FormPanel',
    url:'exlImptpl/add',
    waitTitle:'请稍候....',
    defaults:{
        anchor:'98%'
    },
    isFileUpload:true,
    frame:true,
    border:false,
    oper:'add',
    layout:{type:'vbox',align:'stretch'},
    initComponent:function(){
        this.list=Ext.create('Sys.tool.ExlImpEditList',{flex:.7});
        this.items=[
            {xtype:'fieldset',title:'详细信息',layout:'column',flex:.3,items:[
                {columnWidth:.33,xtype:'container',frame:true,border:false,items:[
                    {
                        fieldLabel:'模板名称',
                        xtype:'textfield',
                        allowBlank:false,
                        originalValue:'2',
                        name:'exlName'
                    },{
                        fieldLabel:'模板编号',
                        xtype:'textfield',
                        allowBlank:false,
                        name:'exlCode'
                    }
                ]},{columnWidth:.33,xtype:'container',frame:true,border:false,layout:'form',items:[
                    {
                        fieldLabel:'状态',
                        xtype:'combo',
                        name:'enabled',
                        store:ipe.store.enabledStore,
                        value:'1',
                        displayField:'value',
                        valueField:'key',
                        hiddenName:'enabled',
                        triggerAction:'all',
                        editable:false,
                        queryMode:'local'
                    },{
                        fieldLabel:'映射表名',
                        xtype:'textfield',
                        allowBlank:false,
                        name:'mappingTable'
                    }
                ]},{columnWidth:.33,xtype:'container',frame:true,border:false,items:[
                    {
                        fieldLabel:'Excel开始行',
                        xtype:'numberfield',
                        value:2,
                        allowBlank:false,
                        name:'startrowIndex'
                    },{
                        fieldLabel:'Excel开始列',
                        xtype:'numberfield',
                        value:1,
                        allowBlank:false,
                        name:'startcolIndex'
                    },{
                        fieldLabel:'Sheet索引',
                        xtype:'hidden',
                        allowBlank:false,
                        name:'sheetIndex'
                    },{
                        fieldLabel:'上传Excel文件名',
                        xtype:'hidden',
                        allowBlank:false,
                        name:'exlFile'
                    }
                ]},{
                    columnWidth:1,
                    fieldLabel:'备注',
                    xtype:'textarea',
                    allowBlank:true,
                    name:'remark'
                },{xtype:'hidden',name:'id'}]},this.list];
        this.callParent();
    },setData:function(record){
        this.loadRecord(record);
    }
});

Ext.define('Sys.tool.ExcelImpConfigWin',{
    extend:'Ext.Window',
    title:'模板设置',
    layout:'card',
    modal:true,
    width:900,
    height:700,
    border:false,
    initComponent:function(){
        this.card1=Ext.create('Sys.tool.ExlImpEditForm');
        this.card2=Ext.create('Sys.tool.ExlImptplEditForm');
        this.items=[this.card1,this.card2];

        this.buttons=['->',
            {text:'保存',iconCls:ipe.sty.save,id:'move-save',disabled:true,handler:this.saveData,scope:this},'-',
            {text:'上一步',handler:this.prevStep,scope:this,id:'move-prev',disabled:true,iconCls:ipe.sty.prev},'-',
            {text:'下一步',handler:this.nextStep,scope:this,id:'move-next',iconCls:ipe.sty.next}];

        this.on('show',this.editShow,this);
        this.callParent();
    },editShow:function(){ //编辑状态
        if(this.oper=="edit"){
            Ext.getCmp('move-save').setDisabled(false);
            Ext.getCmp('move-prev').setDisabled(true);
            Ext.getCmp('move-next').setDisabled(true);
            this.getLayout()['next']();
            this.card2.setData(this.record);
            this.card2.list.getStore().load({params:{tplId:this.record.data.id}});
        }
    },prevStep:function(){
        this.getLayout()['prev']();
        Ext.getCmp('move-save').setDisabled(true);
        Ext.getCmp('move-prev').setDisabled(true);
        Ext.getCmp('move-next').setDisabled(false);
    },nextStep:function(){
        if(this.card1.collength && this.card1.getForm().isValid()){
            this.getLayout()['next']();
            Ext.getCmp('move-save').setDisabled(false);
            Ext.getCmp('move-prev').setDisabled(false);
            Ext.getCmp('move-next').setDisabled(true);
            this.card2.getForm().findField("sheetIndex").setValue(this.card1.getForm().findField("sheetIndex").getValue());
            var file=this.card1.getForm().findField("file").getValue();
            this.card2.getForm().findField("exlFile").setValue(file.substring(file.lastIndexOf("\\")+1));
            /////////////
            if(this.card2.list.getStore().getCount()==0){
                for(i=0;i<this.card1.collength;i++){
                    this.card2.list.addRow();
                }
            }
        }
    },saveData:function(){
        var me=this;
        if(this.card2.list.getStore().getCount()==0){
            return;
        }
        if(this.card2.getForm().isValid()){
            if(this.card2.oper=="add"){
                var details=[];
                var valid=false;
                this.card2.list.getStore().each(function(record){
                    if(record.data.exlCol==""||record.data.tableCol==""){
                        valid=true;
                        Ext.Msg.alert('提示', '数据不能为空');
                        return false;
                    }
                    details.push(record.data);
                },this);

                if(valid){
                    return;
                }
                this.card2.getForm().submit({
                    params:{
                        details:Ext.encode(details)
                    },
                    success:function(re){
                        Ext.Msg.alert('提示', '保存成功');
                        me.close();
                        me.parent.getStore().load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('提示', '保存失败');
                    }
                });
            }else if(this.card2.oper=="edit"){
                this.card2.getForm().submit({
                    url:'exlImptpl/edit',
                    success:function(re){
                        Ext.Msg.alert('提示', '修改成功');
                        me.close();
                        me.parent.getStore().load();
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('提示', '修改失败');
                    }
                });
            }
        }else{
            ipe.FormMsg();
        }
    }
});

Ext.define('Sys.tool.ExcelImpWin',{
    extend:'Ext.Window',
    title:'测试导入数据',
    modal:true,
    width:400,
    height:200,
    waitTitle:'请稍候',
    waitMsg:'正在提交....',
    layout:'fit',
    border:false,
    initComponent:function(){
        this.form=Ext.create('Ext.FormPanel',{
            url:'exlImptpl/impexcelData',
            waitTitle:'请稍候....',
            defaults:{
                anchor:'98%'
            },
            isFileUpload:true,
            frame:true,
            border:false,
            bodyPadding:5,
            items:[
                {fieldLabel:'模板编号',xtype:'textfield',name:'exlCode',readOnly:true,cls:'textReadOnly'},
                {fieldLabel:'Sheet索引',xtype:'textfield',name:'sheetIndex',readOnly:true,cls:'textReadOnly'},
                {fieldLabel:'数据表',xtype:'textfield',name:'mappingTable',readOnly:true,cls:'textReadOnly'},
                {fieldLabel:'文件',xtype:'filefield',buttonText:"浏览",name:'file',clearOnSubmit:false,allowBlank:false},{name:'id',xtype:'hidden'}]
        });
        this.buttons=[{text:'确定',iconCls:ipe.sty.valid,scope:this,handler:this.impData},{text:'取消',iconCls:ipe.sty.cancel,scope:this,handler:this.close}];
        this.items=[this.form];
        this.callParent();
    },setData:function(record){
        this.form.loadRecord(record);
    },impData:function(){
        var me=this;
        if(this.form.getForm().isValid()){
            this.form.getForm().submit({
                success:function(a,r){
                    var result= Ext.decode(r.result.rows)
                    Ext.Msg.alert('提示','导入成功<br>'+'成功条数:'+result.successCot+"<br>失败条数:"+result.failureCot);
                    me.close();
                    me.parent.getStore().load();
                },failure: function(form, action) {
                    Ext.Msg.alert('提示', '修改失败');
                }
            });
        }
    }
});
/**
 * 导入主页面
 */
Ext.define("Sys.tool.ExcelImpMainPanel",{
    extend:'Ext.Panel',
    title:'Excel导入模板设置',
    layout:'fit',
    border:false,
    initComponent:function(){
        this.exlImptplList=Ext.create('Sys.tool.ExlImptplList');

        this.items=[this.exlImptplList];
        this.callParent();
    }
});

/**
 * Excel导出模板
 */
Ext.define("Sys.tool.ExcelExpMainPanel",{
    extend:'Ext.Panel',
    title:'Excel导出模板设置',
    layout:'fit',
    border:false,
    initComponent:function(){
        this.html="采用jxl导出，配置Excel模板";
        this.callParent();
    }
});

Ext.define("Sys.tool.ExcelSetMainPanel",{
    extend:'Ext.Panel',
    border:false,
    layout:{type:'fit',align:'stretch'},
    initComponent:function(){
        this.excelImpMainPanel=Ext.create('Sys.tool.ExcelImpMainPanel');
        this.excelExpMainPanel=Ext.create('Sys.tool.ExcelExpMainPanel');

        this.tabs=Ext.create('Ext.TabPanel',{
            activeTab:0,
            items:[this.excelImpMainPanel,this.excelExpMainPanel]
        });

        this.items=[this.tabs];
        this.callParent();
    }
});




