var numList;
proc=false;
$(document).ready(function(){
	$('#add').click(function(){
		next=$('#nextNum').val();
		
		if(next=='') alert('Enter the value please.');
		else if( !(/^[0-9]+$/.test(next)) ) alert('Enter number only');
		else if($( "#bubble-list ul li" ).length>6) alert('can not add number more than 6.');
		else{
			$('#insertion-list ul').append('<li>'+next+'</li>');
		} 
	});

	numList = $("li").map(function() { return $(this).text() }).get();
	numList.splice(0, 7);

  $("#insertion-sort").click(function(){
     var x=$("#arrayinput").val();
     numList=x.split(',');
     proc=true;
    is_animate();
  });
  function is_animate(){
    if(proc){
      //alert('success');
      $("#insertion-list").animatedSort({
          stepTime: 600,
          highlightColor: "teal",
          listType:numList,
          sortedColor: "#e4701d",
          sortAlgorithm: "insertion",
          animationTrigger: {event: "click", selector: "#insertion-sort"},
          resetTrigger: {event: "click", selector: "#insertion-reset"},
          callback: function() {exeTime(numList);}//exeTime(numList)
      });
    }
  }

});


//--------------------------executionTime

function exeTime(num){
	var start = new Date().getTime();
	insertionSort(num);
	var end = new Date().getTime();
	var time = end - start;
	$('#exeDesc').text('Execution time: ' + time+' milliseconds animation time excluded.');

}
//-------------------------------------------------------sleep--------------------------
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
//-------------------------------
function insertionSort(a) {
  for (var i = 1, j = a.length, iHole, oItem; i < j; i += 1) {
    oItem = a[i];
    iHole = i;
 
    while (iHole > 0 && a[iHole - 1] > oItem) {
      a[iHole] = a[iHole - 1];
      iHole -= 1;
      sleep(1);
    }
 
    a[iHole] = oItem;
  }
}