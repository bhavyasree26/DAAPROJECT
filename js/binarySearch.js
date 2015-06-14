//-----------------------------------------------ready()--------------------------------
$(document).ready(function(){
  id=0;sort=0;
  var num = [];
//-------------------------------------------------------add new number-----------------  
  $('#add').click(function(){
    sort=0;
    next=$('#next').val();
    if(next=='') alert('Enter the value please.');
    else if( !(/^[0-9]+$/.test(next)) ) alert('Enter number only');
    else if($("#binary-list ul>li" ).length>6) alert('can not add number more than 6.');
    else{
       $('#binary-list ul').append('<li id="'+(id)+'"><div id="'+('d'+(id++))+'" class="chain">'+next+'</div></li>');
       num.push(next);
    }
  });

//-------------------------------------------------------Sort--------------------------
$('#sort').click(function(){
  sort=1;
  len = $('li').length;

  for(i=0; i<len; i++){
    for(j=0;j<len-1;j++){
      
      li_1=$('#'+j);
      li_2=$('#'+(j+1));

      div_1=$('#d'+j);
      div_2=$('#d'+(j+1));

      item_1 = li_1.text();
      item_2 = li_2.text();
      item_1  = parseInt(item_1);
      item_2  = parseInt(item_2);
      
      if(item_1>item_2){
        temp=item_1;
        div_1.text(item_2);
        div_2.text(item_1);
        item_1=item_2;
        item_2=temp;
      }
    }
  }

});


//-------------------------------------------------------Search--------------------------
$('#search').click(function(){
  len=$('#binary-list ul>li').length;

  
  val=$('#value').val();
  if(val=='') alert('Please enter the number to be search');
  else if(sort==1){

      mid=parseInt(len/2);
      begin=0,end=len-1;
      key=-1;
      for(i=0;i<len;i++){
        var midval=$('#d'+mid).text();
        midval=parseInt(midval);
        if(midval==val){
          //checking mid
          $('#d'+mid).removeClass('chain');
          $('#d'+mid).addClass('found');
          key=mid;
          break;
        } 
        else if(midval>val){
           $('#d'+mid).addClass('noMatch');
          $('#d'+mid).removeClass('chain');
         
          end=mid-1;
          mid=parseInt((begin+end)/2);
        } 
        else{
          $('#d'+mid).addClass('noMatch');
          begin=mid+1;
          mid=parseInt((begin+end))/2;
        }
      }//for

      if(key==-1) alert('not found');
      exeTime(num,val);


  }else{
    alert('Please press "Sort" button first');
  }//else


});



//-------------------------------------------------------reset-------------------------------


$('#reset').click(function(){
  $('li>div').removeClass('found search noMatch rest');
  $('li>div').addClass('chain');
});
//--------------------------------------------------------empty----------------------------------
$('#remove').click(function(){
  last_id=$('#binary-list ul>li').length-1;
  $('#'+last_id).remove();
});
//-----------------------------------------------------------------------
});//ready
//--------------------------executionTime
function exeTime(num,val){

  len=num.length;
  var second;
  for(var i = 0; i < len; i++){

    for(var j = 0; j<len-i; j++){
        second=parseInt(j+1);
        if(num[j] > num[second]){
          
            var swapping = num[j];
            num[j] = num[second];
            num[second] = swapping;
        }
    }
  }

  var start = new Date().getTime();
  mid=parseInt(len/2);
  begin=0,end=len-1;
  for(i=0;i<len;i++){
    sleep(1);
    if(num[mid]==val){
      break;
    } 
    else if(num[mid]>val){
      end=mid-1;
      mid=parseInt((begin+end)/2);
    } 
    else{
      begin=mid+1;
      mid=parseInt((begin+end))/2;
    }
  }//for
  
  var end = new Date().getTime();
  //alert(end);
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