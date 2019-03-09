window.onload = function() {
	//document.write('Hello world')
  // var x = document.getElementsByClassName("ingred-list ");
  // var i;
  // for (i = 0; i < x.length; i++) {
  //   x[i].style.backgroundColor = "grey";
  // }

  var lis = document.getElementsByClassName("ingred-list ")[0].getElementsByTagName("li");

  // console.log(lis.length)
  // console.log(lis)

  var lis_text = []
  for (var i = 0; i < lis.length; i++) {
    lis_text.push(lis[i].textContent.replace(/\n/g, ""))
  }

  // for (var i=0; i<lis_text.length; i++) {
  //   console.log(i + ". " + lis_text[i]);
  // }
  console.log(lis_text.length)

  //to string

  lis_string = JSON.stringify(lis_text);
  // lis_string = ""
  // for (var i=0; i<lis_text.length; i++) {
  //   lis_string += lis_text + "|"
  // }
  // lis_string = lis_string.replace(/\n/g, "");
  // console.log(lis_string)
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://127.0.0.1:5000/api", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState==4 && xhttp.status==200) {
      response = xhttp.response
      console.log(xhttp.response);
      console.log(typeof response);
      response_dict = JSON.parse(response)
      console.log(typeof response_dict);
      var i = 0
      Object.entries(response_dict).forEach(([key, value]) => {
        console.log(key, value);
        locality_Score = value["locality_score"]
        substitutes = value["substitutes"]
        if (locality_Score[i] < 0.3) {
          lis[i].style.backgroundColor = "red";
        }
        else if (locality_Score[i] < 0.7) {
          lis[i].style.backgroundColor = "orange";
        }
        else {
          lis[i].style.backgroundColor = "green";
        }

        lis[i].innerHTML += "</br> Locality Score: " + locality_Score;

        if (substitutes != ""){
          lis[i].innerHTML += "</br> Suggestion: " + substitutes;
        }

        i = i + 1
      });

    }
  }
  xhttp.send(lis_string);

  console.log(response);
  // //mock locality score
  // var locality_Score = []
  // var counter = 0
  // for (var i=0; i<17; i++) {
  //   locality_Score.push(counter)
  //   counter += 0.1
  //   if (counter >= 1) {
  //     counter = 0
  //   }
  // }
  // //mock old list
  // var old_ingredients = ["shallots", "garlic", "ginger", "chicken", "groundnut oil", "sesame oil", "anise", "coriander", "mint", "tofu", "spring onions", "fresh red chilli",
  //                         "baby spinach", "rice noodles", "soy sauce", "seaweed nori sheets", "lime"]
  //
  // //mock new list
  // var new_ingredients = ["shallots", "garlic", "ginger", "duck", "olive oil", "sesame oil", "anis", "parsley", "fresh mint", "beans", "spring onions", "pepper",
  //                         "baby spinach", "spaghettit", "soy sauce", "seaweed nori sheets", "lemon"]


  // for (var i=0; i<locality_Score.length; i++) {
  //   console.log(i + ". " + locality_Score[i]);
  // }

  // // dict_keys = response.keys()

  // for (i = 0; i < lis.length; i++) {
  //   var tdElement = lis[i];
  //   if (old_ingredients[i] === new_ingredients[i]) {
  //     tdElement.innerHTML = "Original ingredient: " + old_ingredients[i] + "</br> Locality Score: " + locality_Score[i].toFixed(2)
  //   }
  //   else {
  //     tdElement.innerHTML = "Original ingredient: " + old_ingredients[i] + "</br> Locality Score: " + locality_Score[i].toFixed(2) +"</br> Suggestion: " + new_ingredients[i];
  //   }
  // }

//   for (const [key, value ] of Object.entries(response)) {
//     // do something with `key` and `value`
// }





}
