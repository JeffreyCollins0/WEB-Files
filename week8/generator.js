// data for random generation

const objects = [
    "Doorway", "Stairway", "Corridor", "Chamber", "Well", "Switch", "Gate", "Door", "Window", "Chute", 
    "Tunnel", "Vent", "Ladder", "Trap", "Planar gate", "Table", "Mug", "Chalice", "Chair", "Throne",
    "Stool", "Bed", "Futon", "Rug", "Tapestry", "Jail cell", "Obelisk", "Standing stone", "Path marker", "Monument",
    "Grave", "Statue", "Gargoyle", "Plaque", "Inscription", "Button", "Floor tile", "Mosaic", "Carvings"
];

const locations = [
    "Castle", "City", "Hamlet", "Village", "Tavern", "Inn", "Blacksmith", "Storehouse", "Shop", "Library",
    "University", "Stronghold", "Palace", "Mansion", "Desert", "Tower", "Keep", "Vault", "Hideout", "Port",
    "Sand dunes", "Salt flats", "Oasis", "Dead sea", "Canyon", "Sandstorm", "Tornado", "Impact crater", "Fault line", "Swamp",
    "Mud bog", "Sinkhole", "Mangrove forest", "Open ocean", "Seafloor", "Sea trench", "Sea vent", "Whirlpool", "Hurricane", "Tundra",
    "Permafrost", "Snow forest", "Glacier", "Ice floe", "Deciduous forest", "Clearing", "Prairie", "Grasslands", "Savannah", "Dark forest",
    "Cavern", "Underground reservoir", "Cliff", "Mine shaft", "Demiplane", "Farm", "Ranch", "Lumber mill", "Guild Office", "Market",
    "Bakery", "Windmill", "Shed", "Barn", "Stables", "Wild magic zone", "Lake", "River", "Bathhouse", "Hot springs"
];

const modifiers = [
    "Vibrant", "Overgrown", "Floral", "Mossy", "Autumnal", "Damp", "Fairy", "Homely", "Opulent", "Drab",
    "Well-worn", "Clockwork", "Flooded", "Historic", "Dreary", "Unsettling", "Abandoned", "Storied", "Broken", "Crumbling",
    "Rusted", "Dusty", "Bone-dry", "Mysterious", "Arcane", "Airborne", "Floating", "Submerged", "Molten", "Superheated",
    "Sandy", "Buried", "Coastal", "Cliffside", "Shaded", "Shadow", "Collapsed", "Burnt", "Eroded", "Everchanging",
    "Shapeshifing", "Sentient", "Ethereal", "Haunted", "Frozen", "Freezing", "Snow-blown", "Split", "Ramshackle", "Jury-rigged",
    "Handcrafted", "Wooden", "Driftwood", "Sandstone", "Marble", "Obsidian", "Ice", "Snow", "Sea ice", "Magma",
    "Charcoal", "Steel", "Iron", "Copper", "Bronze", "Gold", "Silver", "Void"
];

// functions

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

function generate_content(mod1_field, mod2_field, base_field, is_object){
    // generate first modifier
    var index1 = Math.floor( (Math.random()) * (modifiers.length) );
    // generate second modifier (excluding material modifiers)
    var index2 = Math.floor( (Math.random()) * (modifiers.length - 17) );
    var repeat_count = 0;
    while(index2 == index1 && repeat_count < 5){
        // re-generate second modifier
        index2 = Math.floor( (Math.random()) * (modifiers.length - 17) );
        repeat_count += 1;
        console.log("redoing to avoid a match");
    }
    if(repeat_count >= 5){
        // we got too many repeats, go to the next one manually
        if(index2 < (modifiers.length - 18)){
            // go one up
            index2 += 1;
            console.log("going one up");
        }else{
            // go one down
            index2 -= 1;
            console.log("going one down");
        }
    }

    // populate fields
    document.getElementById(mod1_field).innerHTML = "<h4>"+modifiers[index1]+"</h4>";
    document.getElementById(mod2_field).innerHTML = "<h4>"+modifiers[index2]+"</h4>";

    // generate base
    if(is_object){
        // generate object base
        var index3 = Math.floor( (Math.random()) * (objects.length) );
        // populate field
        document.getElementById(base_field).innerHTML = "<h4>"+objects[index3]+"</h4>";
    }else{
        // generate location base
        var index3 = Math.floor( (Math.random()) * (locations.length) );
        // populate field
        document.getElementById(base_field).innerHTML = "<h4>"+locations[index3]+"</h4>";
    }
}