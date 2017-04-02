;(function()
{
    var window_width=1024,
        window_height=500,
        radius=7;
    //截止时间 只读变量
    const endTime=new Date();
    endTime.setTime(endTime.getTime()+3600*1000);
    var curShowTimeSeconds=0;
    var balls=[];

    var canvas=document.getElementById('canvas');
    if(canvas.getContext)
    {
        var context=canvas.getContext('2d');
        canvas.width=window_width;
        canvas.height=window_height;
        curShowTimeSeconds=getCurrentShowTimeSeconds();
        
        setInterval(function()
        {
            if(!document.hidden)
            {
            render( context );
            update();
            }
        },50);
    }

    function getCurrentShowTimeSeconds()
    {
        var oDate=new Date();
        //倒计时时间计算
        //获取截止日期与当前日期之间的差值
        // var ret=endTime.getTime()-oDate.getTime();
        //换算成秒
        // ret=Math.round(ret/1000);
        // return ret<0?0:ret;

        var ret=oDate.getHours()*3600+oDate.getMinutes()*60+oDate.getSeconds();
        return ret;
    }

    function update()
    {
        var nextShowTimeSeconds=getCurrentShowTimeSeconds();
        var nextHours=parseInt(nextShowTimeSeconds/3600),
            nextMinutes=parseInt((nextShowTimeSeconds - nextHours*3600)/60),
            nextSeconds=nextShowTimeSeconds%60;

        var hours=parseInt(curShowTimeSeconds/3600),
            minutes=parseInt((curShowTimeSeconds - hours*3600)/60),
            seconds=curShowTimeSeconds%60;


        if(seconds!=nextSeconds)
        {
            curShowTimeSeconds=nextShowTimeSeconds;

            if(parseInt(hours/10)!=parseInt(nextHours/10))
            {
                addBalls(0,0,parseInt(hours/10));
            }
            if(parseInt(hours%10)!=parseInt(nextHours%10))
            {
                addBalls(125,0,parseInt(hours%10));
            }
            if(parseInt(minutes/10)!=parseInt(nextMinutes/10))
            {
                addBalls(375,0,parseInt(minutes/10));
            }
            if(parseInt(minutes%10)!=parseInt(nextMinutes%10))
            {
                addBalls(500,0,parseInt(minutes%10));
            }
            if(parseInt(seconds/10)!=parseInt(nextSeconds/10))
            {
                addBalls(750,0,parseInt(seconds/10));
            }
            if(parseInt(seconds%10)!=parseInt(nextSeconds%10))
            {
                addBalls(875,0,parseInt(seconds%10));
            }
        }
        updateBalls();
        //debugger
    }

    //添加活动小球
    function　addBalls(x,y,num)
    {
        for(var i=0;i<digit[num].length;i++)
            {
                for(var j=0;j<digit[num][i].length;j++)
                {
                    if(digit[num][i][j])
                    {
                        var ball=
                        {
                            x:x+10+16*j,
                            y:y+10+20*i,
                            g:1.5+Math.random(),
                            vx:Math.pow(-1,Math.ceil(Math.random()*2))*5,
                            vy:-5*Math.ceil(Math.random()*2),
                            color:'rgb('+parseInt(Math.random()*255)+', '+parseInt(Math.random()*255)+', '+parseInt(Math.random()*255)+')'

                        }

                        balls.push(ball);
                    }
                }
            }
    }

    //处理小球运动
    function updateBalls()
    {
        for(var i=0;i<balls.length;i++)
        {
            
            balls[i].x+=balls[i].vx;
            balls[i].y+=balls[i].vy;
            balls[i].vy+=balls[i].g;


            if(balls[i].y>=window_height - radius)
            {
                balls[i].y=window_height - radius;
                balls[i].vy=-balls[i].vy*0.75;
            }

            if(balls[i].x<=-2*radius || balls[i].x>=window_width+2*radius)
            {
                balls.splice(i,1);
            }

        }
    }

    //render函数负责配置倒计时
    function render(ctx)
    {
        var hours=parseInt(curShowTimeSeconds/3600),
            minutes=parseInt((curShowTimeSeconds - hours*3600)/60),
            seconds=curShowTimeSeconds%60,
            timer=null,
            arr=[];

                ctx.clearRect(0,0,window_width,window_height);
                arr=[
                parseInt(hours/10),parseInt(hours%10),
                10,
                parseInt(minutes/10),parseInt(minutes%10),
                10,
                parseInt(seconds/10),parseInt(seconds%10)
                ];

                for(var i=0;i<arr.length;i++)
                {
                    renderDigit(i*125,0,arr[i],ctx);
                }

            for(var i=0;i<balls.length;i++)
            {
                ctx.beginPath();
                ctx.arc(balls[i].x,balls[i].y,radius,0,2*Math.PI);
                ctx.fillStyle=balls[i].color;
                ctx.fill();
            }
       

    }
    
    //渲染页面
    function renderDigit(x,y,num,ctx)
    {
        for(var i=0;i<digit[num].length;i++)
            {
                for(var j=0;j<digit[num][i].length;j++)
                {
                    if(digit[num][i][j])
                    {
                        ctx.beginPath();
                        ctx.arc(x+10+16*j,y+10+20*i,radius,0,2*Math.PI);
                        ctx.fillStyle='#785DAC';
                        ctx.fill();
                    }
                }
            }
    }
})();



/*      [
            [0,0,1,1,1,0,0],
            [0,1,1,0,1,1,0],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [1,1,0,0,0,1,1],
            [0,1,1,0,1,1,0],
            [0,0,1,1,1,0,0]
        ]*/