window.onload = function () {
    if (location.host === 'detail.1688.com') {
        let detailImageList = $('#de-description-detail').find('img');
        let bannerImage = $('#dt-tab').find('img');
        console.log(detailImageList, bannerImage)
    }
};