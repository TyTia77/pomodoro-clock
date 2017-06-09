/*jshint esversion: 6 */
var app = angular.module('app', []);

app.controller('mainCtrl', [ '$scope', '$interval', ($scope, $interval)=>{
    $scope.session = 1;
    $scope.break = 1;
    $scope.percent = 100;

    // timer running
    $scope.isTimer = false;
    $scope.sessionName = 'Session';
    $scope.fillColor = '0262B6';

    $scope.timeleft = $scope.session;
    var secs = 60 * $scope.timeleft;
    $scope.originalTime = $scope.session;

    //setinterval name
    var counter;

    function secsToHms(num){
        num = Number(num);
        var h = Math.floor(num / 3600);
        var m = Math.floor(num % 3600 / 60);
        var s = Math.floor(num % 3600 % 60);

        return (
            (   h > 0 ? h +':' +(m < 10 ? '0': '') : '') +m +':' +(s < 10 ? '0' : '') +s
        );
    }

    function timer(){
        secs -= 1;

        if (secs < 0){
            //time finished
            // var wav = 'http://www.oringz.com/oringz-uploads/sounds-917-communication-channel.mp3';
            // var audio = new Audio(wav);
            // audio.play();

            if ($scope.sessionName === 'Session'){
                $scope.sessionName = 'Break';
                $scope.currentLength = $scope.break;
                $scope.originalTime = $scope.break;
                secs = 60 * $scope.break;
                $scope.fillColor = 'D35400';
            } else {
                $scope.sessionName = 'Session';
                $scope.currentLength = $scope.session;
                $scope.originalTime = $scope.session;
                secs = 60 * $scope.session;
                $scope.fillColor = '0262B6';
            }

            $scope.percent = 100;
        } else {
            $scope.timeleft = secsToHms(secs);
            var percent = 60 * $scope.session;
            // $scope.percent = Math.floor(Math.abs(secs / percent)*100);
            var calculatedPercent = Math.floor(Math.abs(secs / percent * 100 - 100));
            progressBarUpdate(calculatedPercent);
            // console.log(Math.floor($scope.percent));
        }
    }

    $scope.sessChange = type => {
        if (!$scope.isTimer){
            type === 'inc' ? $scope.session++ : $scope.session--;
            $scope.session === 0 ? $scope.session++ : '';
            $scope.timeleft = $scope.session;
            secs = 60 * $scope.timeleft;
        }
    }

    $scope.breakChange = type => {
        if (!$scope.isTimer && $scope.session > 0){
            type === 'inc' ? $scope.break++ : $scope.break--;
            $scope.break === 0 ? $scope.break++ : '';
        }
    }

    $scope.toggleTimer = () => {
        if (!$scope.isTimer){
            if ($scope.sessionName === 'Session'){
                $scope.currentLength = $scope.session;
            } else {
                $scope.currentLength = $scope.break;
            }
            timer();
            counter = $interval(timer, 1000);
            $scope.isTimer = !$scope.isTimer;
        } else {
            //pause timer
            $interval.cancel(counter);
            $scope.isTimer = !$scope.isTimer;
        }
    }

    function rotate(element, degree) {
        element.css({
            '-webkit-transform': 'rotate(' + degree + 'deg)',
                '-moz-transform': 'rotate(' + degree + 'deg)',
                '-ms-transform': 'rotate(' + degree + 'deg)',
                '-o-transform': 'rotate(' + degree + 'deg)',
                'transform': 'rotate(' + degree + 'deg)',
                'zoom': 1
        });
    }

    function progressBarUpdate(percentage) {
        var firstHalfAngle = 180;
        var secondHalfAngle = 0;

        // caluclate the angle
        var drawAngle = percentage * 360 / 100;

        // calculate the angle to be displayed if each half
        if (drawAngle <= 180) {
            firstHalfAngle = drawAngle;
        } else {
            secondHalfAngle = drawAngle - 180;
        }

        // set the transition
        rotate($(".slice1"), firstHalfAngle);
        rotate($(".slice2"), secondHalfAngle);

        // set the values on the text
       // $(".status").html(x + " of " + outOf);
    }



}]);
