/*
Script for the UI
Not essential

10214076
Muhammad Fauzi Adithya | fauzi.adithya@gmail.com
*/


function ChangeH (id, h){
    /*Ver 1
    var c = document.getElementById(id);
    var run;
    if (parseFloat(c.style.height) < h){ //h target lebih besar
        run = setInterval(add,1);
    } else { //h target lebih kecil
        run = setInterval(sub,1);
    }
    
    function add(){
        hasil = parseFloat(c.style.height);
        hasil++;
        hasil +="px";
        c.style.height = hasil;
        
        if(parseFloat(c.style.height)>=h){
            clearInterval(run);
        }
    }
    
    function sub(){
        hasil = parseFloat(c.style.height);
        hasil--;
        hasil +="px";
        c.style.height = hasil;
        
        if(parseFloat(c.style.height)<=h){
            clearInterval(run);
        }
    }*/
    
    
    //Ver 2 (Smoothing)
    var c = document.getElementById(id);
    
    var awal = parseFloat(c.style.height);
    var run, t;
    var step = 100;
    var dt = 1/step;
    if (parseFloat(c.style.height) < h){ //h target lebih besar
        t = 0;
        run = setInterval(add,1);
    } else { //h target lebih kecil
        t = 0;
        run = setInterval(sub,1);
    }
    
    function add(){
        hasil = awal + (f(t)*(h-awal));
        hasil +="px";
        c.style.height = hasil;
        
        if(parseFloat(c.style.height)>=h){
            clearInterval(run);
        }
        t+=dt;
    }
    
    function sub(){
        hasil = awal - (f(t)*(awal-h));
        hasil +="px";
        c.style.height = hasil;
        
        if(parseFloat(c.style.height)<=h){
            clearInterval(run);
        }
        t+=dt;
    }
    
    function f(x){
        return 6*Math.pow(x,5) - 15*Math.pow(x,4) + 10*Math.pow(x,3);
    }
}