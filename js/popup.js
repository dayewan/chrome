function getCurrentTabId(callback) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        if (callback) callback(tabs.length ? tabs[0].id : null);
    });
}

function setRed(tabId) {
    chrome.tabs.executeScript(tabId, {file: 'js/getProductInfo.js'});
}

class App extends React.Component {
    constructor(props) {
        super(props);
        const propsData = props.all;
        let imageList = propsData.banner.map(function (item, index) {
            return {check: true, src: item, name: index + 1}
        });
        this.state = {
            imageList: imageList,
            title: propsData.title,
            checkAll: true
        };
        console.log(props);
        this.handleCheckAll = this.handleCheckAll.bind(this);
        this.download = this.download.bind(this);
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

    download() {
        const imageList = this.state.imageList;
        const linkArr = imageList.map(function (item) {
            return item.src;
        });
        Promise.all(linkArr.map(url =>
            fetch(url).then(resp => resp.blob())
        )).then(blobs => {
            let zip = new JSZip();
            for (let item in blobs) {
                console.log(blobs[item]);
                zip.file(String(parseInt(item) + 1) + '.jpg', blobs[item], {base64: true});
            }
            zip.generateAsync({type: "blob"}).then(function (content) {
                saveAs(content, "lll.zip");
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
        return (
            <div className="App mt-4">
                <div className="container">
                    <div className="form-group row">
                        <label htmlFor="title" className="col-3 col-form-label text-left">标题</label>
                        <div className="col-9">
                            <input value={this.state.title} type="text" id="title" className="form-control"/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="price" className="col-3 col-form-label text-left">价格</label>
                        <div className="col-9">
                            <input type="text" id="price" className="form-control"/>
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
                            <input type="text" id="link" className="form-control"/>
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
                            <textarea id="props" className="form-control">
                            </textarea>
                        </div>
                    </div>

                    <div className="form-check clearfix">
                        <label className="form-check-label float-left">
                            <input type="checkbox" className="form-check-input" checked={this.state.checkAll}
                                   onChange={this.handleCheckAll}/>轮播图片
                        </label>
                    </div>
                    <div className="row">
                        {list}
                    </div>
                    <div className="form-check clearfix">
                        <label className="form-check-label float-left">
                            <input type="checkbox" className="form-check-input" checked={this.state.checkAll}
                                   onChange={this.handleCheckAll}/>详情图片
                        </label>
                    </div>
                    <div className="row">
                        {list}
                    </div>
                    <div className="row pt-3">
                        <div className="col-4 text-left pl-2 ml-4">
                            <button className="btn btn-success btn-sm" onClick={this.download}>下载图片</button>
                        </div>
                        <div className="col-4">
                            <button className="btn btn-success btn-sm">下载并保存</button>
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

