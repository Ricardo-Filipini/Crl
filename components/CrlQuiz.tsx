
import React, { useState } from 'react';

const questions = [
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

const CrlQuiz: React.FC = () => {
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
