import { Server, Socket } from 'socket.io';
import { sendMessageUseCase } from '../usecases/chat/sendMessage';

export function chatSocket(io: Server, socket: Socket) {
  socket.on('send_message', async (data) => {
    try {
      const newMessage = await sendMessageUseCase(data, socket);

      // Emitimos el mensaje a todos los usuarios del chat
      const chatRoom = `chat-${data.chat_id}`;
      io.to(chatRoom).emit('receive_message', newMessage);
    } catch (err) {
      console.error('Error al enviar mensaje', err);
      socket.emit('error_message', 'No se pudo enviar el mensaje');
    }
  });

  // Unirse a una sala (por ejemplo, al abrir un chat)
  socket.on('join_chat', (chatId: number) => {
    socket.join(`chat-${chatId}`);
  });
}
