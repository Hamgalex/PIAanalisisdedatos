stringu="";
function mostrar()
{
    n=document.getElementById("numvar").value;
    console.log(n);
    for(i=0;i<n;i++)
    {
        var inputx = document.createElement("input");
        var inputy = document.createElement("input");
        var labelx = document.createElement("span");
        var labely = document.createElement("span");
        
        var br = document.createElement("br")
        inputx.type = "number";
        inputx.id= "x"+i;
        labelx.innerHTML="x"+i;
        inputy.type = "number";
        inputy.id= "y"+i;
        labely.innerHTML="y"+i;


        var br = document.createElement("br");
        document.getElementById('coord').appendChild(labelx);
        document.getElementById('coord').appendChild(inputx);
        
        document.getElementById('coord').appendChild(labely);
        document.getElementById('coord').appendChild(inputy);
        
    }
    botonsolve.disabled=false;
    botonsolve.classList.remove("botonDisabled")
    botonsolve.classList.add("boton")
    numvar.disabled=true;
   
}
function solver()
{
    n=document.getElementById("numvar").value;
    var x = [];
    var y = [];
    for(var i=0; i<n; i++) 
    {
        x[i]=document.getElementById("x"+i).value;
        y[i]=document.getElementById("y"+i).value;

    }

    let a = new Array(n); // create an empty array of length n
    for (var i = 0; i < n; i++) 
    {
        a[i] = new Array(parseInt(n)+1); // make each element an array
    }

    for(var i=0;i<n;i++)
    {
        a[i][0]=1;
        for(var j=1;j<parseInt(n);j++)
            a[i][j]=Math.pow(x[i],j);
        a[i][n]=parseFloat(y[i]);
    }

    
    let flag = 0;
 
    // Performing Matrix transformation
    flag = PerformOperation(a, n);
     
    if (flag == 1)    
        flag = CheckConsistency(a, n, flag);
     
    // Printing Final Matrix
    // Printing Solutions(if exist)
    PrintResult(a, n, flag);

    

    console.log (x);
    console.log (y);


    console.log(a);
    draw();
}


let M = 10;
 

function PrintMatrix(a,n)
{
    for (let i = 0; i < n; i++)
    {
        for (let j = 0; j <= n; j++)
            document.write(a[i][j] + " ");
        document.write("<br>");
    }
}
 

function PerformOperation(a,n)
{
    let i, j, k = 0, c, flag = 0, m = 0;
    let pro = 0;
       
    // Performing elementary operations
    for (i = 0; i < n; i++)
    {
        if (a[i][i] == 0)
        {
            c = 1;
            while ((i + c) < n && a[i + c][i] == 0)
                c++;        
            if ((i + c) == n)
            {
                flag = 1;
                break;
            }
            for (j = i, k = 0; k <= n; k++)
            {
                let temp =a[j][k];
                a[j][k] = a[j+c][k];
                a[j+c][k] = temp;
            }
        }
   
        for (j = 0; j < n; j++)
        {
               
            // Excluding all i == j
            if (i != j)
            {
                   
                // Converting Matrix to reduced row
                // echelon form(diagonal matrix)
                let p = a[j][i] / a[i][i];
   
                for (k = 0; k <= n; k++)                
                    a[j][k] = a[j][k] - (a[i][k]) * p;            
            }
        }
    }
    return flag;
}
 

function PrintResult(a,n,flag)
{
    
    string="";
    if (flag == 3)    
        string="No hay solución para el sistema de ecuaciones";
       
       

    // Printing the solution by dividing constants by
    // their respective diagonal elements
    else {
        
        for (let i = 0; i < n; i++)
        {
            if(i==0)
            {
                if(a[i][i]!=0)
                    string+=" "+(a[i][n] / a[i][i]);
            } 
            else
                if(i==1)
                {
                    if(a[i][n]!=0)
                        string+=" + "+(a[i][n] / a[i][i])+"*x";   
                }
                else
                {
                    if(a[i][n]!=0)
                        string+=" + "+(a[i][n] / a[i][i])+"*x^"+i; 
                }
        }
            
                    
                    
    }

    document.getElementById("resultado").innerHTML =string;
    stringu=string;
    stringu=stringu.replace(/\^/g,"\*\*");
    console.log(stringu);
}
 

function CheckConsistency(a,n,flag)
{
    let i, j;
    let sum;
       
    // flag == 2 for infinite solution
    // flag == 3 for No solution
    flag = 3;
    for (i = 0; i < n; i++)
    {
        sum = 0;
        for (j = 0; j < n; j++)    
            sum = sum + a[i][j];
        if (sum == a[i][j])
            flag = 2;    
    }
    return flag;
}
 
function fun1(x) 
{


    return eval(stringu);
}

function draw() {
 var canvas = document.getElementById("canvas");
 if (null==canvas || !canvas.getContext) return;

 var axes={}, ctx=canvas.getContext("2d");
 axes.x0 = .5 + .5*canvas.width;  // x0 pixels from left to x=0
 axes.y0 = .5 + .5*canvas.height; // y0 pixels from top to y=0
 axes.scale = 40;                 // 40 pixels from x=0 to x=1
 axes.doNegativeX = true;

 showAxes(ctx,axes);
 funGraph(ctx,axes,fun1,"#2ceac8",4); 
}

function funGraph (ctx,axes,func,color,thick) {
 var xx, yy, dx=4, x0=axes.x0, y0=axes.y0, scale=axes.scale;
 var iMax = Math.round((ctx.canvas.width-x0)/dx);
 var iMin = axes.doNegativeX ? Math.round(-x0/dx) : 0;
 ctx.beginPath();
 ctx.lineWidth = thick;
 ctx.strokeStyle = color;

 for (var i=iMin;i<=iMax;i++) {
  xx = dx*i; yy = scale*func(xx/scale);
  if (i==iMin) ctx.moveTo(x0+xx,y0-yy);
  else         ctx.lineTo(x0+xx,y0-yy);
 }
 ctx.stroke();
}

function showAxes(ctx,axes) {
 var x0=axes.x0, w=ctx.canvas.width;
 var y0=axes.y0, h=ctx.canvas.height;
 var xmin = axes.doNegativeX ? 0 : x0;
 ctx.beginPath();
 ctx.strokeStyle = "rgb(128,128,128)"; 
 ctx.moveTo(xmin,y0); ctx.lineTo(w,y0);  // X axis
 ctx.moveTo(x0,0);    ctx.lineTo(x0,h);  // Y axis
 ctx.stroke();
}

 
