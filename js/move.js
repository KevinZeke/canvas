window.onload=function()
{
    var canvas=document.getElementById('canvas');
    canvas.style.border="1px solid black";
    var canvas_width=document.documentElement.clientWidth||document.body.clientWidth ,
        canvas_height=document.documentElement.clientHeight||document.body.clientHeight;
        console.log(canvas_width,canvas_height);
        if(canvas.getContext)
        {
            var context=canvas.getContext('2d');
            canvas.width=canvas_width;
            canvas.height=canvas_height;
            //var ball={x:400,y:50,r:15};  //,speedX:{v:-4,a:0},speedY:{v:0,a:9}
            //new BallMove(ball,context).addMove();
            canvas.onclick=function(e)
            {
                var oEvent=e||window.event;
                var ball_left=oEvent.clientX - canvas.offsetLeft;
                var ball_top=oEvent.clientY - canvas.offsetTop;
                var ball={x:ball_left,y:ball_top,context,r:15};
                new BallMove(ball,context);
            }
        }
}

function BallMove(cfg,ctx)
{
    console.log(1);
    if(!cfg || !ctx) return;
    this.cfg=cfg;
    this.ctx=ctx;
    this.drawBall();
    return this;
}
BallMove.prototype.drawBall=function(ctx)
{
    console.log(1);
    this.ctx.beginPath();
    this.ctx.arc(this.cfg.x,this.cfg.y,this.cfg.r,0,2*Math.PI);
    if(this.cfg.type=='fill' || this.cfg.type==undefined)
    {
        this.ctx.fillStyle=this.cfg.color || '#7666D7';
        this.ctx.fill();
    }
    else if(this.cfg.type=='stroke')
    {
        this.ctx.strokeStyle=this.cfg.color || '#7666D7';
        this.ctx.lineWidth=this.cfg.width || 1;
        this.ctx.stroke();
    }
}
//{x-speed,y-speed,x-a,y-a}
BallMove.prototype.addMove=function(x,y,ax,ay)
{
    var _this=this;
    var width=this.ctx.canvas.width,
        height=this.ctx.canvas.height;
    x  || (x=-4);
    y  || (y=0);
    ax || (ax=0);
    ay || (ay=2);
    setInterval(function()
    {
        _this.ctx.clearRect(0,0,width,height);
        x=x>=0?0:ax+x;
        _this.cfg.x+=x;
        y+=ay;
        y=_this.cfg.y>=height-_this.cfg.r?-2*y/3:y;
        _this.cfg.y+=y;
        _this.drawBall();
    },30)
}