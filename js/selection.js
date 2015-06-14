
var TargetTick;
var Tick;
var Timer1;
var  A; // The array to be sorted

var arr0 = "<span id='arr0' >&darr;</span>";
var arr1 = "<span id='arr1' >&darr;</span>";
 
function ExecuteSort()
{
  A = [];
S=document.getElementById('arrayInput').value;
var res = S.split(",");  // The input array for Quicksort
for(k=0;k<res.length;k++){
    A[k]=parseInt(res[k]);
}

     var Speed =600 /*parseInt(speedSelectList.options[speedSelectList.selectedIndex].value)*/;

     var Alg = 0/*parseInt(algorithmSelectList.options[algorithmSelectList.selectedIndex].value)*/; 

     TargetTick=1;
    
   // Start animation
   if (Timer1) clearInterval(Timer1);
   if (Alg == 0)
      Timer1 = setInterval(AnimateSelectionSort,Speed); 
   else
      Timer1 = setInterval(AnimateInsertionSort,Speed);  
}
 

function SelectionSort(A) 
{   
   for (var i = 0; i < A.length-1; i++) 
   {  var min_pos=i ;
      var min = A[i];
      for(var j = i; j < A.length; j++)
      {   if (A[j] < min )
          {  min_pos= j; min =A[j] }

          if (UpdateTick()) { PrintArray(A,i,j,min_pos); return; }
      }

      // swap A[i] with A[min_pos]
      var t = A[i]; A[i] = A[min_pos]; A[min_pos] = t;
   }

   // (i > A.length) last call to Printarray() to show array after final swap
   PrintArray(A,i+1,-1,-1); 
   EndAnimate(); 
}
  

function InsertionSort(A) 
{   
   for (var i = 1; i < A.length; i++) 
   {  
     var item = A[i];
     var j = i-1;
     //  find place for item
     //  while( (j >= 0) && (item < A[j])) 
     //  for animation, we moved the test for 2nd cond to inside of loop 
     while ((j >= 0))   
     {   if (UpdateTick())  
         {  PrintArray(A,j+1,i,i);  return;  } 

         if (item >= A[j]) break;

         A[j+1] = A[j]; 
         A[j] = item; // this is added for animation
         j--;  
      }
     
      A[j+1] = item; 
   }
    
   PrintArray(A,i+1,-1,-1); 
   EndAnimate(); 
}
 

function PrintArray(A, start,target, minpos)
{  // This function renders the array A as an HTML list
  
   // alert(target);
 
  var x =  "";
  
  for(var i= 0; i < A.length ; i++)
  {  var st = ""; 
      if (i < start) st = " class ='finished'";  
   
      var ext ="";

     if (i==start) 
     {  ext = arr0;  st = "style='background-color:white'";   }

      if (i==target )
     {    st  = "style='background-color:white'";  }

     if  (i== minpos)  
     {  ext += arr1;   st = " style='background-color:white;border-color: red'";  }
       
     
     x += "<li " + st + ">" + A[i] + ext+   "</li>"; 
  }  
  
   OutDiv.innerHTML =  "<ul>"  + x + "</ul>";  
}
 


// The pattern for AnimateSomeProcedure() is:

//  Set TragetTick =1 (in caller)
//  Execute the procedure to be animated from start (Tick=0)  till (Tick=TragetTick)
//  Increment TargetTick
//  Execute the procedure to be animated from start (Tick=0)  till (Tick=TragetTick)
//  Increment TargetTick
//  Execute the procedure to be animated from start (Tick=0)  till (Tick=TragetTick)
// Note: Tick is incremented in UpateTick()

function AnimateSelectionSort()  
{  // This function is executed repeatedly via SetInterval()
   // Note: TargetTick is incremented with every call to this function 
   
   Tick=0;
  // SelectionSort(A); 
    SelectionSort_Rec(A,0) ;
   TargetTick++;   
}


function AnimateInsertionSort()
{ // This function is executed repeatedly via SetInterval()  
  // Note: TargetTick is incremented with every call to this function 
  
  B = A.slice(); // Start from an original copy of A   
  Tick=0; 
  InsertionSort(B); 
  TargetTick++;   
}

function EndAnimate()
{  clearInterval(Timer1);  } 
 
function UpdateTick()
{  Tick++;
   return (Tick == TargetTick);
}


function SelectionSort_Rec(A,i) 
{   
    if (i >= A.length-1)
    {  // (i > A.length) last call to Printarray() to show array after final swap
       PrintArray(A,i+1,-1,-1); 
       EndAnimate(); 
       return;
    }
 
    var min_pos=i ;
    var min = A[i];
    for(var j = i; j < A.length; j++)
    {  if (A[j] < min )
       {  min_pos= j; min =A[j]; }

       if (UpdateTick()) { PrintArray(A,i,j,min_pos); return; }
    }

    // swap A[i] with A[min_pos]
    var t = A[i]; A[i] = A[min_pos]; A[min_pos] = t; 

    SelectionSort_Rec(A,i+1); // Recursive call
}

