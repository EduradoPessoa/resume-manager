import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { blockUser, unblockUser, deleteUser, sendMessage } from '../../services/users';
import type { User } from '../../types/user';

const UserManagement: React.FC = () => {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messageForm, setMessageForm] = useState({
    type: 'email' as 'email' | 'whatsapp',
    subject: '',
    content: '',
  });

  useEffect(() => {
    if (!currentUser?.isAdmin) {
      navigate('/dashboard');
      return;
    }
    fetchUsers();
  }, [currentUser, navigate]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users'); // Você precisará criar este endpoint
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError('Erro ao carregar usuários');
    } finally {
      setLoading(false);
    }
  };

  const handleBlock = async (userId: string, isBlocked: boolean) => {
    try {
      if (isBlocked) {
        await unblockUser(userId);
      } else {
        await blockUser(userId);
      }
      fetchUsers();
    } catch (error) {
      setError('Erro ao alterar status do usuário');
    }
  };

  const handleDelete = async (userId: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.')) {
      return;
    }

    try {
      await deleteUser(userId);
      fetchUsers();
    } catch (error) {
      setError('Erro ao excluir usuário');
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    try {
      if (messageForm.type === 'email') {
        // Enviar email usando seu serviço de email
        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: selectedUser.email,
            subject: messageForm.subject,
            content: messageForm.content,
          }),
        });
      } else {
        // Enviar WhatsApp usando seu serviço de WhatsApp
        await fetch('/api/send-whatsapp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: selectedUser.phone,
            message: messageForm.content,
          }),
        });
      }

      setMessageForm({ type: 'email', subject: '', content: '' });
      setSelectedUser(null);
    } catch (error) {
      setError('Erro ao enviar mensagem');
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Gerenciamento de Usuários</h1>

      {/* Lista de Usuários */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {users.map((user) => (
            <li key={user.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">{user.name}</h3>
                  <p className="text-gray-500">{user.email}</p>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setSelectedUser(user)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Enviar Mensagem
                  </button>
                  <button
                    onClick={() => handleBlock(user.id, user.isBlocked)}
                    className={`${
                      user.isBlocked ? 'text-green-600' : 'text-red-600'
                    } hover:text-opacity-75`}
                  >
                    {user.isBlocked ? 'Desbloquear' : 'Bloquear'}
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal de Mensagem */}
      {selectedUser && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              Enviar mensagem para {selectedUser.name}
            </h2>
            <form onSubmit={handleSendMessage} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tipo de mensagem
                </label>
                <select
                  value={messageForm.type}
                  onChange={(e) =>
                    setMessageForm({
                      ...messageForm,
                      type: e.target.value as 'email' | 'whatsapp',
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="email">Email</option>
                  <option value="whatsapp">WhatsApp</option>
                </select>
              </div>

              {messageForm.type === 'email' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Assunto
                  </label>
                  <input
                    type="text"
                    value={messageForm.subject}
                    onChange={(e) =>
                      setMessageForm({ ...messageForm, subject: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mensagem
                </label>
                <textarea
                  value={messageForm.content}
                  onChange={(e) =>
                    setMessageForm({ ...messageForm, content: e.target.value })
                  }
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setSelectedUser(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
