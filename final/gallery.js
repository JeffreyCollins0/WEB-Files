// variables for the full view modal
var offsetx = 50;
var offsety = 50;
var stored_mouse_x = 0;
var stored_mouse_y = 0;
var mouse_down = false;

// gets value from panning controls
document.getElementById("full_view_interact").addEventListener("mousedown", event => { 
    // start of mouse input
    mouse_down = true;
    stored_mouse_x = event.offsetX;
    stored_mouse_y = event.offsetY;
});
document.getElementById("full_view_interact").addEventListener("mouseup", event => { 
    // end of mouse input
    mouse_down = false;
});
document.getElementById("full_view_interact").addEventListener("mouseleave", event => { 
    // alternate end of mouse input
    mouse_down = false;
});
document.getElementById("full_view_interact").addEventListener("mousemove", event => { 
    if(mouse_down){
        // update slider value
        var x_offset = (0.02) * (stored_mouse_x - event.offsetX);
        var y_offset = (0.02) * (stored_mouse_y - event.offsetY);
        offsetx += x_offset;
        offsety += y_offset;
        // clamp offset to within image bounds
        offsetx = Math.max(offsetx, 0);
        offsetx = Math.min(offsetx, 100);
        offsety = Math.max(offsety, 0);
        offsety = Math.min(offsety, 100);
        // move image position
        document.getElementById("full_view_img").style.objectPosition = (offsetx+"% "+offsety+"%");
    }
});

// displays the full view modal
function fullView(image){
    document.getElementById("full_view_modal").style.display = "block";
    document.getElementById("full_view_img").src = image;
    offsetx = 50;
    offsety = 50;
    document.getElementById("full_view_img").style.objectPosition = (offsetx+"% "+offsety+"%");
}

// closes the full view modal
function closeModal(){
    document.getElementById("full_view_modal").style.display = "none";
}