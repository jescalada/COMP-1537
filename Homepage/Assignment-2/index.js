var currentPage = 1; // Default currentPage value
var lastData;
//var pageSize = 0;

function ajaxGet() {
    let movieName = jQuery('#movie-name-input').val();
    let apiKey = "ed4ef9b0f9bcb9c237ab83a2c2ffb909";
    
    $.ajax(
        {
            "url":`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movieName}&page=1&include_adult=false`,
            "type": "GET",
            "success": loadData
        }
    )
}

function loadData(data) {
    lastData = data;

    $("#movies").empty();
    $(".pagination").empty();
    
    let numberOfResults = data.results.length;
    let pageSize = $("#results-per-page").val(); // Get actual pageSize
    let totalPages = Math.ceil(numberOfResults / pageSize);
    
    if (currentPage > totalPages) {
        currentPage = totalPages;
    } else if (currentPage < 1) {
        currentPage = 1;
    }

    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = currentPage * pageSize;

    
    $(".pagination").append(`<a href="#" id="first-link" onclick="changePage(1)" hidden>First</a>`);
    $(".pagination").append(`<a href="#" id="left-link" onclick="changePage(getCurrentPage() - 1)" hidden>Prev</a>`);

    for (i = 0; i < totalPages; i++) {
        let button = `
            <a href="#" class="${i + 1 == currentPage ? "active" : ""}" onclick="changePage(${i + 1})">${i + 1}</a>
        `;
        
        $(".pagination").append(button);
    }

    $(".pagination").append(`<a href="#" id="right-link" onclick="changePage(getCurrentPage() + 1)" hidden>Next</a>`);
    $(".pagination").append(`<a href="#" id="last-link" onclick="changePage(${totalPages})" hidden>Last</a>`);
    
    for (i = startIndex; i < endIndex; i++) {
        let movie = data.results[i]
        
        // Here, I define a new element to append to the #movies ul.
        
        // In the h2, I am appending the title of the movie, and then I am using the ternary operator (if statement ? then : else)
        // In the ternary operator, I'm checking if release_date is not null, in which case I put it between parenthesis and add it to the h2
        // If release_date is null, then it does not append anything
        // release_date has the form 2022-03-08 when not null, I slice it to obtain only the year of release

        // In the img tag, I am also using a ternary operator to append the movie poster image if it is not null, or put a default image if it is null
        let listEntry = `
        <li id="movie-${i}">
            <p class="movie-counter">#${i + 1}</p>
            <h2>${movie.original_title} ${ movie.release_date ? "(" + movie.release_date.slice(0, 4) + ")" : "" }</h2>
            <p>${movie.overview}</p>
            <img src=" ${ movie.poster_path ? "http://image.tmdb.org/t/p/w500/" + movie.poster_path : "https://demofree.sirv.com/nope-not-here.jpg" } " width="100" style="display: block; margin-left: auto; margin-right: auto;">
            <p style="text-align: center;">Click to see backdrop</p>
        </li>
        <hr>
        `;

        // We add a JQuery listener on the PARENT ELEMENT of the movies. This is because the movies don't yet exist until we append them into the DOM 
        $("#movies").on("click", `#movie-${i}`, function() {
            $("#backdrop").attr("src", `${ movie.backdrop_path ? "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/" + movie.backdrop_path : "https://demofree.sirv.com/nope-not-here.jpg" }`);
        });

        $("#movies").append(listEntry);
    }
}

function setup() {
    $('#search-button').click(ajaxGet);
}

function getCurrentPage() {
    return currentPage;
}

function changePage(newPage) {
    try {
        currentPage = newPage;
        loadData(lastData);    
    } catch (e) {

    }
    $("#first-link").prop("hidden", false);
    $("#left-link").prop("hidden", false);
    $("#right-link").prop("hidden", false);
    $("#last-link").prop("hidden", false);
}

function changePageSize() {
    try {
        loadData(lastData);    
    } catch (e) {
        
    }
    $("#first-link").prop("hidden", false);
    $("#left-link").prop("hidden", false);
    $("#right-link").prop("hidden", false);
    $("#last-link").prop("hidden", false);
}

$(document).ready(setup);