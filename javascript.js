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
		//创建原始点覆盖物
		var marker1 = new BMap.Marker(point1);
		//添加到map
		map.addOverlay(marker1);
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
		//右键添加、移除、编辑点覆盖物
		//创建右键菜单
		var markerMenu = new BMap.ContextMenu();
		//设置菜单(1、设置点击选中菜单某项时执行的方法 2、添加进右键菜单栏)
		var removeMarker = function(e,ee,marker1){
			map.removeOverlay(marker1);
		};
		markerMenu.addItem(new BMap.MenuItem('删除',removeMarker.bind(marker1)) );
		//右键菜单添加到覆盖物上
		marker1.addContextMenu(markerMenu);



	},
	data:{
		msg:'测试一下',
		

	},
})