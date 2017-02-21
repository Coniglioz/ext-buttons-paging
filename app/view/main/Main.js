/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('MyApp.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.Window',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.plugin.Responsive',

        'MyApp.view.main.MainController',
        'MyApp.view.main.MainModel',
        'MyApp.store.Personnel',

        'Ext.ux.ButtonsPaging'
    ],

    controller: 'main',
    viewModel: 'main',

    ui: 'navigation',

    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,

    header: {
        layout: {
            align: 'stretchmax'
        },
        title: {
            bind: {
                text: '{name}'
            },
            flex: 0
        },
        iconCls: 'fa-th-list'
    },

    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

    responsiveConfig: {
        tall: {
            headerPosition: 'top'
        },
        wide: {
            headerPosition: 'left'
        }
    },

    defaults: {
        layout: 'fit',
        bodyPadding: 20,
        tabConfig: {
            plugins: 'responsive',
            responsiveConfig: {
                wide: {
                    iconAlign: 'left',
                    textAlign: 'left'
                },
                tall: {
                    iconAlign: 'top',
                    textAlign: 'center',
                    width: 120
                }
            }
        }
    },

    items: [{
        title: 'Ex 1',
        iconCls: 'fa-user',
        items: [{
            xtype: 'grid',
            title: 'Personnel',
            bind: '{personnel}',
            columns: [{
                text: 'Name',
                dataIndex: 'name',
                flex: 1
            }, {
                text: 'Company',
                dataIndex: 'company',
                flex: 1
            }, {
                text: 'Email',
                dataIndex: 'email',
                flex: 1
            }, {
                text: 'Phone',
                dataIndex: 'phone',
                flex: 1
            }],
            dockedItems: [{
                xtype: 'buttonspagingtoolbar',
                dock: 'bottom',
                bind: '{personnel}'
            }]
        }]
    }, {
        title: 'Ex 2',
        iconCls: 'fa-user',
        items: [{
            xtype: 'grid',
            title: 'Personnel',
            bind: '{personnel2}',
            columns: [{
                text: 'Name',
                dataIndex: 'name',
                flex: 1
            }, {
                text: 'Company',
                dataIndex: 'company',
                flex: 1
            }, {
                text: 'Email',
                dataIndex: 'email',
                flex: 1
            }, {
                text: 'Phone',
                dataIndex: 'phone',
                flex: 1
            }],
            dockedItems: [{
                xtype: 'buttonspagingtoolbar',
                dock: 'bottom',
                bind: '{personnel2}',
                nextText: '>',
                previousText: '<',
                buttonsConfig: {
                    scale: 'medium',
                    ui: 'paging'
                }
            }]
        }]
    }, {
        title: 'Ex 3',
        iconCls: 'fa-user',
        items: [{
            xtype: 'grid',
            title: 'Personnel',
            bind: '{personnel3}',
            columns: [{
                text: 'Name',
                dataIndex: 'name',
                flex: 1
            }, {
                text: 'Company',
                dataIndex: 'company',
                flex: 1
            }, {
                text: 'Email',
                dataIndex: 'email',
                flex: 1
            }, {
                text: 'Phone',
                dataIndex: 'phone',
                flex: 1
            }],
            dockedItems: [{
                xtype: 'buttonspagingtoolbar',
                dock: 'bottom',
                bind: '{personnel3}',
                plugins: 'responsive',
                responsiveConfig: {
                    'phone || tall': {
                        nextText: '>',
                        previousText: '<',
                        visiblePages: 5
                    },
                    '!phone && wide': {
                        visiblePages: 10
                    },
                    '!phone && tall': {
                        nextText: '>',
                        previousText: '<',
                        visiblePages: 5
                    }
                }
            }]
        }]
    }]
});