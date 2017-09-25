# Monkey-Gyroscope

初始化

    MK_Gyroscope.init();

陀螺仪，ios与android已兼容

    MK_Gyroscope.motion = function(v){
        document.getElementById("Ralpha1").innerHTML = v.motionFB;
        document.getElementById("Rbeta2").innerHTML = v.motionRT;
        document.getElementById("Rgamma2").innerHTML = v.motionRL;
    }

摇一摇

    var n = 0
    MK_Gyroscope.yaoyao = function(){
        document.getElementById("yaoyao").innerHTML = ++n;
    }
    

删除陀螺仪事件

    MK_Gyroscope.clear();
