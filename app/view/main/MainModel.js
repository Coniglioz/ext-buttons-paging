/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('MyApp.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    stores: {
        personnel: {
            type: 'personnel'
        },
        personnel2: {
            type: 'personnel'
        },
        personnel3: {
            type: 'personnel'
        }
    }
});