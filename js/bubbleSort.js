//numList = [];
var numList;
proc=false;
var mmmm;
$(document).ready(function(){
	numList = $("li").map(function() { return $(this).text() }).get();
	numList.splice(0, 7);
	$('#generate').click(function() {
	    location.reload();
	});

	$('#bubble-sort').click(function(){
		 var x=$("#arrayinput").val();
		 //mmmm=x.split(',');
		 numList=x.split(',');
		 proc=true;
		 bs_animate();

	});

	function bs_animate(){
		if(proc){
			$("#bubble-list").animatedSort({
				listType:numList,
				sortAlgorithm: 'bubble', // Bubble Sort, Selection Sort, Insertion Sort or Quick Sort
				stepTime: 500, // Specify the time in millisecond between each step (color, slide, swap) in the animation
				highlightColor: 'red',
				sortedColor: 'blue',
				animationTrigger: {event: "click", selector: "#bubble-sort"},
				resetTrigger: {event: "click", selector: "#bubble-reset"},
				callback: function() {exeTime(numList);}
			});
		}

	}//bs_animate()	

});



//--------------------------executionTime
function exeTime(num){
	num=numList;
	var start = new Date().getTime();

	
	bubbleSort(num);

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
function bubbleSort(num) {
  len=num.length;
  var second;
  for(var i = 0; i < len; i++){

    for(var j = 0; j<len-i; j++){
        second=parseInt(j+1);
        if(num[j] > num[second]){
          	sleep(1);
            var swapping = num[j];
            num[j] = num[second];
            num[second] = swapping;
        }
    }
  }
}