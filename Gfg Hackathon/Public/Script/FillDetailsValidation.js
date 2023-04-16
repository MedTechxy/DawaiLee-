
function valid()
{
  
   var pin=document.getElementById("pincode");
   if(pin.value.length<6 || pin.value.length>6){
    alert('enter valid pin must be 6 digits');
    document.getElementById("pinlab").style.visibility="visible";
    pincode.style.border="solid 1px red";
    return false;
   }
    if(other.checked){
        con.style.visibility="visible";
    }


}