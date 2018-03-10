/*
Script my Project

10214076
Muhammad Fauzi Adithya | fauzi.adithya@gmail.com
*/

function examMyProject(){
    ChangeH("scriptResult",250);
    document.getElementById("scriptResult").style.height = "250px"
    var bod = document.getElementById("bod");
    
    var div = document.getElementById("scriptResult");
	div.innerHTML = "";
	var sel = window.event.target;
    var h = 200;
    var w = 300;
    can = createCanvasWithId("Arena", w, h);
    cx = can.getContext("2d");
    
    
    
    var ber = document.createElement("br");
    
    //Buat tombol
    var btn = document.createElement("button");
    btn.style.width = "300px";
    btn.style.height = "20px";
    btn.addEventListener("keypress", Arah);
    btn.innerHTML = "Play";
    btn.addEventListener("click", btnClick)
    
    //Untuk indikasi hunger
    var sp = document.createElement("div");
    sp.id = "hunger"
    //sp.style.display = "inline-block";
    sp.style.width = "300px";
    sp.style.height = "15px";
    sp.style.border = "1px hidden #000";
    var color = int2rgb(0, 255, 0 );
    var r = 0;
    sp.style.background = color;
    
    //Untuk kotak score
    var sc = document.createElement("div");
    sc.id = "Score"
    sc.style.display = "inline-block";
    sc.style.width = "150px";
    sc.style.height = "200px";
    sc.style.border = "1px hidden #000";
    var color = int2rgb(248, 248, 248 );
    var r = 0;
    sc.style.background = color;
    
    //untuk canvas score
    var ecan = document.createElement("canvas");
	ecan.width = 145;
	ecan.height = 178;
	ecan.id = "drawingArea";
	ecan.style.background = "#f8f8f8";
    sc.appendChild(ecan);
    
    //untuk canvas score
    var tsc = document.createElement("div");
    tsc.id = "tulisanScore"
    tsc.innerHTML="SCORE = 0";
	tsc.style.width = "145px";
    tsc.style.height = "22px";
	tsc.style.border = "1px hidden #000";
    sc.appendChild(tsc);
    
    //Gambar score
    var t=[0];
    var score = [0];
    var ti = 1;
    var smax = 0;
    var tscore = 0;
        
    
    div.appendChild(can); 
    div.appendChild(sc);
    div.appendChild(ber);
    div.appendChild(sp);
    div.appendChild(btn);
    
    
    //Arah inisiasi ke bawah
    var dx = 0;
    var dy = 10;
    //Snake Body from array 
    var sBody = [[10,10,10,10,10,10,10],[70,60,50,40,30,20,10]];
    
    var food = [0,0];
    //Random Lokasi
    food[0] = randInt(0,w/10)*10;
    food[1] = randInt(0,h/10)*10;
    spawnFood();
    
    sDraw(sBody);
    
    
    
    //Create Canvas
    function createCanvasWithId(id, w, h) {
		var can = document.createElement("canvas");
        can.addEventListener("keypress", Arah);
		can.width = w;
		can.height = h;
		can.style.width = w + "px";
		can.style.height = h + "px";
		can.style.border = "1px solid #bbb";
		can.id = id;
		return can;
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
    
    //Function for draw body
    function sDraw (sBody){
        clearCanvas("Arena", "#f8f8f8")
        L = sBody[0].length; //Jumlah titik badan
        cx.strokeStyle = "#000000"
        cx.beginPath();
        cx.moveTo(sBody[0][0], sBody[1][0]);
        for (var i = 1; i<L; i++){
            //cek apakah beda jaraknya jauh atau tidak untuk nembus atau tidak
            if (Math.abs(sBody[0][i]-sBody[0][i-1])>100 || Math.abs(sBody[1][i]-sBody[1][i-1])>100){
            //if (i%3 == 0){
                cx.moveTo(sBody[0][i],sBody[1][i]);
            } else {
                cx.lineTo(sBody[0][i],sBody[1][i]);
            }
        }
        cx.stroke();
    }

    //Function for play/pause button
    var run;
    var pause = true;
    function btnClick(){
        var inner = btn.innerHTML;
        btn = window.event.target;
        if (inner == "Play"){
            btn.innerHTML = "Pause";
            pause = false;
            sel.disabled = true;
            bod.addEventListener("keypress", Arah);
            run = setInterval(updateCanvas,100);
        } else if (inner == "Pause"){
            btn.innerHTML = "Play";
            pause = true;
            sel.disabled = false;
            bod.removeEventListener("keypress", Arah);
            clearInterval(run);
        } else if (inner == "Ulang"){
            btn.innerHTML = "Play";
            sel.disabled = false;
            
            //Arah inisiasi ke bawah
            dx = 0;
            dy = 10;
            //Snake Body from array 
            sBody = [[10,10,10,10,10,10,10],[70,60,50,40,30,20,10]];
            r = 0;
            color = int2rgb(r, 255-r, 0 );
            sp.style.background = color;
            sDraw(sBody);
            
            //Reset Score
            t=[0];
            score = [0];
            ti = 1;
            smax = 0;
            UpdateScore();
        }
    }
    
    //Pengubahan arah
    function Arah(event){
        var x = event.which;
        
        switch(x) {
            case 100: //kanan
                if (dx!=-10){
                    dx = 10;
                    dy = 0;
                }
                break;
            case 119: //Atas
                if (dy!=10){
                    dx = 0;
                    dy = -10;
                }
                break;
            case 115: //Bawah
                if (dy!=-10){
                    dx = 0;
                    dy = 10;
                }
                break;
            case 97: //Kiri
                if (dx!=10){
                    dx = -10;
                    dy = 0;
                }
                break;
        }
    }
    
    //Update gambar di canvas
    function updateCanvas(){
        //Hilang belakang
        sBody[0].pop();
        sBody[1].pop();
        
        //Muka baru
        sBody[0].unshift(sBody[0][0]+dx);//muka baru x
        sBody[1].unshift(sBody[1][0]+dy);//muka baru y
        
        //Melewati Batas
        if (sBody[0][0]<0){//batas kiri
            sBody[0][0]=w;
        }
        if (sBody[0][0]>w){//batas kanan
            sBody[0][0]=0;
        }
        if (sBody[1][0]<0){//batas atas
            sBody[1][0]=h;
        }
        if (sBody[1][0]>h){//batas bawah
            sBody[1][0]=0;
        }
        
        uHung();
        UpdateScore();
        checkBody();
        sDraw(sBody);
        spawnFood();
    }
    
    //Update kotak score
    function UpdateScore(){
        
        //fungsi pengurangan score
        function smoothmin(x){
            var x = (ti - tscore)/40; //angka pembagi seberapa lambat turunnya score 
            var y = Math.pow(x,3)
            y *= smax;
            //y = Math.floor(y*100)/100
            return y;
        }
        
        if (t.length<20){
            t.push(ti);
            score.push(smax-smoothmin(ti));
        } else {
            t.shift();
            score.shift();
            t.push(ti)
            score.push(smax-smoothmin(ti));            
        }
        
        if (score[t.length-1]<0){
            score[t.length-1]=0;
        }
        tsc.innerHTML="SCORE = " + score[t.length-1].toPrecision(6);
        
        var series = new XYSeries("series1", t, score);
        var chart = new Chart2("drawingArea");
        chart.xAxis.label = "t";
        chart.yAxis.label = "x";
        chart.yAxis.Ntics = 1;
        chart.xAxis.Ntics = 0;
        chart.addSeries(series);
        
        if(series.ymin >= 0){
            chart.yAxis.range.min = 0;
        }
        chart.drawSeries("series1");
        
        ti++;
    }
    
    //Update hunger
    function uHung(){
        if(r>256){
            console.log("Mati kelaparan cuk");
            clearInterval(run);
            btn.innerHTML="Ulang";
        }
        color = int2rgb(r, 255-r, 0 );
        sp.style.background = color;
        r+=256/64;
    }
    
    //Cek kolision muka
    function checkBody(){
        //Cek sama diri sendiri
        for (var i =1; i<sBody[0].length;i++){
            if (sBody[0][0]==sBody[0][i] && sBody[1][0]==sBody[1][i]){
                clearInterval(run);
                console.log("Mati cog");
                btn.innerHTML="Ulang";
            }
        }
        
        //Cek sama makanan
        if(sBody[0][0]==food[0] && sBody[1][0]==food[1]){//Tabrak
            //Random Lokasi
            food[0] = randInt(0,w/10)*10;
            food[1] = randInt(0,h/10)*10;
            eatFood();
        }
    }
    
    //Bikin makanan
    function spawnFood(){        
        //Gambar di lokasi
        cx.fillStyle = "#f56464";
        cx.strokeStyle = "#c70606";
        cx.lineWidth = 1;
        cx.beginPath();
        cx.arc(food[0], food[1], 3, 0, 2 * Math.PI);
        cx.fill();
        cx.stroke();
    }
    
    //Fungsi ketika makan
    function eatFood(){
        L = sBody[0].length;
        for (var i = 0; i<3; i++){
            sBody[0].push(sBody[0][L-1]);
            sBody[1].push(sBody[1][L-1]);
        }
        r=0;
        score[score.length-1] += 100;
        smax = score[score.length-1];
        tscore = ti;
    }
}