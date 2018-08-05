var appObj = {
    keywords: ["cat", "Rick and Morty", "Mario", "amazing","funny","doge"],
    saved: {

    },
    buttoncount: 0,
    queryURL: "https://api.giphy.com/v1/gifs/search?api_key=nXeYSnoxMTwVbTAhSpvKiYWczNv5saTx&limit=10&lang=en&q=",
    rating: "&rating=",
    gifcount: -1,
    lasttag: "",
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
        } else if ($(event.target).attr("id") != "getGiphier"){
            var queryURL = appObj.queryURL + $(event.target).text();
        }
        if ($(event.target).attr("id") != "getGiphier"){
            $(".imagelocation").empty();
            appObj.lasttag = $(event.target).text();
            appObj.gifcount = 0;
        } else if ($(event.target).attr("id") == "getGiphier") {
            event.preventDefault();
            if( appObj.gifcount === 0){
                appObj.gifcount += 10;
                var queryURL = appObj.queryURL + appObj.lasttag;
                queryURL += "&offset=" + appObj.gifcount;
            } else {
                return;
            }
        }
        
        queryURL += "&limit=10" + appObj.rating + $(".userselect").val();
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            try {
            for (i=0; i < response.data.length; i++){
                
                    var data = response.data[i].images;
                    var img = $("<img>");
                    img.addClass("gif");
                    img.attr("id","gif"+i);
                    img.attr("src", data.original_still.url);
                    img.attr("height",data.fixed_height.height);
                    img.attr("height",data.fixed_height.height);
                    img.attr("data-still", data.original_still.url);
                    img.attr("data-gif", data.fixed_height.url);
                    img.attr("state","still");
                    var gifDiv = $("<div>");
                    gifDiv.addClass("gifdiv");
                    var title = $("<h1>");
                    title.addClass("title");
                    title.text(response.data[i].title);
                    gifDiv.append(title);
                    gifDiv.append(img);
                    var rating = $("<h2>");
                    rating.addClass("rating");
                    rating.text("Rating : " + response.data[i].rating);
                    gifDiv.append(rating);
                    img.on("click", gifClick);
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

function gifClick(event) {
    try {
        console.log(event.target);
        if($(event.target).attr("state") == "still"){
            $(event.target).attr("src",$(event.target).attr("data-gif"));
        } else {
            $(event.target).attr("src",$(event.target).attr("data-still"));
        }
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
    try {
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
        userh1.addClass("banner");
        userh1.text("Enter a Keyphrase to search!");
        var usertext = $("<input>");
        usertext.attr("type","text");
        usertext.addClass("usertext");
        var userh2 = $("<label>");
        userh2.addClass("banner");
        userh2.text("Select a Rating Cap:");
        var usertext2 = $("<select>");
        usertext2.html("<option>G</option><option>PG</option><option>PG-13</option><option>R</option>")
        usertext2.addClass("userselect");
        var button = $("<button>");
        button.addClass("button");
        button.attr("id","addPhrase");
        button.text("Get Giphy");
        var button2 = $("<button>");
        button2.addClass("button");
        button2.attr("id","getGiphier");
        button2.text("Get Giphier");

        $(".userinput").append(userh2,$("<br>"),usertext2,$("<br>"),$("<br>"),userh1,$("<br>"),usertext,$("<br>"),button,button2);
        // $(".userinput").append(usertext);
        // $(".userinput").append(button);

        $(document.body).on("click",".button", getGiphy)
    
    } catch (error) {
        console.log(error);
    }

}