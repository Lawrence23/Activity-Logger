var i=0;
var activities = [];
var hoursLabel, minutesLabel, secondsLabel, totalTime;

$('#add').click(function () {
	
	$('#activity-name').val('');
})
$('#create').off("click").on("click", function(){
	var activity, $actName;
    activity = $('#activity-name').val();
	activities[i] = new Activity(activity, i);
	$activity = '<li class="list-group-item" id="'+i+'">'
		+'<div class="row">'
		+'<div class="col-md-3"><span class="activities">'+activities[i].activityName+'</span></div>'
		+'<div class="col-md-3">'
		+'<label class="hours">00</label>:<label class="minutes">00</label>:<label class="seconds">00</label>'
		+'</div>'
		+'<div class="col-md-3">'
		+'<input type="button" class="gobutton form-control" value="Start">'
		+'<input type="button" class="pausebutton form-control" value="Pause">'
		+'<input type="button" class="stopbutton form-control" value="Stop"></div>'
		+'<div class="col-md-3"><label class="totalTime"></div></div></li>';
	$('#activity-list').append($activity);
	activities[i].hoursLabel = $("#" + i + " .hours");
	activities[i].minutesLabel = $("#" + i + " .minutes");
	activities[i].secondsLabel = $("#" + i + " .seconds");
	activities[i].totalTime = $("#" + i + " .totalTime");

	activities[i].bindEvents();
	
	i++;
})


var Activity = function(name, i) {
	this.activityName = name;
	this.activityIndex = i;
	this.hrs = 0;
	this.mins = 0;
	this.secs = 0;
	this.counter = 0;
 	this.timerOn = 0;
 	this.htmlResets = 0;
 	this.totalMills = 0;
	this.hoursLabel = 0;
	this.minutesLabel = 0;
	this.secondsLabel = 0;
	this.totalTime = 0;
};

Activity.prototype.bindEvents = function() {
	var that = this;
	$("#" + that.activityIndex + " .gobutton").on("click", function() {
		that.startTimer();
	});
	$("#" + that.activityIndex + " .pausebutton").on("click", function() {
		if(this.value == "Pause") {
			this.value = "Reset";	
		}
		else this.value = "Pause";
		that.pauseTimer();
	});
	$("#" + that.activityIndex + " .stopbutton").on("click", function() {
		that.stopTimer();
	});
};

Activity.prototype.startTimer = function(that) {
    var that = this;
    if (this.timerOn == 1) {
        return;
    }
    else {
        this.counter = setInterval(function() {
        	that.setTime();
        }, 10);
        this.timerOn = 1;
        this.htmlResets = 0;
    }
}

Activity.prototype.pauseTimer = function(that) {
    var that = this;
    if (this.timerOn == 1) {
        clearInterval(this.counter);
        this.timerOn = 0;
    }

    if (this.htmlResets == 1) {
        this.hoursLabel.text("00");
        this.minutesLabel.text("00");
        this.secondsLabel.text("00");
        this.totalMills = 0;
        this.secs = 0;
        this.mins = 0;
        this.hrs = 0;
    }
    else {
        this.htmlResets = 1;
    }
}

Activity.prototype.stopTimer = function(that) {
    var that = this;
    this.totalTime.text("Time Recorded: " + this.hoursLabel.text() + ":" + this.minutesLabel.text() + ":" + this.secondsLabel.text());
    this.hoursLabel.text("00");
    this.minutesLabel.text("00");
    this.secondsLabel.text("00");
    this.totalMills = 0;
    this.secs = 0;
    this.mins = 0;
    this.hrs = 0;
    clearInterval(this.counter);
    this.timerOn = 0;
}

Activity.prototype.setTime = function() {
    ++this.totalMills;
    if (this.hrs == 99 && this.mins == 59 && this.secs == 60) {
        this.hrs = 0;
        this.mins = 0;
        this.secs = 0;
        this.hoursLabel.text("00");
        this.minutesLabel.text("00");
        this.secondsLabel.text("00");
        clearInterval(this.counter);
    }
    if (this.totalMills == 100) {
        this.secs++;
        this.secondsLabel.text(this.pad(this.secs % 60));
        this.totalMills = 0;
    }
    if (this.secs == 60) {
        this.mins++;
        this.minutesLabel.text(this.pad(this.mins % 60));
        this.secs = 0;
    }
    if (this.mins == 60) {
        this.hrs++;
        this.hoursLabel.text(pad(this.hrs));
        this.mins = 0;
    }
}

Activity.prototype.pad = function(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    }
    else {
        return valString;
    }
}