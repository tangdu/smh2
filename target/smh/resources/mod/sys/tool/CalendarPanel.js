/**
 * Created by tangdu on 14-2-15.
 */

Ext.define('Sys.tool.CalendarPanel',{
    extend:'Extensible.calendar.CalendarPanel',
    alias : 'widget.calendarpanel',
    activeItem: 3, // month view
    // Any generic view options that should be applied to all sub views:
    viewConfig: {
        //enableFx: false,
        //ddIncrement: 10, //only applies to DayView and subclasses, but convenient to put it here
        //viewStartHour: 8,
        //viewEndHour: 18,
        //minEventDisplayMinutes: 35,
        //showTime: false
    },
    // View options specific to a certain view (if the same options exist in viewConfig
    // they will be overridden by the view-specific config):
    monthViewCfg: {
        showHeader: true,
        showWeekLinks: true,
        showWeekNumbers: true
    },
    multiWeekViewCfg: {
        //weekCount: 3
    },
    // Some optional CalendarPanel configs to experiment with:
    //readOnly: true,
    //showDayView: false,
    //showMultiDayView: true,
    //showWeekView: false,
    //showMultiWeekView: false,
    //showMonthView: false,
    //showNavBar: false,//显示导航条
    showTodayText: false,
    showTime: false,
    editModal: true,
    enableEditDetails: false,//显示编辑详情
    //title: 'My Calendar', // the header of the calendar, could be a subtitle for the app
    initComponent:function(){
        this.eventStore = Ext.create('Extensible.calendar.data.MemoryEventStore', {
            autoMsg: false
        });
        this.calendarStore=Ext.create('Extensible.calendar.data.MemoryCalendarStore', {
        });
        this.callParent();
    }
});