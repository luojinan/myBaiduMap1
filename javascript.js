//alert('测试一下');


//安装vue  axios  bootstrap
//index.html里引入 <script> vue axios bootstrap
//index.html里引入 <script> 百度地图api
//创建vue实例
//在vue的生命周期中添加外部api（百度地图）


/*
 *初始化实例vm
*/

var vm = new Vue({
	el: '#app' ,
	//在生命函数里加入其他api并设置好
	mounted(){
		//创建map实例
		var map = new BMap.Map("mapBox")
		//创建坐标点
		var point1 = new BMap.Point(113.452174,23.37766);
		//初始化实例
		map.centerAndZoom(point1,15);
		
		//设置地图
		//开启鼠标滚轮
		map.enableScrollWheelZoom(true);
/***********************************************************/
		/*数组数据*/	
/***********************************************************/
		//坐标点数值数组
		var coordinates = [];
		//覆盖物数组
		var markers = [];

/***********************************************************/
		/*原始点覆盖物*/
/***********************************************************/
		//创建原始点覆盖物
		var marker1 = new BMap.Marker(point1);
		//添加到map
		map.addOverlay(marker1);


/***********************************************************/
		/*普通图文信息*/
/***********************************************************/
		//创建信息窗口
		var sContent=
		"<h4 style='margin:0 0 5px 0;padding:0.2em 0'>仲恺农业工程学院</h4>" + 
		"<img style='float:right;margin:4px' id='imgDemo' src='img/1.jpeg' width='139' height='104' title='你学校'/>" + 
		"<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>广州市白云区钟落潭镇山卡拉大学</p>";
		//初始化信息窗口
		var infoWindow = new BMap.InfoWindow(sContent);
		//给覆盖物添加信息窗口事件
		marker1.addEventListener("mouseover",function(){
			this.openInfoWindow(infoWindow);
		});
		marker1.addEventListener("mouseout",function(){
			this.closeInfoWindow(infoWindow);
		});

/***********************************************************/
		/*自定义点覆盖物*/
/***********************************************************/
		//创建自定义点覆盖物
		//创建坐标点
		var me = new BMap.Point(113.433055,23.374381);
		//设置点覆盖物
		var myPointOverlay = new BMap.Icon("http://lbsyun.baidu.com/jsdemo/img/fox.gif",new BMap.Size(300,157));
		//初始化创建点覆盖物
		var marker2 = new BMap.Marker(me,{icon:myPointOverlay});	//利用点覆盖物传参，输入坐标和自定义点图标
		//添加自定义点覆盖物到map
		map.addOverlay(marker2);

/***********************************************************/
		/*百度地图引入外部搜索功能信息窗口api*/
/***********************************************************/
		//创建搜索信息框
		var searchContent = {
			title : "仲恺" ,
			width : 350 ,
			height : 105 ,
			panel : "panel" ,
			enableAutoPan : true ,
			searchTypes : [
				//需要在index中引入这些功能
				//否则会报错 BMAPLIB_TAB_SEARCH  is not defind
				BMAPLIB_TAB_SEARCH,   //周边检索
				BMAPLIB_TAB_TO_HERE,  //到这里去
				BMAPLIB_TAB_FROM_HERE //从这里出发
			] ,
		};
		//初始化搜索信息框
		var searchInfoWindow = new BMapLib.SearchInfoWindow(map,sContent,searchContent);
		//添加双击事件
		marker1.addEventListener("click",function(){
			searchInfoWindow.open(marker1);
		});



/***********************************************************/
		/*地图界面右键菜单*/
/***********************************************************/

		//右键菜单的callback函数(一定要在设置菜单内容的上面)
		var addSomeOverlay = function(e){
			//循环右键添加的覆盖物的次数
			for(var i=0; i < markers.length; i++){
				//添加原始点覆盖物到map
				map.addOverlay(markers[i]);	
			}
		};

		//设置菜单内容（对象数组）
		var txtMenuItem = [
		{
			text : "添加",
			callback : addSomeOverlay,		//添加点覆盖物的方法
		},
		{
			text : "编辑",
			callback : function(){alert("编译信息窗口内容")},
		}
		];
		//创建页面的右键菜单
		var mapMenu = new BMap.ContextMenu();
		//循环把信息添加添加进菜单
		for(let i=0; i < txtMenuItem.length; i++){
			mapMenu.addItem(new BMap.MenuItem(txtMenuItem[i].text,txtMenuItem[i].callback,100));
		}
		//使用事件监听器，打开右键菜单
		//并把坐标点和覆盖物传入对象数组
		map.addEventListener("rightclick",function(e){
			this.addContextMenu(mapMenu);		//右键事件监听器，添加右键
			//alert(e.point.lng + "," + e.point.lat);
			coordinates.push({						//获取右键点击的坐标
				lng : e.point.lng,
				lat : e.point.lat,
			});
			markers.push(new BMap.Marker(new BMap.Point(e.point.lng,e.point.lat)));
		});



		/*
		 *把数据数组化
		 *	1、点坐标points
		 *	2、覆盖物markers
		 *循环遍历，实现多个数值和操作
		 *	for来添加事件监听器
		 *信息窗口对象数组化
		 *	1、参数（坐标、内容--标题 正文 图片）
		 *右键编辑
		 *	1、显示input输入框
		 *	2、上传信息到对象数组push
		 *
		 *以上完成
		 *编辑数据库，并接上
		*/

/***********************************************************/
		/*覆盖物右键菜单*/
		/*(给用户添加的覆盖物添加右键菜单失败，使用到异步？生命周期？)*/
		/*给后台定义的覆盖物添加点击事件，修改data中show值也会undefined，使用到生命周期？*/
		/*为什么csn那篇东西里会不使用到其他的生命周期....辣鸡*/
/***********************************************************/

		//右键添加、移除、编辑点覆盖物
		//创建右键菜单
		var markerMenu = new BMap.ContextMenu();
		//设置菜单(1、设置点击选中菜单某项时执行的方法 2、添加进右键菜单栏)
		var removeMarker = function(e,ee,marker1){
			map.removeOverlay(marker1);		//删除覆盖物函数
		};
		var addMyMarker = function(){
			alert("添加一个覆盖物");
		};
		var writeNewInfo = function(){
			alert("编写一个新的信息窗口内容");
		};
		markerMenu.addItem(new BMap.MenuItem('删除',removeMarker.bind(marker1)) );
		markerMenu.addItem(new BMap.MenuItem('添加',addMyMarker) );		
		markerMenu.addItem(new BMap.MenuItem('编辑',writeNewInfo) );		

		//右键菜单添加到覆盖物上
		for(let i = 0 ; i < markers.length ; i++){
			markers[i].addContextMenu(markerMenu);
			console.log(markers[i]);
		};
		marker1.addContextMenu(markerMenu);

	},
	data:{
		msg:'测试一下',
		in_show:false,
	},
})