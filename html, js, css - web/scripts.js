function start_page() {
  document.body.innerHTML = '';
  let table = document.createElement('table');
  table.className = 'Based';
  let caption = document.createElement('caption');
  caption.id = "caption";
  caption.innerText = 'Введите судоку, оставив пустые ячейки на месте пропуска';
  table.append(caption);
  for(var i = 0; i < 3; i++) {
    let tr1 = document.createElement('tr');
    for(var j = 0; j < 3; j++) {
      let td1 = document.createElement('td');
      let tb = document.createElement('table');
      for(var k = 0; k < 3; k++) {
        let tr = document.createElement('tr');
        for(var z = 0; z < 3; z++) {
          let td = document.createElement('td');
          let input = document.createElement('input');
          input.type = "text";
          input.value = '';
          input.id = i.toString() + j.toString() + k.toString() + z.toString();
          td.append(input);
          tr.append(td);
        }
        tb.append(tr);
        td1.append(tb);
        tr1.append(td1);
      }
    }
    table.append(tr1);
  }
  /*for(var i = 0; i < 9; i++) {
    let tr = document.createElement('tr');
    for(var j = 0; j < 9; j++) {
      let td = document.createElement('td');
      let input = document.createElement('input');
      if(i + j < 3) {
        td.className = "first";
      }
      input.type = "text";
      input.value = '';
      input.id = i.toString() + j;
      td.append(input)
      tr.append(td);
    }
    table.append(tr);
  }
  */
  document.body.append(table);
  let button = document.createElement('a');
  button.innerText = "Решить!";
  button.className = "buttons";
  button.onclick = sell;
  button.id = "button";
  document.body.append(button);
}

function sell() {
  //document.body.innerHTML = 'Hello';
  let arr = [];
  for(var i = 0; i < 9; i++) {
    arr[i] = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
  }
  for(var k1 = 0; k1 < 3; k1++)
    for(var k2 = 0; k2 < 3; k2++)
      for(var k3 = 0; k3 < 3; k3++)
        for(var k4 = 0; k4 < 3; k4++) {
          let text = document.getElementById(k1.toString() + k2.toString() + k3.toString() + k4.toString())
          if(text.value != '') {
            arr[k1 * 3 + k3][k2 * 3 + k4] = text.value;
          }
          console.log(text.value);
        }
  console.log(arr);
  let param = ''
  for(var i = 0; i < 9; i++) {
    for(var j = 0; j < 9; j++) {
      param += arr[i][j] + ',';
    }
  }
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", "http://localhost:8080/?arr=" + param, false ); // false for synchronous request
  xmlHttp.send( null );
  let result = xmlHttp.responseText.split("<br>");
  alert(result[0]);
  if(result[0] === "Solved!") {
    for(var i = 1; i < 10; i++) {
      let a = result[i].split(" ");
      for(var j = 0; j < 9; j++) {
        let x1 = Math.floor((i - 1) / 3);
        let x2 = (i - 1) % 3;
        let y1 = Math.floor(j / 3);
        let y2 = j % 3;
        let text = document.getElementById(x1.toString() + y1.toString() + x2.toString() + y2.toString());
        text.disabled = "disabled";
        if(text.value != a[j]) {
          text.value = a[j];
          text.style = "color: red;";
        }
      }
    }
    let button = document.getElementById("button");
    button.parentNode.removeChild(button);
    let caption = document.getElementById("caption");
    caption.innerText = "Ваше решённое судоку!";
    let opens = document.createElement('a');
    opens.innerText = "Изменить судоку";
    opens.className = "buttons";
    opens.onclick = open;
    opens.id = "opens";
    document.body.append(opens);
  }
}

function open() {
  for(var k1 = 0; k1 < 3; k1++)
    for(var k2 = 0; k2 < 3; k2++)
      for(var k3 = 0; k3 < 3; k3++)
        for(var k4 = 0; k4 < 3; k4++) {
          let text = document.getElementById(k1.toString() + k2.toString() + k3.toString() + k4.toString());
          text.disabled = "";
          if(text.style.color == "red") {
            text.value = "";
          }
          text.style = "";
        }
  let caption = document.getElementById("caption");
  caption.innerText = 'Введите судоку, оставив пустые ячейки на месте пропуска';
  let opens = document.getElementById("opens");
  opens.parentNode.removeChild(opens);
  let button = document.createElement('a');
  button.innerText = "Решить!";
  button.className = "buttons";
  button.onclick = sell;
  button.id = "button";
  document.body.append(button);
}
