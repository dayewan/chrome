{
    let host = location.host;
    switch (host) {
        case 'detail.1688.com':
            let title = $($('#mod-detail-title').find('h1')[0]).text();
            let bannerEl = $('#dt-tab').find('img');
            let bannerList = [];
            let video = '';
            bannerEl.each(function (item) {
                let itemEl = $(this);
                let src = '';
                if (itemEl.attr('src').match('lazyload')) {
                    src = itemEl.data('lazy-src');
                } else {
                    src = itemEl.attr('src')
                }
                let matchStr = '60x60';
                if (src.match(matchStr)) {
                    src = src.replace(matchStr, '800x800')
                }
                bannerList.push(src);
            });
            let videoEl = $('video.lib-video');
            if (videoEl.length) {
                video = $(videoEl[0]).attr('src');
            }
            let detailImageEl = $('#desc-lazyload-container').find('img');
            let detailImageList = [];
            detailImageEl.each(function (item) {
                let itemEl = $(this);
                let lazyData = itemEl.data('lazyload-src');
                let src = itemEl.attr('src');
                if (lazyData) {
                    detailImageList.push(lazyData)
                } else {
                    detailImageList.push(src)
                }
            });
            chrome.runtime.sendMessage({
                title: title,
                banner: bannerList,
                video: video,
                detail: detailImageList,
            }, function (response) {
                console.log('收到来自后台的回复：' + response);
            });
            break;
        case '':
        default:
    }
}
