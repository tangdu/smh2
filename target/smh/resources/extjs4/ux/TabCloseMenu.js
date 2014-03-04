/**
 * Plugin for adding a close context menu to tabs. Note that the menu respects
 * the closable configuration on the tab. As such, commands like remove others
 * and remove all will not remove items that are not closable.
 */
Ext.define('Ext.ux.TabCloseMenu', {
    alias: 'plugin.tabclosemenu',

    mixins: {
        observable: 'Ext.util.Observable'
    },

    /**
     * @cfg {String} closeTabText
     * The text for closing the current tab.
     */
    closeTabText: 'Close Tab',

    /**
     * @cfg {Boolean} showCloseOthers
     * Indicates whether to show the 'Close Others' option.
     */
    showCloseOthers: true,

    /**
     * @cfg {String} closeOthersTabsText
     * The text for closing all tabs except the current one.
     */
    closeOthersTabsText: 'Close Other Tabs',

    /**
     * @cfg {Boolean} showCloseAll
     * Indicates whether to show the 'Close All' option.
     */
    showCloseAll: true,

    /**
     * @cfg {String} closeAllTabsText
     * The text for closing all tabs.
     */
    closeAllTabsText: 'Close All Tabs',

    /**
     * refreshPage 刷新页面菜单
     * refreable 是否出现刷新菜单
     */
    refreshPage:'刷新页面',
    refreable:true,
    /**
     * @cfg {Array} extraItemsHead
     * An array of additional context menu items to add to the front of the context menu.
     */
    extraItemsHead: null,

    /**
     * @cfg {Array} extraItemsTail
     * An array of additional context menu items to add to the end of the context menu.
     */
    extraItemsTail: null,

    //public
    constructor: function (config) {
        this.addEvents(
            'aftermenu',
            'beforemenu');

        this.mixins.observable.constructor.call(this, config);
    },

    init : function(tabpanel){
        this.tabPanel = tabpanel;
        this.tabBar = tabpanel.down("tabbar");

        this.mon(this.tabPanel, {
            scope: this,
            afterlayout: this.onAfterLayout,
            single: true
        });
    },

    onAfterLayout: function() {
        this.mon(this.tabBar.el, {
            scope: this,
            contextmenu: this.onContextMenu,
            delegate: '.x-tab'
        });
    },

    onBeforeDestroy : function(){
        Ext.destroy(this.menu);
        this.callParent(arguments);
    },

    // private
    onContextMenu : function(event, target){
        var me = this,
            menu = me.createMenu(),
            disableAll = true,
            disableOthers = true,
            refreable=true,
            tab = me.tabBar.getChildByElement(target),
            index = me.tabBar.items.indexOf(tab);

        me.item = me.tabPanel.getComponent(index);
        menu.child('*[text="' + me.closeTabText + '"]').setDisabled(!me.item.closable);

        if (me.showCloseAll || me.showCloseOthers) {
            me.tabPanel.items.each(function(item) {
                if (item.closable) {
                    disableAll = false;
                    if (item != me.item) {
                        disableOthers = false;
                        return false;
                    }
                }

                if (item.refreable) {
                     refreable=false;
                     return false;
                }

                return true;
            });

            if (me.showCloseAll) {
                menu.child('*[text="' + me.closeAllTabsText + '"]').setDisabled(disableAll);
            }

            if (me.showCloseOthers) {
                menu.child('*[text="' + me.closeOthersTabsText + '"]').setDisabled(disableOthers);
            }

           if(me.refreable){
                menu.child('*[text="' + me.refreshPage + '"]').setDisabled(false);
            }
        }

        event.preventDefault();
        me.fireEvent('beforemenu', menu, me.item, me);

        menu.showAt(event.getXY());
    },

    createMenu : function() {
        var me = this;

        if (!me.menu) {
            var items = [{
                text: me.closeTabText,
                scope: me,
                handler: me.onClose
            }];

            if (me.showCloseAll || me.showCloseOthers) {
                items.push('-');
            }

            if (me.showCloseOthers) {
                items.push({
                    text: me.closeOthersTabsText,
                    scope: me,
                    handler: me.onCloseOthers
                });
            }

            if (me.showCloseAll) {
                items.push({
                    text: me.closeAllTabsText,
                    scope: me,
                    handler: me.onCloseAll
                });
            }

            if(me.refreshPage){
                items.push({
                    itemId:'refresh',
                    text:me.refreshPage,
                    scope:me,
                    handler:me.reFresh
                });
            }


            if (me.extraItemsHead) {
                items = me.extraItemsHead.concat(items);
            }

            if (me.extraItemsTail) {
                items = items.concat(me.extraItemsTail);
            }

            me.menu = Ext.create('Ext.menu.Menu', {
                items: items,
                listeners: {
                    hide: me.onHideMenu,
                    scope: me
                }
            });
        }

        return me.menu;
    },

    onHideMenu: function () {
        var me = this;

        me.item = null;
        me.fireEvent('aftermenu', me.menu, me);
    },

    onClose : function(){
        this.tabPanel.remove(this.tabPanel.getActiveTab());
        //this.tabPanel.remove(this.item);
    },

    onCloseOthers : function(){
        this.doClose(true);
    },

    onCloseAll : function(){
        this.doClose(false);
    },

    doClose : function(excludeActive){
        var items = [];
        var item_=this.tabPanel.getActiveTab();

        this.tabPanel.items.each(function(item){
            if(item.closable){
                if(!excludeActive || item != item_){
                    items.push(item);
                }
            }
        }, this);

        Ext.each(items, function(item){
            this.tabPanel.remove(item);
        }, this);
    },

    reFresh:function(){
        var ipeCont=this.tabPanel;
        if(ipeCont){
            //del
            var activeTab=ipeCont.getActiveTab();
            var myMask = new Ext.LoadMask(activeTab.getEl(), {msg:"正在加载..."});
            myMask.show();
            if(activeTab){
                activeTab.removeAll();
            }

            //add
            try{
                var panel=null;
                if(activeTab.menuType=='1'){//类实例
                    panel=Ext.create(
                        activeTab.menuUrl,{
                            bodyPadding: 0,
                            autoScroll: false,
                            parent:ipeCont
                        });
                }else if(activeTab.menuType=='0'){//URL路径
                    panel=Ext.create(
                        'Ext.panel.Panel',{
                            parent:ipeCont,
                            html:"<iframe width='100%' height='100%' frameborder='0' src='"+activeTab.menuUrl+"'></iframe>"
                        });
                }

                activeTab.add(panel);
                activeTab.doLayout();
                ipeCont.setActiveTab(activeTab);
            }catch(e){
                Ext.Msg.alert('提示',"页面不存在或是未完成初始化["+e+"]");
            }finally{
                setTimeout(function(){
                    myMask.hide();
                },1000);
            }
        }
    }
});
