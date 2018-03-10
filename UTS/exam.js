/*
	exam.js
	Represent problems for exam in JS
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180303
	Start this library.
	20180304
	Continue improving this library.
    
    Edited by
    10214076
    Muhammad Fauzi Adithya | fauzi.adithya@gmail.com
    For exam purpose
*/

// 20180304.1658 ok
function executeScript(target, menu) {
	var target = window.event.target;
	var value = target.value;
	var idx = target.selectedIndex;
	var script = menu[idx][1];
	script();
}

function examRandomDataChart(){
    var eout = document.getElementById("scriptResult");
	eout.innerHTML = "";
	var sel = window.event.target;
    ChangeH("scriptResult",205);    
    
	var ecan = document.createElement("canvas");
	ecan.width = 300;
	ecan.height = 180;
	ecan.id = "drawingArea"
	ecan.style.background = "#f8f8f8";
		
	eout.appendChild(ecan);
    eout.innerHTML+="<br>"
	
    //Buat tombol
    var btn = document.createElement("button");
    btn.style.width = "300px";
    btn.style.height = "20px";
    btn.innerHTML = "Generate On";
    btn.addEventListener("click", btnClick)
    eout.appendChild(btn);
    
    
    var t = [];
    var x = [];    
    ti = 0;
    var off = true;
    function btnClick(){
        btn = window.event.target;
        if (off){
            btn.innerHTML = "Generate Off";
            off = false;
            sel.disabled = true;
            run = setInterval(UpdateChart,250);
        } else {
            btn.innerHTML = "Generate On";
            off = true;
            sel.disabled = false;
            clearInterval(run);
        }
    }
    
    function UpdateChart(){
        
        if (t.length<20){
            t.push(ti);
            x.push(randInt(0,20));
        } else {
            t.shift();
            x.shift();
            t.push(ti)
            x.push(randInt(0,20));
        }
        
        var series = new XYSeries("series1", t, x);
        var chart = new Chart2("drawingArea");
        chart.xAxis.label = "t";
        chart.yAxis.label = "x";
        chart.yAxis.Ntics = 5;
        chart.xAxis.Ntics = 5;
        chart.addSeries(series);
        chart.drawSeries("series1");
        
        ti++;
    }
    
}

function examMatrixAdditionMathJax(){
    var eout = document.getElementById("scriptResult");
	eout.innerHTML = "";
	ChangeH("scriptResult",150);
    
	var elef = document.createElement("div");
	elef.style.width = "252px";
	elef.style.float = "left";
	
    //Untuk hasil
	var erig = document.createElement("div");
	erig.style.float = "left";
	erig.style.padding = "4px 50px 4px 50px";
	erig.id = "mathjax-matrix"
	
    //Textarea
	var etxa = document.createElement("textarea");
	etxa.style.width = "120px";
	etxa.style.height = "120px";
	etxa.style.overflowY = "scroll"
	etxa.value = "1 2 3 4\n"
	+ "1 2 3 9\n"
	+ "1 1 13 4\n"
	+ "1 8 3 4";
    
    var etxa2 = document.createElement("textarea");
	etxa2.style.width = "120px";
	etxa2.style.height = "120px";
	etxa2.style.overflowY = "scroll"
	etxa2.value = "4 8 2 1\n"
	+ "3 3 2 1\n"
	+ "4 2 9 1\n"
	+ "7 3 2 1";    

    //Button
	var ebtn = document.createElement("button");
	ebtn.innerHTML = "Add matrices";
	ebtn.style.width = "252px";
	ebtn.addEventListener("click", btnClick);
	
	eout.appendChild(elef);
		elef.appendChild(etxa);
        elef.appendChild(etxa2);
		elef.appendChild(ebtn);
	eout.appendChild(erig);
	
	function btnClick() {
		//Ambil value text area 1
        var content = etxa.value;
		var lines = content.split("\n");
		var M = [];
		for(var j = 0; j < lines.length; j++) {
			var words = lines[j].split(" ");
			var row = [];
			for(var i = 0; i < words.length; i++) {
				var Mel = words[i];
				row.push(parseFloat(Mel));
			}
			M.push(row);
		}
        
        //Ambil value text area 2
        var content = etxa2.value;
		var lines = content.split("\n");
		var N = [];
		for(var j = 0; j < lines.length; j++) {
			var words = lines[j].split(" ");
			var row = [];
			for(var i = 0; i < words.length; i++) {
				var Mel = words[i];
				row.push(parseFloat(Mel));
			}
			N.push(row);
		}
		
        console.log(M);
        console.log(N);
        
        
        //Membuat variabel sum
        var sum = [];
            for(var i=0; i<M.length; i++) {
            sum[i] = new Array(M[0].length);
        }
        
        //Menjumlahkan
        for (var i = 0; i<M.length; i++){
            for (var j = 0; j<M[0].length; j++){
                sum[i][j]=M[i][j]+N[i][j];
            }
        }
        

		var ROW = sum.length;
		var latex = "\\begin{equation}\n"
			+ "M = \\left[\n"
			+ "\\begin{array}\n";
		var COL = sum[0].length;
		latex += "{" + "c".repeat(COL) + "}\n";
		for(var j = 0; j < ROW; j++) {
			var arow = sum[j];
			var COL = arow.length;
			for(var i = 0; i < COL; i++) {
				latex += sum[j][i];
				if(i < COL - 1) {
					latex += " & ";
				} else {
					latex += " \\\\\n";
				}
			}
		}
		latex += "\\end{array}\n"
			+ "\\right]\n"
			+ "\\end{equation}";
		
		updateMath("mathjax-matrix", latex)
	}
}

function examDynamicColor(){
    var eout = document.getElementById("scriptResult");
	eout.innerHTML = "";
    ChangeH("scriptResult",125);
	var sel = window.event.target;

    //Canvas untuk lingkaran
	var can = document.createElement("canvas");
    can.id = "drawingboard";
    can.height = 100;
    can.width = 100;
	eout.appendChild(can);
    
	var ber = document.createElement("br");
	eout.appendChild(ber);
    
    var btn = document.createElement("button");
	btn.innerHTML = "On";
	btn.style.width = "100px";
	btn.addEventListener("click", btnClick);
    eout.appendChild(btn);
    
    var r =1;
    var i =1;
    var off = true
    running();
    function btnClick (){
        btn = window.event.target;
        if (off){
            btn.innerHTML = "Off";
            off = false;
            sel.disabled = true;
            run = setInterval(running,5);
        } else {
            btn.innerHTML = "On";
            off = true;
            sel.disabled = false;
            clearInterval(run);
        }
    }
    
    function running(){
        if (r==255 || r==0){
            i*=-1;
        }
        r += i;
        var color = int2rgb(255, r, r );
        draw(color);
    }
    
    function draw(col){
        clearCanvas("drawingboard","#fff")
        var cx = can.getContext("2d");
        cx.fillStyle = col;
        cx.strokeStyle = "#ff2020";
        cx.lineWidth = 0;
        cx.beginPath();
        cx.arc(50, 50, 40, 0, 2 * Math.PI);
        cx.fill();
        //cx.stroke();
    }
    
    // Clear canvas with color
    function clearCanvas() {
        var id = arguments[0];
        var el = document.getElementById(id);
        var color = arguments[1];
        var cx = el.getContext("2d");
        cx.fillStyle = color;
        cx.fillRect(0, 0, can.width, can.height);
    }
    
}

function examDrawCircularMotion(){
    var eout = document.getElementById("scriptResult");
	eout.innerHTML = "";
    ChangeH("scriptResult",175);
	var sel = window.event.target;

    // Define world coordinate
    var xmin = -0.1;
    var ymin = -0.1;
    var xmax = 1.1;
    var ymax = 1.1;

    // Define canvas size
    var canvasWidth = 150;
    var canvasHeight = 150;

    // Define canvas coordinate
    var XMIN = 0;
    var YMIN = canvasHeight;
    var XMAX = canvasWidth;
    var YMAX = 0;

    // Create a canvas
    var c = document.createElement("canvas");
    c.id = "drawingboard";
    c.width = canvasWidth;
    c.height = canvasHeight;
    c.style.border = "1px solid #ccc";

    // Clear canvas with color
    function clearCanvas() {
        var id = arguments[0];
        var el = document.getElementById(id);
        var color = arguments[1];
        var cx = el.getContext("2d");
        cx.fillStyle = color;
        cx.fillRect(0, 0, c.width, c.height);
    }

    // 20180222.2117
    var div = document.createElement("div");
    div.style.textAlign = "center";
    var b1 = document.createElement("button");
    b1.innerHTML = "Start";
    div.append(c);
    
    var ber = document.createElement("br");
    div.append(ber);
    
    div.appendChild(b1);
    eout.append(div);
    var ekin = document.createElement("div");
    ekin.id = "ekin";
    div.append(ekin);


    b1.addEventListener("click", function() {
        if(b1.innerHTML == "Start") {
            b1.innerHTML = "Stop";
            sel.disabled = true;
            iter = setInterval(simulate, 40);
        } else {
            b1.innerHTML = "Start";
            clearInterval(iter);
            sel.disabled = false;
        }
    });

    function drawcir(x, y){
        var cx = c.getContext("2d");
        cx.fillStyle = "#5abee3";
        cx.strokeStyle = "#0606c7";
        cx.lineWidth = 3;
        cx.beginPath();
        cx.arc(x, y, 5, 0, 2 * Math.PI);
        cx.fill();
        cx.stroke();
    }
    var t = 0;
    
    function simulate() {
        var xc = 75, yc = 75;
        var A = 50, T = 10;
        if (t>10){
            t = 0;
        }
        var x = xc + A * Math.cos(2*Math.PI*t/T); 
        var y = yc - A * Math.sin(2*Math.PI*t/T); //Negatif karena koordinat pada layar
        clearCanvas("drawingboard","#f8f8f8");
        drawcir(x,y);
        t++;
    }
	
}

function examArrayOfCircle(){
	var div = document.getElementById("scriptResult");
	div.innerHTML = "&nbsp;";
    
    ChangeH("scriptResult",160);
    
	var can = document.createElement("canvas");
    can.height = 200;
	div.appendChild(can);
    
    var r = 17
    var dx = 40;
    var dy = 40;
    
	for (var i = 1; i<= 4; i++){
        for(var j = 1; j<=i; j++){
            var cx = can.getContext("2d");
            cx.fillStyle = "#5abee3";
            cx.strokeStyle = "#0606c7";
            cx.lineWidth = 3;
            cx.beginPath();
            cx.arc(20+dx*(j-1), 20+dy*(i-1), r, 0, 2 * Math.PI);
            cx.fill();
            cx.stroke();
        }
    }
}

function examTextareaAndChartXY(){
    var eout = document.getElementById("scriptResult");
	eout.innerHTML = "";
    ChangeH("scriptResult",200);
	
	var elef = document.createElement("div");
	elef.style.width = "125px";
	elef.style.float = "left";
	
	var ecan = document.createElement("canvas");
	ecan.width = "300";
	ecan.height = "200";
	ecan.style.width = "300px";
	ecan.style.height = "200px";
	ecan.id = "drawingArea"
	ecan.style.background = "#f8f8f8";
	
	var etxa = document.createElement("textarea");
	etxa.style.width = "120px";
	etxa.style.height = "170px";
	etxa.style.overflowY = "scroll"
	etxa.value = "t x\n"
	+ "1 2 \n"
	+ "2 4 \n"
	+ "3 5 \n"
	+ "6 4 ";
	
	var ebtn = document.createElement("button");
	ebtn.innerHTML = "Plot data";
	ebtn.style.width = "125px";
	ebtn.addEventListener("click", btnClick);
	
	eout.appendChild(elef);
		elef.appendChild(etxa);
		elef.appendChild(ebtn);
	eout.appendChild(ecan);
	
    
	function btnClick() {
        var x = [];
        var y = [];
		var content = etxa.value;
		var lines = content.split("\n");
		for(var j = 0; j < lines.length; j++) {
			var words = lines[j].split(" ");
            if (j == 0){
                x.push(words[0]);
                y.push(words[1]);
            } else {
                x.push(parseFloat(words[0]));
                y.push(parseFloat(words[1]));
            }
		}
        
        //bikin chart
        var chart = new Chart2("drawingArea");
        chart.yAxis.Ntics = 4;
        chart.xAxis.Ntics = 8;
        chart.xAxis.label =x[0];
        chart.yAxis.label =y[0];
        
        x.shift();
        y.shift();
        var series = new XYSeries("series1", x, y);
        chart.addSeries(series);
        
        if(series.xmin >= 0){
            chart.xAxis.range.min = 0;
        }
        if(series.ymin >= 0){
            chart.yAxis.range.min = 0;
        }
        
        chart.drawSeries("series1");
		
	}
    
}

// 20180306.0514 ok
function examThreeGrains() {
	var eout = document.getElementById("scriptResult");
    ChangeH("scriptResult",175);
	eout.innerHTML = "";
	var sel = window.event.target;
	
	// Execute a test function
	test_define_rectangle();

	// 20180213.0751-1512 ok
	function test_define_rectangle() {
		// Define a box coordinates
		/*
				z
				|
				
				H           G
				 .---------.
				/         /|
		 E /       F / |
			.---------.  |
			|  .      |  .
			| D       | / C
			|         |/
			.---------.    -- x
		 A           B
		*/
		var s = 1;
		var rA = new Vect3(0, 0, 0);
		var rB = new Vect3(s, 0, 0);
		var rC = new Vect3(s, s, 0);
		var rD = new Vect3(0, s, 0);
		var rE = new Vect3(0, 0, s);
		var rF = new Vect3(s, 0, s);
		var rG = new Vect3(s, s, s);
		var rH = new Vect3(0, s, s);
		
		// Define box sides
		var surf = new Grid4();
		var sides = [];
		surf = new Grid4(rE, rF, rB, rA);
		sides.push(surf);
		surf = new Grid4(rF, rG, rC, rB);
		sides.push(surf);
		surf = new Grid4(rG, rH, rD, rC);
		sides.push(surf);
		surf = new Grid4(rH, rE, rA, rD);
		sides.push(surf);
		surf = new Grid4(rE, rH, rG, rF);
		sides.push(surf);
		
        
        //definisi massa dan ukuran yang sama
        m = 5;
        d = 0.2;
        
		// Defina spherical particles
		var p = new Sphere();
		var pars = [];
		p = new Sphere();
		p.m = m;
		p.d = d;
		p.r = new Vect3(0.25, 0.25, 0.25);
		p.v = new Vect3(0.1, 0.05, 0);
		pars.push(p);
		p = new Sphere();
		p.m = m;
		p.d = d;
		p.r = new Vect3(0.25, 0.5, 0.25);
		p.v = new Vect3(0.0, 0.05, 0);
		pars.push(p);
		p = new Sphere();
		p.m = m;
		p.d = d;
		p.r = new Vect3(0.8, 0.8, 0.25);
		p.v = new Vect3(-0.02, 0.05, 0);
		pars.push(p);
		
		// Define world coordinate
		var xmin = -0.1;
		var ymin = -0.1;
		var xmax = 1.1;
		var ymax = 1.1;
		
		// Define canvas size
		var canvasWidth = 150;
		var canvasHeight = 150;
		
		// Define canvas coordinate
		var XMIN = 0;
		var YMIN = canvasHeight;
		var XMAX = canvasWidth;
		var YMAX = 0;
		
		// Create a canvas
		var c = document.createElement("canvas");
		c.id = "drawingboard";
		c.width = canvasWidth;
		c.height = canvasHeight;
		c.style.border = "1px solid #ccc";
		
		// Create some divs
		var d;
		d	= document.createElement("div");
		d.id = "ekin";
		document.body.appendChild(d);
		d	= document.createElement("div");
		d.id = "hidtext";
		document.body.appendChild(d);
		
		// Draw a circle
		function drawSphere(id, s, color) {
			var cx = document.getElementById(id).getContext("2d");
			cx.strokeStyle = color;
			cx.beginPath();
			var rr = transform({x: s.r.x, y: s.r.y});
			var rr2 = transform({x: s.r.x + s.d, y: s.r.y});
			var DD = rr2.x - rr.x;
			cx.arc(rr.x, rr.y, 0.5 * DD, 0, 2 * Math.PI);
			cx.stroke();
		}
		
		// Draw sides of rectangle
		function drawRectangles(id, surfs, color) {
			var cx = document.getElementById(id).getContext("2d");
			cx.strokeStyle = color;
			var N = surfs.length;
			for(var i = 0; i < N; i++) {
				var M = surfs[i].p.length;
				cx.beginPath();
				for(var j = 0; j < M; j++) {
					var s = surfs[i];
					var rr = transform({x: s.p[j].x, y: s.p[j].y});
					if(j == 0) {
						cx.moveTo(rr.x, rr.y);
					} else {
						cx.lineTo(rr.x, rr.y);
					}
				}
				cx.stroke();
			}
		}
		
		// Clear canvas with color
		function clearCanvas() {
			var id = arguments[0];
			var el = document.getElementById(id);
			var color = arguments[1];
			var cx = el.getContext("2d");
			cx.fillStyle = color;
			cx.fillRect(0, 0, c.width, c.height);
		}
		
		// Transform (x, y) to (X, Y)
		function transform(r) {
			var X = (r.x - xmin) / (xmax - xmin) * (XMAX - XMIN);
			X += XMIN;
			var Y = (r.y - ymin) / (ymax - ymin) * (YMAX - YMIN);
			Y += YMIN;
			return {x: X, y: Y};
		}
		
		// Collide particle and a rectangle surface
		function collide(p, surf) {
			// Declare force variable
			var F = new Vect3();
			
			// Define constants
			var kN = 100;
			var gN = 0.2;
			
			if(arguments[1] instanceof Grid4) {
				// Get colliding objects
				var p = arguments[0];
				var surf = arguments[1];
				
				// Calculate normal vector
				var r10 = Vect3.sub(surf.p[1], surf.p[0]);
				var r21 = Vect3.sub(surf.p[2], surf.p[1]);
				var n = Vect3.cross(r10, r21);
				
				// Calculate distance from surface
				var r = p.r;
				var dr = Vect3.sub(r, surf.p[0]);
				var h = Math.abs(Vect3.dot(dr, n));
				
				// Calculate overlap
				var xi = Math.max(0, 0.5 * p.d - h);
				var xidot = Vect3.dot(p.v, n);
				
				// Calculate force
				var f = (xi > 0) ? kN * xi - gN * xidot : 0;
				F = Vect3.mul(f, n);
			} else {
				// Get colliding objects
				var p0 = arguments[0];
				var p1 = arguments[1];
				
				// Calculate overlap
				var r10 = Vect3.sub(p1.r, p0.r);
				var l10 = r10.len();
				var n = r10.unit();
				var v10 = Vect3.sub(p1.v, p0.v);
				var xi = Math.max(0, 0.5 * (p1.d + p0.d) - l10);
				var xidot = Vect3.dot(v10, n);
				
				// Calculate force
				var f = (xi > 0) ? kN * xi - gN * xidot : 0;
				var m0 = p0.m;
				var m1 = p1.m;
				var mu = (m1 * m0) / (m0 + m1);
				f /= mu;
				F = Vect3.mul(f, n);
			}
			
			// Return force value
			return F;
		}
		
		var TBEG = new Date().getTime()
		console.log("BEG: " + TBEG);
		var tbeg = 0;
		var tend = 1000;
		var dt = 5E-2;
		var t = tbeg;
		var NT = 100;
		var iT = 0;
		var NT2 = 10;
		var iT2 = 0;
		
		// 20180222.2117
		var div = document.createElement("div");
		div.style.textAlign = "center";
		var b1 = document.createElement("button");
		b1.innerHTML = "Start";
		div.append(c);
        var ber = document.createElement("br");
        div.appendChild(ber);
		div.appendChild(b1);
		eout.append(div);
		var ekin = document.createElement("div");
		ekin.id = "ekin";
		div.append(ekin);
		
		var iter;
		
		b1.addEventListener("click", function() {
			if(b1.innerHTML == "Start") {
				b1.innerHTML = "Stop";
				sel.disabled = true;
				iter = setInterval(simulate, 5);
			} else {
				b1.innerHTML = "Start";
				clearInterval(iter);
				sel.disabled = false;
			}
		});
				
		function calculate() {
			var M = pars.length;
			
			for(var j = 0; j < M; j++) {
				var p = pars[j];
				
				// Calculate force with wall
				var SF = new Vect3();
				var N = sides.length;
				for(var i = 0; i < N; i++) {
					var F = collide(p, sides[i]);
					SF = Vect3.add(SF, F);
				}
				
				// Calculate force with other particles
				for(var i = 0; i < M; i++) {
					if(i != j) {
						var F = collide(pars[i], pars[j]);
						SF = Vect3.add(SF, F);
					}
				}
				
				// Calculate acceleration
				p.a = Vect3.div(SF, p.m);
				
				// Perform Euler numerical integration
				p.v = Vect3.add(p.v, Vect3.mul(p.a, dt));
				p.r = Vect3.add(p.r, Vect3.mul(p.v, dt));
			}
			
			// Increase time
			t += dt;
			
			// Stop simulation
			if(t > tend) {
				clearInterval(iter);
				var TEND = new Date().getTime();
				console.log("END: " + TEND);
				var TDUR = TEND - TBEG;
				console.log("DUR: " + TDUR);
			}
		}
		
		function simulate() {
			calculate();
			
			iT++;
			iT2++;
			
			if(iT2 >= NT2) {
				// Clear and draw
				clearCanvas("drawingboard", "#fff");
				drawRectangles("drawingboard", sides, "#f00");
				var M = pars.length;
				for(var j = 0; j < M; j++) {
					drawSphere("drawingboard", pars[j], "#00f");
				}
				iT2 = 0;
			}
			if(iT >= NT) {
				// Calculate total kenetic energy
				var K = 0;
				var M = pars.length;
				for(var j = 0; j < M; j++) {
					var v = pars[j].v.len();
					var m = pars[j].m;
					K += (0.5 * m * v * v);
				var sK = K.toExponential(2)
				}
				var aa = sK.split("e")[0];
				var bb = sK.split("e")[1];
				var textEkin = "<i>K</i> = " + aa
					+ " &times; 10<sup>" + bb + "</sup> J";
				ekin.innerHTML = textEkin;
				
				iT = 0;
			}
		}
	}
}

// 20180305.2023 ok
function examRandomLines() {
	var eout = document.getElementById("scriptResult");
    ChangeH("scriptResult",200);
    
	eout.innerHTML = "";
	
	var w = 200;
	var h = 200;
	
	var can = createCanvasWithId("drawingArea", w, h);
	eout.appendChild(can);
	var cx = can.getContext("2d");
	
	var i = 0;
	var di = 1;
	var iend = 1000;
	var sel = window.event.target;
	sel.disabled = true;
	
	var tid = setInterval(randomLine, 10);
	
	var x = w / 2;
	var y = h / 2;
    var theta = randInt(0,4)*90; //Set sudut awal;
	
	function randomLine() {
		if(i >= iend) {
			i = iend;
			clearInterval(tid);
			sel.disabled = false;
		}
		
		//var theta = randInt(0,4)*90; Pake ini lucu
        
        //Belok tegak lurus dengan decision maker bahwa 0 kiri 1 kanan
        if (randInt(0,1)==0){
            //kiri (+90)
            theta += 90;
        } else {
            //kanan (-90)
            theta -= 90;
        }
        
		var dr = randInt(10,20);
		var dx = dr * Math.cos(theta * Math.PI / 180);
		var dy = dr * Math.sin(theta * Math.PI / 180);
		
		var j = (i / iend) * 255;
		cx.strokeStyle = int2rgb(255 - j, 0, j);
		cx.beginPath();
		cx.moveTo(x, y);
		x += dx;
		if(x > w || x < 0) x -= dx;
		y += dy;
		if(y > h || y < 0) y -= dy;
		cx.lineTo(x, y);
		cx.stroke();
		
		i += di;
	}
		
	function createCanvasWithId(id, w, h) {
		var can = document.createElement("canvas");
		can.width = w;
		can.height = h;
		can.style.width = w + "px";
		can.style.height = h + "px";
		can.style.border = "1px solid #bbb";
		can.id = id;
		return can;
	}
}

// 20180305.1948 ok
function examToggleButton() {
	var eout = document.getElementById("scriptResult");
    ChangeH("scriptResult",70);
	eout.innerHTML = "";
	//Tombol 1
	var div1 = document.createElement("div");
    div1.style.display = "inline-block";
	div1.style.width = "40px";
	div1.style.height = "40px";
	div1.style.border = "1px solid #000";
	div1.style.background = "#eee";
	
	var btn1 = document.createElement("button");
	btn1.innerHTML = "Off";
	btn1.style.width = "42px";
	btn1.style.height = "20px";
	btn1.addEventListener("click", switchOnOff1);
	
	
	
	function switchOnOff1() {
		var btn1 = window.event.target;
		if(btn1.innerHTML == "Off") {
			btn1.innerHTML = "On";
			div1.style.background = "#faa";
		} else {
			btn1.innerHTML = "Off";
			div1.style.background = "#eee";
		}
	}
	
    //Tombol 2
	var div2 = document.createElement("div");
    div2.style.display = "inline-block";
	div2.style.width = "40px";
	div2.style.height = "40px";
	div2.style.border = "1px solid #000";
	div2.style.background = "#eee";
	
	var btn2 = document.createElement("button");
	btn2.innerHTML = "Off";
	btn2.style.width = "42px";
	btn2.style.height = "20px";
	btn2.addEventListener("click", switchOnOff2);
	
    
	
	function switchOnOff2() {
		var btn2 = window.event.target;
		if(btn2.innerHTML == "Off") {
			btn2.innerHTML = "On";
			div2.style.background = "#b1ffaa";
		} else {
			btn2.innerHTML = "Off";
			div2.style.background = "#eee";
		}
	}
	
    //Tombol 3
	var div3 = document.createElement("div");
    div3.style.display = "inline-block";
	div3.style.width = "40px";
	div3.style.height = "40px";
	div3.style.border = "1px solid #000";
	div3.style.background = "#eee";
	
	var btn3 = document.createElement("button");
	btn3.innerHTML = "Off";
	btn3.style.width = "42px";
	btn3.style.height = "20px";
	btn3.addEventListener("click", switchOnOff3);
	
    eout.appendChild(div1);
	eout.appendChild(div2);
	eout.appendChild(div3);
    
    var ber = document.createElement("br");
    eout.appendChild(ber);
    
    eout.appendChild(btn1);
	eout.appendChild(btn2);
	eout.appendChild(btn3);
	
	function switchOnOff3() {
		var btn = window.event.target;
		if(btn3.innerHTML == "Off") {
			btn3.innerHTML = "On";
			div3.style.background = "#aac1ff";
		} else {
			btn3.innerHTML = "Off";
			div3.style.background = "#eee";
		}
	}
}

// 20180304.2142 ok
function examChartXY() {
	var eout = document.getElementById("scriptResult");
    ChangeH("scriptResult",200);
	eout.innerHTML = "";
	
	var ecan = document.createElement("canvas");
	ecan.width = "300";
	ecan.height = "200";
	ecan.style.width = "300px";
	ecan.style.height = "200px";
	ecan.id = "drawingArea"
	ecan.style.background = "#f8f8f8";
		
	eout.appendChild(ecan);
	
	var t = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var x = [];
    var A=2, T = 10;
    
    //Buat data x
    for (var i = 0; i<t.length; i++){
        x[i] = A * Math.sin(2 * Math.PI * t[i]/T);
    }
    
    
	var series = new XYSeries("series1", t, x);
	var chart = new Chart2("drawingArea");
	chart.yAxis.Ntics = 4;
    chart.yAxis.label = "x";
	chart.xAxis.Ntics = 5;
    chart.xAxis.label = "t";
	chart.addSeries(series);
	chart.drawSeries("series1");
}

// 20180304.2107 ok
function examTextareaMatrix() {
	var eout = document.getElementById("scriptResult");
    ChangeH("scriptResult",150);
	eout.innerHTML = "";
	
	var elef = document.createElement("div");
	elef.style.width = "125px";
	elef.style.float = "left";
	
	var erig = document.createElement("div");
	erig.style.float = "left";
	erig.style.padding = "4px 50px 4px 50px";
	erig.id = "mathjax-matrix"
	
	var etxa = document.createElement("textarea");
	etxa.style.width = "120px";
	etxa.style.height = "120px";
	etxa.style.overflowY = "scroll"
	etxa.value = "\\frac{1}{10} 2 3 \\log{\\frac{3}{9}} \n"
	+ "0 4 \\sin{x^2} 4 \n"
	+ "1 -\\exp{y} 9 7 \n"
	+ "6 4 5 \\frac{z}{x}";
	
	var ebtn = document.createElement("button");
	ebtn.innerHTML = "MathJax matrix";
	ebtn.style.width = "125px";
	ebtn.addEventListener("click", btnClick);
	
	eout.appendChild(elef);
		elef.appendChild(etxa);
		elef.appendChild(ebtn);
	eout.appendChild(erig);
	
	function btnClick() {
		var content = etxa.value;
		var lines = content.split("\n");
		var M = [];
		for(var j = 0; j < lines.length; j++) {
			var words = lines[j].split(" ");
			var row = [];
			for(var i = 0; i < words.length; i++) {
				var Mel = words[i];
				row.push(Mel);
			}
			M.push(row);
		}
		
		var ROW = M.length;
		
		var latex = "\\begin{equation}\n"
			+ "M = \\left[\n"
			+ "\\begin{array}\n";
		var COL = M[0].length;
		latex += "{" + "c".repeat(COL) + "}\n";
		for(var j = 0; j < ROW; j++) {
			var arow = M[j];
			var COL = arow.length;
			for(var i = 0; i < COL; i++) {
				latex += M[j][i];
				if(i < COL - 1) {
					latex += " & ";
				} else {
					latex += " \\\\\n";
				}
			}
		}
		latex += "\\end{array}\n"
			+ "\\right]\n"
			+ "\\end{equation}";
		
		updateMath("mathjax-matrix", latex)
	}
}

// 20180304.1608 ok
function examTable() {
	var div = document.getElementById("scriptResult");
    ChangeH("scriptResult",250);
	div.innerHTML = "";
	var data = [
		["t", "x", "y"],
	];
    
    var t,x,y;
    var T = 10, A = 2;
    //Mengisi data
    for(var t = 0; t<=10; t++){
        x = (A * Math.cos(2*Math.PI*t/T)).toPrecision(5);
        y = (A * Math.sin(2*Math.PI*t/T)).toPrecision(5);
        data.push([t,x,y]);
    }
    
	var tab = document.createElement("table");
	tab.style.background = "#fee";
	var ROW = data.length;
	for(var j = 0; j < ROW; j++) {
		var row = document.createElement("tr");
		if(j == 0) {
			row.style.background = "#fde";
			row.style.fontWeight = "bold";
			row.style.fontStyle = "italic";
			row.style.fontFamily = "Times";
			row.style.color = "red";
		} else {
			row.style.background = "#ffe";
		}
		var dataRow = data[j];
		var COL = dataRow.length;
		for(var i = 0; i < COL; i++) {
			var dataCol = dataRow[i];
			var col = document.createElement("td");
			col.style.border = "1px solid #fde";
			col.style.width = "80px";
			col.style.textAlign = "center";
			col.innerHTML = dataCol;
			row.appendChild(col);
		}
		tab.appendChild(row);
	}
	div.appendChild(tab);
}

// 20180304.0929 ok
function examSimpleStatistics() {
	var div = document.getElementById("scriptResult");
    ChangeH("scriptResult",110);
	div.innerHTML = "&nbsp;";
	var min = 2;
	var max = 10;
	var N = 20;
	var x = randIntN(min, max, N);
	var xsum = 0;
	for(var i = 0; i < N; i++) {
		xsum += x[i];
	}
	var xavg = xsum / N;
	var str = "xmin = " + min + "<br/>";
	str += "xmax = " + max + "<br/>";
	str += "xsum = " + xsum + "<br/>";
	str += "x = [" + x + "]<br/>";
	str += "N = " + N + "<br/>";
	str += "xavg = " + xavg + "<br/>";
    
    //Mencari median
    //Disort
    var xsort = x.sort(function(a, b){return a-b});
    
    if (N%2 == 0){
        //genap
        var xmed = (xsort[N/2-1]+xsort[N/2])/2;
    } else {
        //ganjil
        var xmed = xsort[Math.floor(N/2)];
    }
    
	//str += "xsort = [" + xsort + "]<br/>";
	str += "xmed = " + xmed + "<br/>";
    
    //Mencari deviasi
    var total = 0;
    for(var i = 0; i < N; i++) {
		total = Math.pow((x[i]-xavg),2)
	}
    var xdev = Math.sqrt(total/(N-1))
	str += "xdev = " + xdev + "<br/>";
    
	div.innerHTML = str;
}

// 20180304.0617 ok
function examProgressBar() {
	var div = document.getElementById("scriptResult");
    ChangeH("scriptResult",15);
	div.innerHTML = "&nbsp;";
	var i = 0;
	var di = 2;
	var iend = 100;
	var sel = window.event.target;
	sel.disabled = true;
	
	var tid = setInterval(progressBar, 100);
	
	function progressBar() {
		if(i >= iend) {
			i = iend;
			clearInterval(tid);
			sel.disabled = false;
		}
		var N = Math.round(i / di);
		var s = "#".repeat(N) + " " + i + " %";
		div.innerHTML = s;
		i += di;
	}
}

// 20180304.0553 ok
function examButtonClick() {
	var div = document.getElementById("scriptResult");
    ChangeH("scriptResult",25);
	div.innerHTML = "&nbsp;";
	var btn1 = document.createElement("button");
	btn1.style.width = "120px";
	btn1.innerHTML = "Not yet clicked";
	btn1.addEventListener("click", buttonClick1);
	div.appendChild(btn1);
    console.log(btn1);
	var clicked1 = 0;
    
    var btn2 = document.createElement("button");
	btn2.style.width = "120px";
    btn2.id = "tes";
	btn2.innerHTML = "Not yet clicked";
	btn2.addEventListener("click", buttonClick2);
	div.appendChild(btn2);
	var clicked2 = 0;
	
	function buttonClick1() {
		clicked2++;
		if(clicked2 == 1) {
			btn2.innerHTML = "Clicked once";
		} else if(clicked2 == 2) {
			btn2.innerHTML = "Clicked twice";
		} else {
			btn2.innerHTML = "Clicked " + clicked2 + " times";
		}
	}
    
	function buttonClick2() {
		clicked1++;
		if(clicked1 == 1) {
			btn1.innerHTML = "Clicked once";
		} else if(clicked1 == 2) {
			btn1.innerHTML = "Clicked twice";
		} else {
			btn1.innerHTML = "Clicked " + clicked1 + " times";
		}
	}
}

// 20180304.0545 ok
function examColorBar() {
	var div = document.getElementById("scriptResult");
    ChangeH("scriptResult", 20)
	div.innerHTML = "&nbsp;";
	N = 16;
	for(var i = 0; i < N; i++) {
		var sp = document.createElement("span");
		var x = i*16 - 1;
		var color = int2rgb(0, 0 + x, 0 );
		sp.style.background = color;
		sp.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;\
		&nbsp;&nbsp;&nbsp;&nbsp;";
		div.appendChild(sp);
	}
}

// 20180304.0530 ok
function examLetterConfiguration() {
	var div = document.getElementById("scriptResult");
    ChangeH("scriptResult",110)
	var str = "Komputasi Sistem Fisis";
	var N = str.length;
	var str2 = "";
	for(var i = N; i >= 0; i-=3) {
		str2 += str.substring(0, i) + "<br/>";
	}
	div.innerHTML = str2;
}

// 20180304.0004 ok
function examDrawCircle() {
    var r = 16;
	var div = document.getElementById("scriptResult");
    ChangeH("scriptResult",100)
	div.innerHTML = "&nbsp;";
	var can = document.createElement("canvas");
	div.appendChild(can);
    
	var cx = can.getContext("2d");
	cx.fillStyle = "#5a5ae3";
	cx.strokeStyle = "#0606c7";
	cx.lineWidth = 3;
	cx.beginPath();
	cx.arc(50, 50, r, 0, 2 * Math.PI);
	cx.fill();
	cx.stroke();
    
    var cx = can.getContext("2d");
	cx.fillStyle = "#5ae38f";
	cx.strokeStyle = "#0f8b3f";
	cx.lineWidth = 3;
	cx.beginPath();
	cx.arc(86, 50, r, 0, 2 * Math.PI);
	cx.fill();
	cx.stroke();
    
    var cx = can.getContext("2d");
	cx.fillStyle = "#ff8de5";
	cx.strokeStyle = "#a30202";
	cx.lineWidth = 3;
	cx.beginPath();
	cx.arc(122, 50, r, 0, 2 * Math.PI);
	cx.fill();
	cx.stroke();
}

// 20180303.2347 ok
function examMathJaxRootFormula() {
	var div = document.getElementById("scriptResult");
	ChangeH("scriptResult",250);
    
	var str = "";
	str += "\\begin{equation}";
	str += "ax^2 + bx + c = 0";
	str += "\\tag{1} \\end{equation}";
    
	str += "\\begin{equation}";
	str += "x_{1,2} = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}";
	str += "\\tag{2} \\end{equation}";
    
	str += "\\begin{equation}";
	str += "x^2 + \\frac{a}{b}x + \\frac{c}{a} = 0";
	str += "\\tag{3} \\end{equation}";
    
	str += "\\begin{equation}";
	str += "(x-x_1)(x-x_2)=0";
	str += "\\tag{4} \\end{equation}";
    
	str += "\\begin{equation}";
	str += "x_1 + x_2 = - \\frac{b}{a}";
	str += "\\tag{5} \\end{equation}";
    
	str += "\\begin{equation}";
	str += "x_1 \\cdot x_2 = \\frac{c}{a}";
	str += "\\tag{6} \\end{equation}";
    
	updateMath("scriptResult", str);
}

// 20180303.2308 ok
function examDisplaySeries() {
	var div = document.getElementById("scriptResult");
    ChangeH("scriptResult",150)
	var N = 10;
	var str = "";
	for(var i = 0; i <= N; i++) {
		str += i*i+2 + "<br/>";
	}
	div.innerHTML = str;
}

// 20180303.2249 ok
function examClear() {
	var div = document.getElementById("scriptResult");
	div.innerHTML = "&nbsp;";	
    ChangeH("scriptResult",5);
}

// 20180303.2249 ok
function examHelloWorld() {
	var div = document.getElementById("scriptResult");
    ChangeH("scriptResult",60);
	div.innerHTML = "Selamat pagi dan selamat datang di folder solusi saya untu U1. <br/>"+
    "Nama saya adalah Muhammad Fauzi Adithya <br/>"+
    "NIM saya adalah 10214076 <br/>"+
    "Senang berkenalan dengan anda.";
}

// 20180304.0937 ok
function executeFunctionByValue(value) {
	switch(value) {
		case "Select problems":
			examClear();
			break;
		case "Hello world":
			examHelloWorld();
			break;
		case "Letter configuration":
			examLetterConfiguration();
			break;
		case "Display series":
			examDisplaySeries();
			break;
		case "Root formula":
			examMathJaxRootFormula();
			break;
		case "Draw circle":
			examDrawCircle();
			break;
		case "Color bar":
			examColorBar();
			break;
		case "Button click":
			examButtonClick();
			break;
		case "Progress bar":
			examProgressBar();
			break;
		case "Simple statistics":
			examSimpleStatistics();
			break;
		case "Table":
			examTable();
			break;
		default:
	}
}
