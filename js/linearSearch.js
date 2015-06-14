//-----------------------------------------------ready()--------------------------------
$(document).ready(function(){
	id=0;
	var num = [];
//-------------------------------------------------------add new number-----------------  
  $('#add').click(function(){
		next=$('#next').val();
		
		if(next=='') alert('Enter the value please.');
		else if( !(/^[0-9]+$/.test(next)) ) alert('Enter number only');
		else if($( "#linear-list ul>li" ).length>6) alert('can not add number more than 6.');
		else{
			$('#linear-list ul').append('<li id="'+(id)+'"><div id="'+('d'+(id++))+'" class="chain">'+next+'</div></li>');
			num.push(next);
		} 
	});

//--------------------------------------------------------empty----------------------------------
$('#remove').click(function(){

  last_id=$('#linear-list ul>li').length-1;
  $('#'+last_id).remove();
});

//------------------------------------------------------------------------------------------
$('#search').click(function(){
    
    val=$('#value').val();
    if(val=='') alert('Please enter the number to be search');
    else{
		for(i=0;i<$('li').length;i++){
			_div=$('#d'+i);
			item=$('#'+i).text();

			$(_div).removeClass('chain');
			$(_div).addClass('search');

			//alert();
			if(val==item){
				$(_div).removeClass('search');
				$(_div).addClass('found');
				//alert();
				break;
			}else{
				$(_div).removeClass('search');
				$(_div).addClass('noMatch');
				//alert();
			}

			//$(_div).removeClass('noMatch');
			//$(_div).addClass('chain');

	    }//for
    	exeTime(num,val);
    }
      

});//search
//-------------------------------------------------------reset-------------------------------


$('#reset').click(function(){
  $('li>div').removeClass('found search noMatch rest');
  $('li>div').addClass('chain');
});

//-----------------------------------------------------------------------
});//ready
//--------------------------executionTime
function exeTime(num,val){
	var start = new Date().getTime();

	for(i=0;i<num.length;i++){
		if(val==num[i]) break;
		sleep(1);
	}
	
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