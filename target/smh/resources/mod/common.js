/**
 * 首文件加载
 * @authr tangdu
 */
Ext.Loader.setConfig({
    enabled : true,
    scriptCharset:'UTF-8',
    //disableCaching:true,
    paths:{
        'Ext.ux' : basePath + '/resources/extjs4/ux',
        'Ipe' : basePath+'/resources/mod',
        'Sys':basePath+'/resources/mod/sys',
        'Bpm':basePath+'/resources/mod/bpm',
        'Pot':basePath+'/resources/mod/portal'
    }
});

/**
 * 分页条
 */
Ext.define('Ipe.PagingToolbar',{
    extend:'Ext.PagingToolbar',
    pageSize:20,
    store:this.store,
    displayInfo:true,
    beforePageText:'第',
    afterPageText:'页- 共{0}页',
    displayMsg:'本页显示{0}-{1}条信息,总共{2}条',
    emptyMsg:'暂无数据',
    scope:this,
    prependButtons:true
});

/**
 *  必填项标识
 */
Ext.form.field.Text.override({
    initComponent:function(){
        if (this.allowBlank === false && this.fieldLabel) {
            this.afterLabelTextTpl = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
        }
        this.callParent();
    }
});

Ext.override(Ext.form.ComboBox,{
    emptyText:'请选择'
})
Ext.override(Ext.form.Labelable,{
    activeErrorsTpl:[
        '<tpl if="errors && errors.length">',
        '<ul class="{listCls}"><tpl for="errors"><li role="alert">{.}</li></tpl></ul>',
        '</tpl>'
    ]
});

//submitEmptyText 不将空值的元素提交-emptyText
Ext.override(Ext.form.action.Submit,{
    submitEmptyText:false
})

/**
 * 全局错误
 **/
Ext.Ajax.on('requestexception', function(conn, response, options) {
    var msg = '访问系统资源时发生异常<br/>' + '异常状态:' + response.status + '('
        + response.statusText + ')<br/>' + '异常信息:'
        + response.responseText;
    console.log(msg);
    Ext.Msg.show({
        title : '系统异常',
        msg : msg,
        width : 400,
        icon : Ext.MessageBox.ERROR,
        buttonText : {
            ok : '&nbsp;&nbsp;提交错误报告&nbsp;&nbsp;'
        },
        buttons : Ext.MessageBox.OKCANCEL
    });
});

Ext.Ajax.on('requestcomplete',function(conn,response,options){
    if(typeof(response.getResponseHeader) != "undefined"){
        var sessionStatus = response.getResponseHeader("sessionStatus");

        if(sessionStatus){
            Ext.Msg.show({
                title : '系统异常',
                msg : '会话超时，请重新登录!',
                width : 400,
                icon : Ext.MessageBox.ERROR,
                buttonText : {
                    ok : '确定'
                },
                buttons : Ext.MessageBox.OK
            });
        }
    }
});

Ext.override(Ext.Window, {
    constrain:true,	// 整个窗体都不能移出浏览器
    constrainHeader:true	// 窗体标题栏不能移出浏览器
});

Ext.override(Ext.data.proxy.Ajax,{
    actionMethods:{create: "POST", read: "POST", update: "POST", destroy: "POST"}
});

Ext.override(Ext.form.field.HtmlEditor,{
    fontFamilies: [
        'Arial',
        'Courier New',
        'Tahoma',
        'Times New Roman',
        'Verdana',
        '宋体'
    ],
    defaultValue:'Arial'
})

/**
 * 系统常量
 * @type {{conifg: {}, fuc: {flagDt: Function}, store: {flagStore: *}}}
 */
var ipe={
    sty:{
        add:'btn_add',
        app:'btn_app',
        branch:'btn_branch',
        bug:'btn_bug',
        calendar:'btn_calendar',
        cancel:'btn_cancel',
        chart:'btn_chart',
        check:'btn_check',
        clear:'btn_clear',
        clock:'btn_clock',
        clock:'btn_clock',
        comment:'btn_comment',
        del:'btn_del',
        down:'btn_down',
        edit:'btn_edit',
        fav:'btn_fav',
        gmail:'btn_gmail',
        help:'btn_help',
        home:'btn_home',
        import:'btn_import',
        info:'btn_info',
        interface:'btn_interface',
        lock:'btn_lock',
        mail:'btn_mail',
        mailadd:'btn_mailadd',
        mailbox:'btn_mailbox',
        maildel:'btn_maildel',
        mailinfo:'btn_mailinfo',
        mailold:'btn_mailold',
        mailompose:'btn_mailompose',
        mailopen:'btn_mailopen',
        mailre:'btn_mailre',
        mails:'btn_mails',
        mailve:'btn_mailve',
        mialwarn:'btn_mialwarn',
        monitor:'btn_monitor',
        mouse:'btn_mouse',
        news:'btn_news',
        next:'btn_next',
        prev:'btn_prev',
        printer:'btn_printer',
        process:'btn_process',
        redo:'btn_redo',
        refresh:'btn_refresh',
        reset:'btn_reset',
        save:'btn_save',
        scriptcode:'btn_scriptcode',
        set:'btn_set',
        start:'btn_start',
        style:'btn_style',
        submit:'btn_submit',
        target:'btn_target',
        Trash:'btn_Trash',
        turn:'btn_turn',
        undo:'btn_undo',
        up:'btn_up',
        user:'btn_user',
        valid:'btn_valid',
        view:'btn_view',
        warn:'btn_warn',
        zoomin:'btn_zoomin',
        zoomout:'btn_zoomout'
    },
    conifg:{
        userMenu:[]
    },
    fuc:{
        downFile:function(filePath){
            if(filePath!=null && filePath!=""){
                filePath=encodeURI(encodeURI(filePath));
                window.location.href=basePath+"/downFile?filePath="+filePath;
            }
        },
        enabledDt:function(val){
            if(val=='0'){
                return '禁用'
            }else{
                return '启用'
            }
        },
        flagDt:function(val){
            if(val=='0'){
                return '否'
            }else{
                return '是'
            }
        },
        menuDt:function(val){
            if(val=='0'){
                return 'URL'
            }else if(val=='1'){
                return 'Component'
            }
        },
        resourceDt:function(val){
            if(val=='0'){
                return 'METHOD'
            }else if(val=='1'){
                return 'URL'
            }
        }
    },
    store:{
        enabledStore:Ext.create('Ext.data.Store',{
            fields:['key','value'],
            proxy: {
                type: "memory"
            },
            data:[{key:'1',value:'启用'},{key:'0',value:'禁用'}]
        }),
        flagStore:Ext.create('Ext.data.Store',{
            fields:['key','value'],
            data:[{key:'1',value:'是'},{key:'0',value:'否'}]
        }),
        menuStore:Ext.create('Ext.data.Store',{
            fields:['key','value'],
            data:[{key:'1',value:'Component'},{key:'0',value:'URL'}]
        }),
        resourceStore:Ext.create('Ext.data.Store',{
            fields:['key','value'],
            data:[{key:'1',value:'URL'},{key:'0',value:'METHOD'}]
        })
    }
}

/**
 * 定义JS
 */
Ext.define("IPE.Combobox",{
    extend:'Ext.form.ComboBox',
    alias : 'widget.ipecombo',
    width:100,
    queryMode: 'local',
    displayField: 'fieldDesc',
    valueField: 'fieldName',
    emptyText:'-请选择-',
    editable:false,
    initComponent:function(){
        this.store=Ext.create('Ext.data.ArrayStore',{
            data:this.data,
            fields: ['fieldName','fieldDesc']
        });
        this.callParent();
    }
});


Ext.define('Desktop.view.UpPwdWin', {
    title : '修改密码',
    plain:true,
    extend:'Ext.Window',
    width : 270,
    height : 200,
    modal:true,
    layout:'fit',
    closeAction:'hide',
    buttonAlign:'center',
    resizable:false,
    border:false,
    initComponent : function() {
        this.form=Ext.create('Ext.form.Panel',{
            labelWidth : 60,
            border:false,
            frame:true,
            url:'user/uppwd',
            bodyStyle:'padding:10px;',
            defaultType: 'textfield',
            items:[
                {fieldLabel:'&nbsp;&nbsp;用 户 名',value:user.userName,name:'userName',disabled:true},
                {fieldLabel:'原 密 码',allowBlank:false,inputType:'password',name:'ouserPwd'},
                {fieldLabel:'新 密 码',allowBlank:false,inputType:'password',name:'userPwd'},
                {fieldLabel:'重复密码',allowBlank:false,inputType:'password',name:'userPwd2'}
            ]
        })

        this.items=[this.form];
        this.buttons = [{
            text : "确定",
            iconCLs:ipe.sty.save,
            handler:this.submitFrom,
            scope : this
        }, {
            text : "关闭",
            scope : this,
            iconCLs:ipe.sty.cancel,
            handler:this.close
        }];

        this.callParent(arguments);
    },
    submitFrom:function(){
        var me=this;
        var uform=this.form.getForm();
        if(uform.isValid()){
            uform.submit({
                success: function(form, action) {
                    var result=action.result;
                    if(result.success){
                        Ext.Msg.alert('提示', '修改成功');
                    }else{
                        Ext.Msg.alert('提示', result.rows);
                    }
                    me.close();
                },
                failure: function(form, action) {
                    Ext.Msg.alert('提示', '修改失败');
                }
            });

        }
    }
});

var pageCom=function (data,sco){
    var id=sco.getId()+"_f";
    var items=[
        {xtype:'ipecombo',data:data,id:id},'-',{
            xtype:'triggerfield',
            selectOnFocus: true,
            parent:sco,
            trigger1Cls: 'x-form-clear-trigger',
            trigger2Cls: 'x-form-search-trigger',
            onTrigger1Click:function(){
                this.setValue("");
            },
            onTrigger2Click: function () {
                var combox=Ext.getCmp(id);
                if(combox){
                    var key=combox.getValue();
                    var params={};
                    params[key]=this.getValue();
                    Ext.apply(sco.getStore().proxy.extraParams,{queryParams:Ext.encode(params)});
                    sco.getStore().load();
                }
            },
            listeners:{
                specialkey:function(f,e){
                    if (e.getKey() == e.ENTER) {
                        this.onTrigger2Click();
                    }
                }
            }
        },'-'];
    return  items;
};

ipe.Msg=function(){
    this.show=function(info){
        var el = Ext.get('app-msg'),
            msgId = Ext.id(),
            content=Ext.get('app-content1'),
            header=Ext.get("app-header1");
        this.msgId = msgId;
        if(typeof info.content!='undefined'&&  info.content && info.content.length>50){
            content.update(info.content.substr(0,50)+"...");
        }else{
            content.update(info.content||"");
        }
        if(typeof info.header!='undefined'&&  info.header && info.header.length>10){
            header.update(info.header.substr(0,10)+"...");
        }else{
            header.update("@"+(info.header||"我的消息"));
        }
        el.setTop(window.innerHeight-el.getStyleSize().height-11);
        el.show();
        Ext.defer(this.hide, 3000, this, [msgId]);
    }
    this.hide=function(msgId){
        if (msgId === this.msgId) {
            Ext.get('app-msg').hide();
        }
    }
    return this;
}();
ipe.Alert=function(){
    this.show=function(title,content){
        var alert=document.getElementById("app-alert");
        if(!alert){
            alert=Ext.core.DomHelper.insertFirst(document.body, {id:'app-alert'}, true);
        }
        var m = Ext.core.DomHelper
            .append(alert,
            {html:'<div class="msg"><h3>' + title + '</h3><p>' + content + '</p></div>'}, true);
        m.slideIn('t').pause(3000).ghost('t', {remove:true});
    }
    return this;
}();
ipe.FormMsg=function(){
    ipe.Alert.show('提示','必填项为空或是输入值受限！');
}

ipe.websocket=function() {
    var webSocket = new WebSocket('ws://localhost:8099/ipe/websocket');

    webSocket.onerror = function (event) {
        onError(event)
    };
    webSocket.onopen = function (event) {
        onOpen(event);

    };
    webSocket.onmessage = function (event) {
        onMessage(event)
    };

    function onMessage(event) {
        ipe.Msg.show({content: event.data});
    }
    function onOpen(event) {
        ipe.Msg.show({content: '连接成功'});
    }
    function onError(event) {
        console.log("ERROR "+event);
    }
    this.sendMsg=function start(msg) {
        webSocket.send(msg||'');
        return false;
    }
    return this;
}();

Ext.define('Image', {
    extend: 'Ext.data.Model',
    fields: [
        { name:'src', type:'string' },
        { name:'caption', type:'string' }
    ]
});

Ext.create('Ext.data.Store', {
    id:'imagesStore',
    model: 'Image',
    data: [
        {  caption:'图画 & 图表' },
        {  caption:'高级数据' },
        {  caption:'检查主题' },
        { caption:'优化性能' }
    ]
});
Ext.define("ShortCut.search.Dropdown", {
    extend: "Ext.view.View",
    alias: "widget.searchdropdown",
    floating: true,
    autoShow: false,
    autoRender: true,
    toFrontOnShow: true,
    focusOnToFront: false,
    overItemCls: "x-view-over",
    trackOver: true,
    itemSelector: "div.item",
    singleSelect: true,
    pageStart: 0,
    pageSize: 10,
    store: Ext.data.StoreManager.lookup('imagesStore'),
    initComponent: function () {
        this.addEvents("changePage", "footerClick");

        this.tpl=new Ext.XTemplate(
            '<tpl for=".">',
            '<div style="border-top:1px #808080 solid;border-left:1px #808080 solid;border-right:1px #808080 solid;width:150px;padding:5px;" >',
            '<div style="">{caption}</div>',
            '<div style="">{caption}</div>',
            '</div>',
            '</tpl>'
        );
        this.on("afterrender", function () {
            this.el.addListener("click", function () {
                this.fireEvent("changePage", this, -1)
            }, this, {preventDefault: true, delegate: ".prev"});
            this.el.addListener("click", function () {
                this.fireEvent("changePage", this, +1)
            }, this, {preventDefault: true, delegate: ".next"});
            this.el.addListener("click", function () {
                this.fireEvent("footerClick", this)
            }, this, {delegate: ".footer"})
        }, this);
        this.callParent()
    }
});

Ext.define("ShortCut.search.Input",{
    extend:'Ext.form.field.Trigger',
    alias: "widget.scutTrigger",
    triggerCls: "btn_clear",
    enableKeyEvents: true,
    hideTrigger: true,
    labelWidth:60,
    fieldLabel:'快捷入口',
    emptyText:'快捷入口',
    width:180,
    initComponent:function(){
        this.on('keyup',this.showView,this);
        this.on('blur',this.hideView,this);
        this.callParent();
    },showView:function(){
        this.view=Ext.create('ShortCut.search.Dropdown');
        this.view.show();
        this.view.alignTo(this, "bl", [0, 1]);
    },hideView:function(){
        if(this.view){
            Ext.Function.defer(this.view.hide, 500, this.view)
        }
    }/*,onTriggerClick:function(){
        this.reset();
        this.focus();
        this.setHideTrigger(true);
    }*/
});