import React, { useState, useMemo, useEffect } from 'react';

interface Question {
  question: string;
  options: string[];
  correct: number;
  feedback: string;
}

const allQuestions: Question[] = [
    {
    question: "Qual a característica física mais lendária do CRL?",
    options: ["Ondulação capilar de anjo", "Mamilos que parecem duas calabresas", "Um dedão do pé perfeitamente quadrado", "Sobrancelhas que se comunicam em código Morse"],
    correct: 1,
    feedback: "Isso mesmo! Uma iguaria da natureza, dizem que dá pra usar como petisco."
  },
  {
    question: "Qual o segredo do sucesso do CRL como diretor na Odilon?",
    options: ["Planilhas de Excel impecáveis", "Agradar o Sr. Odilon com seu molejo de ombros", "Ameaçar o café com descafeinado", "Ser o único que entende a impressora"],
    correct: 1,
    feedback: "Exato! Um molejo vale mais que mil reuniões. O Sr. Odilon que o diga."
  },
  {
    question: "O que era a 'CRL 9nhas Corp'?",
    options: ["Uma ONG de proteção às unhas", "Uma empresa de consultoria para moças jovens", "Uma fabricante de empadinhas", "Um fã clube do Chitãozinho & Xororó"],
    correct: 1,
    feedback: "Você tem informações privilegiadas! Era seu império de consultoria e agenciamento."
  },
  {
    question: "Qual o rolê favorito do CRL?",
    options: ["Festa no barco", "Bingo na igreja", "Contar formigas no parque", "Maratona de filmes iranianos"],
    correct: 0,
    feedback: "Correto! Capitão CRL no comando da diversão e do open bar."
  },
  {
    question: "O que o CRL mais ama resgatar?",
    options: ["Gatinhos em árvores", "A economia do país", "'Pecesas' indefesas", "A última fatia de pizza"],
    correct: 2,
    feedback: "Claro! O nobre cavaleiro CRL está sempre pronto para salvar uma 'pecesa' em perigo."
  },
  {
    question: "Se você encontrar o CRL em uma festa, o que é mais provável de acontecer?",
    options: ["Ele vai te pagar uma rodada de drinks", "Ele vai te desafiar para uma batalha de dança", "Ele vai derrubar cerveja em você", "Ele vai te dar conselhos financeiros"],
    correct: 2,
    feedback: "É quase uma lei da física. A cerveja do CRL sempre encontra um alvo."
  },
  {
    question: "Qual é a frase de efeito mais temida do CRL?",
    options: ["'Me empresta 10 reais?'", "'Meu fuzil é de luneta e vai te buscar em casa'", "'Vamos rachar a conta?'", "'Hoje eu tô tranquilo'"],
    correct: 1,
    feedback: "Essa é clássica. Uma ameaça velada com um toque de poesia."
  },
    {
    question: "Qual o superpoder secreto do CRL?",
    options: ["Falar com esquilos", "Transformar água em cerveja quente", "Ficar invisível apenas para cobradores", "Dançar a Macarena perfeitamente"],
    correct: 2,
    feedback: "Exato! Ninguém escapa do CRL, mas ele escapa de todo mundo."
  },
  {
    question: "O que o CRL faz nas horas vagas?",
    options: ["Tricô para hamsters", "Caça profissional de gambuzinos", "Treina para ser campeão de karaokê de banheiro", "Coleciona tampinhas de garrafa"],
    correct: 1,
    feedback: "Correto! Ele é o maior caçador de gambuzinos do hemisfério sul."
  },
  {
    question: "Qual o prato favorito do CRL?",
    options: ["Pizza de abacaxi com jiló", "Sopa de letrinhas requentada", "Qualquer coisa que não precise pagar", "Lágrimas de seus inimigos"],
    correct: 2,
    feedback: "Na mosca! O prato preferido dele é o famoso '0800'."
  }
];

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const CrlQuiz: React.FC = () => {
  const [gameId, setGameId] = useState(1);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizOver, setQuizOver] = useState(false);

  useEffect(() => {
    setQuestions(shuffleArray(allQuestions));
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowFeedback(false);
    setQuizOver(false);
  }, [gameId]);


  const handleAnswer = (selectedIndex: number) => {
    if (showFeedback) return;

    const currentQuestion = questions[currentQuestionIndex];
    if (selectedIndex === currentQuestion.correct) {
      setFeedbackMessage(`BOA! ${currentQuestion.feedback}`);
      setIsCorrect(true);
      setScore(prevScore => prevScore + 1);
    } else {
      setFeedbackMessage("ERROU! Você não conhece ele tão bem assim.");
      setIsCorrect(false);
    }
    setShowFeedback(true);
  };

  const handleNext = () => {
    setShowFeedback(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setQuizOver(true);
    }
  };
  
  const restartQuiz = () => {
    setGameId(id => id + 1);
  };

  const getFinalFeedback = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage <= 30) return { title: "Amador", message: "Você é só um conhecido. Precisa se esforçar mais." };
    if (percentage <= 60) return { title: "Parça", message: "Você já viu a lenda em ação, mas ainda há segredos a descobrir." };
    if (percentage <= 99) return { title: "Discípulo do CRL", message: "Você claramente já tomou cerveja derramada dele. Respeito." };
    return { title: "Doutor em CRL-ologia", message: "Você sabe de tudo! Provavelmente o CRL te deve dinheiro." };
  };

  if (quizOver) {
    const finalFeedback = getFinalFeedback();
    return (
      <div className="text-center flex flex-col items-center justify-center h-full">
        <h3 className="font-pixel text-2xl text-lime-400 mb-4">Quiz Finalizado!</h3>
        <p className="text-xl text-white mb-2">Sua Pontuação: <span className="font-bold text-yellow-400">{score} / {questions.length}</span></p>
        <p className="font-pixel text-lg text-cyan-400 mb-4">{finalFeedback.title}</p>
        <p className="text-gray-300 mb-6">{finalFeedback.message}</p>
        <button
          onClick={restartQuiz}
          className="font-pixel bg-fuchsia-600 hover:bg-fuchsia-500 text-white py-3 px-6 rounded-lg transition-transform transform hover:scale-105"
        >
          Jogar Novamente
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  
  if (!currentQuestion) {
    return <div className="text-center text-lime-400">Carregando Quiz...</div>;
  }

  return (
    <div className="text-center">
      <h3 className="font-pixel text-2xl text-lime-400 mb-4">QUIZ DO CRL</h3>
      <p className="mb-2 text-gray-300">Teste seus conhecimentos sobre a lenda.</p>
      <p className="mb-6 text-sm text-yellow-400">Pergunta {currentQuestionIndex + 1} de {questions.length}</p>

      {!showFeedback ? (
        <div>
          <p className="text-lg mb-6 min-h-[3em] flex items-center justify-center">{currentQuestion.question}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className="bg-purple-600 hover:bg-purple-500 text-white p-3 rounded-lg transition-transform transform hover:scale-105 min-h-[4em]"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center min-h-[14em] justify-center">
          <p className={`text-xl font-bold mb-4 ${isCorrect ? 'text-lime-400' : 'text-red-500'}`}>
            {feedbackMessage}
          </p>
          <button
            onClick={handleNext}
            className="font-pixel bg-lime-500 hover:bg-lime-400 text-black py-2 px-4 rounded-lg"
          >
            {currentQuestionIndex === questions.length - 1 ? 'Ver Pontuação' : 'Próxima Pergunta'}
          </button>
        </div>
      )}
    </div>
  );
};

export default CrlQuiz;
