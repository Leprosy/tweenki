# tweenki
A very small and basic JS tween library

# Usage
Tweenki is designed to make a tween between numeric properties of a JS object. For example:

var obj = { x: 0, y: 1000 };
var tween = new Tweenki(obj).to({x: 1000, y: 500}, 1200);
tween.start();

When 1.2 seconds have passed:

console.log(obj)
>> obj = { x: 1000, y: 500 }
