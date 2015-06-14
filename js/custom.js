var myApp = angular.module('myApp',[]);

var arraymain = [];

myApp.controller('myController',function($scope){

	$scope.array1 = [];
	$scope.array2 = [];
	$scope.partition = function(list,start,end) {
		pivot = list[end];
		var	partitionIndex=start; //set partition index as start initially
					for(i=start;i<end;i++){
						if(list[i]<=pivot){
							temp=list[i];
							list[i]=list[partitionIndex];
							list[partitionIndex]=temp;
							 // swap if element is lesser than pivot
							partitionIndex++;
						}
						alert(list);
						$scope.array1.push(list);
					}
					temp=list[partitionIndex];
					list[partitionIndex]=list[end];
					list[end]=temp; // swap pivot with element at partition index
					return partitionIndex;
	}

	$scope.quickSort = function(list,start,end){
		if(start<end){
				var	partitionIndex=$scope.partition(list,start,end);
					//$scope.array.push(list[partitionIndex]);
					$scope.quickSort(list,start,partitionIndex-1);
					$scope.quickSort(list,partitionIndex+1,end);
				}
				return list;
	}

var val="";
		$scope.selectionSort = function(list) {
				n=list.length;
				var tempArr = [];
				for(i=0; i<n-1; i++){//need to do n-2 passes
					i_min=i;
					//finding mining index
					for(j=i+1;j<n;j++){//ith position: elements from i till n-1 candidates
						if(list[j]<list[i_min]) 
							i_min=j; //update the index of minimim element
					
					}
					temp=list[i];
					list[i]=list[i_min];
					list[i_min]=temp;
					val = list;
					//alert(val);
					
					tempArr.push(val);
				}
				console.log(tempArr);
				$scope.array1 = tempArr;
				//console.log(list)
				return list;

			}
console.log($scope.selectionSort([3,2,3,4,5,1,2]));
/*	$scope.array.push([3,2,3,4,5,1,2]);
	$scope.array.push($scope.quickSort([3,2,3,4,5,1,2],0,6));*/
/*	$scope.stname=[{id:'1',name:'haseeb',fname:'mujeeb'},
	{id:'2',name:'haseeb',fname:'mujeeb'},
	{id:'3',name:'haseeb',fname:'mujeeb'}
	];

	$scope.addData = function(){
		$scope.stname.push({
			id:($scope.stname.length+1),
			name:$scope.name,
			fname : $scope.fname
		});
		$scope.name="";
		$scope.fname="";
	};

	$scope.editshow = function  (val) {
		$scope.id=val.id;
		$scope.name=val.name;
		$scope.fname=val.fname;
		$scope.sub=false;
		$scope.hello=true;
	};
	$scope.sub=true;*/
});