
import React, { useState } from 'react';

interface Message {
  id: number;
  text: string;
}

const MessageBoard: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "CRL, você não é velho, é vintage! Parabéns!" },
    { id: 2, text: "Que a sua festa seja melhor que a sua mira no videogame." },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, { id: Date.now(), text: newMessage.trim() }]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h3 className="font-pixel text-2xl text-fuchsia-400 mb-4 text-center">Mural de Recados</h3>
      <div className="flex-grow bg-black bg-opacity-50 p-4 rounded-lg h-64 overflow-y-auto mb-4 border border-fuchsia-500">
        {messages.map((msg) => (
          <div key={msg.id} className="p-2 mb-2 bg-gray-800 rounded animate-fade-in">
            <p className="text-gray-200">» {msg.text}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Deixe sua mensagem de amor (ou zueira)"
          className="flex-grow bg-gray-800 text-white p-3 rounded-lg border-2 border-transparent focus:border-fuchsia-500 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white p-3 rounded-lg font-bold"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default MessageBoard;
