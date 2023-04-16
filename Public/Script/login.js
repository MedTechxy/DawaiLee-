function validation()
{
    const email=document.getElementById("email");
    const pass=document.getElementById("password");
    if(email.value.trim()=="")
    {
        alert("Email field is empty");
        email.style.border="solid 1px red";
        document.getElementById("Lemail").style.visibility="visible";
        return false;
    }
    else if(pass.value.trim()==""){
        alert("Paaword field is empty");
        pass.style.border="solid 1px red";
        document.getElementById("LPass").style.visibility="visible";
        return false;
    }
    // else if(pass.value.trim().length<8){
    //     alert("Password is to short it must be 8 characterstics");
    //     pass.style.border="solid 1px red";
    //     document.getElementById("LPass").style.visibility="visible";
    //     return false;
    // }
    else{
        true;
    }
}