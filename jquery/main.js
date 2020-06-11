// Created by: Joshua C. Magoliman
$(document).ready(function() {
    // declaring and initializing variables and also selecting HTML elements
    var animation;
    var roadContainer = $('#roadContainer');
    var taxiCar = $('#taxiCar');
    var barrierCar1 = $('#barrierCar1');
    var barrierCar2 = $('#barrierCar2');
    var barrierCar3 = $('#barrierCar3');
    var line1 = $('#line1');
    var line2 = $('#line2');
    var line3 = $('#line3');
    var startOrRestartTheGameContainer = $('#startOrRestartTheGameContainer');
    var startOrRestartTheGame = $('#startOrRestartTheGame');
    var score = $('#score');
    var roadContainerWidth = parseInt(roadContainer.width());
    var roadContainerHeight = parseInt(roadContainer.height());
    var carWidth = parseInt(taxiCar.width());
    var carHeight = parseInt(taxiCar.height());
    var gameOver = false;
    var inGameCurrentScore = 1;
    var speed = 2;
    var lineSpeed = 5;
    var moveRight = false;
    var moveLeft = false;
    var moveUp = false;
    var moveDown = false;
    // if you pressed of any control arrows, taxi car will move
    $(document).on('keydown', function (e) {
        if (gameOver === false) {
            var key = e.keyCode;
            if (key === 37 && moveLeft === false) {
                moveLeft = requestAnimationFrame(movingLeft);
            } else if (key === 39 && moveRight === false) {
                moveRight = requestAnimationFrame(movingRight);
            } else if (key === 38 && moveUp === false) {
                moveUp = requestAnimationFrame(movingUp);
            } else if (key === 40 && moveDown === false) {
                moveDown = requestAnimationFrame(movingDown);
            }
        }
    });
    // if you stop pressing of any control arrows, the taxi car will stay in the current position 
    $(document).on('keyup', function (e) {
        if (gameOver === false) {
            var key = e.keyCode;
            if (key === 37) {
                cancelAnimationFrame(moveLeft);
                moveLeft = false;
            } else if (key === 39) {
                cancelAnimationFrame(moveRight);
                moveRight = false;
            } else if (key === 38) {
                cancelAnimationFrame(moveUp);
                moveUp = false;
            } else if (key === 40) {
                cancelAnimationFrame(moveDown);
                moveDown = false;
            }
        }
    });
    // user defined functions to move the taxi car
    function movingLeft() {
        if (gameOver === false && parseInt(taxiCar.css('left')) > 0) {
            taxiCar.css('left', parseInt(taxiCar.css('left')) - 5);
            moveLeft = requestAnimationFrame(movingLeft);
        }
    }
    function movingRight() {
        if (gameOver === false && parseInt(taxiCar.css('left')) < roadContainerWidth - carWidth) {
            taxiCar.css('left', parseInt(taxiCar.css('left')) + 5);
            moveRight = requestAnimationFrame(movingRight);
        }
    }
    function movingUp() {
        if (gameOver === false && parseInt(taxiCar.css('top')) > 0) {
            taxiCar.css('top', parseInt(taxiCar.css('top')) - 3);
            moveUp = requestAnimationFrame(movingUp);
        }
    }
    function movingDown() {
        if (gameOver === false && parseInt(taxiCar.css('top')) < roadContainerHeight - carHeight) {
            taxiCar.css('top', parseInt(taxiCar.css('top')) + 3);
            moveDown = requestAnimationFrame(movingDown);
        }
    }
    // if variable called gameOver have initialized of the value 'false'
    if (gameOver == false) {
        // show this two HTML elements
        startOrRestartTheGameContainer.slideDown();
        startOrRestartTheGame.focus();
    }
    // if the button is clicked
    startOrRestartTheGame.click(function () {
        if (gameOver == false) {
            // hide the this two HTML elements
            startOrRestartTheGameContainer.hide();
            startOrRestartTheGame.hide();
            // start the game
            animation = requestAnimationFrame(repeating);
        }
        else {
            // reload the whole page
            location.reload();
        }
    });
    function repeating() {
        // check for collision in any cars
        if (checkForCollision(taxiCar, barrierCar1) || checkForCollision(taxiCar, barrierCar2) || checkForCollision(taxiCar, barrierCar3)) {
            theGameIsOver(); // invoke this user defined function
            return; // return into this function
        }
        inGameCurrentScore++; // increment the score
        if (inGameCurrentScore % 20 == 0) {
            score.text(parseInt(score.text()) + 1); // increment the score
        }
        if (inGameCurrentScore % 500 == 0) {
            speed++; // increment the speed
            lineSpeed++;
        }
        carDown(barrierCar1);
        carDown(barrierCar2);
        carDown(barrierCar3);
        lineDown(line1);
        lineDown(line2);
        lineDown(line3);
        animation = requestAnimationFrame(repeating); // execute and repeat the process of game
    }
    function carDown(taxiCar) {
        var carCurrentTop = parseInt(taxiCar.css('top'));
        if (carCurrentTop > roadContainerHeight) {
            carCurrentTop = -200;
            var carLeft = parseInt(Math.random() * (roadContainerWidth - carWidth));
            taxiCar.css('left', carLeft);
        }
        taxiCar.css('top', carCurrentTop + speed);
    }
    function lineDown(line) {
        var lineCurrentTop = parseInt(line.css('top'));
        if (lineCurrentTop > roadContainerHeight) {
            lineCurrentTop = -300;
        }
        line.css('top', lineCurrentTop + lineSpeed);
    }
    function theGameIsOver() {
        gameOver = true;
        cancelAnimationFrame(animation);
        cancelAnimationFrame(moveRight);
        cancelAnimationFrame(moveLeft);
        cancelAnimationFrame(moveUp);
        cancelAnimationFrame(moveDown);
        $("#startOrRestartTheGame").html("<h3>Game Over</h3><p>(Click here)</p>");
        startOrRestartTheGameContainer.show();
        startOrRestartTheGame.show();
        startOrRestartTheGameContainer.slideDown();
        startOrRestartTheGame.focus();
    }
    function checkForCollision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;
        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }
});