function drawarray(arr) {
    var boxset = $("boxset");
    var boxsetnum = $("boxsetnum");
    boxset.innerHTML = "";
    boxsetnum.innerHTML = "";

    boxset.hide();
    boxsetnum.hide();

    var boxsetStr = "";
    var boxsetnumStr = "";

    for (var i = 0; i < arr.length; i++) {
        boxsetStr = boxsetStr + "<div class=box id='arrbox" + i.toString() + "' >" + arr[i] + "<\/div>"
        boxsetnumStr = boxsetnumStr + "<div class=box2>" + (i + 1) + "<\/div>"
    }

    boxset.innerHTML = boxsetStr;
    boxsetnum.innerHTML = boxsetnumStr;

    boxset.show();
    boxsetnum.show();

}

function bubbleSort(a) {
    var swapped;
    do {
        swapped = false;
        for (var i = 0; i < a.length - 1; i++) {
            if (a[i] > a[i + 1]) {
                new Effect.Move("arrbox" + i.toString(), {
                    x : 32,
                    y : 0,
                    queue : 'end'
                });
                new Effect.Move("arrbox" + (i + 1).toString(), {
                    x : -32,
                    y : 0,
                    queue : 'end'
                });
                new Effect.Move("arrbox" + i.toString(), {
                    x : 0,
                    y : 32,
                    queue : 'end'
                });
                new Effect.Move("arrbox" + (i + 1).toString(), {
                    x : 0,
                    y : -32,
                    queue : 'end'
                });
                new Effect.Move("arrbox" + i.toString(), {
                    x : -32,
                    y : 0,
                    queue : 'end'
                });
                new Effect.Move("arrbox" + (i + 1).toString(), {
                    x : 32,
                    y : 0,
                    queue : 'end'
                });
                var temp = a[i];
                var t1 = document.getElementById("arrbox" + i.toString());
                var t2 = document.getElementById("arrbox" + (i + 1).toString());
                var t3 = t1.id;
                t1.id = t2.id;
                t2.id = t3;
                a[i] = a[i + 1];
                a[i + 1] = temp;
                swapped = true;
            }
        }
    } while (swapped);
}


function bubble_simulate() {
    var numbers = [98,76,34];//$("arrayinput").value;
    var toBeSorted = numbers;//.split(",");
    if (toBeSorted.length >= 1) {
        var toBeSortedi = new Array();
        for (var q = 0; q < toBeSorted.length; q++) {
            toBeSortedi[q] = parseInt(toBeSorted[q]);
        }
        drawarray(toBeSortedi);
        bubbleSort(toBeSortedi);
    }
}