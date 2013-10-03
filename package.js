Package.describe({
    summary: "Chart widget using ChartJS"
});

Package.on_use(function(api) {
    
    api.use('standard-app-packages');
    api.use('external-file-loader');
    api.use('session-extras');
    
    api.export('RColor');
    
    api.add_files([
        'client/views/chart.html',
        'client/views/chart.js',
        
        'client/lib/rcolor.js'
        
    ],'client');
    
});