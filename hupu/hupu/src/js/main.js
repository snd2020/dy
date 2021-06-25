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
var emoji_arr = new Array("😀","😃","😄","😁","😆","🤣","🙃","😉","😊","🥰","😍","🤩","😘","😗","☺","😚","😋","🤑","🤭","🥳","😎","🙊");
var send_contnet_arr = new Array("福⚽利【yu555.vip】","存❤送【yu999.vip】");

var send_limit = 0;
var send_fail_num = 0;

function getSendCotnet(arr){
    let index = Math.floor((Math.random()*arr.length));
    return arr[index];
}

function main() {
    //如果自动化服务正常
    if (!autoServiceStart(3)) {
        logd("自动化服务启动失败，无法执行脚本")
        exit();
        return;
    }
//    //自动执行
//    msgTask()

    //手动执行
    var packageName = 'com.hupu.games';
    result = utils.openApp(packageName);
    //启动应用，等待几秒
    sleep_n = randomNum(3000,5000);
    sleep(sleep_n);

    logd("滚动评论，逐个私信用户")
    swipeComment()

//    //调试
//    sendMessage()
//
//    //关注
//    res = guanzhu()

}
function guanzhu(){
    res = 1
    randomSleep()
    var selectors = id("com.hupu.games:id/tv_follow");
    var guanzhu_text = getText(selectors)
    logd("guanzhu_text:"+guanzhu_text)

    randomSleep()
    var selectors = id("com.hupu.games:id/myhome_nick_name");
    var nick_name = getText(selectors)
    logd("nick_name:"+nick_name)
    randomSleep()

    var url = "http://eshen.cc/hp.php?n="+nick_name;
    var res = http.httpGetDefault(url, 10 * 1000);
    randomSleep()

    if(guanzhu_text == "已关注" || res == 1){
        logd("已入库过")
    }else{
        randomSleep()
        res = clickBtnById("com.hupu.games:id/layout_follow")
        logd("关注成功:"+res)
        randomSleep()
        res = 1
    }

    logd("点击返回评论列表");
    clickBtnById("com.hupu.games:id/rl_back")
    randomSleep()

    return res
}

function msgTask(){
    var packageName = 'com.hupu.games';
    result = utils.openApp(packageName);
    //启动应用，等待几秒
    sleep_n = randomNum(5000,8000);
    sleep(sleep_n);
    //启动成功
    if(result == true){
        randomSleep()
        logd("开始执行任务...")
        rebang_task()
        logd("退出app...")
        closeApp(packageName)
    }

//    sleep_n = randomNum(1000*60*15,1000*60*60);
//    logd(sleep_n+"秒后，重复执行")
//    sleep(sleep_n);
//
//    msgTask()
}

function clikeShouye(){
    randomSleep()
    result = clickByIdAndTextName("com.hupu.games:id/tv_tab","首页")
    randomSleep()
}

function clikeMe(){
    randomSleep()
    result = clickByIdAndTextName("com.hupu.games:id/tv_tab","我的")
    randomSleep()
}
function clikeMsgAndBack(){
    randomSleep()
    clickBtnById("com.hupu.games:id/menu_msg")
    logd("点击我的-消息，随机停止几秒，退回我的界面")
    sleep_n = randomNum(3500,6000);
    sleep(sleep_n);
    clickBtnById("com.hupu.games:id/message_btn_back")
    randomSleep()
}

function rebang_task(){
    //点击热榜
    randomSleep()
    randomSleep()
    randomSleep()
    logd("点击热榜")
    result = false
    result = clickByIdAndTextName("com.hupu.games:id/tv_tab_title","热榜")
    randomSleep()
    randomSleep()
    result = clickByIdAndTextName("com.hupu.games:id/tv_tab_title","足球")
    randomSleep()

    for (let i = 0; i < 15; i++) {
        if(send_limit == 1){
            break;
        }
        logd("一屏屏滚动热榜")
        swipePage(1.5)
        randomSleep()
        logd("执行热榜评论用户私信任务...")
        do_rebang_coment_task()
    }

    clikeMe()

    clikeMsgAndBack()

    clikeShouye()

}

function swipeRebang(){
    randomSleep()
    var selectors = id("com.hupu.games:id/ll_bottom_comment");
    randomSleep()
    if (typeof(selectors) == "undefined" || selectors == null){
        logd("热榜页面里没有评论按钮，上滑页面")
        swipePage(1.5)

        randomSleep()
        swipeRebang()
        randomSleep()
    }else{
        logd("点击热榜评论按钮")
        clickBtnById("com.hupu.games:id/ll_bottom_comment")
    }
}

function do_rebang_coment_task(){
    logd("滚动热榜,点击评论按钮")
    swipeRebang()

    sleep_n = randomNum(35000,50000);
    logd("等待 "+sleep_n+" 秒，等顶部广告栏消失")
    sleep(sleep_n);

    logd("评论按最晚回复排序")

    let x1 = device.getScreenWidth() * 9 / 10;
    let y1 = device.getScreenHeight() * 1.5 / 10;
    logd("最晚回复点坐标为：x1:"+x1+" y1:"+y1)
    clickPoint(x1,y1)
    randomSleep()

    randomSleep()
    clickByIdAndTextName("com.hupu.games:id/report_text","最晚回复")
    randomSleep()

    logd("滚动评论，逐个私信用户")
    swipeComment()

    logd("从某热评里返回首页")
    randomSleep()
    clickBtnById("com.hupu.games:id/btn_back")
    randomSleep()
    clickBtnById("com.hupu.games:id/btn_back_video")
    randomSleep()
    clickBtnById("com.hupu.games:id/rl_back")
    randomSleep()
    clickBtnById("com.hupu.games:id/btn_back_video")
    randomSleep()
}

function swipeComment(){
    try{
        //评论刷几页
        var selectors = id("com.hupu.games:id/bottombar_page_num");
        var comment_p = getText(selectors)

        if(comment_p){
            pages = comment_p[0].split("/")[1];
            current_p = comment_p[0].split("/")[0];
        }
        logi('评论总共有 ' + pages + ' 页');

        // 设定坐标，适配全分辨率
        let x = device.getScreenWidth() * 5 / 10;
        let y = device.getScreenHeight() * 8 / 10;
        let x1 = device.getScreenWidth() * 5 / 10;
        let y1 = device.getScreenHeight() * 1 / 10;

        //自定义函数：仿真滑动屏幕，注意避开悬浮窗
         randomSleep()
        logd('对第 ' + current_p + ' 页进行回复评论...');
//        doComentTask("com.hupu.games:id/iv_head")
        doComentTask("com.hupu.games:id/cl_root_reply_view")
        randomSleep()

        logi('私信完本页用户，滑动下一页');
        rndSwipe(x, y, x1, y1, 30, 60, 80)
        randomSleep()
        rndSwipe(x, y, x1, y1, 30, 60, 80)
        randomSleep()

//        if(current_p < pages){
//            if(send_limit == 0){
//                swipeComment()
//            }
//        }
        //手动停止
        swipeComment()
    } catch (error) {
        toast("刷评论失败："+error)
        logd('刷评论失败：'+error);
    }

}
//rate 1.5 全屏  6 半屏
function swipePage(rate){
      logd("滑屏~")
      //一页浏览时长
      let times = random(1000, 1500);
      sleep(times);

      // 设定坐标，适配全分辨率
      let x = device.getScreenWidth() * 5 / 10;
      let y = device.getScreenHeight() * 8 / 10;
      let x1 = device.getScreenWidth() * 5 / 10;
      let y1 = device.getScreenHeight() * rate / 10;

      logd("x："+x+" y："+y+" x1："+x1+" y1："+y1)

      //自定义函数：仿真滑动屏幕，注意避开悬浮窗
      if (rndSwipe(x, y, x1, y1, 30, 60, 80)) {
          randomSleep()
      }
 }


function doComentTask(cid){
    var result = true;
    var selectors = id(cid);
    var hfBtns = getNodeInfo(selectors,1000);

    logd("用戶头像按钮有："+hfBtns.length);

    randomSleep()
    //一个个回复
    for(let i=1;i<hfBtns.length+1;i++){
        logd("点击第："+i+"个头像："+hfBtns[i]);
        if(send_limit == 1){
            break;
        }
        try{
//            hfBtns[i].click()

            let x1 = device.getScreenWidth() * 1 / 10;
            let py = (device.getScreenHeight() / 10) * 0.5;
            let y1 = hfBtns[i].bounds.top+py;
            clickPoint(x1,y1)
            randomSleep()

//            logd("私信此用户")
//            res = sendMessage()
//            if(res == 0){
//                return false;
//            }

            logd("关注此用户")
            res = guanzhu()
            if(res == 0){
                return false;
            }

        } catch (error) {
            toast("点击头像报错："+error)
            logd('点击头像报错：'+error);
        }
    }

    return result;
}

function sendMessage(){
    res = 0
    do_send = 1
    logd("点击私信按钮")
    randomSleep()
    clickBtnById("com.hupu.games:id/btn_to_msg")
    randomSleep()

   //获取用户名称
   var selectors = id("com.hupu.games:id/txt_title");
//    logd("selectors:"+selectors)
   var user = getText(selectors)
   user_name = user[0]
   if(user_name.indexOf("虎扑") != -1){
       logd("官方用户，跳过~")
       do_send = 0
   }
    //是否已经私信过
    var selectors = id("com.hupu.games:id/empty_tips");
//    logd("selectors:"+selectors)
    var comment_c = getText(selectors)
    comment_cNon = comment_c[0]
    randomSleep()
    if (typeof(comment_cNon) == "undefined" || comment_cNon == null){
        logd("已经私信过此用户，跳过~")
    }else{
        var url = "http://eshen.cc/hp.php?n="+user_name;
        var res = http.httpGetDefault(url, 10 * 1000);
        logd("此用户是否已经私信过："+res);
        if(res == "1"){
            do_send = 0
        }
        if(comment_cNon.indexOf("没有私信") != -1 && do_send == 1){
            logd("执行私信...")

            randomSleep()
            let x1 = device.getScreenWidth() * 2 / 10;
            let y1 = device.getScreenHeight() * 9.7 / 10;
            logd("点击私信按钮坐标：x1"+x1 + " y1"+y1)
            clickPoint(x1,y1)
            randomSleep()

            send_c = getSendCotnet(emoji_arr) + getSendCotnet(send_contnet_arr)
            logd("私信内容："+send_c)
            sendMsg(send_c)

            logd("点击空白，收起键盘，返回用户界面，返回评论界面")
            randomSleep()
            clickBtnById("com.hupu.games:id/mask_bg")

            //私信是否成功
            logd("检查是否私信成功")
            var selectors = id("com.hupu.games:id/empty_tips");
        //    logd("selectors:"+selectors)
            var comment_c = getText(selectors)
            comment_cNon = comment_c[0]
            logd("comment_cNon:"+comment_cNon)
            randomSleep()
            if (typeof(comment_cNon) == "undefined" || comment_cNon == null){
                logd("私信成功，继续私信~")
                res = 1
            }else{
                if(comment_cNon.indexOf("没有私信") != -1){
                    randomSleep()
                    send_fail_num += 1
                    if(send_fail_num > 3){
                        logd("私信失败，进入养号模式~")
                        var url = "http://eshen.cc/hpd.php?n="+user_name;
                        var res = http.httpGetDefault(url, 10 * 1000);
                        send_limit = 1
                        res = 0
                    }
                }
            }

        }else{
            logd("已经私信过此用户，跳过~")
        }
    }

    logd("点击空白，收起键盘，返回用户界面，返回评论界面")
    randomSleep()
    clickBtnById("com.hupu.games:id/mask_bg")

    randomSleep()
    clickBtnById("com.hupu.games:id/btn_back")
    randomSleep()
    clickBtnById("com.hupu.games:id/rl_back")
    randomSleep()

    return res
}

function sendMsg(send_c){
    randomSleep()
    var node = clz("android.widget.EditText").getNodeInfo(3000);
    logd("获取键盘输入框："+node)
    randomSleep()
    logd("发送内容："+send_c);
    if (node) {
        result = node[0].inputText(send_c);
        logd("输入结果:"+result)
    } else {
        toast("输入结果-无节点:"+node);
    }
    randomSleep()
    clickBtnById("com.hupu.games:id/commit_reply")
    randomSleep()
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
                let x = device.getScreenWidth() * 5 / 10;
                let y = device.getScreenHeight() * 8 / 10;
                let x1 = device.getScreenWidth() * 5 / 10;
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
//    logd("selector:"+selector)
    result = click(selector);
    if (result){
        toast("点击 " + text_name + " 成功");
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