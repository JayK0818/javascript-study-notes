# 1. window.name

    跳转页面的时候会使window变化,但是在跳转页面的时候,会有一个window.name的属性保留下来。


    浏览器可视区域的宽高,包括滚动条的高度
    window.innerWidth
    window.innerHeight


    文档的宽高,包括滚动条的高度
    document.documentElement.clientWidth
    document.documentElement.clientHeight

    document.body.clientWidth;
    document.body.clientHeight;


    整个浏览器的宽高
    window.outerWidth
    window.outerHeight

# 2. window

    window对象表示一个包含DOM文档的窗口,其document属性指向窗口中载入的DOM文档。

    所有浏览器都支持window对象，所有JavaScript全局对象,函数以及变量均自动成为window对象的成员。
    全局变量 是window对象的属性
    全局函数 是window对象的方法

    HTML DOM的document也是window的对象的属性之一

    document.getElementById();
    window.document.getElementById();   是一样的

## 2.1. window.screen

    屏幕的可用宽度,可用高度

    window.screen.availWidth
    window.screen.availHeight

## 2.2. window.location

    window.location对象用于获得当前页面的地址(URL),并把浏览器重定向到新的页面。

    window.location.hostname    返回web主机的域名
    window.location.pathname    返回当前页面的路径和文件名
    window.location.port        返回主机的端口
    window.location.protocol    返回web协议

    window.location.href        返回当前页面的整个地址
    window.location.reload()    重新载入当前文档
    window.location.replace()   可用一个新文档取代当前文档


    location.href 和 location.history的区别:
        window.location.href    会写入浏览器的历史
        window.location.history 不会

## 2.3. window.navigator

    window.navigator对象包含有关访问者浏览器的信息

    window.navigator.userAgent

## 2.4. 弹窗

    警告框:window.alert()

    alert：同步代码

    确认框:window.confirm()
    提示框:window.prompt()

    window.close()  关闭当前页面
    window.scrollTo(x,y)    页面滚动条滚动到某个位置
    window.scrollBy(x,y)    把内容滚动指定的像素


    window.console.log()    在控制台输出信息

## 2.5. 计时事件

    window.setInterval()    间隔指定的毫秒数不停地执行指定的代码
    window.setTimeout()     在指定的毫秒数后执行指定代码

    setInterval() 和 setTimeout() 是HTML DOM Window对象的两个方法


    window.clearInterval(intervalVariable) 用于停止setInterval方法执行的函数
    window.clearTimeOut() 用于停止setTimeout方法执行的函数

## 2.6. Cookie

    Cookie用于存储web页面的用户信息。

    当浏览器从服务器上请求web页面时,属于该页面的cookie会被添加到该请求中。服务端通过这种方式来获取用户的信息

    JavaScript可以使用document.cookie属性来创建,读取,及删除cookie

# Online/Offline

    为了构建一个支持离线的web应用,你需要知道你的应用何时真正处于离线状态。同时,你还需要知道应用何时重新回到了
    [在线状态]。


    online		有网
    offline		没有网

    navigator.onLine
    	navigator.onLine是一个值为true/false(true表示在线,false表示离线)的属性。


## [online]与[offline]事件

    当浏览器从在线与离线状态中切换时,这两个事件会在页面的<body>上触发。此外，该事件会从document.body
    冒泡到document上，最后到达window。两个事件都无法被取消！

    1. 在window或document或document.body上使用addEventListener
    2. 在document或document.body的. ononline或.onoffline属性设置为一个JavaScript Function对象。
    不能使用 window.ononline或window.onoffline。

# visibilitychange

    当用户最小化窗口或切换到另一个选项卡时，API会发送visibilitychange 事件，让听众知道页面状态已更改！
    浏览器标签页被隐藏或显示的时候会触发visibilitychange 事件！

```js
document.addEventListener(
  "visibilitychange",
  function () {
    console.log(document.visibilityState);
  },
  false
);
```

    当页面不可见的时候显示 hidden,可以时显示 visibility!

## Document.visibilityState

    Document.visibilityState(只读属性),返回document的可见性,即当前可见元素的上下文环境。可能的值:

    	'visible': 此时页面内容至少是部分可见，即此页面在前景标签页中,并且窗口没有最小化
    	'hidden':  此时页面对用户不可见,即文档出处于背景标签页或者窗口处于最小化状态,或者操作系统正处于
    	'锁屏状态'.
    	'prerender': 页面此时正在渲染中
    	'unloaded':	页面从内存中卸载清楚


# window.navigator.getBattery()

    getBattery()方法返回了系统的电量信息，返回一个battery的promise对象，然后resolve后得到BatteryManager对象。
    它提供了一些新的事件，以及方法供您监控电池的状态。

```js
window.navigator.getBattery().then(function (data) {
  console.log(data);
});
```

    data返回的是一个BatteryManger对象
    {
    	charging:true,					一个布尔值,表示当前电池是否正在充电
    	chargingTime:Infinity,			充电完毕需要的时间
    	dischargingTime:Infinity,		剩余电量可用时间
    	level:0.97						电量百分比
    }

# window.navigator.vibrate()

    Navigator.vibrate()方法使设备(有震动硬件)产生有频率的振动。若某震动方法已经在进行中,则前一个震动方式停止,
    新的取而代之。

    若因为提供无效的参数使得无法使设备震动，它将返回false,否则返回true。

```js
const successBool = window.navigator.vibrate(pattern);
```

    pattern:
    1. 一个值表示交替震动的毫秒数。
    2. 一个包含整数的数组表示交替的震动、暂停、震动

    为了防止被恶意使用，不能直接调用，需要click里面才可以使用！

# Document.execCommand()

    当一个HTML文档切换到设计模式时,document暴露execCommand方法,该方法允许运行命令来操作可编辑内容区域的元素
    tips: 已废弃

    设计模式：有些命令需要在设计模式开启下才可以使用
    document.designMode = 'on'

    document.execCommand('selectAll')		选中编辑区里的全部内容。
    document.execCommand('copy')			复制
    document.execCommand('cut')				剪切
    document.execCommand('delete')			删除

    修改字体
    document.execCommand('foreColor',true,'#f00');

# 自定义事件

    Event.createEvent()     // 不建议
    建立一个新的事件,该事件必须先以其init() method 初始化才行

```js
// create Event
const event = new Event("build");

// listen
elem.addEventListener(
  "build",
  function () {
    console.log("触发了自定义事件");
  },
  false
);

// Dispatch the event
elem.dispatchEvent(event);
```

## 添加自定义数据

    CustomEvent 创建一个自定义事件

    Syntax语法:
    event = new CustomEvent(typeAry,customEventInit);
        typeArg: 一个自定义事件名称
        customEventInit:
            detail: 传入自定义数据
            bubbles: 表示事件能否冒泡
            cancelable: 表示该事件是否可以取消

```js
elem.addEventListener(
  "build",
  function (e) {
    console.log(e.detail); //
  },
  false
);

const event = new CustomEvent("build", {
  detail: {
    fitstName: "Kyrie",
    lastName: "irving",
  },
});
elem.dispatchEvent(event);
```

# window.getSelection()

    Selection对象表示用户选择的文本范围或插入符号的当前位置。它代表页面中的文本选区，可能横跨多个元素。

        anchor: 用户开始选择的地方
        focus:  用户结束选择的地方

    const selection = window.getSelection();
        调用Selection.toString()方法会返回被选中区域中的纯文本。

    selection是一个Selection对象。如果想要将selection转换为字符串，可以通过连接一个空字符串"" 或者使用
    String.toString()方法。

    也可以使用document.getSelection() 两个方法等价

## Selection

    属性
        anchorNode: 返回该选区起点所在的节点(Node)
        anchorOffset: 选区起点在 anchorNode 中的位置偏移量
        focusNode :返回该选区终点所在的节点
        focusOffset: 其表示的是选区终点在 focusNode 中的位置偏移量
        isCollapsed: 返回一个布尔值，用于判断选区的起始点和终点是否在同一个位置
        rangeCount: 返回该选区所包含的连续范围的数量

    方法：
        toString()
        返回当前选区的纯文本内容



# Navigator.getUserMedia

	Navigator.getUserMedia()方法提供用户需要使用音频视频输入设备,比如相机,屏幕共享,或者麦克风
	如果用户给与许可,successCallBack回调就会被调用，MediaStream对象作为回调函数的参数。如果用户拒绝
	许可或者没有媒体可用，errorCallback就会被调用。
	
	Note: 此API已更名为 MediaDevices.getUserMedia()。 
```js
1. 第一种方法调用摄像头：ES5的方式，需要传入3个参数

window.navigator.getUserMedia({audio:true,video:true},function(){
	
},function(){
	
});
```
	tips:
	1. 这个函数功能,只能在localhost或者是https方式才可以使用。
	2. 页面显示拍摄的内容 2.1 video  2.2 canvas
	3. navigator.getUserMedia()必须要传入三个参数,否则会报错
	4. 当用户拒绝访问设备是返回DOMException 

## Permission

    在一个可以安装app中使用 getUserMedia()，需要在manifest文件中指定一个或者多个条目:
```json
"permissions":{
  'audio-capture':{
    'description':"Required to capture audio using getUserMedia()",
  },
  "video-capture": {
    "description": "Required to capture video using getUserMedia()"
  }
}
```

# MediaDevices.getUserMedia()

    MediaDevices.getUserMedia() 会提示用户给予使用媒体输入的许可。媒体输入会产生一个MediaStream,里面包含了请求的媒体类型的轨道。
    可以包含一个视频轨道 一个音频轨道或其他轨道类型。
    
    返回一个Promise对象,成功后会resolve回调一个MediaStream对象。若对象拒绝了使用权限或者媒体源不可用。promise会reject
    回调一个PermissionDeniedError或者NotFoundError。
    
    const promise = window.navigator.mediaDevices.getUserMedia(constraints);
```js
// constraints:    
{video:true,audio:true}  // 必须填写一个
    
 // 应用想要使用1280X720的摄像头分辨率:
{
    audio:true,
    video:{
        width:1280,
        height:720
    }
}
```
    在使用video标签显示 视频流时 video.src = URL.createObjectURL(stream)
    tips: 报错  Failed to execute createObjectURL on 'URL'    
    
    Chrome升级后不再支持这种写法,需要修改为: video.srcObject = stream;
 
    ## 强烈要求获取指定的尺寸时: 可以使用关键字 min,max 或者 exact(min == max)
```js
{
    autio:true,
    video:{
        width:{min:1280},height:{min:720}
    }
}
```
    ideal 关键字： 当请求包含一个ideal（应用最理想的）值时，这个值有着更高的权重
```js
{
  audio: true,
  video: {
    width: { min: 1024, ideal: 1280, max: 1920 },
    height: { min: 776, ideal: 720, max: 1080 }
  }
}
```

## 前置/后置摄像头

	给video传递一个对象,(默认是前置的);
	video:{
		facingMode:"user/environment"		
	}
```js
window.navigator.MediaDevices.getUserMedia({video:{ 
	facingMode:'user' // 前置摄像头
}}).then( stream =>{
	console.log(stream);
})
.catch(function(err){
	console.log(err);
})
```
```js
// usage
const constraints = {audio:true, video:{width:1280,height:720}};
navigator.mediaDevices.getUserMedia(constraints).then(function(stream){
  var video = document.querySelector('video');
  if("srcObject" in video){
    video.srcObject = stream;
  }else{
    video.src = window.URL.createObjectURL(stream);
  }
  video.onloadedmetadata = function(){
    video.play();
  }
})
```

## MediaStream
	
	MediaStream接口是一个媒体内容的流。一个流包含几个轨道，比如视频和音频轨道
	
	属性:
	MediaStream.id 
	包含36个字符的DOMString,用来作为这个对象的唯一标识符
	
## DOMException
	
	该接口代表由于调用方法或访问一个web API属性时的异常事件,这基本上是在web API中如何描述错误情况的
	
	DOMException.message
	DOMException.name


# Service Worker
    
    Service Wokers本质上充当Web应用程序 浏览器与网络之间的代理服务器。这个API旨在创建有效的离线体验。它会拦截网络请求并根据
    请求网络是否可用采用适当的动作，更新来自服务器的资源。它还提供入口以推送通知和访问后台同步API。
    
    Service Worker是一个注册在指定源和路径下的事件驱动worker。它采用JavaScript控制关联的页面或网站,拦截并修改
    访问和资源请求。细粒度的缓存资源。
    
    tips:
        1. Service worker运行在worker上下文，因此不能访问DOM。它运行在其他线程中,所以不会造成阻塞。
        2. 它设计为完全异步,同步API不能在service worker中使用。
        3. 出于安全考量,Service workers只能由https承载。或者localhost
    
    service worker 由事件驱动,遵守以下生命周期:
        下载/安装/激活
```js
// 注册一个serviceWorker服务
if('serviceWorker' in navigator){
  window.addEventListener('load',function(){
    navigator.serviceWorker.register('sw.js',{scope:'/'})
      .then(registration => {
        console.log(registration);
      }) 
      .catch(error => console.log(error));
  })
}
```    
    install     安装
        self.skipWaiting()  跳过等待
    activate    激活    
    fetch       对网页发起的请求进行拦截处理
```js
// sw.js   一个下载 激活和 监听fetch 的 sw文件
const CACHE_NAME = 'cache-v1';	// 定义一个缓存的版本;
self.addEventListener('install',function(event){
	event.waitUntil( event.open(CACHE_NAME).then(cache => {
		cache.addAll([
			'/','./style.css','./1.png'
		])	// 添加需要缓存的资源
	}).then(self.skipWaiting()) )
})

self.addEventListener('activate',function(event){
	event.waitUntil(caches.keys().then(cacheNames => {
		return Promise.all(cacheNames.map(cacheName => {
			if(cacheName !== CACHE_NAME){
				return caches.delete(cacheName);
			}
		}))
	}))
})

self.addEventListener('fetch',function(event){
	event.respondWith( caches.open(CACHE_NAME).then(cache => {
		return cache.match(event.request).then(response => {
			if(response){
				return response
			}
			return fetch(event.request).then(response => {
				caches.put(event.request,response.clone())
				return response;
			})
		})
	}) )
})
```
##  FetchEvent

    Service worker可以通过FetchEvent事件去响应请求.通过使用FetchEvent.respondWith方法,可以任意修改对于
    这些请求的响应。
    
    FetchEvent参数携带了 有关请求和结果响应的信息以及方法FetchEvent.respondWith()
        respondWith() 方法旨在包裹代码，这些代码来自受控页面的request生产自定义的response。
```js
self.addEventListener('fetch',function(event){
  event.respondWith(
    caches.match(event.request).then(response => {
      return response;
    })
  )
})
```
## Clients

	Clients接口的claim()方法允许一个激活的service worker将自己设置为其scope内所有clients的controller.
	
	语法:
		await clients.claim()
```js
self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});
```