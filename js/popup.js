function getCurrentTabId(callback) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        if (callback) callback(tabs.length ? tabs[0].id : null);
    });
}

function setRed(tabId) {
    chrome.tabs.executeScript(tabId, {file: 'js/getProductInfo.js'});
}

function get_suffix(filename) {
    let fileArr = filename.split('/');
    return '.' + fileArr[1];
}

class App extends React.Component {
    constructor(props) {
        super(props);
        const propsData = props.all;
        let imageList = propsData.banner.map(function (item, index) {
            if (/^\/\//.test(item)) {
                item = 'https:' + item
            }
            return {check: true, src: item, name: index + 1};
        });
        let detail = propsData.detail.map(function (item, index) {
            if (/^\/\//.test(item)) {
                item = 'https:' + item
            }
            if (item) {
                return {check: true, src: item, name: index + 100};
            }
        }).filter(function (val) {
            return !(!val || val === "");
        });
        let idTxt = [];
        if (propsData.idTxt !== undefined) {
            idTxt = propsData.idTxt.map(function (item, index) {
                return {check: false, src: item.src, name: item.name};
            });
        }
        this.state = {
            imageList: imageList,
            title: propsData.title,
            checkAll: true,
            detailImage: detail,
            checkDetailAll: true,
            price: propsData.price,
            sku: propsData.sku,
            link: propsData.link,
            video: propsData.video,
            idTxt: idTxt,
            checkedIds: [],
            aHref: '#',
            checkIdsAll: false,
        };
        this.handleCheckAll = this.handleCheckAll.bind(this);
        this.handleDetailCheckAll = this.handleDetailCheckAll.bind(this);
        this.download = this.download.bind(this);
        this.exportTxt = this.exportTxt.bind(this);
        this.handleIdsCheckAll = this.handleIdsCheckAll.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);

    }

    handleTitleChange(e) {
        this.setState({title: e.target.value});
    }

    handleIdsCheckAll(e) {
        const idTxt = this.state.idTxt;
        const checked = e.target.checked;
        const checkedIds = idTxt.map(function (item) {
            item.check = e.target.checked;
            return item;
        }).filter(function (item) {
            if (item.check) {
                return item;
            }
        }).map(function (item) {
            return item.name;
        });

        console.log(checkedIds);
        this.setState({idTxt: idTxt, checkIdsAll: checked, checkedIds: checkedIds})
    }

    exportTxt(e) {
        const checkedIds = this.state.checkedIds;
        const text = checkedIds.join(',');
        let blob = new Blob([text], {type: "text/plain;charset=utf-8"});
        saveAs(blob, this.state.title + '.txt');
    }

    handleCheckAll(e) {
        const imageList = this.state.imageList;
        const checked = e.target.checked;
        imageList.map(function (item) {
            item.check = e.target.checked;
            return item;
        });
        this.setState({imageList: imageList, checkAll: checked})
    }

    handleDetailCheckAll(e) {
        const imageList = this.state.detailImage;
        const checked = e.target.checked;
        imageList.map(function (item) {
            item.check = e.target.checked;
            return item;
        });
        this.setState({detailImage: imageList, checkDetailAll: checked})
    }

    download() {
        let linkArr = [];
        const imageList = this.state.imageList;
        imageList.map(function (item) {
            if (item.check) {
                linkArr.push(item.src);
            }
            return item.src;
        });
        let _that = this;
        const detailImage = this.state.detailImage;
        detailImage.map(function (item) {
            if (item.check) {
                linkArr.push(item.src);
            }
            return item.src;
        });
        if (this.state.video && this.state.video !== '') {
            linkArr.push(this.state.video);
        }
        Promise.all(linkArr.map(url =>
            fetch(url).then(resp => resp.blob())
        )).then(blobs => {
            let zip = new JSZip();
            for (let item in blobs) {
                zip.file(String(parseInt(item) + 1) + get_suffix(blobs[item].type), blobs[item], {base64: true});
            }
            zip.generateAsync({type: "blob"}).then(function (content) {
                saveAs(content, _that.state.title + ".zip");
            });
        });
    }

    handleCheckChange(index, e) {
        const imageList = this.state.imageList;
        const checked = e.target.checked;
        imageList.map(function (item, selfIndex) {
            if (index === selfIndex) {
                item.check = checked;
            }
            return item;
        });
        const checkAll = imageList.every(function (item) {
            return item.check;
        });
        this.setState({imageList: imageList, checkAll: checkAll})
    }

    handleDetailCheckChange(index, e) {
        const imageList = this.state.detailImage;
        const checked = e.target.checked;
        imageList.map(function (item, selfIndex) {
            if (index === selfIndex) {
                item.check = checked;
            }
            return item;
        });
        const checkAll = imageList.every(function (item) {
            return item.check;
        });
        this.setState({detailImage: imageList, checkDetailAll: checkAll})
    }

    handleIdsCheckChange(index, e) {
        const idTxt = this.state.idTxt;
        const checkedIds = this.state.checkedIds;
        const checked = e.target.checked;
        console.log(checked);
        let checkedIndex = checkedIds.indexOf(idTxt[index].name);
        idTxt.map(function (item, selfIndex) {
            if (index === selfIndex) {
                item.check = checked;
            }
            return item;
        });
        if (checked) {
            if (checkedIndex === -1) {
                checkedIds.push(idTxt[index].name);
            }
        } else {
            console.log(checkedIndex);
            if (checkedIndex !== -1) {
                checkedIds.splice(checkedIndex, 1);
            }
        }
        this.setState({checkedIds: checkedIds, idTxt: idTxt})
    }

    render() {
        const num = this.state.imageList;
        const list = num.map((item, index) =>
            <div className="col-6" key={item.name}>
                <div className="form-check">
                    <label className="form-check-label">
                        <input type="checkbox" className="form-check-input" checked={item.check}
                               onChange={this.handleCheckChange.bind(this, index)}/>
                        <img src={item.src} alt="" width="100%"/>
                    </label>
                </div>
            </div>
        );

        const detail = this.state.detailImage;
        const detailList = detail.map((item, index) =>
            <div className="col-6" key={item.name}>
                <div className="form-check">
                    <label className="form-check-label">
                        <input type="checkbox" className="form-check-input" checked={item.check}
                               onChange={this.handleDetailCheckChange.bind(this, index)}/>
                        <img src={item.src} alt="" width="100%"/>
                    </label>
                </div>

            </div>
        );

        const idTxt = this.state.idTxt;
        const txtList = idTxt.map((item, index) =>
            <div className="col-6" key={item.name}>
                <label className="form-check-label">
                    <input type="checkbox" className="form-check-input" checked={item.check}
                           onChange={this.handleIdsCheckChange.bind(this, index)}/>
                    <img src={item.src} alt="" width="100%"/>
                </label>
            </div>
        );

        return (
            <div className="App mt-4">
                <div className="container">
                    <div className="form-group row">
                        <label htmlFor="title" className="col-3 col-form-label text-left">标题</label>
                        <div className="col-9">
                            <input value={this.state.title} type="text" id="title" className="form-control"
                                   onChange={this.handleTitleChange}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="price" className="col-3 col-form-label text-left">价格</label>
                        <div className="col-9">
                            <input type="text" value={this.state.price} id="price" className="form-control"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="Freight" className="col-3 col-form-label text-left">运费</label>
                        <div className="col-9">
                            <input type="text" id="Freight" className="form-control"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="Item" className="col-3 col-form-label text-left">货号</label>
                        <div className="col-9">
                            <input type="text" id="Item" className="form-control"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="link" className="col-3 col-form-label text-left">采购链接</label>
                        <div className="col-9">
                            <input type="text" id="link" value={this.state.link} className="form-control"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="similar-link" className="col-3 col-form-label text-left">下图链接</label>
                        <div className="col-9">
                            <input type="text" id="similar-link" className="form-control"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="props" className="col-3 col-form-label text-left">属性</label>
                        <div className="col-9">
                            <textarea id="props" value={this.state.sku} className="form-control">
                            </textarea>
                        </div>
                    </div>

                    <div className="form-check clearfix">
                        <label className="form-check-label float-left h2">
                            <input type="checkbox" className="form-check-input" checked={this.state.checkAll}
                                   onChange={this.handleCheckAll}/>轮播图片
                        </label>
                    </div>
                    <div className="row">
                        {list}
                    </div>
                    <div className="form-check clearfix">
                        <label className="form-check-label float-left h2">
                            <input type="checkbox" className="form-check-input" checked={this.state.checkDetailAll}
                                   onChange={this.handleDetailCheckAll}/>详情图片
                        </label>
                    </div>
                    <div className="row">
                        {detailList}
                    </div>
                    <div className="form-check clearfix">
                        <label className="form-check-label float-left h2">
                            <input type="checkbox" className="form-check-input" checked={this.state.checkIdsAll}
                                   onChange={this.handleIdsCheckAll}/>IDS
                        </label>
                    </div>
                    <div className="row">
                        {txtList}
                    </div>
                    <div className="row pt-3">
                        <div className="col-4 text-left pl-2 ml-4">
                            <button className="btn btn-success btn-sm" onClick={this.download}>下载图片</button>
                        </div>
                        <div className="col-4">
                            <button className="btn btn-success btn-sm" onClick={this.exportTxt}>导出ID</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    let allParam = request;
    ReactDOM.render(
        <App all={allParam}/>
        ,
        document.getElementById('app')
    );
});

getCurrentTabId(setRed);

