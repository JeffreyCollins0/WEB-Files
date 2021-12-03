var menu_open = false;

function openMenu(){
    var items = document.getElementsByClassName("nav_item");
    for(var i=0; i<items.length; i++){
        items[i].style.display = "block";
    }
    menu_open = true;
}

function closeMenu(){
    var items = document.getElementsByClassName("nav_item");
    for(var i=0; i<items.length; i++){
        items[i].style.display = "none";
    }
    menu_open = false;
}

function toggleMenu(){
    if(window.matchMedia("(max-width: 701px)").matches){
        if(menu_open){
            closeMenu();
        }else{
            openMenu();
        }
    }else{
        openMenu();
    }
}