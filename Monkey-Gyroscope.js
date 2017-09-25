
var MK_Gyroscope = (function () {
	
	var initStatus = false,
		IOS_Ratio = 45,
		yaoyaoNum = 0,
		yaoyaoTriggerNum = 8, //摇摇触发次数
		yaoyaoTriggerVal = 4, //摇摇触发值
		//ios终端
		isIos = (function(){
			var u = navigator.userAgent;
		    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
		})();

	//motion
	function motionHandler(event){  
	    var rotationRate = event.rotationRate;

	    var alpha = rotationRate.alpha / (isIos ? IOS_Ratio : 1),
	    	beta = rotationRate.beta / (isIos ? IOS_Ratio : 1),
	    	gamma = rotationRate.gamma / (isIos ? IOS_Ratio : 1);

	    if(typeof MK_Gyroscope.motion === 'function'){
	    	MK_Gyroscope.motion({
	    		motionFB: alpha,
	    		motionRL: gamma,
	    		motionRT: beta
	    	});
	    }

	    //摇一摇
	    if(typeof MK_Gyroscope.yaoyao === 'function'){
	    	if(Math.abs(gamma) > yaoyaoTriggerVal){
	    		if(++yaoyaoNum >= yaoyaoTriggerNum){
	    			MK_Gyroscope.yaoyao();
	    			yaoyaoNum = 0;
	    		}
	    	}
	    	
	    }
	}

	//初始化
	function init(){
		if(initStatus)
			return;

		initStatus = true;
		yaoyaoNum = 0;
		if (window.DeviceMotionEvent){  
		    window.addEventListener("devicemotion", motionHandler, false);  
		}
	}

	var MK_Gyroscope = {
		init: init,
		rotation: null,
		yaoyao: null,
		isIos: isIos,
		clear: function(){
			if (window.DeviceMotionEvent){  
			    window.removeEventListener("devicemotion", motionHandler, false);  
			}

			initStatus = false;
		}
	};

	return MK_Gyroscope;

})();
