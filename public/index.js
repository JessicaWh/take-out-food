function showItems() {
  var allItems = loadAllItems();
  var str = "=======产品=======<br><table id='itemTable'>";

  for(var key in allItems){
    str += "<tr><td>"+allItems[key].id+"</td><td>"+allItems[key].name+"</td><td>"+allItems[key].price+"</td></tr>"
  }
  str+="</table>";
  document.getElementById("items").innerHTML = "=======产品=======<br>";
  document.getElementById("items").innerHTML = str;
}

function showPromotions() {
  document.write("=======优惠=======<br>");
  var promotions = loadPromotions();
  for(var key in promotions) {
    document.write('&nbsp;&nbsp;&nbsp;'+promotions[key].type);
    if(promotions[key].items != null) {
      document.write(":["+promotions[key].items+"]");
    }
    document.write('<br>');
  }
}

function calculatePrice() {
  var input = document.getElementById("itemIdAndNumber").value.split(',');
  var inputItems= [];
  for(var i=0; i<input.length; i++){
    input[i] = input[i].replace(/\[|]/g,'');
    input[i] = input[i].replace(/\"|"/g,'');
    inputItems.push(input[i]);
  }
  document.getElementById("message").innerHTML = bestCharge(input);
}

function resetInput() {
  document.getElementById("itemIdAndNumber").value = "";
  document.getElementById("message").innerHTML = "";
}
