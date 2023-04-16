function validate()
{
var phone=document.getElementById("phone");
var email=document.getElementById("email");
var password=document.getElementById("password");
var mailformat =/^[a-z\A-Z\._\0-9]*[@][a-z]*[\.][a-z]{2,4}$/;
if(phone.value.trim()=="")
{
alert("blank phonenumber not allowed");
phone.style.border="solid 1px red";
document.getElementById("phlabel").style.visibility="visible";
return false;
}
else if(email.value.trim()==""){
    email.style.border="solid 1px red";
    document.getElementById("phemail").style.visibility="visible";
    alert("blank email not allowed");
return false;
}
else if(password.value==""){
    password.style.border="solid 1px red";
    document.getElementById("phpass").style.visibility="visible";
    alert("blank password not allowed");
    return false;
}
else if(password.value.trim().length<8){
document.getElementById("phpass").style.visibility="visible";
alert("Mimimum password lenth=8")
return false;
}
else if(phone.value.trim().length<10 || phone.value.trim().length>10){
phone.style.border="solid 1px red";
document.getElementById("phlabel").style.visibility="visible";
return false;
}
else if(!email.value.match(mailformat)){
    email.style.border="solid 1px red";
    document.getElementById("phemail").style.visibility="visible";
    return false;
}
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
else{
 true;
}
}