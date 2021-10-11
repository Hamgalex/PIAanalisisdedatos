function mostrar()
{
    string="";
    n=document.getElementById("numvar");
    var element =  document.getElementById("coord");
    for(i=0;i<n;i++)
    {
        string+="uwu";
       // string="<span>x"+i+"<\\span><input type='number' name='x"+i+"\\>";
        
    }
    element.innerHTML=string;
    document.getElementById('coord').appendChild(personaje);
}