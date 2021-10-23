// game management

// UI scaling
function scale_view(element, container){
    // get container width/height
    var cont_width = Document.getElementById(container).style.width;
    var cont_height = Document.getElementById(container).style.height;
    // maintain aspect ratio
    var min_cont_measurement = Math.min(cont_width, cont_height);
    // set width/height
    Document.getElementById(element).style.width = min_cont_measurement;
    Document.getElementById(element).style.height = min_cont_measurement;
}

// movement/collisions