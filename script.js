var xmlhttp = new XMLHttpRequest();
var url = "formLinks.txt";

xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var linksArr = JSON.parse(this.responseText);
        populateLinks(linksArr);
        var arr = linksArr.slice();
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

function populateLinks(arr) {

    var out = '<ul>';

    for (var i = 0; i < arr.length; i++) {

        out += ('<li class="sideMenuLinks" ><a class="sideMenuLinks " id="' + arr[i].link_id + '" href="' + arr[i].url + '" " target="ifrm">' + arr[i].title + '</a></li>');
    }
    out += '</ul>';
    document.getElementById("navMenu").innerHTML = out;
};

//*******************************************
//doument ready
//*******************************************
$(window).bind("load", function () {

   
    var getLinks = $('#navMenu a');
    var getLinksLength = parseInt(getLinks.length);
    //var loadFirst = getLinks[Math.floor((Math.random() * getLinksLength) + 1)Math.floor((Math.random() * getLinksLength) + 1)Math.floor((Math.random() * getLinksLength) + 1)];
    var loadFirst = getLinks[0];
    $(loadFirst).addClass("active");
     var iframePath = document.getElementById('ifrm');
    //iframePath.src = loadFirst.href;
    var currIfrmUrl = iframePath.src;
    var currActiveLink = $("#navMenu a.active");
    var currLinkId = parseInt(currActiveLink.attr('id'));
    var prev = document.getElementById("prev");
    var next = document.getElementById("next");
    $(next).addClass("on");
    checkButtons(currLinkId, getLinks);
    
    
    //*******************************************
    //navMenu 
    //*******************************************
    $('#navMenu ul li a').click(function () {
        currActiveLink = $("#navMenu a.active");
        currLinkId = parseInt(currActiveLink.attr('id'));
        checkButtons(currLinkId, getLinksLength);
        currActiveLink.removeClass('active');
        $(this).addClass("active");
        iframePath.src = $(this).attr('href');
        currActiveLink = $("#navMenu a.active");
        currLinkId = parseInt(currActiveLink.attr('id'));
        checkButtons(currLinkId, getLinksLength);
        $(next).removeClass("on");
        $(prev).removeClass("on");
    });
    //*******************************************
    //next
    //*** ****************************************
    $(next).click(function () {
        currActiveLink = $("#navMenu a.active");
        currLinkId = parseInt(currActiveLink.attr('id'));
        checkButtons(currLinkId, getLinksLength);
        $(prev).prop("disabled", false);
        $(prev).removeClass("on");
        $(next).addClass("on");
        currLinkId++;
        iframePath.src = getLinks[currLinkId];
        currActiveLink.removeClass('active');
        var nextLinkId = '' + currLinkId;
        var nextActiveLink = document.getElementById(nextLinkId);
        $(nextActiveLink).addClass("active");
        currActiveLink = $(nextActiveLink);
        currLinkId = parseInt(currActiveLink.attr('id'));
        checkButtons(currLinkId, getLinksLength);
    });
    //*******************************************
    //prev
    //*******************************************
    $(prev).click(function () {
        currActiveLink = $("#navMenu a.active");
        currLinkId = parseInt(currActiveLink.attr('id'));
        checkButtons(currLinkId, getLinksLength);
        $(next).removeClass("on");
        $(next).prop("disabled", false);
        $(prev).addClass("on");
        currLinkId--;
        iframePath.src = getLinks[currLinkId];
        currActiveLink.removeClass('active');
        var prevLinkId = '' + currLinkId;
        var prevActiveLink = document.getElementById(prevLinkId);
        $(prevActiveLink).addClass("active");
        currActiveLink = $(prevActiveLink);
        currLinkId = parseInt(currActiveLink.attr('id'));
        checkButtons(currLinkId, getLinksLength);
    });
    //*******************************************
    //checkButtons
    //*******************************************
    function checkButtons(currLinkId, getLinksLength) {

        currLinkId;
        var linksArrayLength = getLinksLength - 1;

        if ((currLinkId > 0) && (currLinkId < getLinksLength - 1)) {
            $(next).prop("disabled", false);
            $(prev).prop("disabled", false);
            return;
        }
        if (currLinkId == 0) {
            $(next).addClass("on");
            $(next).prop("disabled", false);
            $(prev).removeClass("on");
            $(prev).prop("disabled", true);
        }
        if (currLinkId == (getLinksLength - 1)) {
            $(next).prop("disabled", true);
            $(prev).addClass("on");
            $(prev).prop("disabled", false);
            $(next).removeClass("on");
        }
        return;
    }
});