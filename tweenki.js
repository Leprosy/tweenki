/**
 * Tweenki class
 * @author: Leprosy
 * @created: Apr 6 2016
 */

/**
 * Constructor
 */
function Tweenki(obj) {
    this.isRunning = false;

    this.endObj = null;
    this.endObjStep = null;

    this.frames = 0;
    this.delay = 0;
    this.obj = obj;
    this.originalObj = {};
    this.chainedTween = null;

    this.onUpdateCall = function() {};
    this.onFinishCall = function() {};
};

Tweenki.prototype._trKeys = function(obj, call) {
    var keys = Object.keys(obj);

    for (var i in keys) {
        var key = keys[i];

        call(this, key);
    }
}

Tweenki.prototype._clearTween = function() {
    this.isRunning = false;
    this.endObjStep = null;
    this.frames = 0;
}

/**
 * Sets a new tween for the object
 */
Tweenki.prototype.to = function(endObj, delay) {
    if (typeof delay == "undefined") {
        delay = 500;
    }

    this._clearTween();
    this.endObj = endObj;
    this.delay = delay;
    return this;
};

/**
 * Chain another tween. Pass a null to clear the chain.
 */
Tweenki.prototype.chain = function(tween) {
    this.chainedTween = tween;
    return this;
}

/**
 * Sets the update callback
 */
Tweenki.prototype.onUpdate = function(call) {
    this.onUpdateCall = call;
    return this;
};

/**
 * Sets the finish callback
 */
Tweenki.prototype.onFinish = function(call) {
    this.onFinishCall = call;
    return this;
};

/**
 * Update one frame
 */
Tweenki.prototype.update = function() {
    if (this.frames == 0) {
        return false;
    }

    // Frame : update each value with it's step
    this._trKeys(this.endObj, function(tween, key) {
        tween.obj[key] += tween.endObjStep[key];
    });

    // Set final value and finish call. Is there a chained tween?
    if (--this.frames == 0) {
        this._trKeys(this.endObj, function(tween, key) {
            tween.obj[key] = tween.endObj[key];
        });

        this._clearTween();
        this.onFinishCall(this.obj);

        if (this.chainedTween) {
            this.chainedTween.start();
        }
    } else {
        // Just update call
        this.onUpdateCall(this.obj);
    }

    return true;
};

/**
 * Starts the tween
 */
Tweenki.prototype.start = function() {
    this.isRunning = true;
    var _this = this;

    //First calculation of frames and steps
    if (this.endObjStep == null) {
        this.frames = (this.delay / 1000) * 60;
        this.endObjStep = {};

        this._trKeys(this.endObj, function(tween, key) {
            if (key in tween.obj) {
                tween.endObjStep[key] = (tween.endObj[key] - tween.obj[key]) / tween.frames;
            } else {
                delete tween.endObj[key];
            }
        });
    }

    var _tween = function () {
        if (!_this.isRunning) {
            return;
        }

        if (_this.update()) {
            requestAnimationFrame(_tween);
        }
    };

    _tween();
    return this;
};

/**
 * Stops the tween
 */
Tweenki.prototype.stop = function() {
    this.isRunning = false;
    return this;
};
