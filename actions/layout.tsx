import { AI } from "@/actions/chatbot";
import { ChatBotSidebar } from "@/components/chatbot/chatbot-sidebar";
import { FooterText } from "@/components/chatbot/footer";
import { PromptForm } from "@/components/chatbot/prompt-form";
import { ThemeToggle } from "@/components/navbar/theme-toggle";
import { FlipWords } from "@/components/ui/flip-words";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
};

export const metadata = {
  title: "Chat Bot | CANADA MEDICAL AND EDUCATION",
};

const ChatBotLayout = ({ children }: Props) => {
  const words = [
    {
      text: "Chào",
    },
    {
      text: "bạn,",
    },
    {
      text: "hãy",
    },
    {
      text: "đặt",
    },
    {
      text: "câu",
    },
    {
      text: "hỏi",
    },
    {
      text: "cho",
    },
    {
      text: "CEMC.",
      className: "text-main",
    },
  ];

  const flips = [
    "Thông minh",
    "Mạnh mẽ",
    "Chính xác",
    "Tiềm năng",
    "Nhanh chóng",
  ];

  return (
    <div
      className={cn(
        "relative mx-auto flex max-h-screen w-full flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-main-foreground dark:border-neutral-700 dark:bg-main-background md:flex-row",
      )}
    >
      <div className="flex flex-1 overflow-hidden">
        <ChatBotSidebar />
        <div className="relative flex h-full w-full flex-1 flex-col gap-2 overflow-hidden rounded-tl-2xl border border-neutral-200 bg-white p-2 pb-4 pt-10 dark:border-neutral-700 dark:bg-background md:px-10">
          <div className="z-50 flex h-16 w-full max-w-[calc(100vw-144px)] items-center rounded-md bg-transparent px-8">
            <div className="flex w-full items-center justify-center">
              <TypewriterEffectSmooth words={words} />
              <FlipWords words={flips} />
              <div className="ml-auto flex items-center gap-4">
                <ThemeToggle />
              </div>
            </div>
          </div>
          <AI>
            <div className="flex flex-1 flex-col overflow-y-auto">
              {children}
            </div>
            <div className="mt-auto space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
              <PromptForm />
              <FooterText className="mt-auto hidden sm:block" />
            </div>
          </AI>
        </div>
      </div>
    </div>
  );
};

export default ChatBotLayout;
