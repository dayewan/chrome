{
    let host = location.host;
    let pathname = location.pathname;
    let title = pathname;
    let locationHref = location.href;
    let waiwaimallImage = [];
    let idTxt = [];
    let sheInImageArr;
    switch (host) {
        case 'detail.1688.com':
            title = $($('#mod-detail-title').find('h1')[0]).text();
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
                    src = lazyData;
                }
                if (src && !src.match('Flag.gif')) {
                    detailImageList.push(src)
                }
            });
            let originEl = $('#my-origin-data');
            let maxPrice = originEl.data('price')
            let sku = originEl.data('sku');
            let link = location.href;
            chrome.runtime.sendMessage({
                title: title,
                banner: bannerList,
                video: video,
                detail: detailImageList,
                price: maxPrice,
                sku: sku,
                link: link,
            }, function (response) {
                console.log('收到来自后台的回复：' + response);
            });
            break;
        case 'shopthemint.com':
            let shopthemintImageArr = [];
            if (location.pathname.match('product')) {
                $('.MagicToolboxSelectorsContainer a').each(function (item) {
                    shopthemintImageArr.push($(this).attr('href'));
                });
                title = $($('.product-title')[0]).text();
            } else {
                let imgContent = $('#bc-sf-filter-products');
                let shopthemintImage = imgContent.find('img');

                shopthemintImage.each(function (item) {
                    let src = $(this).attr('src');
                    if (src) {
                        if (src.split('?')[0]) {
                            shopthemintImageArr.push(src.split('?')[0]);
                        }
                    }
                });
            }
            chrome.runtime.sendMessage({
                title: title,
                banner: shopthemintImageArr,
                video: '',
                detail: [],
                price: '',
                sku: '',
                link: '',
            }, function (response) {
                console.log('收到来自后台的回复：' + response);
            });
            break;
        case 'oldnavy.gap.com':

            let gapImageArr = [];
            if (pathname.match('category')) {
                let gapImage = $('.product-card-grid').find('img');
                gapImage.each(function (item) {
                    let src = $(this).attr('src');
                    if (src) {
                        gapImageArr.push(src);
                    }
                })
            }
            if (pathname.match('product')) {
                let gapImage = $('.product-photo--container').find('a');
                gapImage.each(function (item) {
                    let src = location.origin + $(this).attr('href');
                    if (src) {
                        gapImageArr.push(src);
                    }
                });
                title = $($('.product-title')[0]).text();
            }
            chrome.runtime.sendMessage({
                title: title,
                banner: gapImageArr,
                video: '',
                detail: [],
                price: '',
                sku: '',
                link: '',
            }, function (response) {
                console.log('收到来自后台的回复：' + response);
            });
            break;
        case 'www2.hm.com':
            let hmImageArr = [];
            if (location.pathname.match('productpage')) {
                let hmImage = $('.pdp-secondary-image img');
                hmImage.each(function (item) {
                    let src = $(this).attr('src');
                    hmImageArr.push(src);
                });
                titel = $($('.product-item-headline')[0]).text();
            } else {
                let hmImage = $('.products-listing img');
                hmImage.each(function (item) {
                    let src = $(this).attr('src');
                    if (!src) {
                        src = $(this).attr('data-src');
                    }
                    hmImageArr.push(src);
                });
                title = location.pathname;
            }
            chrome.runtime.sendMessage({
                title: title,
                banner: hmImageArr,
                video: '',
                detail: [],
                price: '',
                sku: '',
                link: '',
            }, function (response) {
                console.log('收到来自后台的回复：' + response);
            });
            break;
        case 'www.express.com':
            let expressImageArr = [];
            if (pathname.match('/pro/')) {
                let imageList = $('.carousel__image--with-background');
                imageList.each(function (item) {
                    expressImageArr.push($(this).css("backgroundImage").replace('url("', '').replace('")', ''));
                });
                title = $($('.header1')[0]).text();
            } else {
                let expressImage = $('.product img');
                expressImage.each(function (item) {
                    let src = $(this).attr('src');
                    expressImageArr.push(src);
                });
                title = pathname;
            }
            chrome.runtime.sendMessage({
                title: title,
                banner: expressImageArr,
                video: '',
                detail: [],
                price: '',
                sku: '',
                link: '',
            }, function (response) {
                console.log('收到来自后台的回复：' + response);
            });
            break;
        case 'us.shein.com':
            sheInImageArr = [];
            if (pathname.match('-cat-')) {
                let sheInImage = $('.thumbs-wrapper img');
                sheInImage.each(function (item) {
                    let src = $(this).attr('src');
                    if (!src.match('bg-grey')) {
                        sheInImageArr.push(src.replace(/\d*?x\d*?\./, '800x800.'));
                    }
                });
                title = $($('.name')[0]).text().trim();
            } else {
                let sheInImage = $('.j-mgds-goodsl img');
                sheInImage.each(function (item) {
                    if (!$(this).hasClass('j-ga-color-img')) {
                        let src = $(this).attr('src');
                        if (src.match('bg-grey')) {
                            src = 'https://' + $(this).data('src');
                        }
                        sheInImageArr.push(src);
                    }
                });
            }
        case 'ar.shein.com':
            sheInImageArr = [];
            if (pathname.match('-cat-')) {
                let sheInImage = $('.thumbs-wrapper img');
                sheInImage.each(function (item) {
                    let src = $(this).attr('src');
                    if (!src.match('bg-grey')) {
                        sheInImageArr.push(src.replace(/\d*?x\d*?\./, '800x800.'));
                    }
                });
                title = $($('.name')[0]).text().trim();
            } else {
                let sheInImage = $('.j-mgds-goodsl img');
                sheInImage.each(function (item) {
                    if (!$(this).hasClass('j-ga-color-img')) {
                        let src = $(this).attr('src');
                        if (src.match('bg-grey')) {
                            src = 'https://' + $(this).data('src');
                        }
                        sheInImageArr.push(src);
                    }
                });
            }
            chrome.runtime.sendMessage({
                title: title,
                banner: sheInImageArr,
                video: '',
                detail: [],
                price: '',
                sku: '',
                link: '',
            }, function (response) {
                console.log('收到来自后台的回复：' + response);
            });
            break;
        case 'savedbythedress.com':
            let savedbythedressImageArr = [];
            if (pathname.match('products')) {
                let image = $('#product-images img');
                image.each(function () {
                    let src = $(this).attr('src');
                    if (!src.match('soldout')) {

                        if (!src.match('_120x.jpg')) {
                            savedbythedressImageArr.push(src);
                        }
                    }
                });
                savedbythedressImageArr = new Set(savedbythedressImageArr);
                savedbythedressImageArr = [...savedbythedressImageArr];
                $('h1').each(function (item) {
                    if ($(this).attr('itemprop') === 'name') {
                        title = $(this).text();
                    }
                })
            } else {
                let image = $('.product-loop img');
                image.each(function () {
                    let src = $(this).attr('src');
                    if (!src.match('soldout')) {
                        savedbythedressImageArr.push(src);
                    }

                })
            }
            chrome.runtime.sendMessage({
                title: title,
                banner: savedbythedressImageArr,
                video: '',
                detail: [],
                price: '',
                sku: '',
                link: '',
            }, function (response) {
                console.log('收到来自后台的回复：' + response);
            });
            break;
        case 'www.patpat.com':
            let patpatImageArr = [];
            if (pathname.match('product')) {
                let image = $('.img-small-list img');
                image.each(function (item) {
                    src = $(this).attr('src').replace(/\d*?x\d*/, '950x950');
                    patpatImageArr.push(src);
                })
            } else {
                let image = $('.product-list-box img');
                image.each(function (item) {
                    let track = $(this).attr('track');
                    let src;
                    if (track === 'tracked') {
                        src = $(this).attr('src');
                    } else {
                        src = $(this).data('src');
                    }
                    patpatImageArr.push(src);
                })
            }
            chrome.runtime.sendMessage({
                title: title,
                banner: patpatImageArr,
                video: '',
                detail: [],
                price: '',
                sku: '',
                link: '',
            }, function (response) {
                console.log('收到来自后台的回复：' + response);
            });
            break;
        // product-list-box
        case 'kaaum.com':
            let kaaumImageArr = [];
            if (pathname.match('product')) {

            } else {
                let image = $('.grid-uniform img');
                image.each(function (item) {
                    let src = $(this).attr('src');
                    if (!src.match('.svg')) {
                        kaaumImageArr.push(src);
                    }
                });
            }
            chrome.runtime.sendMessage({
                title: title,
                banner: kaaumImageArr,
                video: '',
                detail: [],
                price: '',
                sku: '',
                link: '',
            }, function (response) {
                console.log('收到来自后台的回复：' + response);
            });
            break;
        case 'www.justfashionnow.com':
            let justfashionnowImageArr = [];
            if (pathname.match('product')) {
                let image = $('.no-arrow img');
                image.each(function () {
                    let src = $(this).data('big-src');
                    justfashionnowImageArr.push(src);
                });
            } else {
                let image = $('#productItems img');
                image.each(function (item) {
                    let src = $(this).data('source');
                    if (src) {
                        justfashionnowImageArr.push(src);
                    }

                });
                justfashionnowImageArr = new Set(justfashionnowImageArr);
                justfashionnowImageArr = [...justfashionnowImageArr];
            }
            chrome.runtime.sendMessage({
                title: title,
                banner: justfashionnowImageArr,
                video: '',
                detail: [],
                price: '',
                sku: '',
                link: '',
            }, function (response) {
                console.log('收到来自后台的回复：' + response);
            });
            break;
        case 'www.bellelily.com':
            let bellelilyImageArr = [];
            let image = $('#dirProList img');
            image.each(function (item) {
                let src = $(this).data('original');
                if (src) {
                    bellelilyImageArr.push(src);
                }
            });
            let detailImage = $('.t1 a');
            detailImage.each(function (item) {
                let src = $(this).attr('href');
                bellelilyImageArr.push(src);
            });
            let h1 = $($('h1')[0]);
            if (h1 && !h1.hasClass('title')) {
                title = $($('h1')[0]).text();
            }

            // original
            chrome.runtime.sendMessage({
                title: title,
                banner: bellelilyImageArr,
                video: '',
                detail: [],
                price: '',
                sku: '',
                link: '',
            }, function (response) {
                console.log('收到来自后台的回复：' + response);
            });
            break;
        case 'www.elegchic.com':
            let elegchicImageArr = [];
            if (pathname.match('products')) {
                let image = $('.Product__SlideshowNavScroller img');
                image.each(function (item) {
                    let src = $(this).attr('src').replace('160x', '2000x2000');
                    elegchicImageArr.push(src);
                })
            } else {
                let image = $('#recommend-product-container img');
                image.each(function (item) {
                    let src = $(this).attr('src').replace('150x', '800x');
                    elegchicImageArr.push(src);
                })
            }
            chrome.runtime.sendMessage({
                title: title,
                banner: elegchicImageArr,
                video: '',
                detail: [],
                price: '',
                sku: '',
                link: '',
            }, function (response) {
                console.log('收到来自后台的回复：' + response);
            });
            break;
        case 'www.ivlii.com':
            let ivliiImageArr = [];
            let ivliiImage = $('#dirProList img');
            console.log($('#dirProList img'));
            ivliiImage.each(function (item) {
                let src = $(this).attr('src');
                ivliiImageArr.push(src);
            });
            chrome.runtime.sendMessage({
                title: title,
                banner: ivliiImage,
                video: '',
                detail: [],
                price: '',
                sku: '',
                link: '',
            }, function (response) {
                console.log('收到来自后台的回复：' + response);
            });
            break;
        case 'www.fashionmia.com':
            let fashionmiaImageArr = [];
            if (pathname.match('Products')) {
                let image = $('#small_img a');
                console.log(image);
                image.each(function (item) {
                    let src = $(this).data('mid-src');
                    if (!src.match('blank')) {
                        fashionmiaImageArr.push(src);
                    }
                });
                title = $($('.pro_right_tt')[0]).text();
            } else {
                let image = $('.pt-list img');
                image.each(function (item) {
                    let src = $(this).attr('src');
                    if (!src.match('blank')) {
                        fashionmiaImageArr.push(src);
                    }
                })
            }
            chrome.runtime.sendMessage({
                title: title,
                banner: fashionmiaImageArr,
                video: '',
                detail: [],
                price: '',
                sku: '',
                link: '',
            }, function (response) {
                console.log('收到来自后台的回复：' + response);
            });
            break;
        case 'www.zaful.com':
            let zafulImageArr = [];//js_proList
            let elJsProList = $('#js_proList');
            if (elJsProList.length) {
                let image = $('#js_proList img');
                image.each(function (item) {
                    let src = $(this).attr('src');
                    if (src.match('loadingbg')) {
                        src = $(this).data('original');
                    }
                    zafulImageArr.push(src);
                })
            } else {
                let image = $('.img-thumb li');
                image.each(function (item) {
                    let src = $(this).data('big-img');
                    zafulImageArr.push(src);
                });
                title = $($('.js-goods-title')[0]).text();
            }
            chrome.runtime.sendMessage({
                title: title,
                banner: zafulImageArr,
                video: '',
                detail: [],
                price: '',
                sku: '',
                link: '',
            }, function (response) {
                console.log('收到来自后台的回复：' + response);
            });
            break;
        case 'www.jollychic.com':
            let jollychicImageArr = [];
            if (pathname.match('/p/')) {
                let image = $('.goods-smallImg-content img');
                image.each(function (item) {
                    let src = $(this).attr('mid');
                    jollychicImageArr.push(src);
                });
                title = $($('.goods-title span')[0]).text();
            } else {
                let image = $('#J-pro-list img.firstImg');
                image.each(function (item) {
                    let src = $(this).attr('src');
                    if (src.match('placeholder.gif')) {
                        src = $(this).data('original');
                    }
                    jollychicImageArr.push(src);
                })
            }
            chrome.runtime.sendMessage({
                title: title,
                banner: jollychicImageArr,
                video: '',
                detail: [],
                price: '',
                sku: '',
                link: '',
            }, function (response) {
                console.log('收到来自后台的回复：' + response);
            });
            break;
        case 'www.clubfactory.com':
            let clubfactoryImageArr = [];
            if (pathname.match('product')) {
                let image = $('.el-tabs__header img');
                image.each(function (item) {
                    let src = $(this).attr('src').replace(/_\d*?x\d*?\./, '.');
                    clubfactoryImageArr.push(src);
                });
                title = $($('.product-name')[0]).text();
            } else {
                let image = $('.products div.product-image');
                image.each(function (item) {
                    let src = $(this).css("backgroundImage").replace('url("', '').replace('")', '');
                    clubfactoryImageArr.push(src);
                })
            }
            chrome.runtime.sendMessage({
                title: title,
                banner: clubfactoryImageArr,
                video: '',
                detail: [],
                price: '',
                sku: '',
                link: '',
            }, function (response) {
                console.log('收到来自后台的回复：' + response);
            });
            break;
        case 'item.taobao.com':
            let taobaoImageArr = [];
            let detailImageTaobao = [];
            let taobaoImage = $('#J_UlThumb img');
            taobaoImage.each(function (item) {
                let src = $(this).attr('src').replace(/\d*?x\d*?\./, '800x800.');
                taobaoImageArr.push(src);
            });
            chrome.runtime.sendMessage({
                title: title,
                banner: taobaoImageArr,
                video: '',
                detail: [],
                price: '',
                sku: '',
                link: '',
            }, function (response) {
                console.log('收到来自后台的回复：' + response);
            });
            break;
        case 'www.aliexpress.com':
            let aliexpressImageArr = [];
            if (pathname.match('category')) {
                let image = $('#gallery-item img');
                image.each(function (item) {
                    let src = $(this).attr('src');
                    if (!src) {
                        src = $(this).attr('image-src');
                    }
                    aliexpressImageArr.push(src);
                })
            } else if (pathname.match('/item/')) {
                let image = $('#j-image-thumb-list img');
                image.each(function (item) {
                    let src = $(this).attr('src').replace(/_\d*?x\d*?\./, '.');
                    aliexpressImageArr.push(src);
                });
                let detailImage = $('.description-content img');
                detailImage.each(function (item) {
                    let src = $(this).attr('src');
                    aliexpressImageArr.push(src);
                })
            } else if (pathname.match('/wholesale')) {
                let image = $('.product-list img.item-img');
                console.log(image);
                image.each(function (item) {
                    let src = $(this).attr('src');
                    if (!src) {
                        src = $(this).attr('image-src');
                    }
                    aliexpressImageArr.push(src);
                })
            }
            chrome.runtime.sendMessage({
                title: title,
                banner: aliexpressImageArr,
                video: '',
                detail: [],
                price: '',
                sku: '',
                link: '',
            }, function (response) {
                console.log('收到来自后台的回复：' + response);
            });
            break;
        case 'ww.victoriassecret.com':
            let victoriassecretImageArr = [];
            if (locationHref.match('ProductID')) {
                let image = $('#alt-images img');
                image.each(function (item) {
                    let src = $(this).attr('src').replace(/\/\d*?x\d*?\//, '/760x1013/');
                    victoriassecretImageArr.push(src);
                });
                let fabH5 = $($('.fab-h5')[0]).text();
                title = $('#breadcrumbs').last().find('li:last').text().trim();

            } else {
                let image = $('.products img');
                image.each(function (item) {
                    let src = $(this).attr('src');
                    if (src.match('white.png')) {
                        src = $(this).data('lazy-asset');
                    }
                    victoriassecretImageArr.push(src);
                });
            }
            chrome.runtime.sendMessage({
                title: title,
                banner: victoriassecretImageArr,
                video: '',
                detail: [],
                price: '',
                sku: '',
                link: '',
            }, function (response) {
                console.log('收到来自后台的回复：' + response);
            });
            break;
        case 'www.calvinklein.com':
            let calvinkleinImageArr = [];
            if (pathname.match('/search')) {
                let image = $('#search-result-items img');
                image.each(function (item) {
                    let src = $(this).attr('src');
                    calvinkleinImageArr.push(src);
                })
            } else {
                let image = $('#thumbnails img');
                image.each(function (item) {
                    let src = $(this).attr('src');
                    calvinkleinImageArr.push(src);
                });
                title = $('.breadcrumb').last().find('li:last').text().trim();
            }
            calvinkleinImageArr = new Set(calvinkleinImageArr);
            calvinkleinImageArr = [...calvinkleinImageArr]
            chrome.runtime.sendMessage({
                title: title,
                banner: calvinkleinImageArr,
                video: '',
                detail: [],
                price: '',
                sku: '',
                link: '',
            }, function (response) {
                console.log('收到来自后台的回复：' + response);
            });
            break;
        case 'www.pickaboo.com':
            console.log($('#em-grid-mode img'));
            break;
        case 'bellechloe.com':
            let bellechloeImage = [];
            if (pathname.match('products')) {
                let image = $('.thumbnail-slider img');
                image.each(function (item) {
                    let srcset = $(this).attr('srcset');
                    console.log(srcset);
                    if (srcset) {
                        let srcsetArr = srcset.split(',');
                        let last = 'https:' + srcsetArr[srcsetArr.length - 1].trim();
                        bellechloeImage.push(last);
                    }
                })
            }
            chrome.runtime.sendMessage({
                title: title,
                banner: bellechloeImage,
                video: '',
                detail: [],
                price: '',
                sku: '',
                link: '',
            }, function (response) {
                console.log('收到来自后台的回复：' + response);
            });
            break;
        case 'www.ebay.co.uk':
            let ebayukImage = [];
            if (pathname.match('/itm/')) {
                let image = $('#vi_main_img_fs img');
                image.each(function (item) {
                    let src = $(this).attr('src').replace('s-l64', 's-l800');
                    ebayukImage.push(src);
                })
            }
            chrome.runtime.sendMessage({
                title: title,
                banner: ebayukImage,
                video: '',
                detail: [],
                price: '',
                sku: '',
                link: '',
            }, function (response) {
                console.log('收到来自后台的回复：' + response);
            });
            break;
        case 'www.amazon.com':
            let amazonImage = [];
            if (pathname.match('/product/')) {
                let image = $('#main-image-container img');
                image.each(function (item) {
                    let src = $(this).attr('src').replace(/_SX\d.*?\_/, '_SL1000');
                    amazonImage.push(src);
                })
            }
            if (pathname === '/s') {
                let image = $('.s-result-list img');
                image.each(function (item) {
                    let src = $(this).attr('src').replace(/UL\d.*?\_/, 'UL800_');
                    amazonImage.push(src);
                })
            }
            chrome.runtime.sendMessage({
                title: title,
                banner: amazonImage,
                video: '',
                detail: [],
                price: '',
                sku: '',
                link: '',
            }, function (response) {
                console.log('收到来自后台的回复：' + response);
            });
            break;
        case 'www.waiwaimall.com':
            if (pathname.match('/categories/')) {
                let image = $('.goods-list img');
                image.each(function (item) {
                    let src = $(this).attr('src');
                    let id = $(this).parents('a');
                    let name = '';
                    let query = id.attr('href').split('?')[1].split('&');
                    for (let i in query) {
                        let key = query[i].split('=')[0];
                        let val = query[i].split('=')[1];
                        if (key === 'id') {
                            name = val;
                        }
                    }
                    idTxt.push({
                        name: name,
                        src: src
                    });
                })
            }
            if (pathname.match('/activity')) {
                let image = $('.c-goods-list img');
                image.each(function (item) {
                    let src = $(this).attr('src');
                    let id = $(this).parents('a');
                    let name = '';
                    let query = id.attr('href').split('?')[1].split('&');
                    for (let i in query) {
                        let key = query[i].split('=')[0];
                        let val = query[i].split('=')[1];
                        if (key === 'id') {
                            name = val;
                        }
                    }
                    idTxt.push({
                        name: name,
                        src: src
                    });
                })
            }
            chrome.runtime.sendMessage({
                title: title,
                banner: waiwaimallImage,
                video: '',
                detail: [],
                price: '',
                sku: '',
                link: '',
                idTxt: idTxt
            }, function (response) {
                console.log('收到来自后台的回复：' + response);
            });
            break;
        case 'admin.waiwaimall.com':
            waiwaimallImage = [];
            if (pathname.match('/good')) {
                let tr = $('#example2>tbody>tr');
                tr.each(function (item) {
                    let name = $($(this).find('input[type="checkbox"]')[0]).data('id');
                    let src = $($(this).find('img')[0]).attr('src');
                    idTxt.push({
                        name: name,
                        src: src
                    });
                })
            }
            if (pathname.match('/good/audit')) {
                let goodImages = $('#good-image-list img');
                let skuImages = $('#sku-image img');
                goodImages.each(function (item) {
                    let src = $(this).data('src').split('?')[0];
                    if (src && src !== '') {
                        waiwaimallImage.push(src);
                    }
                });
                skuImages.each(function (item) {
                    let src = $(this).data('src').split('?')[0];
                    if (src && src !== '') {
                        waiwaimallImage.push(src);
                    }
                })
            }
            console.log(waiwaimallImage);
            chrome.runtime.sendMessage({
                title: title,
                banner: waiwaimallImage,
                video: '',
                detail: [],
                price: '',
                sku: '',
                link: '',
                idTxt: idTxt
            }, function (response) {
                console.log('收到来自后台的回复：' + response);
            });
            break;
        default:
            let defaultImageArr = [];
        {
            let image = $('img');
            image.each(function (item) {
                let src = $(this).attr('src');
                defaultImageArr.push(src);
            })
        }
            chrome.runtime.sendMessage({
                title: title,
                banner: defaultImageArr,
                video: '',
                detail: [],
                price: '',
                sku: '',
                link: '',
            }, function (response) {
                console.log('收到来自后台的回复：' + response);
            });
            break;

    }
}
