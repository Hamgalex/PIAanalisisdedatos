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
}