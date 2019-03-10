window.onload = function() {

  function className(score) {
    c = 'grey'
    if(score >= 1){
      c = 'green'
    } else if(score >= .75) {
      c = 'yellow'
    } else if(score >= .5){
      c = 'red'
    }
    return c
  }

  var lis = document.getElementsByClassName("ingred-list")[0].getElementsByTagName("li");

  var lis_text = []
  for (var i = 0; i < lis.length; i++) {
    lis_text.push(lis[i].textContent.replace(/\n/g, "").trim())
  }

  var scores = []
  axios.post('http://127.0.0.1:5000/api', lis_text)
    .then(function (response) {
      Object.entries(response.data).forEach(([key, value]) => {
        var n_sub = 0
        index = key
        score = value["locality_score"][0]
        scores.push(score)
        country = value["locality_score"][1]
        if(!country){
          country = "";
        }
        substitutes = value["substitutes"]
    
        dropdown_ing = '<select class="selectpicker">';
        dropdown_ing += '<option class="'+className(score)+'" data-subtext="'+country+'">'+lis_text[index]+'</option>'

        if (substitutes != ""){
          substitutes.forEach(function(s) {
            n_sub += 1
            if (n_sub <= 5) {
              s_score = s[1][0];
              s_country = s[1][1];
              if(!s_country){
                s_country = "";
              }
              dropdown_ing += '<option class="'+className(s_score)+'" data-subtext="'+s_country+'">'+s[0]+'</option>'
            }
            });
        }

        dropdown_ing += '</select>';
        lis[index].innerHTML = dropdown_ing
      });
      $(function(){
        $('.selectpicker').selectpicker();
      });

      var lfis = document.getElementsByClassName('filter-option')
      for (var i = 0; i < lfis.length; i++) {
        lfis[i].classList.add(className(scores[i]))
      }
    })

}
