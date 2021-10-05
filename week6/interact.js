function collapse_section(id){
    var element = document.getElementById(id);
    if(element.style.visibility == "hidden"){
        // expand the section
        element.style.height = "auto";
        element.style.visibility = "inherit";
    }else{
        // hide the section
        element.style.height = "0";
        element.style.visibility = "hidden";
    }
}