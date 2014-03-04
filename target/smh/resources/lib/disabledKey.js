/**
 *---------------------------------------------------------------------
 *  Function     : disabled
 *    Version         : 1.0
 *  Date         : 2012-6-15
 *  Descriptions : 禁用屏蔽
 *---------------------------------------------------------------------
 */
//屏蔽鼠标右键  
document.oncontextmenu = function () {
    event.returnValue = false;
};
//屏蔽F1帮助  
window.onhelp = function () {
    return  false;
};
//屏蔽Ctrl+N、Shift+F10、F11、F5刷新、退格键 
document.onkeydown = function () {
    if ((window.event.altKey) &&
        ((window.event.keyCode == 37) ||      //屏蔽  Alt+  方向键  ←
            (window.event.keyCode == 39)))      //屏蔽  Alt+  方向键  →
    {
        alert("不准你使用ALT+方向键前进或后退网页！");
        event.returnValue = false;
    }
    if (                                 //屏蔽退格删除键  CODE=8
    //屏蔽  F5  刷新键  CODE=116
        (event.ctrlKey && event.keyCode == 82)) {  //Ctrl  +  R
        event.keyCode = 0;
        event.returnValue = false;
    }
    if (event.keyCode == 122) {
        event.keyCode = 0;
        event.returnValue = false;
    }    //屏蔽F11
    if (event.keyCode == 123) {
        event.keyCode = 0;
        event.returnValue = false;
    }    //屏蔽F12
    if (event.ctrlKey && event.keyCode == 78)  event.returnValue = false;      //屏蔽  Ctrl+n
    if (event.ctrlKey && event.keyCode == 67) event.returnValue = false;		//屏蔽Ctrl+c
    if (event.ctrlKey && event.keyCode == 65)  event.returnValue = false;     //屏蔽Ctrl+a
    if (event.ctrlKey && event.keyCode == 83)  event.returnValue = false;      //屏蔽  Ctrl+s
    if (event.shiftKey && event.keyCode == 121)event.returnValue = false;    //屏蔽  shift+F10
    if (window.event.srcElement.tagName == "A" && window.event.shiftKey)
        window.event.returnValue = false;                          //屏蔽  shift  加鼠标左键新开一网页
    if (window.event.altKey && window.event.keyCode == 67)event.returnValue = false;
    if ((window.event.altKey) && (window.event.keyCode == 115) || (window.event.keyCode == 18) && (window.event.keyCode == 115))                          //屏蔽Alt+F4
    {
        window.showModelessDialog("about:blank", "", "dialogWidth:1px;dialogheight:1px");
        return  false;
    }
};