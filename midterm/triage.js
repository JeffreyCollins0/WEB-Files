// activities by day (42 is a dummy value for "more than 20 minutes")
activities_specific = [ 
    [["Get 6+ hours of sleep", 42, 6], ["Prep a meal", 42, 2]], 
    [["Get 5+ hours of sleep", 42, 5], ["Shave", 15, 5]], 
    [["5 min sketch", 5, 3]], 
    [["Get 5+ hours of sleep", 42, 5], ["Shave", 15, 5], ["20 min project work", 20, 4]], 
    [["Eat a pizza", 42, 5]], 
    [["Eat a pizza", 42, 5], ["5 min exercise", 5, 2]], 
    [["Get 6+ hours of sleep", 42, 6], ["Prep a meal", 42, 2], ["Shave", 15, 5]] 
];
activities_shared = [ 
    ["Brush hair", 42, 5], 
    ["Eat a complete protein", 15, 1], 
    ["Maintain adequate hydration", 5, 1], 
    ["10 min power nap", 10, 3] 
];

// variables
var time_limit = 0;
var mouse_down = false;
var day_selected = 1; // monday by default
var last_selected = "monday";
//fillActivities();

// event listeners for day buttons
document.getElementById("sunday").addEventListener("click", function(){ swapDay(0, "sunday") });
document.getElementById("monday").addEventListener("click", function(){ swapDay(1, "monday") });
document.getElementById("tuesday").addEventListener("click", function(){ swapDay(2, "tuesday") });
document.getElementById("wednesday").addEventListener("click", function(){ swapDay(3, "wednesday") });
document.getElementById("thursday").addEventListener("click", function(){ swapDay(4, "thursday") });
document.getElementById("friday").addEventListener("click", function(){ swapDay(5, "friday") });
document.getElementById("saturday").addEventListener("click", function(){ swapDay(6, "saturday") });

// gets time value from slider
document.getElementById("slider").addEventListener("mousedown", event => { 
    // start of mouse input
    mouse_down = true;
});
document.getElementById("slider").addEventListener("mouseup", event => { 
    // end of mouse input
    mouse_down = false;
});
document.getElementById("slider").addEventListener("mouseleave", event => { 
    // alternate end of mouse input
    mouse_down = false;
});
document.getElementById("slider").addEventListener("mousemove", event => { 
    if(mouse_down){
        // update slider value
        var slider_width = Number(document.getElementById("slider").offsetWidth);
        time_limit = Math.round(20 * (event.offsetX / slider_width));
        document.getElementById("indicator").innerHTML = '<img src="../Assets/Triangle_up_lightblue.svg" alt="" width="25">'+(time_limit + ' min');
        // move slider fill and indicator
        document.getElementById("slider-fill").style.width = (event.offsetX + "px");
        var indicator_width = Number(document.getElementById("indicator").offsetWidth);
        document.getElementById("indicator").style.left = ((event.offsetX - (indicator_width / 2)) + "px");
        // update activity list
        fillActivities();
    }
});

// compares two activities and indicates which has higher impact / time
function compareActivities(activity1, activity2){
    if(activity1[2] == activity2[2]){
        // equal impact, go by time
        if(activity1[1] == activity2[1]){
            return 0;
        }else if(activity1[1] > activity2[1]){
            return 1;
        }else{
            return -1;
        }
    }else if(activity1[2] > activity2[2]){
        return -1;
    }else{
        return 1;
    }
}

// triages events by time taken
function fillActivities(){
    // get options within the time limit
    var options = new Array();
    activities_specific[day_selected].forEach(element => {
        if(element[1] <= time_limit || (element[1] == 42 && time_limit == 20)){
            options.push(element);
        }
    });
    activities_shared.forEach(element => {
        if(element[1] <= time_limit || (element[1] == 42 && time_limit == 20)){
            options.push(element);
        }
    });

    // sort options by impact
    options.sort(compareActivities);

    // display top 6(or fewer) options
    var result = '';
    var upper_bound = Math.min(6, options.length);
    for(var i=0; i<upper_bound; i++){
        result += '<div class="activity"> <p class="activity-title activity-field">'+options[i][0]+'</p> <p class="activity-field">'+options[i][1]+' min</p> <p class="activity-field">impact '+options[i][2]+'</p> </div>';
    }
    document.getElementById("activities-list").innerHTML = result;
}

// swap the selected day
function swapDay(day, button_id){
    day_selected = day;
    // swap active button
    document.getElementById(last_selected).classList.toggle("active");
    document.getElementById(button_id).classList.toggle("active");
    last_selected = button_id;
    // update activity list
    fillActivities();
}