'use strict';



var _ = require('underscore');
var registerMethod = require('./registerMethod');

registerMethod(Array.prototype, "compare",function(testArr){
	if ( this.length !== testArr.length ) {
		return false;
	}
	for (var i = 0; i < testArr.length; i++) {
		if ( this[i].compare ) {
		    if ( !this[i].compare( testArr[i] ) ) {
					return false;
				}
		} else {
			if ( this[i] !== testArr[i] ) {
				return false;
			}
		}
	}
	return true;
});

registerMethod(Array.prototype, "sum", function() {
  var sum = 0;
  for (var i = 0; i < this.length; i++) {
    sum += this[i];
  }
  return sum;
});

registerMethod(Array.prototype, "mean", function() {
	return this.sum() / this.length;
});

registerMethod(Array.prototype, "max", function(){
	return Math.max.apply( Math, this);
});


registerMethod(Array.prototype, "min", function(){
	return Math.min.apply( Math, this);
});

registerMethod(Array.prototype, "cumsum", function(){
	var ret = _.clone(this);
	var runningTotal = 0;
	for(var i = 0; i < this.length; i++){
		runningTotal = runningTotal + ret[i];
		ret[i] = runningTotal;
	}
	return ret;
});

registerMethod(Array.prototype, "cumprod", function(){
	var ret = _.clone(this);
	var runningTotal = 1;
	for(var i = 0; i < this.length; i++){
		runningTotal = runningTotal * ret[i];
		ret[i] = runningTotal;
	}
	return ret;
});

registerMethod(Array.prototype, "cummin", function(){
	var ret = _.clone(this);
	var current_min = Infinity;
	for(var i = 0; i < this.length; i++){
		if (ret[i] < current_min){
			current_min = ret[i];
		} else {
			ret[i] = current_min;
		}
	}
	return ret;
});

registerMethod(Array.prototype, "cummax", function(){
	var ret = _.clone(this);
	var current_min = -Infinity;
	for(var i = 0; i < this.length; i++){
		if (ret[i] > current_min){
			current_min = ret[i];
		} else {
			ret[i] = current_min;
		}
	}
	return ret;
});

registerMethod(Array.prototype, "clean", function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] === deleteValue) {
      this.splice(i, 1);
      i--;
    }
  }
  return this;
});

registerMethod(Array.prototype, "contains", function(elem){
	for (var q = 0; q < this.length; q++){
    if (elem === this[q]){
      return true;
    }
  }
	return false;
});

registerMethod(Array.prototype, "pickRandom", function(){
	var a = parseInt( Math.random() * this.length, 10);
	return this[a];
});

registerMethod(Array.prototype, "pickRandomElements",function(no){
	if ( no > this.length ) {
		no = this.length;
	}
	var list = [];
	while( list.length < no ) {
	  var t = parseInt(Math.random() * this.length);
	  if ( list.contains(t) === false ) {
			list.push(t);
		}
	}
	var target = [];
	for (var i = 0; i < list.length; i++) {
	  target.push ( this[ list[i] ] );
	 }
	return target;
});

registerMethod(Array.prototype, "containsAll", function(list){
	for (var i = 0; i < list.length; i++){
	  if ( this.contains(list[i]) === false ) {
			return false;
		}
	}
	return true;
});

	registerMethod(Array.prototype, "containsAny", function(list){
	for (var i = 0; i < list.length; i++){
	  if ( this.contains(list[i]) === true ) {
			return  true;
		}
	}
	return false;
});

registerMethod(Array.prototype, "removeItemAt", function(index){
	var list = [];
	for (var q = 0; q < this.length; q++){
	  if ( q !== index ) {
	  	list.push(this[q]);
		}
	}
	this.length = 0;
	for (var l = 0; l < list.length; l++){
		this.push(list[l]);
	}
});

registerMethod(Array.prototype, "remix", function(){
	var x = this.length;
	var newsort = [];

	for (var q = 0; q < x; q++){
		newsort.push(q);
	}

	var res = newsort.pickRandomElements(x);
	var target = [];

	for (var l = 0; l < res.length; l++){
		var x2 = res[l];
		target.push( this[x2] );
	}
	return target;
});

registerMethod(Array.prototype, "unique", function(){
	var res = [];
	for(var i = 0; i < this.length; i++){
		var elem = this[i];
		if ( res.contains(elem) === false ){
			res.push(elem);
		}
	}
	return res;
});

registerMethod(Array.prototype, "concatUnique", function(arr2){
	var arr1 = this;
	return arr1.concat(arr2.filter(function(e){
	  return !arr1.contains(e);
	}));
});

registerMethod(Array.prototype, "orderIndices", function(func){
	var i,j;
	var indices = _.clone(this);
	i = j = this.length;
	while (i--) {
		indices[i] = { k: i, v: this[i] };
	}
	indices.sort(function (a, b) {
			return func ? func.call(indices, a.v, b.v) :
										a.v < b.v ? -1 : a.v > b.v ? 1 : 0;
	});
	while (j--) {
		indices[j] = indices[j].k;
	}
	return indices;
});
