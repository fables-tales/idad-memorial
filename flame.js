window.onload = function(){
    var audioEl = document.getElementById("audioTag");
         
    audioEl.load();
    audioEl.play();
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	
	var W = window.innerWidth, H = window.innerHeight;
	canvas.width = W;
	canvas.height = H;
	
	var particles = [];
	var mouse = {};
	
	var particle_count = 100;
	
	
	function particle()
	{
        xrange = 2;
        yrange = 12; 
        var nowms = new Date().getTime();
        kspread = 200
		this.speed = {x: Math.random()*xrange-xrange/2, y: -Math.random()*yrange} 
    	this.location = {x: Math.random()*kspread+W/2-kspread/2, y: H-3};
		//radius range = 10-30
		this.radius = 10+Math.random()*20;
		//life range = 20-30
		this.life = 20+Math.random()*400;
		this.remaining_life = this.life;
		//colors
		this.r = Math.round(Math.random()*128+128);
		this.g = Math.round(Math.random()*128);
		this.b = Math.round(Math.random()*50);
	}
	
	function draw()
	{
        if (particles.length < particle_count)
        {
            particles.push(new particle());
        }
		ctx.globalCompositeOperation = "source-over";
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, W, H);
		ctx.globalCompositeOperation = "lighter";
		
		for(var i = 0; i < particles.length; i++)
		{
			var p = particles[i];
			ctx.beginPath();
			p.opacity = Math.round(p.remaining_life/p.life*100)/100
			var gradient = ctx.createRadialGradient(p.location.x, p.location.y, 0, p.location.x, p.location.y, p.radius);
			gradient.addColorStop(0, "rgba("+p.r+", "+p.g+", "+p.b+", "+p.opacity+")");
			gradient.addColorStop(0.5, "rgba("+p.r+", "+p.g+", "+p.b+", "+p.opacity+")");
			gradient.addColorStop(1, "rgba("+p.r+", "+p.g+", "+p.b+", 0)");
			ctx.fillStyle = gradient;
			ctx.arc(p.location.x, p.location.y, p.radius, Math.PI*2, false);
			ctx.fill();
			
			p.remaining_life--;
			p.radius -= 0.4;
			p.location.x += p.speed.x;
			p.location.y += p.speed.y;
			
			if(p.remaining_life < 0 || p.radius < 0)
			{
				particles[i] = new particle();
			}
		}
	}
	
	setInterval(draw, 33);
}
