function validate(nextPage){
    $(function($http){
        var radioData = document.getElementsByTagName("input");
        // for (i = 0; i < radioData.length; i+=2)
        // {
        //     if (radioData[i].checked || radioData[i+1].checked)
        //     {
        //         continue;
        //     }
        //     alert("Please fill an answer for scenario " + radioData[i].value);
        //     return;
        // }

        var data2 = {
            answers2:[]
        };
        for (i = 0; i < radioData.length; i++)
        {
            data2.answers2.push({
                "videoName" : radioData[i].id, 
                "answer" : radioData[i].checked,
                "sess" : "none"
            });
        } 

        $http.get('/connectAndInsertAnswers', data2)
            .success(
                function(success)
                {
                    console.log(success)
                })
            .error(
                function(error)
                {
                    console.log(error)
                });

        $("#renderPage").load(nextPage);
    });
}