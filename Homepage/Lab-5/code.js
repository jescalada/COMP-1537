function calculateArea() {
    radius = parseInt(jQuery("#x").val());
    jQuery("#p1").html(radius * radius * 22/7)
}

function setup() {
    jQuery("#calc").click(calculateArea);
}

jQuery(document).ready(setup);