function validate(nextPage){
    $(function($http){
        var ageGroup = document.getElementById("age");
        var gender = document.getElementById("sex");
        var education = document.getElementById("education");
        var nationality = document.getElementById("nationality");

        if (ageGroup.value === "")
        {
            alert("Please provide your age group");
            return;
        }

        if (gender.value === "")
        {
            alert("Please provide your gender");
            return;
        }

        if (education.value === "")
        {
            alert("Please provide your education level");
            return;
        }

        if (nationality.value === "")
        {
            alert("Please provide your nationality");
            return;
        }

        var data = {
            demographics:[]
        };
        data.demographics.push({
            "ageGroup" : ageGroup.value, 
            "gender" : gender.value,
            "education" : education.value,
            "nationality": nationality.value,
            "session" : "null"
        });

        $http.get('/connectAndInsertDemographics', data)
            .success(
                function(success)
                {
                    console.log(success);
                })
            .error(
                function(error)
                {
                    console.log(error);
                });

        $("#renderPage").load(nextPage);
    });
}