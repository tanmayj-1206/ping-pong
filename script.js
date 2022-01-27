var rod1 = document.getElementById('rod-1');
var rod2 = document.getElementById('rod-2');
var ball = document.querySelector('.ball');
var windowWidth = window.innerWidth;
var rod1Width = rod1.offsetWidth;
var rod1Height = rod1.offsetHeight;
var ballX = 2;
var ballY = 2;
var maxScore = 0;
var score = 0;

function reset() {
    
    rod1.style.left = (windowWidth - rod1Width) / 2 + 'px';
    rod2.style.left = rod1.style.left;
    ball.style.left = (windowWidth - ball.offsetWidth) / 2 + 'px';
    ball.style.top = rod2.offsetTop - ball.offsetHeight + 'px';

    if(localStorage.getItem('player') == 'null')
    {
        localStorage.setItem('player', 'player1');
        alert('this is your first time');
    }

    else{
        maxScore = localStorage.getItem('maxScore');
        alert('The highest score is ' + maxScore);
    }

}

reset();

window.addEventListener('keypress', function (e) {
    let rodMove = 20;
    let rodPos = rod1.getBoundingClientRect();

    if (e.code == 'KeyA' && rodPos.x > 0) {
        rod1.style.left = rodPos.x - rodMove + 'px';
        rod2.style.left = rod1.style.left;
    }

    else if (e.code == 'KeyD' && (rodPos.x + rod1.offsetWidth) < this.window.innerWidth) {
        rod1.style.left = rodPos.x + rodMove + 'px';
        rod2.style.left = rod1.style.left;
    }

    if(e.code == 'Enter')
    {
        score = 0
        var interval = setInterval(function () {
            
        
            let ballPos = ball.getBoundingClientRect();
            let rodPos = rod1.getBoundingClientRect();
            let ballCentre = ballPos.x + (ball.offsetWidth/2);
            console.log(rodPos.x);
            if (ballPos.x <= 0 || (ballPos.x + ball.offsetWidth) >= window.innerWidth) {
                ballX = -ballX;
            }
        
            else if (ballPos.y <= rod1Height || (ballPos.y + ball.offsetHeight) >= (window.innerHeight - rod1Height)) {
                ballY = -ballY;
                if(ballCentre < rodPos.x || ballCentre > (rodPos.x + rod1Width))
                {
                    alert('Your score is ' + score);
                    if(score > localStorage.getItem('maxScore'))
                    {
                        localStorage.setItem('maxScore', score);
                    }
                    reset();
                    clearInterval(interval);
                    return;
                }
                else{
                    score += 10;
                }
            }

            ball.style.top = ballPos.y + ballY + 'px';
            ball.style.left = ballPos.x + ballX + 'px';
        }, 20);

    }
})

