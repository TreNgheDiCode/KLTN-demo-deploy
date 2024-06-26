"use client";

import { Friend, User } from "@/types";
import { Avatar } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { toast } from "sonner";

// Định nghĩa kiểu dữ liệu cho tin nhắn
interface Message {
  text: string;
  sender: string;
  avatar: string;
  room: string;
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

  useEffect(() => {
    const newSocket = io("http://localhost:3002");
    setSocket(newSocket);

    newSocket.on("chatGroup", (msg: Message) => {
      setGroupMessages((prevMessages) => [...prevMessages, msg]);
    });

    newSocket.on("privateMessage", (msg: Message) => {
      setPrivateMessages((prev) => ({
        ...prev,
        [msg.room]: [...(prev[msg.room] || []), msg],
      }));
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    async function fetchUser() {
      try {
        const url = `${process.env.NEXT_PUBLIC_API}/api/messeger/student/${studentCode}`;
        const response = await fetch(url);
        const resJson = await response.json();
        setUser(resJson);
      } catch (e) {
        toast.error("Không lấy được dữ liệu");
        console.error(e);
      }
    }
    fetchUser();
  }, [studentCode]);

  useEffect(() => {
    async function fetchListFriend() {
      if (user?.school.name) {
        try {
          const url = `${process.env.NEXT_PUBLIC_API}/api/messeger/school/${user.school.name}`;
          const response = await fetch(url);
          const resJson = await response.json();
          setFriend(resJson);
        } catch (e) {
          toast.error("Không lấy được dữ liệu");
          console.error(e);
        }
      }
    }
    fetchListFriend();
  }, [user?.school.name]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage && socket && user) {
      const newMessage: Message = {
        text: inputMessage,
        sender: user.account.name,
        avatar: user.account.image,
        room: currentChat || user.school.name,
      };
      if (currentChat) {
        socket.emit("privateMessage", newMessage);
        setPrivateMessages((prev) => ({
          ...prev,
          [currentChat]: [...(prev[currentChat] || []), newMessage],
        }));
      } else {
        socket.emit("chatGroup", newMessage);
        setGroupMessages((prevMessages) => [...prevMessages, newMessage]);
      }
      setInputMessage("");
    }
  };

  const handleAvatar = (friendStudentCode: string) => {
    if (friendStudentCode === currentChat) {
      setCurrentChat(null); // Switch back to group chat if clicking the same avatar
    } else {
      setCurrentChat(friendStudentCode);
      if (!privateMessages[friendStudentCode]) {
        setPrivateMessages((prev) => ({ ...prev, [friendStudentCode]: [] }));
      }
      socket?.emit("joinRoom", friendStudentCode);
    }
  };

  const renderMessages = () => {
    if (currentChat) {
      return (privateMessages[currentChat] || []).map((msg, index) => (
        <div key={index} className="mb-2 mt-6 flex items-center">
          <Avatar size="md" src={msg.avatar} className="mr-2" />
          <div className="flex items-center rounded-md border border-gray-200 bg-gray-300/90 px-3 py-[8px]">
            <div>{msg.text}</div>
          </div>
        </div>
      ));
    } else {
      return groupMessages.map((msg, index) => (
        <div key={index} className="mb-2 mt-6 flex items-center">
          <Avatar size="md" src={msg.avatar} className="mr-2" />
          <div className="flex items-center rounded-md border border-gray-200 bg-gray-300/90 px-3 py-[8px]">
            <div>{msg.text}</div>
          </div>
        </div>
      ));
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="flex h-screen w-full"
      style={{
        backgroundImage: "url('/wallapaper.jpeg')",
        backgroundSize: "cover",
      }}
    >
      {/* list chat */}
      <div className="h-full w-auto rounded-br-3xl bg-[#F7F9F2] text-black">
        <div className="text-black">
          <Avatar
            src={"/logomess.png"}
            className="hover:cursor-pointer"
            size="lg"
            onClick={() => setCurrentChat(null)} // Switch to group chat
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
                    className="hover:cursor-pointer"
                  />
                  {friendItem.profile?.status === "ONLINE" && (
                    <div className="absolute right-0 top-10 h-4 w-4 rounded-full border-slate-500 bg-green-400"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* chat */}
      <div className="h-full w-full">
        {/* view chat */}
        <div className="mb-4 h-[88%] overflow-y-auto border border-gray-300 p-2 text-black">
          <div className="flex items-center justify-center">
            Room:{" "}
            <b>
              {currentChat
                ? `Private chat with ${currentChat}`
                : user.school.name}
            </b>
          </div>
          {renderMessages()}
        </div>
        {/* submit */}
        <form onSubmit={sendMessage} className="flex">
          <div className="ml-1 w-[90%]">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="w-[100%] flex-grow rounded-l border border-gray-300 bg-white px-2 py-1 text-black"
              placeholder="Type a message..."
            />
          </div>
          <button
            type="submit"
            className="ml-2 rounded-r bg-blue-500 px-4 py-1 text-white"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Messenger;
