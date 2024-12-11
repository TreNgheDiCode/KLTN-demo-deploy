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
  const [nameCurrentChat, setNameCurrentChat] = useState<string | null>(null);
  const [friend, setFriend] = useState<Friend[]>();
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
  const handleAvatar = (friendStudentCode: string, name: string) => {
    if (friendStudentCode === currentChat) {
      setCurrentChat(null);
    } else {
      setCurrentChat(friendStudentCode);
      setNameCurrentChat(name);
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
      {/* Danh sách chat */}
      <div className="h-full w-80 overflow-y-auto bg-gradient-to-b from-[#F7F9F2] to-[#E8ECD6] text-black shadow-lg">
        <div className="space-y-6 p-4">
          <div className="flex justify-center">
            <Avatar
              src={"/logo_icon_light.png"}
              size="lg"
              className={`cursor-pointer border-2 transition-all duration-300 hover:opacity-80 ${
                currentChat === null
                  ? "border-blue-500 ring-2 ring-blue-300"
                  : "border-primary"
              } shadow-md`}
              onClick={() => setCurrentChat(null)}
            />
          </div>
          <div className="space-y-4">
            {friend?.map((friendItem, index) => {
              if (friendItem.studentCode === studentCode) return null;
              const isSelected = currentChat === friendItem.studentCode;
              return (
                <div
                  key={index}
                  className={`group relative flex cursor-pointer items-center rounded-lg p-2 transition-all duration-300 ${
                    isSelected
                      ? "bg-white shadow-md"
                      : "hover:bg-white hover:shadow-md"
                  }`}
                  onClick={() =>
                    handleAvatar(
                      friendItem.studentCode,
                      friendItem.account.name,
                    )
                  }
                >
                  <Avatar
                    src={friendItem.account.image}
                    size="lg"
                    className={`mr-3 border-2 transition-all duration-300 ${
                      isSelected
                        ? "border-blue-500 ring-2 ring-blue-300"
                        : "border-transparent group-hover:border-primary"
                    }`}
                  />
                  <div className="flex-grow">
                    <p
                      className={`truncate text-sm font-semibold ${isSelected ? "text-blue-600" : "text-gray-800"}`}
                    >
                      {friendItem.account.name}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      {friendItem.studentCode}
                    </p>
                  </div>
                  {friendItem.profile?.status === "ONLINE" && (
                    <div className="absolute right-1 top-1 h-3 w-3 rounded-full border-2 border-white bg-green-400"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Chat */}
      <div className="flex flex-grow flex-col bg-white bg-opacity-90 backdrop-blur-sm">
        {/* Tiêu đề phòng chat */}
        <div className="sticky top-0 z-10 bg-white bg-opacity-95 px-4 py-3 shadow-md">
          <h2 className="text-lg font-semibold text-gray-800">
            {currentChat ? `${nameCurrentChat}` : user.school.name}
          </h2>
        </div>

        {/* Container tin nhắn */}
        <div
          ref={messageContainerRef}
          className="flex-grow space-y-4 overflow-y-auto p-4"
        >
          <div className="flex flex-col">{renderMessages()}</div>
        </div>

        {/* Form gửi tin nhắn */}
        <form
          onSubmit={sendMessage}
          className="flex items-center space-x-2 border-t border-gray-200 bg-white p-4"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-grow rounded-full border border-gray-300 px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            placeholder="Nhập để nhắn tin..."
          />
          <button
            type="submit"
            className="rounded-full bg-blue-500 px-6 py-2 font-medium text-white transition-colors duration-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Gửi
          </button>
        </form>
      </div>
      <div className="w-[70px] bg-white"></div>
    </div>
  );
};

export default Messenger;
