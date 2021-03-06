Ext.define('svnPatchMaker.resultGridWin', {
    extend: 'Ext.window.Window',
    title: '打包结果',
    maximizable: true,
    modal: true,
    autoScroll: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    width: 1000,
    height: 500,
    initComponent: function(){
        var win = this;
        this.callParent(arguments);
        var filesPanel = Ext.create('Ext.panel.Panel', {
            flex: 2,
            layout: {
                type: 'hbox',
                align: 'stretch'
            }
        });
        var resultFilesGrid = Ext.create('Ext.grid.Panel', {
            title: '原始路径【注：绿色说明文件正常，红色说明不是文件】',
            flex: 1,
            store: Ext.data.StoreManager.lookup('resultstore'),
            viewConfig: {
                stripeRows: true,
                enableTextSelection: true
            },
            columns: [{
                    xtype: 'rownumberer',
                    sortable: false,
                    locked: true
                },
                {
                    xtype: 'hidden',
                    dataIndex: 'isfile'
                },
                {
                    text: '原文件',
                    dataIndex: 'filename',
                    renderer: function(v, meta, r){
                        if(r.get('isfile')){
                            return "<div style='color:green;white-space:normal;word-wrap:break-word;word-break:break-all;'>" + v + "</div>";
                        }else{
                            return "<div style='color:red;white-space:normal;word-wrap:break-word;word-break:break-all;'>" + v + "</div>";
                        }
                    },
                    flex: 1
                }
            ]
        });
        var saveFilesGrid = Ext.create('Ext.grid.Panel', {
            title: '保存路径',
            flex: 1,
            store: Ext.data.StoreManager.lookup('savestore'),
            viewConfig: {
                stripeRows: true,
                enableTextSelection: true
            },
            columns: [{
                    xtype: 'rownumberer',
                    sortable: false,
                    locked: true
                },
                {
                    text: '新文件',
                    dataIndex: 'filename',
                    renderer: function(v, meta, r){
                        return "<div style='white-space:normal;word-wrap:break-word;word-break:break-all;'>" + v + "</div>";
                    },
                    flex: 1
                }
            ]
        });
        filesPanel.add(resultFilesGrid);
        filesPanel.add(saveFilesGrid);
        win.add(filesPanel);
        var msgPanel = Ext.create('Ext.panel.Panel', {
            title: '结果报告',
            flex: 1,
            autoScroll: true,
            viewConfig: {
                stripeRows: true,
                enableTextSelection: true
            },
            html: ''
        });
        win.add(msgPanel);
        win.msgPanel = msgPanel;
    },
    constructor: function(config){
        this.initConfig(config);
        this.callParent(arguments);
    }
});