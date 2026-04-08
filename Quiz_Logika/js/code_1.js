document.addEventListener('DOMContentLoaded', () => {

    const questions = [
        {
            question: "Яка планета найближча до Сонця?",
            answers: ["Венера", "Марс", "Меркурій", "Земля"],
            correct: 2
        },
        {
            question: "Хто написав роман «Гаррі Поттер»?",
            answers: ["Стівен Кінг", "Джоан Роулінг", "Джордж Орвелл", "Марк Твен"],
            correct: 1            
        },
        {
            question: "Скільки континентів на Землі?",
            answers: ["5", "6", "7", "8"],
            correct: 2            
        }
    ];
    
    const questionText = document.querySelector('#question-text')
    const answersContainer = document.querySelector('#answers-container')
    const quizScreen = document.querySelector('#quiz-screen')
    const startScreen = document.querySelector('#start-screen')
    const resultScreen = document.querySelector('#result-screen')
    const startBTN = document.querySelector('#start-btn')
    const resBTN = document.querySelector('#restart-btn')
    
    
    let questionIndex = 0
    let score = 0
    
    function StartGame() {
        startScreen.classList.add("hide");
        quizScreen.classList.remove("hide");
        resultScreen.classList.add("hide");
        score = 0;
        questionIndex = 0;
        showQuestion(questions[questionIndex]);
    }
    
    function showQuestion(question) {
        answersContainer.innerHTML = ""
        questionText.innerText = question.question
        
        for (let i=0; i < question.answers.length; i++) {
            const button = document.createElement('button')
            button.innerText = question.answers[i]
            button.classList.add("answer-btn")
            
            button.addEventListener("click", () => checkAnswer(button, i)
            );
            answersContainer.appendChild(button)
        }
    }

    function nextQ(){
        questionIndex++

        if (questionIndex < questions.length){
            showQuestion(questions[questionIndex]);
        } else{
            showResult();
        }
    }

    function checkAnswer(button, answerIndex) {
        if (answerIndex === questions[questionIndex].correct) {
            score++;
            button.classList.add('correct');
        } else {
            button.classList.add('wrong');
        }

        document.querySelectorAll('.answer-btn').forEach(btn => btn.disabled = true);
        setTimeout(nextQ, 1000);
    }

    function showResult(){
        quizScreen.classList.add("hide");
        resultScreen.classList.remove("hide");
        document.querySelector('#result-text').innerText = `Твій результат: ${score} з ${questions.length}`;
    }
    
    startBTN.addEventListener('click', StartGame);
    resBTN.addEventListener('click', StartGame);
    
});