function getColor(ctx) {
    if(ctx.chartData && _.isArray(ctx.chartData)) {
        var color = new RColor();
        _.each(ctx.chartData, function(d,i) {
            if(!d.color)
                ctx.chartData[i].color = color.get(true);
        });
    }
}

Template.chartjs.created = function() {
    var ctx = this.data;
    getColor(ctx);
    Meteor.Loader.loadJs('/lib/chartjs/chart.min.js', function() {
        Session.set('hasChartjs', true);
    });
};

Template.chartjs.helpers({
    legend: function() {
        if(this.chartData && !this.chartData.labels)
            return this.chartData;
    }
});

Template.chartjs.rendered = function() {
    var ctx = this && this.data,
        that = this;
    
    if(!ctx)    return;
    
    if(ctx.chartData && _.isArray(ctx.chartData) && ctx.chartData.length && !ctx.chartData[0].color) {
        getColor(ctx);
    }
    
    Session.whenTrue(['hasChartjs'], function() {
        var el = $('#'+ctx.name);
        Meteor.setTimeout(function() {
            if(!ctx.chartCtx && jQuery.contains(document.documentElement, el[0])) {
                ctx.chartCtx = el.get(0).getContext('2d');
                if(!ctx.type)   ctx.type = 'Pie';
                ctx.chart = new Chart(ctx.chartCtx)[ctx.type](ctx.chartData,ctx.chartOptions);
            }
        },250);
    });
};