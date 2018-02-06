var d = new Date();
var m = d.getMonth();
var mm = m;
var y = d.getFullYear();
var yy = y;
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

var months_array = [];
months_array.push(months[m] + ' ' + y + ' ' + (m+1) + ' ' + monthsShort[m]); // Passes 1) Month as a text, 2) Year, 3) Month as a readable number (+1) 
// console.log(months_array, months_array, mm);

// Get 5 previous months
for (i=0; i<5; i++) { 
    m--;
    if(m < 0 ) {
        y--;
        m = 11;
    }
    months_array.unshift(months[m] + ' ' + y + ' ' + (m+1) + ' ' + monthsShort[m]); // Passes 1) Month as a text, 2) Year, 3) Month as a readable number (+1)
}

// Get 11 next months
for (i=0; i<11; i++) { 
    mm++;
    if(mm > 11 ) {
        yy++;
        mm = 0;
    }
    months_array.push(months[mm] + ' ' + yy + ' ' + (mm+1) + ' ' + monthsShort[mm]);
}

// Appending HTML, with classes according to initial state.
months_array.forEach(function(el, index) {
var split_el = el.split(" ");
var dateText = "<span class='fullMonth'>" + split_el[0] + "</span>" + "<span class='shortMonth'>" + split_el[3] + "</span>" + "<br>" + split_el[1];

// console.log('foreach', dateText, index);
if (index < 5) {
    document.getElementById('app').innerHTML += "<div class='month col s12 m1 show' data-month='" + split_el[2] + "' data-year='" + split_el[1] + "'><p class='dateText'>" + dateText + "</p></div>";
    document.getElementById('agenda-dropdown').innerHTML += "<li data-month='" + split_el[2] + "' data-year='" + split_el[1] + "'><a href='#'>" + split_el[0] + ' ' + split_el[1] + "</a></li>";

}
else if (index == 5) {
    document.getElementById('app').innerHTML += "<div class='month col s12 m1 show active' data-month='" + split_el[2] + "' data-year='" + split_el[1] + "'><p class='dateText'>" + dateText + "</p></div>";
    document.getElementById('agenda-dropdown').innerHTML += "<li class='divider'></li>" + "<li data-month='" + split_el[2] + "' data-year='" + split_el[1] + "' class='active'><a href='#'>" + split_el[0] + ' ' + split_el[1] + "</a></li>";
}
else if (index < 12) {
    document.getElementById('app').innerHTML += "<div class='month col s12 m1 show second-half' data-month='" + split_el[2] + "' data-year='" + split_el[1] + "'><p class='dateText'>" + dateText + "</p></div>";
    document.getElementById('agenda-dropdown').innerHTML += "<li data-month='" + split_el[2] + "' data-year='" + split_el[1] + "'><a href='#'>" + split_el[0] + ' ' + split_el[1] + "</a></li>";
}
else {
    document.getElementById('app').innerHTML += "<div class='month col s12 m1' data-month='" + split_el[2] + "' data-year='" + split_el[1] + "'><p class='dateText'>" + dateText + "</p></div>";
    document.getElementById('agenda-dropdown').innerHTML += "<li data-month='" + split_el[2] + "' data-year='" + split_el[1] + "'><a href='#'>" + split_el[0] + ' ' + split_el[1] + "</a></li>";
}
// Class "show" refers to whether the div is shown on tablets and up, class "active" refers to active month on mobile version

});


// Calculate agenda widths
var agenda_w = $('#agenda').outerWidth();
var documentWidth = window.innerWidth;

// var month_w = agenda_w / 12;
// $('.month').outerWidth(month_w); // divided by 12 months, minus 2 pixels (not calculating border)
// $('#app').outerWidth(month_w * 17);
/* Old method: Individual month divs are calculated first, then we multiply their width by 17 (total months). 
    This method turned out to be less effective cause browsers render divisions of pixel in a different way (read about subpixel rendering),
    causing a loss of +-2 pixels in some cases */

if (documentWidth > 600) {
    $('#app').outerWidth(agenda_w * 1.4166666);
}  
/* New method: Get agenda width when page is loaded, and set the width to be 17/12=1.4166666 larger (total months divided by months shown)
    Month wrapper width is calculated from the outer div width, in order to be able to use a fixed percentage width with CSS in the month divs,
    thus letting the browsers render properly and in their own way the pixel divisions. */


// Tablet and up click on arrows event
$('.agenda-btn').on('click', function(e) {

    e.preventDefault();
    $(this).addClass("inactive");

    if ($(this).hasClass('btn-right')) {
        $('.agenda-btn.btn-left').removeClass('inactive');  // Arrow Class
        $('#app').addClass('scrolled');                     // Month Wrapper Class
        toggleActiveDivs();
        toggleSecondHalfDivs();
    }
    else {
        $('.agenda-btn.btn-right').removeClass('inactive'); // Arrow Class
        $('#app').removeClass('scrolled');                  // Month Wrapper Class
        toggleActiveDivs();
        setTimeout(() => {
        toggleSecondHalfDivs();
        }, 50);
    }

    // Months shown when scrolling. Used with :hover to show events that are only shown at the moment.
    function toggleActiveDivs() {
        $('.month').each(function(index, el) {
        if (index < 5) {
            $(this).toggleClass('show');
        }
        else if (index > 11) {
            $(this).toggleClass('show');
        }
        });
    }
    
    // Used to find first 6 and last 6 months in order to float the events accordingly. (nth-child doesn't work when classes are changing).
    function toggleSecondHalfDivs() {
        $('.month.show').each(function(index, el) {
        if (index <= 5) {
            $(this).removeClass('second-half');
        }
        else {
            $(this).addClass('second-half');
        }
        });
    }
        
});

// Mobile dropdown functionality
$('#agenda-dropdown li').on('click', function(e) {

    e.preventDefault();

    $('#agenda-dropdown li').removeClass('active');
    $(this).addClass('active');
    var selectedMonth = $(this).data('month');
    var selectedYear = $(this).data('year');
    $('.month').removeClass('active');
    $('.month[data-month="' + selectedMonth + '"][data-year="' + selectedYear + '"]').addClass('active');


});


    

getJSON.events.forEach(function(event){

// console.log('EVENT: ' + event.id + event.title + event.type + event.location + event.starting + event.ending);

var eventStarting = event.starting.split('-');
var eventEnding = event.ending.split('-');

var startingMonth = eventStarting[1];
var endingMonth = eventEnding[1];

var startingYear = eventStarting[0];
var endingYear = eventEnding[0];

eventMonths = [parseInt(startingMonth)];
eventYears = [parseInt(startingYear)];

// If event lasts more than a month, create arrays that show which month and year the event take place in 
while (startingMonth != endingMonth) {
    startingMonth++;
    if (startingMonth > 12) {
    startingMonth = 1;
    startingYear++;
    }
    eventMonths.push(parseInt(startingMonth));
    eventYears.push(parseInt(startingYear));
} 
// console.log('eventMonths', eventMonths);
// console.log('eventYears', eventYears);

for (i=0; i<eventMonths.length; i++) {
    // console.log('eventMonths[i]',eventMonths[i], $('.month[data-month="' + eventMonths[i] + '"]'));
    $('.month[data-month="' + eventMonths[i] + '"][data-year="' + eventYears[i] + '"]').append("\
    <div class='event'>\
        <p class='event-title'>" + event.title + "</p>\
        <p class='event-location'>Location : " + event.location + "</p>\
        <p class='event-type'>Type : " + event.type + "</p>\
        <p class='event-period'>Period : From " + event.starting + " to " + event.ending + "</p>\
        <p class='event-url'><a href=" + event.url + ">Read more</a></p>\
    </div>");
} // Append current event in the div 


});
