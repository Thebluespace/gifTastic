;var appObj = {
    keywords: ["cat", "Rick and Morty", "Mario", "amazing","funny","doge"],
    saved: {

    },
    buttoncount: 0,
    queryURL: "https://api.giphy.com/v1/gifs/search?api_key=nXeYSnoxMTwVbTAhSpvKiYWczNv5saTx&limit=10&lang=en&q=",
    rating: "&rating=",
};
// API KEY nXeYSnoxMTwVbTAhSpvKiYWczNv5saTx
function getGiphy(event) {
    try {
        var queryURL = appObj.queryURL + $(event.target).text();
        if ($(event.target).attr("id") === "addPhrase"){
            if(appObj.keywords.indexOf($(".usertext").val()) === -1){
                event.preventDefault();
                addPhrase($(".usertext").val());
                var queryURL = appObj.queryURL + $(".usertext").val();
            }
        } else {
            var queryURL = appObj.queryURL + $(event.target).text();
        }
        console.log($(event));
        
        queryURL += "&limit=10"
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            try {
            console.log(response);
            $(".imagelocation").empty();
            for (i=0; response.data.length -1; i++){
                
                    var data = response.data[i].images.fixed_height;
                    var img = $("<img>");
                    img.addClass("gif");
                    img.attr("id","gif"+i);
                    img.attr("src", data.url)
                    img.attr("height",data.height);
                    img.attr("height",data.height);
                    var gifDiv = $("<div>");
                    gifDiv.addClass("gifdiv");
                    gifDiv.append(img);
                    var rating = $("<h2>");
                    rating.addClass("rating");
                    rating.text("Rating : " + response.data[i].rating);
                    gifDiv.append(rating);
                    $(".imagelocation").append(gifDiv);        
                }
            } catch (error) {
                console.error(error);
                i++;
            }
        });   
    } catch (error) {
        console.log(error);
    }
}

function addPhrase(text){
    try {
        appObj.keywords.push(text);
        appObj.buttoncount++;
        var button = $("<button>");
        button.addClass("button");
        button.attr("id","button" + appObj.buttoncount);
        button.text(text);
        $(".buttonspace").append(button);
    } catch (error) {
        console.error(error)   ;
    }
}

function load(){
        // load buttongs
        for (i=0;i<appObj.keywords.length - 1;i++){
            appObj.buttoncount++;
            var button = $("<button>");
            button.addClass("button");
            button.attr("id","button" + appObj.buttoncount);
            button.text(appObj.keywords[appObj.buttoncount]);
            $(".buttonspace").append(button);
        }

        var userh1 = $("<label>");
        userh1.addClass("");
        userh1.text("Enter a Keyphrase to search!");
        var usertext = $("<input>");
        usertext.attr("type","text");
        usertext.addClass("usertext");
        var button = $("<button>");
        button.addClass("button");
        button.attr("id","addPhrase");
        button.text("Get Giphy");

        $(".userinput").append(userh1,$("<br>"),usertext,$("<br>"),button);
        // $(".userinput").append(usertext);
        // $(".userinput").append(button);

        $(document.body).on("click",".button", getGiphy)


}