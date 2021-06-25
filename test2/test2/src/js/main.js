/**
 * 常用JS变量:
 * agentEvent = 代理模式下自动点击模块
 * acEvent= 无障碍模式下自动点击模块
 * device = 设备信息模块
 * file = 文件处理模块
 * http = HTTP网络请求模块
 * shell = shell命令模块
 * thread= 多线程模块
 * image = 图色查找模块
 * utils= 工具类模块
 * global = 全局快捷方式模块
 * 常用java变量：
 *  context : Android的Context对象
 *  javaLoader : java的类加载器对象
 * 导入Java类或者包：
 *  importClass(类名) = 导入java类
 *      例如: importClass(java.io.File) 导入java的 File 类
 *  importPackage(包名) =导入java包名下的所有类
 *      例如: importPackage(java.util) 导入java.util下的类
 *
 */

var comment_fail = 0

var isDy = 1

var send_contnet_arr = [
"同样是腰间盘，为何你如此突出。同样九年义务教育，为何你如此优秀。",
"让你不多读点书，现在好了，只会说卧槽了吧!",
"你已经是个成熟的评论了要学会自己打破零回复!",
"你再次触犯了银河正义法中不可饶恕之独秀罪，我扁鹊铠甲将剥夺你的一切权利并对你实行扁鹊三连，束手就擒吧!",
"你的笔很不错，但我的笔有它自己的想法。",
"我也想说这样骚的话，可就是想不起来",
"赞",
"nice",
"😄",
"666"
]

var send_contnet_kt = [
"[一起加油]",
"[微笑]",
"[呲牙]",
"[调皮]",
"[灵机一动]",
"[玫瑰]",
"[右边]",
"[礼物]",
"[红包]",
"[凋谢]",
"[西瓜]",
"[太阳]",
"[必胜]",
]
var send_contnet_dm = [
"yu88點vip",
"yu88点vip",
"yu88典vip"
]
var send_contnet_wb = [
"[给力]",
"[爱心]",
"[一起加油]",
"[OK]",
"[玫瑰]",
"][加鸡腿]"
]

function getSendCotnet(arr){
    let index = Math.floor((Math.random()*arr.length));
    return arr[index];
}

function main() {
    //开始再这里编写代码了！！
//    toast("Hello World");
    //如果自动化服务正常
    if (!autoServiceStart(3)) {
        logd("自动化服务启动失败，无法执行脚本")
        exit();
        return;
    }
    logd("开始执行脚本...")
//    home();

//    let packageName = 'com.ss.android.ugc.aweme';

    //快手
    let packageName = 'com.smile.gifmaker';
    isDy = 0

    result = utils.openApp(packageName);

    //启动成功
    if(result == true){
        randomSleep()
//        autoRequestScreenCapture()

        appName = utils.getAppVersionName()
        logd("appName:"+appName)

//--------------------快手-------------------------
//        //快手
//        randomSleep()
//        logd("点击分享~")
//        clickBtnById("com.smile.gifmaker:id/forward_icon")
//        randomSleep()
//        randomSleep()
//
//        logd("点击复制链接~")
//        selectors = id("com.smile.gifmaker:id/share_to_layout")
//        randomSleep()
//        shareBtn = getNodeInfo(selectors,3000);
//        randomSleep()
//        shareBtn[7].click()
//        randomSleep()
//
//        res = utils.setClipboardText("这是~~~")
//        randomSleep()
//        logd("res:"+res)
//        randomSleep()
//
//        randomSleep()
//        ksLink = utils.getClipboardText();
//        randomSleep()
//        logd("ksLink:"+ksLink)

  //-------------------end-快手-------------------------

  //--------------------抖音-------------------------

//        logd("启动成功")
//        randomSleep()
//        logd("先滑几个视频")
//        swipeVd(3)
//        randomSleep()
//
//        logd("进入搜索")
//        searchVideo("欧洲杯")

        logd("滑动视频")
        swipeVd(100)
        randomSleep()

//          //调试
//          getVLinkTadk()

//--------------调试-----------------
//        //调试 关注
//        explodeComentAndGollow()

//        //调试 滚动评论
//        logd("滚动评论，回复评论")
//        swipeComment()

//        //调试 评论
//        doComentTask()
//-------------end-调试-----------------

//        closeApp(packageName)
    }
}

function getVLinkTadk(){
//    //test
//    var fxText_get = ["合拍","动态壁纸","不感兴趣","复制链接","抖音码","帮上热门"]
//    var cp_index = fxText_get.indexOf("复制链接");
//    logd("cp_index:"+cp_index)

    randomSleep()
    logd("点击分享~")
    if(isDy == 1){
        clickBtnById("com.ss.android.ugc.aweme:id/hzr")
    }else{
        clickBtnById("com.smile.gifmaker:id/forward_icon")
    }
    randomSleep()
    randomSleep()
    getVLink()
    randomSleep()
}

function getVLink(){

    if(isDy == 1){
        selectors = id("com.ss.android.ugc.aweme:id/hys");
    }else{
        selectors = id("com.smile.gifmaker:id/title");
    }

    fxText = getText(selectors)
//    logd(typeof(fxText))
//    logd("fxText:"+fxText)
//    fxText_get = JSON.stringify(fxText);
//    logd("fxText_get:"+fxText_get)
//
//    logd("fxText_get.length:"+fxText_get.length)


    var cp_index = fxText.indexOf("复制链接");
    logd("cp_index:"+cp_index)

    if(cp_index != -1){
        logd("有复制链接按钮在位置:"+cp_index)
        logd("点击复制链接~")
        if(isDy == 1){
            selectors = id("com.ss.android.ugc.aweme:id/hyq")
        }else{
            selectors = id("com.smile.gifmaker:id/share_to_layout")
        }
        randomSleep()
        shareBtn = getNodeInfo(selectors,3000);
        randomSleep()
        if(isDy == 0){
            cp_index = cp_index + 1
        }
        shareBtn[cp_index].click()
        randomSleep()
    }else{
        //滑动一屏继续
        logd("滑动直到显示复制链接按钮")
        // 设定坐标，适配全分辨率
        let x = device.getScreenWidth() * 9 / 10;
        let y = device.getScreenHeight() * 9 / 10;
        let x1 = device.getScreenWidth() * 1.5 / 10;
        let y1 = device.getScreenHeight() * 9 / 10;

        //自定义函数：仿真滑动屏幕，注意避开悬浮窗
        if (rndSwipe(x, y, x1, y1, 30, 60, 80)) {
            randomSleep()
        }
        randomSleep()
        getVLink()
    }

    ksLink = utils.getClipboardText();
    randomSleep()
    logd("ksLink:"+ksLink)

    var vlink = httpString(ksLink)[0]
    if (typeof(vlink) == "undefined" || vlink == null){
    }else{
        if(isDy == 1){
            var url = "http://eshen.cc/dyvl.php?v="+vlink;
        }else{
            var url = "http://eshen.cc/ksvl.php?v="+vlink;
        }
        var res = http.httpGetDefault(url, 10 * 1000);
        randomSleep()
    }

    randomSleep()
}

function httpString(s) {
    //var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
    var reg= /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
    s = s.match(reg);
    return(s)
}

function doFollowTask(){
    explodeComentAndGollow()
    randomSleep()
    clickBtnById("com.ss.android.ugc.aweme:id/a7j")
    randomSleep("com.ss.android.ugc.aweme:id/back_btn")
    randomSleep()
}

function explodeComentAndGollow(){
    try{
        var selectors = null
        var tiaoHfBtn = null
        var HFText = null
        randomSleep()
        selectors = id("com.ss.android.ugc.aweme:id/j4u");
        logd("展开回复selectors:"+selectors)
        randomSleep()

        if (typeof(selectors) == "undefined" || selectors == null){
            randomSleep()
            tiaoHfBtn = getNodeInfo(selectors,1000);
        }else{
            HFText = getText(selectors)
            logd("HFText:"+HFText)
            randomSleep()
            if (typeof(HFText[0]) == "undefined" || HFText[0] == null){
                randomSleep()
                tiaoHfBtn = getNodeInfo(selectors,1000);
            }else{
                logd("HFText[0]:"+HFText[0])
                if(HFText[0].search("收起") != -1){
                    tiaoHfBtn = null
                }else{
                    randomSleep()
                    tiaoHfBtn = getNodeInfo(selectors,1000);
                }
            }
        }
        randomSleep()
        logd("tiaoHfBtn:"+tiaoHfBtn)
        if (typeof(tiaoHfBtn) == "undefined" || tiaoHfBtn == null){
            //无N条回复按钮
            //执行关注再返回
            logd("执行此页面用的关注")
            doFollow()
            randomSleep()

            //滑动一屏继续
            logd("滑动一屏继续")
            // 设定坐标，适配全分辨率
            let x = device.getScreenWidth() * 7 / 10;
            let y = device.getScreenHeight() * 8 / 10;
            let x1 = device.getScreenWidth() * 7 / 10;
            let y1 = device.getScreenHeight() * 1.5 / 10;

            //自定义函数：仿真滑动屏幕，注意避开悬浮窗
            if (rndSwipe(x, y, x1, y1, 30, 60, 80)) {
                randomSleep()
            }

            if(checkBottom() == 0){
                logd("没到底部，继续执行")
                explodeComentAndGollow()
            }

        }else{
            tiaoHfBtn[0].click()
            randomSleep()
            explodeComentAndGollow()
        }

    }catch(error){
        logd("error:"+error)
    }
}
function doFollow(){
    randomSleep()
    var selectors = id("com.ss.android.ugc.aweme:id/avatar");
    randomSleep()
    var avatarBtn = getNodeInfo(selectors,1000);
    randomSleep()
    try{
        for(let i=1;i<avatarBtn.length+1;i++){
            logd("点击第:" + i + "个用户")
            avatarBtn[i].click()
            randomSleep()

            logd("随机停留一会")
            randomSleep()
            randomSleep()

            logd("点击关注")
            clickBtnById("com.ss.android.ugc.aweme:id/gsr")
            randomSleep()
            logd("返回")
            clickBtnById("com.ss.android.ugc.aweme:id/back_btn")
            randomSleep()
        }
    }catch(error){
        logd("error:"+error)
    }
}


function checkBottom(){
    isEnd = 1
    try{
        randomSleep()
        var selectors = clz("android.widget.TextView");
        randomSleep()
        var result = getText(selectors);
        randomSleep()
    //    toast("result:"+result);
    //    logd("result:"+result[0])
        lastText = result[result.length-1]
    //    logd(lastText)
        if(lastText.search("暂时没有更多") != -1){
            isEnd = 1
        }else{
            isEnd = 0
        }
    }catch(error){
        logd("error:"+error)
    }
    return isEnd
}

//搜索视频
function searchVideo(keyword){
    try{
        //首页搜索
        randomSleep()
        result = clickBtnById("com.ss.android.ugc.aweme:id/cmi")
        randomSleep()
        result = clickBtnById("com.ss.android.ugc.aweme:id/dsp")
        randomSleep()
        result = clickBtnById("com.ss.android.ugc.aweme:id/dsx")
        randomSleep()
        if(result){
        }else{
            result = clickBtnById("com.ss.android.ugc.aweme:id/d5c")
            randomSleep()
        }

        //不在页界面，在搜索界面
        randomSleep()
        clickBtnById("com.ss.android.ugc.aweme:id/et_search_kw")
        randomSleep()
        logd("输入搜索关键词")
        inputSearchText(keyword);
        randomSleep()
        //点击搜索页搜索按钮
        logd("点击搜索页搜索按钮")
        clickBtnById("com.ss.android.ugc.aweme:id/jzt")
        randomSleep()
        clickBtnById("com.ss.android.ugc.aweme:id/jz7")
        randomSleep()
        clickBtnById(" com.ss.android.ugc.aweme:id/j55")


        randomSleep()
        //点击视频选项
        logd("点击视频选项")
        result = false
        result = clickByIdAndTextName("android:id/text1","视频")
        randomSleep()
        if(result == true){
            logd("点击筛选")
//            result = clickByIdAndTextName("com.ss.android.ugc.aweme:id/d=b","筛选")
            result = clickBtnById("com.ss.android.ugc.aweme:id/d9+");
            randomSleep()
//            result = clickByIdAndTextName("com.ss.android.ugc.aweme:id/d=b","筛选")
            result = clickBtnById("com.ss.android.ugc.aweme:id/d=f");
            randomSleep()
            result = clickBtnById("com.ss.android.ugc.aweme:id/d-g");
            randomSleep()

            if(result){
                //点击最多点赞
                clickByIdAndTextName("com.ss.android.ugc.aweme:id/gdm","最多点赞")
                randomSleep()
                //点击最多点赞
                clickByIdAndTextName("com.ss.android.ugc.aweme:id/gdr","最多点赞")
                randomSleep()
                clickByIdAndTextName("com.ss.android.ugc.aweme:id/ght","最多点赞")
                randomSleep()
                //点击一天内
                clickByIdAndTextName("com.ss.android.ugc.aweme:id/gdm","一天内")
                randomSleep()
                clickByIdAndTextName("com.ss.android.ugc.aweme:id/gdr","一天内")
                randomSleep()
                clickByIdAndTextName("com.ss.android.ugc.aweme:id/ght","一天内")
            }else{
                logd("没有筛选按钮模式")
                randomSleep()
                clickByIdAndTextName("com.ss.android.ugc.aweme:id/cg5","最多点赞")
                randomSleep()
                clickByIdAndTextName("com.ss.android.ugc.aweme:id/cg5","一天内")
                randomSleep()
            }
        }else{
            logd("视频按钮点击失败！")
        }

        randomSleep()
        clickBtnById("com.ss.android.ugc.aweme:id/ksg")
        randomSleep()
        clickBtnById("com.ss.android.ugc.aweme:id/klt")
        randomSleep()
        clickBtnById("com.ss.android.ugc.aweme:id/bgg")
        randomSleep()
        clickBtnById("com.ss.android.ugc.aweme:id/kl6")

        randomSleep()
        clickBtnById("com.ss.android.ugc.aweme:id/bfk")
        randomSleep()
        clickBtnById("com.ss.android.ugc.aweme:id/bfq")
    }catch(error){
        logd("搜索视频失败")
    }
}

//滑动视频
function swipeVd(num){
      //视频大概刷几个
      let pages = 0;
      if(num<10){
         pages = random(1,num);
      }else{
         pages = num;
      }
      logi('视频 ' + pages + '个要刷');
      for (let i = 0; i < pages; i++) {
          try{
            //一页浏览时长
            let times = random(3000, 5000);
            sleep(times);

            if(num>10){
//                logd("点击评论按钮")
//                randomSleep()
//                clickBtnById("com.ss.android.ugc.aweme:id/a6n")
//                randomSleep()
//                clickBtnById("com.ss.android.ugc.aweme:id/a6z")
//                randomSleep()
//                clickBtnById("com.ss.android.ugc.aweme:id/a6=")
//                randomSleep()

                //滚动评论列表，进行评论
//                doComentTask()
//                  doFollowTask()

                //滚动视频，获取链接
                getVLinkTadk()

//                logd("关闭评论")
//                randomSleep()
//                clickBtnById("com.ss.android.ugc.aweme:id/a60")
//                randomSleep()
//                clickBtnById("com.ss.android.ugc.aweme:id/a69")
//                randomSleep()
            }

            // 设定坐标，适配全分辨率
            let x = device.getScreenWidth() * 7 / 10;
            let y = device.getScreenHeight() * 8 / 10;
            let x1 = device.getScreenWidth() * 7 / 10;
            let y1 = device.getScreenHeight() * 1.5 / 10;

            //自定义函数：仿真滑动屏幕，注意避开悬浮窗
            if (rndSwipe(x, y, x1, y1, 30, 60, 80)) {
              randomSleep()
            }
          }catch(error){
            logd("评论失败！")
          }
      }
}
//滑动评论
function swipeComment(){
    //评论刷几页
    let pages = random(1, 3);
    logi('评论 ' + pages + '页要刷');
    for (let i = 0; i < pages; i++) {
        if(comment_fail>3){
            break;
        }
//        //一页浏览时长
//        let times = random(1000, 3000);
//        sleep(times);

        logd('对第 ' + (i + 1) + '页进行回复评论...');

        doComentTask()
        randomSleep()

        // 设定坐标，适配全分辨率
        let x = device.getScreenWidth() * 7 / 10;
        let y = device.getScreenHeight() * 8 / 10;
        let x1 = device.getScreenWidth() * 7 / 10;
        let y1 = device.getScreenHeight() * 4 / 10;

        //自定义函数：仿真滑动屏幕，注意避开悬浮窗
        if (rndSwipe(x, y, x1, y1, 100, 200, 200)) {
            randomSleep()
        }

    }
}
//进行评论
function doComentTask(){
    var result = false;

    var selectors = textMatch("回复").id("com.ss.android.ugc.aweme:id/g5b");
    var hfBtns = getNodeInfo(selectors,1000);
    if (typeof(hfBtns) == "undefined" || hfBtns == null){
        selectors = textMatch("回复").id("com.ss.android.ugc.aweme:id/g5=");
        hfBtns = getNodeInfo(selectors,1000);
    }

    logd("界面回复按钮有："+hfBtns.length);

    randomSleep()
    //一个个回复
    for(let i=1;i<hfBtns.length+1;i++){
        if(comment_fail>3){
            break;
        }
        try{
            logd("点击执行第："+i+"个回复："+hfBtns[i]);
            hfBtns[i].click()

            randomSleep()
            var node = clz("android.widget.EditText").getNodeInfo(3000);
            logd("获取键盘输入框："+node)
            randomSleep()
            send_c = "@" + getSendCotnet(send_contnet_kt)+getSendCotnet(send_contnet_dm)+getSendCotnet(send_contnet_wb);
            logd("获取随机发生内容："+send_c);
            if (node) {
                randomSleep()
                result = node[0].inputText(send_c);
                logd("输入结果:"+result)
//                //调试
//                sleep(100000)
            } else {
                toast("输入结果-无节点:"+node);
            }
            randomSleep()
            clickBtnById("com.ss.android.ugc.aweme:id/a67")
            randomSleep()
            clickBtnById("com.ss.android.ugc.aweme:id/a7c")
            randomSleep()

            //每隔N秒回复一个
            sleep_n = randomNum(3000,10000);
            sleep(sleep_n);
        }catch(error){
            comment_fail += 1
            logd("评论失败")
        }
    }

    return result;
}

function getEmojiRandom(){
    // 定义组件选择器
    let selectors = id("com.ss.android.ugc.aweme:id/b6a").clickable(true);

    // 判断组件是否存在
    if (has(selectors)) {
        // 遍历组件
        var result = getNodeInfo(selectors, 1000);
        if (result.length > 0) {
            // 取随机值
            let num = random(0, result.length);

            // 随机点击一个表情
            if (result[num].click()) {
                logd('已随机发送第 ' + (num + 1) + '个表情')
            }
        }
    } else {
        logd('未找到随机表情');
    }
}

function autoServiceStart(time) {
    for (var i = 0; i < time; i++) {
        if (isServiceOk()) {
            return true;
        }
        var started = startEnv();
        logd("第" + (i + 1) + "次启动服务结果: " + started);
        if (isServiceOk()) {
            return true;
        }
    }
    return isServiceOk();
}


/**
 @description 通过包名启动应用。如果该包名对应的应用不存在，则返回false；否则返回true。
 @version     20201125
 @author      飞云<283054503@qq.com>
 @param       packageName {string} :应用包名
 @param       delay {number} :启动后等待时长，单位毫秒。默认5000
 @param       startNum {number} :重试次数。默认3
 @return      {boolean}:返回是否成功
 */
function launch(packageName, delay, startNum) {
    let result = false;
    if (!delay) {
        delay = 5000;
    }
    if (!startNum) {
        startNum = 3;
    }
    if (utils.isAppExist(packageName)) {
//        if (getRunningPkg() === packageName) {
//            logd('应用已经在前台');
//            result = true;
//        } else {
        logd('启动应用...');

        let selectors = text('允许');
        let num = 0;
        while (num < startNum) {
            if (getRunningPkg() === packageName) {
                logi('启动成功');
                result = true;
                break;
            } else if (has(selectors)) {
                let node = selectors.getOneNodeInfo(1000);
                if (node) {
                    node.click()
                }
            } else {
                utils.openApp(packageName);
                sleep(delay);
                num++;
            }
        }
//        }
    } else {
        loge('应用未安装');
    }
    if (result) {
        logd('应用版本号：' + utils.getAppVersionName(packageName));
    }
    return result;
};

function watchDsp(){
let pages = random(5, 10);   //指定需浏览的视频随机数量
    logi('需浏览 ' + pages + '个视频');
    for (let i = 0; i < pages; i++) {
        let activity = getRunningActivity();
        switch (activity) {
            case 'com.ss.android.ugc.aweme.main.MainActivity':
                let times = random(5000, 10000);  //单个视频浏览时长
                logd('等待 ' + times + '毫秒');
                sleep(times);

                // 设定坐标，适配全分辨率
                let x = device.getScreenWidth() * 7 / 10;
                let y = device.getScreenHeight() * 8 / 10;
                let x1 = device.getScreenWidth() * 7 / 10;
                let y1 = device.getScreenHeight() * 1.5 / 10;

                // 随机滑屏
                let jumpNum = random(1, 5);
                for (let j = 0; j < jumpNum; j++) {
                    if (j != jumpNum - 1) {
                        logd('跳过第 ' + (j + 1) + '屏');
                    }

                    //自定义函数：仿真滑动屏幕，注意避开悬浮窗
                    if (rndSwipe(x, y, x1, y1, 100, 200, 200)) {
                        sleep(3000);
                    }
                }

                logi('浏览第 ' + (i + 1) + '个视频');
                break;
            default:
                break;
        }
    }
}

/**
 @description 初始化截图权限
 @version     20201129
 @author      飞云<283054503@qq.com>
 @return      boolean:返回是否请求成功
 */
function autoRequestScreenCapture() {
    let result = false;

    // 设置图色模块初始化参数，可用于多分辨率兼容
    image.setInitParam({"action_timeout": 1000})

    // 向系统申请屏幕截图权限，返回是否请求成功
    image.requestScreenCapture(10000, 0)
    let node = text('立即开始').getOneNodeInfo(1000);
    if (node) {
        result = node.click();
        sleep(1000);
        logd('已获取截图权限');
    }
    return result;
}

function inputSearchText(sText){
    var node = clz("android.widget.EditText").getOneNodeInfo(10000);
    if (node) {
        logd(node.inputText(sText));
    } else {
        toast("输入搜索-无节点:"+sText);
    }
}

function clickBtnById(cid){
    var result = false;
    //获取选择器对象
    var selector = id(cid);
    result = click(selector);
    if (result) {
//        toast("点击成功");
        result = true;
    }
    return result;
}
function clickBtnByIdIndex(cid,index){
//    var selectors = clz("android.widget.TextView");
//    var selector = id(cid);
//    var result = getText(selector);
//    toast("result:"+result);

    var selector = textMatch("视频").id(cid);
    result = click(selector);
//    var result = getText(selector);
//    toast("result:"+result);

//    var result = false;
//    var selector = id(cid);
//    logd("同名id-selector[1]："+selector[1])
//    result = click(selector[index]);
//    if (result) {
//        result = true;
//    }
//    return result;
}

function clickByIdAndTextName(cid,text_name){
    var result = false;
    var selector = textMatch(text_name).id(cid);
    result = click(selector);
    if (result){
        toast("点击按钮文字-点击成功");
        result = true;
    }
    return result;
}

function getBtnById(cid){
    var btn = clz(cid).getOneNodeInfo(3000);
    logd("getBtnById:"+btn)
    return btn;
}

function getNodeById(cid){
    var node = id(cid).getNodeInfo(3000);
    logd("getNodeById:"+node)
    return node;
}

/* 获取随机整数 */
function randomNum(m,n){
    var num = Math.floor(Math.random()*(m - n) + n);
    return num;
}

function randomSleep(){
    sleep_n = randomNum(1000,1500);
    sleep(sleep_n);
}

//(仿真滑动)qx, qy, zx, zy, time 代表起点x,起点y,终点x,终点y,times,timess =随机时间(times,timess)
function rndSwipe(qx, qy, zx, zy, time1, time2, times) {
    var ti
    ti = random(time1, time2)
    return gesture(_rndSwipe(qx, qy, zx, zy), ti, times)
}

//(二指仿真滑动) qx, qy, zx, zy, time 代表起点x,起点y,终点x,终点y,times,timess =随机时间(times,timess)
function rndSwipeTwo(qx, qy, zx, zy, time, time1, times) {
    var x = [], ti
    ti = random(time, time1)
    x.push(rndSwipe(qx, qy, zx, zy), rndSwipe(qx, qy, zx, zy))
    return gestureTwo(x, ti, times)
}



function bezier_curves(cp, t) {
    var cx, bx, ax, cy, by, ay, tSquared, tCubed, result
    cx = 3.0 * (cp[1].x - cp[0].x);
    bx = 3.0 * (cp[2].x - cp[1].x) - cx;
    ax = cp[3].x - cp[0].x - cx - bx;
    cy = 3.0 * (cp[1].y - cp[0].y);
    by = 3.0 * (cp[2].y - cp[1].y) - cy;
    ay = cp[3].y - cp[0].y - cy - by;

    tSquared = t * t;
    tCubed = tSquared * t;
    result = {
        "x": 0,
        "y": 0
    }
    result.x = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x;
    result.y = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y;
    return result;
}


function _rndSwipe(qx, qy, zx, zy) {
    var time1, xxy, point, dx0, dx1, dx2, dx3, xxyy, xxxy = []

    xxy = [];
    point = [];
    dx0 = {
        "x": random(qx, qx + 50),
        "y": random(qy, qy + 50)
    }

    dx1 = {
        "x": random(qx - 100, qx + 100),
        "y": random(qy, qy + 50)
    }
    dx2 = {
        "x": random(zx - 100, zx + 100),
        "y": random(zy, zy + 50),
    }
    dx3 = {
        "x": zx,
        "y": zy
    }

    for (var i = 0; i < 4; i++) {
        eval("point.push(dx" + i + ")");
    }

    for (let i = 0; i < 1; i += 0.08) {
        xxyy = [parseInt(bezier_curves(point, i).x), parseInt(bezier_curves(point, i).y)]
        xxy.push(xxyy);
    }
    return xxy
}


function gesture(swipeList, time, time1) {
    var touch1, touch2, x, i
    touch1 = [{"action": 0, "x": swipeList[0][0], "y": swipeList[0][1], "pointer": 1, "delay": time}]

    for (i in swipeList) {
        ++i;
        if (i === swipeList.length - 2) {
            break;
        }

        touch1.push({"action": 2, "x": swipeList[i][0], "y": swipeList[i][1], "pointer": 1, "delay": time});

    }
    touch1.push({
        "action": 1,
        "x": swipeList[swipeList.length - 1][0],
        "y": swipeList[swipeList.length - 1][1],
        "pointer": 1,
        "delay": time
    })

    return multiTouch(touch1, null, null, time1);
    // logd('仿真滑动:' + x);
}

function gestureTwo(swipeList, time, time1) {
    var swipe = swipeList[0]
    var swipe1 = swipeList[1]

    var touch1, touch2, x, i
    touch1 = [{"action": 0, "x": swipe[0][0], "y": swipe[0][1], "pointer": 1, "delay": time}]
    touch2 = [{"action": 0, "x": swipe1[0][0], "y": swipe1[0][1], "pointer": 2, "delay": time}]
    for (i in swipe) {
        ++i;
        if (i === swipe.length - 2) {
            break;
        }
        touch1.push({"action": 2, "x": swipe[i][0], "y": swipe[i][1], "pointer": 1, "delay": time});
        touch2.push({"action": 2, "x": swipe1[i][0], "y": swipe1[i][1], "pointer": 2, "delay": time});
    }
    touch1.push({
        "action": 1,
        "x": swipe[swipe.length - 1][0],
        "y": swipe[swipe.length - 1][1],
        "pointer": 1,
        "delay": time
    })
    touch2.push({
        "action": 1,
        "x": swipe1[swipe1.length - 1][0],
        "y": swipe1[swipe1.length - 1][1],
        "pointer": 2,
        "delay": time
    })

    return multiTouch(touch1, touch2, null, time1);

    // logd('仿真滑动:' + x);
}

//qx, qy, zx, zy, time 代表起点x,起点y,终点x,终点y,times,timess =随机时间(times,timess)
// rndSwipe(600,1800,300,400,30,100,500)

function closeApp(packageName) {
    //打开设置详情页
    utils.openActivity({
        "action": "android.settings.APPLICATION_DETAILS_SETTINGS",
        "uri": "package:" + packageName
    });
    sleep(3000);
    var selector = textMatch(".*强.*|.*停.*|.*结.*|.*行.*");
    logd("关闭任务：" + selector);
    click(selector);
    sleep(3000);
    var definiteSelector = textMatch(".*确定.*");
    var result = click(definiteSelector);
    if (result) {
        toast("关闭成功")
    }
    sleep(3000);
}

main();