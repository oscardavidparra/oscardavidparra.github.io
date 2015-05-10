progressBar = {
    countElmt : 0,
    loadedElmt : 0,

    init : function(){
        var that = this
        this.countElmt = $('img').length;

        var $progressBarContainer = $('<div/>').attr('id', 'progressbar-container');
        $progressBarContainer.append($('<div/>').attr('id', 'progressbar'));
        $progressBarContainer.appendTo($('body'));

        var $container = $('<div/>').attr('id', 'progressbar-elements');
        $container.appendTo($('body'));

        $('img').each(function(){
            $('<img/>')
                .attr('src', $(this).attr('src'))
                .on('load error', function(){
                    that.loadedElmt++;
                    that.updateProgressBar();
                })
                .appendTo($container);
        });
    },

    updateProgressBar : function(){
        $('#progressbar').stop().animate({
            'width' : (progressBar.loadedElmt/progressBar.countElmt)*100 + '%'
    }, 200, 'linear',function(){
        if(progressBar.loadedElmt == progressBar.countElmt){
                setTimeout(function(){
                    $('#progressbar-container').animate({
                        'top' : '-8px'
                    }, function(){
                        $('#progressbar-container').remove();
                        $('#progressbar-elements').remove();
                    });
                },720);
        }
    });
  }
};
progressBar.init();