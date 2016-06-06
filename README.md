# Tweenki
A very small and basic JS tween library

# Usage
Tweenki is designed to make a tween between numeric properties of a JS object. For example:
```javascript
var obj = {x: 0, y: 1000};
var tween = new Tweenki(obj).to({x: 1000, y: 500}, 1200);
tween.start();
```

When 1.2 seconds have passed:
```javascript
console.log(obj)
>> obj = {x: 1000, y: 500}
```

You can chain tweens to be executed one after another too:
```javascript
var obj = {x: 0};
var tween1 = new Tweenki(obj).to({x: 1000}, 1000);
var tween2 = new Tweenki(obj).to({x: 0}, 1000);
tween1.chain(tween2);
tween2.chain(tween1);
tween1.start();
```

You can also use the ```onUpdate``` and ```onFinish``` methods.
These pass a callback function to the ```update``` and ```finish``` events of the tween, respectively.
The functions recieve the ```obj``` as a parameter.

```javascript
tween.onUpdate(function(obj) {
  console.info("Tween updated", obj);
});

tween.onFinish(function(obj) {
  console.info("Tween finished", obj);
});
```
