"use client";

import { Friend, User } from "@/types";
import { Avatar } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";

// Định nghĩa kiểu dữ liệu cho tin nhắn
interface Message {
  text: string;
  sender: string;
  senderName?: string;
  avatar: string;
  receiver?: string;
  room?: string;
  timestamp?: number; // Thêm trường timestamp
}

const Messenger = ({
  params: { studentCode },
}: {
  params: { studentCode: string };
}) => {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const [user, setUser] = useState<User | undefined>();
  const [groupMessages, setGroupMessages] = useState<Message[]>([]);
  const [privateMessages, setPrivateMessages] = useState<{
    [key: string]: Message[];
  }>({});
  const [inputMessage, setInputMessage] = useState("");
  const [currentChat, setCurrentChat] = useState<string | null>(null);
  const [friend, setFriend] = useState<Friend[]>();
  //
  // sử dụng useRef để load tin nhắn cuối
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [groupMessages, privateMessages]);
  //

  useEffect(() => {
    const newSocket = io(
      process.env.NEXT_PUBLIC_PORT_SERVER || "http://localhost:3002",
    );
    setSocket(newSocket);

    newSocket.on("chatGroup", (msg: Message) => {
      setGroupMessages((prevMessages) => {
        // Kiểm tra xem tin nhắn đã tồn tại chưa dựa trên timestamp và nội dung
        if (
          !prevMessages.some(
            (m) => m.timestamp === msg.timestamp && m.text === msg.text,
          )
        ) {
          return [...prevMessages, msg];
        }
        return prevMessages;
      });
    });

    newSocket.on("privateMessage", (msg: Message) => {
      const chatKey = [msg.sender, msg.receiver].sort().join("_");
      setPrivateMessages((prev) => {
        const existingMessages = prev[chatKey] || [];
        // Kiểm tra xem tin nhắn đã tồn tại chưa dựa trên timestamp và nội dung
        if (
          !existingMessages.some(
            (m) => m.timestamp === msg.timestamp && m.text === msg.text,
          )
        ) {
          return {
            ...prev,
            [chatKey]: [...existingMessages, msg],
          };
        }
        return prev;
      });
    });
    // rồi xong r đó tự nghiên cứu đi :>
    return () => {
      newSocket.disconnect();
    };
  }, [studentCode]);
  // join chat group
  useEffect(() => {
    if (socket && user && user.school.name) {
      socket.emit("joinRoom", user.school.name, user.studentCode); // gọi đến phòng chát của trường
    }
  }, [socket, user]);
  // khi mounted sẽ lấy dữ liệu chat từ database
  useEffect(() => {
    if (user && currentChat) {
      const chatId = [user.studentCode, currentChat].sort().join("_");
      fetchMessages(chatId).then((messages) => {
        setPrivateMessages((prev) => ({
          ...prev,
          [chatId]: messages,
        }));
      });
    } else if (user && user.school.name) {
      fetchMessages(user.school.name).then((messages) => {
        setGroupMessages(messages);
      });
    }
  }, [user, currentChat]);

  //  fetch thông tin du học sinh
  useEffect(() => {
    async function fetchUser() {
      try {
        const url = `${process.env.NEXT_PUBLIC_API}/api/message/student/${studentCode}`;
        const response = await fetch(url);
        const resJson = await response.json();
        setUser(resJson);
      } catch (e) {
        return;
      }
    }
    fetchUser();
  }, [studentCode]);

  // fetch danh sách du học sinh có trong trường đang học
  useEffect(() => {
    async function fetchListFriend() {
      if (user?.school.name) {
        try {
          const url = `${process.env.NEXT_PUBLIC_API}/api/message/school/${user.school.name}`;
          const response = await fetch(url);
          const resJson = await response.json();
          setFriend(resJson);
        } catch (e) {
          return;
        }
      }
    }
    fetchListFriend();
  }, [user?.school.name]);
  // gửi mess
  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage && socket && user) {
      const timestamp = Date.now(); // Tạo timestamp
      if (currentChat) {
        // Tin nhắn riêng tư
        const newMessage: Message = {
          text: inputMessage,
          sender: user.studentCode,
          receiver: currentChat,
          avatar: user.account.image,
          senderName: user.account.name,
          timestamp: timestamp,
        };
        socket.emit("privateMessage", newMessage);
      } else {
        // Tin nhắn nhóm
        const newMessage: Message = {
          text: inputMessage,
          sender: user.studentCode,
          avatar: user.account.image,
          room: user.school.name,
          senderName: user.account.name,
          timestamp: timestamp,
        };
        socket.emit("chatGroup", newMessage);
      }
      setInputMessage("");
    }
  };
  //  Click vào avatar chuyển sang đoạn chát của người đó
  const handleAvatar = (friendStudentCode: string) => {
    if (friendStudentCode === currentChat) {
      setCurrentChat(null);
    } else {
      setCurrentChat(friendStudentCode);
      const chatKey = [user?.studentCode, friendStudentCode].sort().join("_"); // đây 21DH1_21DH2
      if (!privateMessages[chatKey]) {
        setPrivateMessages((prev) => ({ ...prev, [chatKey]: [] }));
      }
      if (socket && user) {
        socket.emit("joinRoom", chatKey, user.studentCode); // gọi đến chát của user
        // chat key ở đây là tên phòng của 2 sinh viên vd : sv 1: 21DH1, sv2: 21DH2 sẽ nối 2 sv với nhau "21DH1_21DH2: = tên group
      }
    }
  };
  //  render tin nhắn từ database
  const renderMessages = () => {
    let messages: Message[] = [];
    if (currentChat) {
      const chatKey = [user?.studentCode, currentChat].sort().join("_");
      messages = privateMessages[chatKey] || [];
    } else {
      messages = groupMessages;
    }
    return messages.map((msg, index) => {
      const isSelf = msg.sender === user?.studentCode;
      return (
        <div
          key={index}
          className={`mb-4 flex items-end ${isSelf ? "justify-end" : "justify-start"}`}
        >
          {!isSelf && (
            <Avatar size="sm" src={msg.avatar} className="mb-2 mr-2" />
          )}
          <div
            className={`max-w-[70%] rounded-lg px-4 py-2 ${
              isSelf
                ? "rounded-br-none bg-blue-500 text-white"
                : "rounded-bl-none bg-gray-200 text-gray-800"
            }`}
          >
            <div>{msg.text}</div>
          </div>
          {isSelf && (
            <Avatar size="sm" src={user.account.image} className="mb-2 ml-2" />
          )}
        </div>
      );
    });
  };
  // lấy chát từ database khi kết nối vào room
  const fetchMessages = async (chatID: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/message/chat/${chatID}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }
      const messages = await response.json();
      return messages;
    } catch (error) {
      return [];
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="flex h-[calc(100vh-86px)] w-full"
      style={{
        backgroundImage: "url('/wallapaper.jpeg')",
        backgroundSize: "cover",
      }}
    >
      {/* list chat */}
      <div className="h-full w-auto rounded-br-3xl bg-[#F7F9F2] text-black">
        <div className="text-black">
          <Avatar
            src={"/logo_icon_light.png"}
            size="lg"
            onClick={() => setCurrentChat(null)}
          />
          {friend?.map((friendItem, index) => {
            if (friendItem.studentCode === studentCode) return null;
            return (
              <div key={index} className="mt-[10px] block h-auto px-1">
                <div className="relative">
                  <Avatar
                    src={friendItem.account.image}
                    size="lg"
                    onClick={() => handleAvatar(friendItem.studentCode)}
                  />
                  {friendItem.profile?.status === "ONLINE" && (
                    <div className="absolute right-0 top-10 h-4 w-4 rounded-full border-2 border-black bg-green-400"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* chat */}
      <div className="flex h-full w-full flex-col">
        {/* Tiêu đề phòng chat */}
        <div className="sticky top-0 z-10 flex items-center justify-center border-b border-gray-300 bg-white py-2 text-black">
          Room:
          <b className="ml-2">
            {currentChat ? `Chat with ${currentChat}` : user.school.name}
          </b>
        </div>

        {/* Container tin nhắn */}
        <div
          ref={messageContainerRef}
          className="flex-grow overflow-y-auto p-2 text-black"
        >
          <div className="flex flex-col">{renderMessages()}</div>
        </div>

        {/* Form gửi tin nhắn */}
        <form
          onSubmit={sendMessage}
          className="flex border-t border-gray-300 bg-white p-2"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-grow rounded-l border border-gray-300 px-2 py-1 text-black"
            placeholder="Nhập để nhắn tin..."
          />
          <button
            type="submit"
            className="ml-2 rounded-r bg-blue-500 px-4 py-1 text-white"
          >
            Gửi
          </button>
        </form>
      </div>
    </div>
  );
};

export default Messenger;
