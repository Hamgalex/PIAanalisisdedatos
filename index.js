function mostrar()
{
    n=document.getElementById("numvar").value;
    console.log(n);
    for(i=0;i<n;i++)
    {
        var inputx = document.createElement("input");
        var inputy = document.createElement("input");
        var labelx = document.createElement("LABEL");
        var labely = document.createElement("LABEL");
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
        document.getElementById('coord').appendChild(br);
    }
    botonsolve.disabled=false;
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
}


let M = 10;
 
// Function to print the matrix
function PrintMatrix(a,n)
{
    for (let i = 0; i < n; i++)
    {
        for (let j = 0; j <= n; j++)
            document.write(a[i][j] + " ");
        document.write("<br>");
    }
}
 
// function to reduce matrix to reduced
// row echelon form.
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
 
// Function to print the desired result
// if unique solutions exists, otherwise
// prints no solution or infinite solutions
// depending upon the input given.
function PrintResult(a,n,flag)
{
    
    string="";
    if (flag == 2)    
        string="Hay puntos repetidos, lo que causa un error.";
    else if (flag == 3)    
        string="No hay solución para el sistema de ecuaciones";
       
       

    // Printing the solution by dividing constants by
    // their respective diagonal elements
    else {
        
        for (let i = 0; i < n; i++)
            if(i==0)
                string+=" "+(a[i][n] / a[i][i]);
            else
                if(i==1)
                    string+=" + "+(a[i][n] / a[i][i])+"x";   
                else
                    string+=" + "+(a[i][n] / a[i][i])+"x^"+i; 
                    
                    
    }

    document.getElementById("resultado").innerHTML =string;
}
 
// To check whether infinite solutions
// exists or no solution exists
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
 

// Order of Matrix(n)

 
