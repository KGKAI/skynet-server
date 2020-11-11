class Schema {
    uid;    // 用户id
    trackId;    // 标识此错误的唯一id
    timestamp;  // 错误发生时的时间戳
    type;   // 错误的类型
    deviceInfo     // 设备信息
    currentUrl    // 当前出错页面的地址
    refererUrl    // 当前页面是从哪个页面跳转过来的
    pageInfo    // 页面的信息
    appVersion     
    apiVersion
    appId
    
    constructor(options) {
        this.uid = options.uid;
        this.trackId = options.trackId;
        this.timestamp = options.timestamp;
        this.type = options.type;
        this.deviceInfo = options.deviceInfo;
        this.currentUrl = options.currentUrl;
        this.refererUrl = options.refererUrl;
        this.pageInfo = options.pageInfo;
        this.appVersion = options.appVersion;
        this.apiVersion = options.apiVersion;
        this.appId = options.appId;
    }
}

class ErrorSchema extends Schema {
    data;
    constructor(options) {
        super(options)
        this.data = options.data
    }
}

module.exports = ErrorSchema