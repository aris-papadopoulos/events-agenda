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
        console.log(months_array);
    }

    // Get 11 next months
    for (i=0; i<11; i++) { 
        mm++;
        if(mm > 11 ) {
            yy++;
            mm = 0;
        }
        months_array.push(months[mm] + ' ' + yy + ' ' + (mm+1) + ' ' + monthsShort[mm]);
        console.log(months_array);
    }

    months_array.forEach(function(el, index) {
        console.log('element', el);
    var split_el = el.split(" ");
    var dateText = "<span class='fullMonth'>" + split_el[0] + "</span>" + "<span class='shortMonth'>" + split_el[3] + "</span>" + "<br>" + split_el[1];

    // console.log('foreach', dateText, index);
    if (index < 6) {
        document.getElementById('app').innerHTML += "<div class='month col m1 active' data-month='" + split_el[2] + "' data-year='" + split_el[1] + "'><p class='dateText'>" + dateText + "</p></div>";
    }
    else if (index < 12) {
        document.getElementById('app').innerHTML += "<div class='month col m1 active second-half' data-month='" + split_el[2] + "' data-year='" + split_el[1] + "'><p class='dateText'>" + dateText + "</p></div>";
    }
    else {
        document.getElementById('app').innerHTML += "<div class='month col m1' data-month='" + split_el[2] + "' data-year='" + split_el[1] + "'><p class='dateText'>" + dateText + "</p></div>";
    }
    // Appending HTML, with classes according to initial state.
    });



$('.agenda-btn').on('click', function(e) {

e.preventDefault();
$(this).addClass("inactive");

if ($(this).hasClass('btn-right')) {
        $('.agenda-btn.btn-left').removeClass('inactive');
        $('#app').addClass('scrolled');
        toggleActiveDivs();
        toggleSecondHalfDivs();
}
else {
        $('.agenda-btn.btn-right').removeClass('inactive');
        $('#app').removeClass('scrolled');
        toggleActiveDivs();
        setTimeout(() => {
        toggleSecondHalfDivs();
        }, 50);
}

function toggleActiveDivs() {
    $('.month').each(function(index, el) {
    if (index < 5) {
        $(this).toggleClass('active');
    }
    else if (index > 11) {
        $(this).toggleClass('active');
    }
    });
}
function toggleSecondHalfDivs() {
    $('.month.active').each(function(index, el) {
    if (index <= 5) {
        $(this).removeClass('second-half');
    }
    else {
        $(this).addClass('second-half');
    }
    });
}

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
    $('.month[data-month="' + eventMonths[i] + '"]').append("\
    <div class='event'>\
        <p class='event-title'>" + event.title + "</p>\
        <p class='event-location'>Location: " + event.location + "</p>\
        <p class='event-type'>Type: " + event.type + "</p>\
        <p class='event-period'>From " + event.starting + " to " + event.ending + "</p>\
    </div>");
    }

});