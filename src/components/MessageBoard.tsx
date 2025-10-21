import React, { useState, useEffect, FormEvent } from 'react';
import { supabase } from '../services/supabaseClient';

interface Message {
  id: number;
  text: string;
  created_at: string;
}

const MessageBoard: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) {
        console.error('Error fetching messages:', error);
        setError('Não consegui carregar as mensagens. O CRL deve ter derrubado o servidor.');
      } else {
        setMessages(data || []);
      }
      setLoading(false);
    };

    fetchMessages();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    const { data, error } = await supabase
      .from('messages')
      .insert([{ text: newMessage.trim() }])
      .select()
      .single();

    if (error) {
      console.error('Error sending message:', error);
      setError('Sua mensagem se perdeu no caminho. Tente de novo!');
    } else if (data) {
      setMessages(prevMessages => [data, ...prevMessages]);
      setNewMessage('');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col h-full">
      <h3 className="font-pixel text-2xl text-fuchsia-400 mb-4 text-center">Mural de Recados Eterno</h3>
      <div className="flex-grow bg-black bg-opacity-50 p-4 rounded-lg h-64 overflow-y-auto mb-4 border border-fuchsia-500 custom-scrollbar">
        {loading && <p className="text-center text-gray-400">Consultando os arquivos secretos do CRL...</p>}
        {error && !loading && <p className="text-center text-red-500">{error}</p>}
        {!loading && messages.length === 0 && <p className="text-center text-gray-400">Ninguém teve coragem de falar nada ainda. Seja o primeiro!</p>}
        {messages.map((msg) => (
          <div key={msg.id} className="p-2 mb-2 bg-gray-800 rounded animate-fade-in">
            <p className="text-gray-200 break-words">» {msg.text}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Deixe sua zueira registrada..."
          disabled={isSubmitting}
          className="flex-grow bg-gray-800 text-white p-3 rounded-lg border-2 border-transparent focus:border-fuchsia-500 focus:outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white p-3 rounded-lg font-bold disabled:bg-fuchsia-800 disabled:cursor-wait"
        >
          {isSubmitting ? '...' : 'Enviar'}
        </button>
      </form>
    </div>
  );
};

export default MessageBoard;