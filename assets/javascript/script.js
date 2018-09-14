$(document).ready(function(){


    // NYT API Key: c80ec040499e4a7f97eaea15c31f0d8c
    var searchTerm;
    var numRecords;
    var startYear; 
    var endYear;

    //needs to be connected to button

    function searchMain(){
        
        searchTerm = $("#searchTerm").val();
        numRecords = $("#numberRecords").val();
        // if( numRecords.empty() ){
        //     numRecords = 0;
        // };
        startYear = $("startYear").val();
        endYear = $("endYear").val();

        // Built by LucyBot. www.lucybot.com
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        url += '?' + $.param({
        'api-key': "c80ec040499e4a7f97eaea15c31f0d8c",
        'q' : searchTerm
        });

        // if theres a start year add paramater to url
        if (startYear){
            //not empty
            var startYearText = startYear + '0101';
            url = url + '?begin_date=' + startYearText;
        };
        //if theres an end year
        if(endYear){
            var endYearText = endYear + '1231';
            url += 'end_date=' + endYearText;
        }

        // console.log(url);
        $.ajax({
        url: url,
        method: 'GET',
        }).done(function(result) {
            //clear old results
            $("#topArticles").empty();
            //console.log(result);
            // alert(numRecords);

            // loop through results
            // only create as many as numRecords
            for( var i = 0; i < parseInt(numRecords); i++){
                //create new div for each article
                var newArticle = $("<div>");
                newArticle.attr("class", "articleResult");
                newArticle.append($("<h2>").text(result.response.docs[i].headline.main));
                newArticle.append($("<p>").text(result.response.docs[i].byline.original));
// alert("here");

                //append each article to $("#topArticles")
                $("#topArticles").append(newArticle);
            }
            
            
            

        }).fail(function(err) {
        throw err;
        });


    };

    $("#searchBtn").on("click", function(){
        searchMain();
    });
    $("#clearBtn").on("click", function(){
        location.reload();
        // clear out #topArticles
        //clear out entry fields
    });


})