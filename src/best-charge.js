function bestCharge(selectedItems) {
  var str="============= 订餐明细 =============<br>";

  var id = [];  //产品编号
  var num = []; //定餐个数

  for(var i=0; i<selectedItems.length; i++){
    id.push(selectedItems[i].split('x')[0].trim());
    num.push(selectedItems[i].split('x')[1].trim());
  }

  var price = []; //单品价格
  var name = []; //单品名称
  for(var i=0; i<id.length; i++){
    var iTable = document.getElementById("itemTable");
    for(var j=0,rows=iTable.rows.length; j<rows; j++){
      if(id[i] == iTable.rows[j].cells[0].innerHTML){
        price[i]=(iTable.rows[j].cells[2].innerHTML);
        name[i]=(iTable.rows[j].cells[1].innerHTML);
      }
    }
  }

  var totalPrice = [];
  var promotions = loadPromotions();
  var noProPrice ;

  for(var i=0; i<promotions.length; i++){
    var allPrice = 0;
    if(promotions[i].items == null) {
      for (var j = 0; j < price.length; j++) {
        allPrice += price[j] * num[j];
      }
      noProPrice = allPrice;
      totalPrice.push( allPrice>30 ? allPrice-6 : allPrice );
    }
    else {
      for (var j = 0; j < id.length; j++) {
        for (var k = 0; k < promotions[i].items.length;) {
          if (promotions[i].items[k] == id[j]) {
            allPrice += price[j] * num[j] / 2;
            break;
          }
          k++;
          if (k == promotions[i].items.length) {
            allPrice += price[j] * num[j];
          }
        }
      }
      totalPrice.push(allPrice);
    }
  }

  var minPriceProIndex =0; //价钱最小的优惠方式的下标
  var endPrice=totalPrice[0];
  for(var i=1; i<totalPrice.length; i++){
    if(totalPrice[i] < endPrice){
      endPrice = totalPrice[i];
      minPriceProIndex = i;
    }
  }

  for(var i=0; i<id.length; i++){
    str += name[i]+' x '+num[i]+" = "+price[i]*num[i]+"元<br>";
  }

  if(noProPrice >= 30){
    str += '-----------------------------------<br>'+'使用优惠:<br>';
    if(promotions[minPriceProIndex].items == null){
      str += promotions[minPriceProIndex].type;
    }
    else {
      str += promotions[minPriceProIndex].type;
      str += '(';

      for (var i = 0; i < promotions.length; i++) {
        if (promotions[i].items != null) {
          for (var j = 0; j < promotions[i].items.length; j++) {
            for (var k = 0; k < id.length; k++) {
              if (promotions[i].items[j] == id[k]) {
                if (j != promotions[i].items.length - 1) {
                  str += name[k] + ',';
                  break;
               }
               else {
                 str += name[k];
                 break;
                }
             }

           }
          }
       }
     }
      str += ')';
    }
    str += ',省'+(noProPrice-endPrice)+'元<br>';
  }

  str += '-----------------------------------<br>总计：'+endPrice+'元<br>===================================';

  return str;
}
