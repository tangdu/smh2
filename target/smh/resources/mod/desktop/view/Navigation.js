/**
 * 导航
 */
Ext.define('Desktop.view.Navigation', {
    alias: 'widget.ipeNavigation',
    extend : 'Ext.panel.Panel',
    region : 'west',
    title : '系统菜单',
    width : 220,
    maxWidth:250,
    minWidth:220,
    autoScroll : false,
    layout : 'accordion',
    collapsible : true,
    layoutConfig : {
        animate : true
    },
    split : true,
    initComponent : function(){

        this.items=[];
        this.makeTreeMenu(ipe.conifg.userMenu);
        this.makeTree(ipe.conifg.userMenu);
        this.callParent();
    },makeTreeMenu:function(menu){
        Ext.each(menu,function(r,i){
            if(r.menu && r.menu.length>0){
                r.children= Ext.clone(r.menu);
                // r.menu=null;
                this.makeTreeMenu(r.children);
            }else{
                Ext.apply(r,{scope:this,handler:this.menuClick});
            }
        },this);
    },makeTree:function(menu){
        //绑定方法
        Ext.each(menu,function(r,i){
            if(r.menu==null|| r.menu.length<1){
            }else{
                var store = Ext.create('Ext.data.TreeStore', {
                    root: {
                        expanded: true,
                        children: r.children
                    },
                    fields:['text','leaf','jsClass',"menuUrl","menuType"]
                });
                var treePanel=Ext.create('Ext.TreePanel',{store:store,rootVisible: false,title:r.text});
                treePanel.on('itemdblclick',this.treeClick,this);
                this.items.push(treePanel);
            }
        },this);
    },treeClick:function(view,record){
        if(record.childNodes.length==0){
            var ts=record.data;
            if(ts.menuUrl){
                var ipeCont=(this.parent.ipeCon);
                var sheetId="Tab_Panel_"+ts.menuUrl+"_"+ts.text;

                var sheet=Ext.getCmp(sheetId);
                //////////////////
                if(sheet){
                    ipeCont.setActiveTab(sheetId);
                }else{
                    Ext.get('loading').update('加载系统组件...');
                    var pcontainer=null;
                    try{
                        if(ts.menuType=='1'){//类实例
                            pcontainer=Ext.create(
                                ts.menuUrl,{
                                    border:false,
                                    parent:this
                                });
                        }else if(ts.menuType=='0'){//URL路径
                            pcontainer=Ext.create(
                                'Ext.panel.Panel',{
                                    border:false,
                                    parent:this,
                                    html:"<iframe width='100%' height='100%' frameborder='0' src='"+ts.menuUrl+"'></iframe>"
                                });
                        }
                    }catch(e){
                        Ext.Msg.alert('提示',"页面不存在或是未完成初始化["+e+"]");
                    }
                    if(pcontainer==null){
                        return;
                    }

                    /////////////
                    var panel=Ext.create('Ext.Panel',{
                        layout:{type:'fit',align:'stretch'},
                        iconCls:ipe.sty.app,
                        closable:true,
                        refreable:true,
                        border:false,
                        frame:true,
                        title:ts.text,
                        menuUrl:ts.menuUrl,
                        menuType:ts.menuType,
                        id:sheetId,
                        items:pcontainer
                    });

                    ipeCont.add(panel);
                    ipeCont.setActiveTab(panel);
                }
            }
        }
    }
});