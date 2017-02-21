/**
 * Ext.ux.ButtonsPaging is a specialized toolbar that is bound to a {@link Ext.data.Store} and provides automatic
 * paging control.
 * To navigate pages a set of buttons is created together with "Next" and "Previous" buttons. Styles can be customized
 * using buttons UIs.
 *
 * @author Federico Baron <federico.baron@ibuildings.it>
 * @www https://www.ibuildings.it
 */
Ext.define('Ext.ux.ButtonsPaging', {
    extend: 'Ext.container.Container',
    requires: [
        'Ext.button.Segmented'
    ],
    xtype: 'buttonspagingtoolbar',
    mixins: [
        'Ext.util.StoreHolder'
    ],
    defaultListenerScope: true,

    config: {

        /**
         * @cfg {String} nextText
         * The text for the next button.
         */
        nextText: 'Next',

        /**
         * @cfg {String} previousText
         * The text for the previous button.
         */
        previousText: 'Previous',

        /**
         * @cfg {Number} visiblePages
         * The maximum number of pages to show in the toolbar.
         */
        visiblePages: 10,

        /**
         * @cfg {Object} buttonsConfig
         * Extra button configuration object.
         */
        buttonsConfig: null
    },

    cls: 'buttons-paging-toolbar',

    layout: {
        type: 'hbox',
        pack: 'center'
    },

    defaultBindProperty: 'store',

    items: [{
        xtype: 'segmentedbutton',
        allowMultiple: true,
        listeners: {
            toggle: 'onButtonToggle'
        }
    }],

    initComponent: function () {
        var me = this;
        me.bindStore(me.store || 'ext-empty-store', true);

        me.callParent(arguments);
    },

    createButtons: function () {
        var me = this,
            store = me.store,
            segmented = me.down('segmentedbutton'),
            pagesNum = Math.ceil(store.getTotalCount() / store.pageSize),
            firstPage = Ext.Array.max([1, store.currentPage - Math.floor(me.visiblePages / 2)]),
            lastPage = Ext.Array.min([pagesNum, firstPage + me.visiblePages - 1]),
            buttons = [];

        if ((lastPage - store.currentPage) < (Math.ceil(me.visiblePages / 2) - 1)) {
            firstPage = Ext.Array.max([1, lastPage - me.visiblePages + 1]);
        }

        Ext.suspendLayouts();

        segmented.removeAll();

        if (store.currentPage > firstPage) {
            buttons.push(Ext.merge({
                text: me.previousText,
                itemId: 'page-button-previous',
                pressed: false
            }, me.buttonsConfig || {}));
        }
        for (var pageNum = firstPage; pageNum <= lastPage; pageNum++) {
            buttons.push(Ext.merge({
                text: pageNum,
                itemId: 'page-button-' + pageNum,
                pageNumber: pageNum,
                pressed: store.currentPage == pageNum
            }, me.buttonsConfig || {}));
        }
        if (store.currentPage < lastPage) {
            buttons.push(Ext.merge({
                text: me.nextText,
                itemId: 'page-button-next',
                pressed: false
            }, me.buttonsConfig || {}));
        }

        segmented.add(buttons);

        Ext.resumeLayouts(true);
    },

    onButtonToggle: function (segmented, button, pressed) {
        if (pressed) {
            var store = this.store;
            if (button.getItemId() === 'page-button-next') {
                this.goToPage(Number(store.currentPage) + 1);
                segmented.value = [];
            } else if (button.getItemId() === 'page-button-previous') {
                this.goToPage(Number(store.currentPage) - 1);
                segmented.value = [];
            } else {
                this.goToPage(button.pageNumber);
                segmented.value = [];
            }
        }
    },

    goToPage: function (page) {
        this.store.loadPage(page);
    },

    getStoreListeners: function () {
        return {
            load: this.onLoad,
            clear: this.onClear
        };
    },

    onClear: function (store) {
        store.totalCount = 0;
        store.currentPage = 1;
        if (this.rendered) {
            this.createButtons();
        }
    },

    onLoad: function () {
        if (this.rendered) {
            this.createButtons();
        }
    },

    onBindStore: function () {
        if (this.rendered) {
            this.createButtons();
        }
    },

    setVisiblePages: function (newValue) {
        var oldValue = this.visiblePages;
        if (newValue !== oldValue) {
            this.visiblePages = newValue;
            if (this.rendered) {
                this.createButtons();
            }
        }
    },

    doDestroy: function () {
        this.bindStore(null);
        this.callParent();
    }
});