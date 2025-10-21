import React, { useState, useMemo } from 'react';

const allQuestions = [
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
  },
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
  }
];

// Function to shuffle array
const shuffleArray = (array: any[]) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}


const CrlQuiz: React.FC = () => {
  const questions = useMemo(() => shuffleArray([...allQuestions]), []);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswer = (selectedIndex: number) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedIndex === currentQuestion.correct) {
      setFeedbackMessage(`BOA! ${currentQuestion.feedback}`);
      setIsCorrect(true);
    } else {
      setFeedbackMessage("ERROU! Tente de novo, você não conhece ele tão bem.");
      setIsCorrect(false);
    }
    setShowFeedback(true);
  };

  const handleNext = () => {
    setShowFeedback(false);
    setFeedbackMessage('');
    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="text-center">
      <h3 className="font-pixel text-2xl text-lime-400 mb-4">QUIZ DO CRL</h3>
      <p className="mb-6 text-gray-300">Teste seus conhecimentos sobre a lenda. Valendo um joinha.</p>

      {!showFeedback ? (
        <div>
          <p className="text-lg mb-6">{currentQuestion.question}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className="bg-purple-600 hover:bg-purple-500 text-white p-3 rounded-lg transition-transform transform hover:scale-105"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <p className={`text-xl font-bold mb-4 ${isCorrect ? 'text-lime-400' : 'text-red-500'}`}>
            {feedbackMessage}
          </p>
          <button
            onClick={handleNext}
            className="font-pixel bg-lime-500 hover:bg-lime-400 text-black py-2 px-4 rounded-lg"
          >
            Próxima Pergunta
          </button>
        </div>
      )}
    </div>
  );
};

export default CrlQuiz;
