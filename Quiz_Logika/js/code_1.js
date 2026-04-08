document.addEventListener('DOMContentLoaded', () => {

    const questions = [
        {
            question: "Який рід військ називають «Богами війни»?",
            answers: ["Піхота", "Артилерія", "Танкові війська", "Авіація"],
            correct: 1
        },
        {
            question: "Яке почесне найменування має 93-тя окрема механізована бригада?",
            answers: ["Чорні Запорожці", "Холодний Яр", "Лицарі Зимового Походу", "Едельвейс"],
            correct: 1
        },
        {
            question: "Як називається український протитанковий ракетний комплекс (ПТРК)?",
            answers: ["Стугна-П", "Джавелін", "Байрактар", "Нептун"],
            correct: 0
        },
        {
            question: "Хто є Верховним Головнокомандувачем Збройних Сил України за Конституцією?",
            answers: ["Міністр оборони", "Головнокомандувач ЗСУ", "Президент України", "Голова Верховної Ради"],
            correct: 2
        },
        {
            question: "Який музичний інструмент є символом бойового духу гуцульських воїнів та частиною емблеми єгерських та деяких гірсько штурмових бригад?",
            answers: ["Скрипка", "Трембіта", "Бубен", "Бандура"],
            correct: 1
        },
        {
            question: "Яку назву має українська ракета, що потопила крейсер «Москва»?",
            answers: ["Вільха", "Точка-У", "Нептун", "Грім-2"],
            correct: 2
        },
        {
            question: "Якого кольору берет у воїнів Десантно-штурмових військ (ДШВ) України?",
            answers: ["Блакитний", "Зелений", "Чорний", "Маруновий (бордовий)"],
            correct: 3
        },
        {
            question: "Коли в Україні відзначають День Збройних Сил?",
            answers: ["14 жовтня", "6 грудня", "24 серпня", "23 травня"],
            correct: 1
        },
        {
            question: "Який літак є найбільшим у світі (був знищений в Гостомелі)?",
            answers: ["Руслан", "Мрія", "Антей", "Іл-76"],
            correct: 1
        },
        {
            question: "Яке гасло є офіційним вітанням у Збройних Силах України?",
            answers: ["Слава Україні! — Героям Слава!", "Бажаю здоров'я!", "Служу народу України!", "Честь маю!"],
            correct: 0
        }
    ];
    
    const questionText = document.querySelector('#question-text')
    const answersContainer = document.querySelector('#answers-container')
    const quizScreen = document.querySelector('#quiz-screen')
    const startScreen = document.querySelector('#start-screen')
    const resultScreen = document.querySelector('#result-screen')
    const startBTN = document.querySelector('#start-btn')
    const resBTN = document.querySelector('#restart-btn')
    const scoreDisplay = document.querySelector('#score-display')
    const timeDisplay = document.querySelector('#timer')
    
    
    let questionIndex = 0
    let score = 0

    let timer_ = 20
    let inter_val
    
    function StartGame() {
        startScreen.classList.add("hide");
        quizScreen.classList.remove("hide");
        resultScreen.classList.add("hide");
        score = 0;
        questionIndex = 0;
        scoreDisplay.innerText = `Бали: ${score}`;
        showQuestion(questions[questionIndex]);
    }
    
    function showQuestion(question) {
        clearInterval(inter_val)
        startTime()
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
            scoreDisplay.innerText = `Бали: ${score}`;
            button.classList.add('correct');
        } else {
            button.classList.add('wrong');
        }

        document.querySelectorAll('.answer-btn').forEach(btn => btn.disabled = true);
        setTimeout(nextQ, 1000);
    }

    function showResult(){
        const accuracy = Math.round((score / questions.length) * 100);
        quizScreen.classList.add("hide");
        resultScreen.classList.remove("hide");
        document.querySelector('#result-text').innerText = `Твій результат: ${score} з ${questions.length} (${accuracy}%)`;
    }
    
    function startTime(){
        timer_ = 20
        timeDisplay.innerText = `Час: ${timer_}`
        inter_val = setInterval(()=>{
            timer_--
            timeDisplay.innerText = `Час: ${timer_}`

            if(timer_ <= 0){
                clearInterval(inter_val)
                nextQ()
            }
        }, 1000)
    }




    startBTN.addEventListener('click', StartGame);
    resBTN.addEventListener('click', StartGame);
    
});