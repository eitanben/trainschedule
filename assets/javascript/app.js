//items listed from left to right - as oppossed to said station
var url ="https://israel-train-schedule.firebaseio.com/";
var dataRef = new Firebase(url);
var name ='';
var destination = '';
var firstTrainTime = '';
var frequency = '';
var nextTrain = '';
var nextTrainDateFormat = '';
var minutesAway = '';
var firstTimeFormat = '';
var currentTime = '';
var diffTime = '';
var trainRemainder = '';
var minutesTillTrain = '';
var keyHolder = '';
var getKey = '';

$(document).ready(function() {

     $("#add-train").on("click", function() {

     	name = $('#name-input').val().trim();
     	destination = $('#destination-input').val().trim();
     	firstTrainTime = $('#first-train-time-input').val().trim();
     	frequency = $('#frequency-input').val().trim();
          firstTimeFormat = moment(firstTrainTime, "hh:mm").subtract(1, "years");
          currentTime = moment();
          diffTime = moment().diff(moment(firstTimeFormat), "minutes");
          trainRemainder = diffTime % frequency;
          minutesTillTrain = frequency - trainRemainder;
          nextTrain = moment().add(minutesTillTrain, "minutes");
          nextTrainDateFormat = moment(nextTrain).format("hh:mm");

     	keyHolder = dataRef.push({
     		name: name,
     		destination: destination,
     		firstTrainTime: firstTrainTime,
     		frequency: frequency,
               nextTrainDateFormat: nextTrainDateFormat,
               minutesTillTrain: minutesTillTrain
     	});

          $('#name-input').val('');
     	$('#destination-input').val('');
     	$('#first-train-time-input').val('');
     	$('#frequency-input').val('');

     	return false;
     });

     dataRef.on("child_added", function(childSnapshot) {

		$('.train-schedule').append("<tr class='table-row' id=" + "'" + childSnapshot.key() + "'" + ">" +
               "<td class='col-xs-3'>" + childSnapshot.val().name +
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().destination +
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().frequency +
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().nextTrainDateFormat +
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().minutesTillTrain +
               "</td>" +
               "<td class='col-xs-1'>" + "<input type='submit' value='לְהַסִיר' class='remove-train btn btn-primary btn-sm'>" + "</td>" +
          "</tr>");

});

$("body").on("click", ".remove-train", function(){
     $(this).closest ('tr').remove();
     getKey = $(this).parent().parent().attr('id');
     dataRef.child(getKey).remove();
});
});
