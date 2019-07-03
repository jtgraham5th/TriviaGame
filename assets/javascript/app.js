var xxx = 0;
var answerCall = "";
var userAnswer = "";
var questionNumber = "";
var correctAnswer = "";
var right = 0;
var wrong = 0;
var timer = 15;
var answered = []
var questions = [
     {
        question: "Which was the first album that West produced?",
        answer1: "Jermaine Dupri, Life in 1472",
        answer2: "Grav, “Down to Earth",
        answer3: "Jay-Z, Reasonable Doubt",
        answer4: "Illmatic",
      },
      {
        question: "West was inspired to create his first single, 'Through the Wire,' while doing what?",
        answer1: "Watching footage of a deadly wildfire in Colorado",
        answer2: "Watching “The Wire”",
        answer3: "Recovering from a near-fatal car accident",
        answer4: "Deciding whether to propose to his girlfriend, the designer Alexis Phifer",
      },
      {
        question: "Before Kanye West was recognized, he was part of which group?",
        answer1: "The Students",
        answer2: "Justice League",
        answer3: "Spaceships",
        answer4: "Go-Getters",
      },
      {
        question: "Kanye West lived on what other continent when he was in the 5th grade?",
        answer1: "Europe",
        answer2: "France",
        answer3: "China",
        answer4: "Asia",
      },
      {
        question: "What College did Kanye West drop out of?",
        answer1: "Chicago State University / Columbia College",
        answer2: "Depaul University",
        answer3: "Loyola University ",
        answer4: "Northwestern University",
      },
      {
        question: "Kanye West has been nominated for how many Grammy",
        answer1: "21",
        answer2: "68",
        answer3: "103 ",
        answer4: "47",
      },
      {
        question: "In 2004, Kanye released his debut album titled",
        answer1: "Love Lockdown",
        answer2: "Late Registration",
        answer3: "Undiscovered ",
        answer4: "The College Dropout",
      },
      {
        question: "What was the first JAY-Z album to feature production from Kanye West",
        answer1: "The Blueprint",
        answer2: "Vol. 3... Life and Times of S. Carter",
        answer3: "The Dynasty: Roc La Familia ",
        answer4: "The Best of Both Worlds",
      },
      {
        question: "What 2005 Kanye single samples a James Bond movie theme",
        answer1: "Diamonds from Sierra Leone",
        answer2: "Touch the Sky",
        answer3: "The New Workout Plan ",
        answer4: "Heard 'Em Say",
      }
      ];
      

function getAnswers() {
    console.log("this is the index of the current question:" + questions.indexOf(xxx));
    if (questions.indexOf(xxx) === 0) {
        correctAnswer = 2;
        $("#gif").attr("src","assets/images/grav.jpg");
    } else if (questions.indexOf(xxx) === 1) {
        correctAnswer = 3;
        $("#gif").attr("src","assets/images/throughthewire.jpg")
    } else if (questions.indexOf(xxx) === 2) {
        correctAnswer = 4;
        $("#gif").attr("src","assets/images/gogetters.jpg")
    } else if (questions.indexOf(xxx) === 3) {
        correctAnswer = 4;
        $("#gif").attr("src","assets/images/kanyeinasia.jpeg")
    } else if (questions.indexOf(xxx) === 4) {
        correctAnswer = 1;
        $("#gif").attr("src","assets/images/collegedropout.gif")
    } else if (questions.indexOf(xxx) === 5) {
        correctAnswer = 2;
        $("#gif").attr("src","assets/images/kanyegrammys.jpg")
    } else if (questions.indexOf(xxx) === 6) {
        correctAnswer = 4;
        $("#gif").attr("src","assets/images/albumcover.jpg")
    } else if (questions.indexOf(xxx) === 7) {
        correctAnswer = 3;
        $("#gif").attr("src","assets/images/kanyejayz.gif")
    } else if (questions.indexOf(xxx) === 8) {
        correctAnswer = 1;
        $("#gif").attr("src","assets/images/diamonds.gif")
    } 
}


function setup() { 
    $("#time").html("<h2> Time Left: " + timer + "</h2>");
    $("#wrong").html("<h2>Incorrect: " + wrong + "</h2>");
    $("#right").html("<h2>Correct: " + right + "</h2>");
    xxx = questions[Math.floor(Math.random() * questions.length)];
    if (answered.includes(questions.indexOf(xxx))) {
       setup(); 
    } else {
    answered.push(questions.indexOf(xxx));
    console.log(answered);
    $("#display").text(xxx.question);
    for(i=0; i < 5;i++) {
        answerCall = "" + '#answer' + i + "";
        $(answerCall).text(xxx["answer" + i])
        $(answerCall).attr("data-id", i);
        console.log($(answerCall).attr("data-id"))
    }
}
}
    $("#start").click(function(){
        if (right > 0 || wrong > 0) {
            timer = 15;
            right = 0;
            wrong = 0;
            answered = [];
            $("#right").appendTo("#info");
            $("#wrong").appendTo("#info");
            $("#start").addClass("d-none");
            $("#gif").addClass("d-none");
            $("[id*=answer]").appendTo("#main");
            $("#gif").appendTo("#main")
        } else {
            $("#start").addClass("d-none");
            $("#main").removeClass("d-none");
            $("#main").addClass("d-flex");  
        }
        run();
        setup();
        
        
    });

    
// On hover highlight (change the border and background color) of each answer
    $("[id*=answer]").hover(function(){
        console.log("working")
        $(this).addClass("onhover");},
        function (){
            $(this).removeClass("onhover");    
        });
    
    $("[id*=answer]").click(function(){
        clearInterval(clock);
        let userAnswer = $(this).data("id");
        console.log("User Answer: " + userAnswer);
        getAnswers();
        console.log("The right answer: " + correctAnswer);
        if (userAnswer === correctAnswer) {
            $("#display").text("Correct!")
            $("[id*=answer]").appendTo("#holder");
            $("#gif").removeClass("d-none")
            
            right++;
            setTimeout(reset,3000);
        } else {
            answerCall = "" + '#answer' + correctAnswer + "";
            $("#display").html("Nope!<br> The correct answer was " + $(answerCall).text())
            $("[id*=answer]").appendTo("#holder");
            $("#gif").removeClass("d-none")
            $("#gif").attr("src","assets/images/kanyeshrug.gif")
            wrong++;
            setTimeout(reset,3000);
            }
    }); 
    function timesup(){
        clearInterval(clock);
        getAnswers();
        answerCall = "" + '#answer' + correctAnswer + "";
        $("#display").html("Out of Time!<br> The correct answer was " + $(answerCall).text());
        $("[id*=answer]").appendTo("#holder");
        $("#gif").removeClass("d-none");
        $("#gif").attr("src","assets/images/kanyeshrug.gif");
        wrong++
        setTimeout(reset,3000)
    };
    var clock;
    
    function reset(){
        if (answered.length >= 9) {
            timer = 0;
            $("#display").text("Game over! Here's How you did:");
            $("#wrong").appendTo("#main");
            $("#right").appendTo("#main");
            $("#start").appendTo("#main");
            $("#gif").appendTo("#main");
            $("#start").removeClass("d-none")
            if (wrong >= right) {
                $("#gif").attr("src","assets/images/sorry.gif")
            } else {
                $("#gif").attr("src","assets/images/kanyeapproves.gif")
            }
        } else {
            timer = 15;
            $("[id*=answer]").appendTo("#main");
            $("#gif").addClass("d-none");
            $("#time").html("<h2>Time Left: " + timer + "</h2>")
            setup();
            run();
        }       
    };

    function run() {
        clearInterval(clock);
        clock = setInterval(countdown,1000);
    };
    function countdown() {
        $("#time").html("<h2> Time Left: " + timer + "</h2>");
        $("#wrong").html("<h2>Incorrect: " + wrong + "</h2>")
        $("#right").html("<h2>Correct: " + right + "</h2>")
        timer--        
        if (timer === 0) {
            timesup();
            timer = 15;
        }
        
    };
           