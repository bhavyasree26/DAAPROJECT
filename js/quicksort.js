
var paramStack; // A global array used as a stack 
var prevleft,prevright;
   
 var arr0 = "<span id='arr0' >&darr;</span>";
 var arr1 = "<span id='arr1' >&darr;</span>";
 

var Speed=600, Display=1;

var newRow;
var gelem1, gelem2;
 
var lo,  hi;
var left,right; 
var Timer1= null;
var dispLeft,dispRight;
 
var gLeftIndx, gRightIndx;
var pivotLoc; 
var numbers;

function ExecuteQS()
{ // The array A (global) is the input to Quicksort
 A=[];numbers=[];
S=document.getElementById('arrayinput').value;
var res = S.split(",");  // The input array for Quicksort
for(k=0;k<=res.length;k++){
	if(k==0){
		A[k]=0;
    numbers[k]=0;
  }
	else{
		A[k]=parseInt(res[k-1]);
    numbers[k]=A[k];
  }
}
  if (Timer1) clearInterval(Timer1);
  Timer1 = null; 

  OutDiv.innerHTML = "";
  paramStack=[]; // paramStack array is global
  var B = A.slice(); // Make a duplicate of array A
  Quicksort(A,1,A.length-1);
 
  A = B.slice(); // Restore array A 
  ProcessStack(); 
}

function Quicksort(A, lo , hi) 
{  if (lo < hi) 
   {  var mid = Partition(A,lo,hi);
      Quicksort(A,lo,mid-1);
      Quicksort(A,mid+1,hi);
   } 
} 

function Partition( A, lo, hi)
{// Input: An integer array A[lo..hi]  
 // Output: The elements arranged as: elements <= pivot, pivot, elements > pivot;
 // Return the final position of pivot 
 // Assume pivot is A[lo] but it can be any of the elements A[lo], ..., A[hi];
 // If pivot is other than A[lo] then (at the start) swap it with A[lo]

   paramStack.push([-lo,hi]); // push lo and hi 
   var pivot = A[lo];   
   var left = lo+1; 
   var right = hi;
   while (left <= right)
   {  while ((left <= right) && (A[left] <= pivot)) left++;
      while ((left <= right) && (A[right] > pivot)) right--;
      if (left < right)
      {  // save left and right parameters to paramStack array 
         paramStack.push([left,right]);
         var t = A[left]; A[left] = A[right]; A[right] = t; left++; right--; 
      }
   }
  
   // Final swap: swap pivot with A[right] and return right (final pivot location) 
   A[lo] = A[right]; A[right] = pivot;
   paramStack.push([lo,right]); // push lo and right 
   return right;
}


function ProcessStack()
{  var elem = document.getElementById("arr0");
   if (elem) elem.parentNode.removeChild(elem); 
   elem = document.getElementById("arr1");
   if (elem) elem.parentNode.removeChild(elem); 

   if (paramStack.length==0)  
   { PrintArray(A,-1,0); return; }
    
   gelem1 = null; gelem2 = null;
   newRow = false;
   var param = paramStack.shift(); // Get parameters from paramStack
    
   left = param[0]; right = param[1]; 
   
   if (left < 0)  // Check if parameters are lo and hi
   {  newRow =true;
      lo = -left;  hi = right; 
     
      prevleft = lo;  // a bug creeps if RHS is lo+1
      prevright = hi;
 
      param = paramStack.shift();  
     
      left = param[0]; right = param[1]; 
   } 
       
   dispLeft = left-prevleft; // no. of cells to move left arraow
   dispRight = prevright-right ; // no. of cells to move right arraow
   
   if (left==lo) dispLeft = right - prevleft;
   
   PrintArray(A, prevleft, prevright);
 
   prevright = right; prevleft = left;

   // Modify the array; the modified array will be shown the 
   // next time ProcessStack() (and thus PrintArray) is called
   var t = A[left]; A[left] = A[right]; A[right] = t; 
  
   if (!Timer1) Timer1 = setInterval(AnimateArrow,Speed); // Start animation
} 


function PrintArray(A, prevleft, prevright)
{  // This function renders the array A as an HTML list
  
   var finish = (prevleft==-1);
   if (finish) { lo=0; hi=0; newRow=true;}
 
  var x =  "";
 
  for(var i= 1; i < A.length ; i++)
  {  var st = ""; 
     if ( (i>=lo)  &&  (i <=hi)) st = "style='background-color:lightgray'";
      
     var ext ="";
    
     if (i==prevleft ) 
     {  ext = arr0; gLeftIndx = i; st = "style='background-color:white'";   }
     if (i==prevright )
     { ext = arr1; gRightIndx = i; st  = "style='background-color:white'";  }
    
     if (i==lo) st += " class ='pivot'"; 
     x += "<li " + st + ">" + A[i] + ext + "</li>"; 
  } 
  
  if (Display && (!newRow) )
  {  elems = document.getElementsByTagName("ul");
     elem = elems[elems.length-1];
     if (elem) elem.parentNode.removeChild(elem); 
  } 
  
  var Info = ""; 
 
  if (Display && !finish)  // Shrunk display has lo/hi/mid info
  {   Info="<span class='info' >"  + lo + " : "  + hi + " : ? " + "</span>" ; 
      elems = document.getElementsByTagName("span");
      elem = elems[elems.length-1];
      if (newRow )  // set pivot in previous line
      { if (elem) elem.innerHTML = elem.innerHTML.replace("?",pivotLoc );  } 
      else if (elem) elem.parentNode.removeChild(elem); 
   } 

   OutDiv.innerHTML += Info + "<ul>"  + x + "</ul>"; 

   if (lo==left) pivotLoc = right;
   
   if (finish)
   {  if (Display)
      { elems = document.getElementsByTagName("span");
        elem = elems[elems.length-1];
        elem.innerHTML = elem.innerHTML.replace("?",pivotLoc);  
      }
 
      elems = document.getElementsByTagName("ul");
      elem = elems[elems.length-1];
      elem.className = "finalarray";
  exeTime(numbers);
   }
}
  
 
function AnimateArrow()
{  // This function is called as a result of 
   // the call to setInterval() in ProcessSatck() 

    if (( dispLeft < -1) && ( dispRight < -1))  
    {  clearInterval(Timer1); Timer1 = null; ProcessStack(); return; }
 
    var elems = document.getElementsByTagName("ul");
    var lastList = elems[elems.length-1];

    if (( dispLeft == -1) && ( dispRight == -1))
    {   lastList.getElementsByTagName("li")[left-1].style.backgroundColor="yellow"; 
        dispLeft = -2; dispRight = -2;
        return;
    }

    arr_elem = document.getElementById("arr0");
    styleInfo = window.getComputedStyle(arr_elem);
    pos = parseInt(styleInfo.left); 
 
    pos = pos + 31;
    if ( dispLeft > 0) 
    {  dispLeft--;  
        if (gelem1) gelem1.style.backgroundColor="lightgray";  
         else lastList.getElementsByTagName("li")[gLeftIndx-1].style.backgroundColor="lightgray";  
       gelem1 = lastList.getElementsByTagName("li")[gLeftIndx];
        if  (gLeftIndx  < right ) 
          if (gelem1.style.backgroundColor!="yellow") gelem1.style.backgroundColor="white"; //keep condition
       // else gelem2= gelem1; 
      //  if (right - gLeftIndx  <= 2) pos -=1; // to avoid blue/red arrows overlapping
       arr_elem.style.left = pos  + "px";  
       gLeftIndx++; 
    }
    else  if (dispLeft==0) 
    {   lastList.getElementsByTagName("li")[gLeftIndx-1].style.backgroundColor="yellow"; 
       dispLeft =-1;
    } 

   arr_elem  = document.getElementById("arr1");
   styleInfo = window.getComputedStyle(arr_elem);
   pos = parseInt(styleInfo.left);
   pos = pos - 31;
 
   if (dispRight > 0)
   {   dispRight--; 
        
       if (gelem2)  gelem2.style.backgroundColor="lightgray";  
       else lastList.getElementsByTagName("li")[gRightIndx-1].style.backgroundColor="lightgray";  

       gelem2 = lastList.getElementsByTagName("li")[right+dispRight-1];

        if (gelem2.style.backgroundColor!="yellow")  gelem2.style.backgroundColor="white";

       if ((right - gLeftIndx <= 2) && (dispRight<=1))  pos +=2; // to avoid blue/red arrows overlapping
       arr_elem.style.left = pos  + "px";    
   } 
    else if  (dispRight==0) 
   {  // if (gelem2) gelem2.style.backgroundColor="lightgray"; 
     //  else lastList.getElementsByTagName("li")[gRightIndx-1].style.backgroundColor="lightgray";   
     
       lastList.getElementsByTagName("li")[right-1].style.backgroundColor="yellow";   
      dispRight =-1;
         
   }   
    
}
//--------------------------executionTime

function exeTime(num){
  var start = new Date().getTime();
  qsort(num);
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
function qsort(a) {
    if (a.length == 0) return [];
 
    var left = [], right = [], pivot = a[0];
 
    for (var i = 1; i < a.length; i++) {
        sleep(1);
        a[i] < pivot ? left.push(a[i]) : right.push(a[i]);
    }
 
    return qsort(left).concat(pivot, qsort(right));
}