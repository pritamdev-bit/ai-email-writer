'use client'
import Selector from "@/components/select-component";
import { useEffect, useState } from "react";
import { useChat, fetchServerSentEvents } from "@tanstack/ai-react";
import Cloud3Icon from "@/components/ui/cloud-3-icon";
import { getProfile } from "@/actions/getProfile";
import { useRouter } from "next/navigation";
import { CopyIcon, GalleryVerticalEndIcon, MenuIcon, X } from "lucide-react";

export default function Home() {
  const router = useRouter()
  const [selected, setSelected] = useState("Casual")
  const [generating, setGenerating] = useState<boolean>(false)
  const [prompt, setPrompt] = useState<string>("")
  const [userName, setUserName] = useState<string>("")
  const [userEmail, setUserEmail] = useState<string>("")
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const options = ["Casual", "Formal", "Business"]

  const { messages, isLoading, sendMessage, setMessages } = useChat({
    connection: fetchServerSentEvents("/api/chat"),
  });

  const handleSubmit = () => {
    setMessages([]);
    setGenerating(true);
    sendMessage(`
      Tone: ${selected}
      Request: ${prompt}
      `);
  };

  const handleLogout = async () => {
    const res = await fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const error = await res.json();
      console.error(error);
      return
    }
    setUserName("")
    setUserEmail("")
    setIsLoggedIn(false)

    router.push('/sign-in')
  }

  useEffect(() => {
    getProfile().then((profile) => {
      if (profile) {
        setUserName(profile.userName)
        setUserEmail(profile.userEmail)
        setIsLoggedIn(true)
      }
    })
  }, []);

  // useEffect(() => {
  //   if (!isLoading) {
  //     messages.forEach((message) => {
  //       console.log(message)
  //     })
  //   }
  // }, [isLoading])
  return (
    <main className='w-dvw min-h-dvh bg-gray-100 flex selection:bg-gray-200 selection:text-gray-800 overflow-hidden'>
      <button className="md:hidden block absolute top-4 left-4 cursor-pointer z-40" onClick={() => setMenuOpen(!menuOpen)}>
        <MenuIcon />
      </button>
      <div className={`left-section border-r h-screen bg-gray-50
        border-gray-400 lg:w-1/6 md:w-2/6 w-30%
        flex flex-col items-center justify-between transition-all duration-300 ease-in-out
        md:static absolute z-50 md:translate-x-0 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`
      }>
        <div className="flex items-center gap-4 w-full border-t border-gray-400 p-4">
          <h2 className="text-2xl font-semibold text-gray-800">Recent Emails</h2>
          <X className="hover:text-red-500 transition-colors duration-300 md:hidden block cursor-pointer border border-black rounded-full" onClick={() => setMenuOpen(false)} />
        </div>
        <div className="recent"></div>
        {isLoggedIn && <div className="profile flex items-center gap-4 w-full border-t border-gray-400 p-4">
          <div className="icon bg-gray-200 w-fit h-fit px-3 py-2 rounded-full font-semibold">{userEmail[0]}</div>
          <div className="name">{userName}</div>
          <button
            onClick={handleLogout}
            className='flex items-center gap-2 bg-gray-200 hover:bg-red-300 transition-colors duration-300 rounded-full p-2 cursor-pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out-icon lucide-log-out"><path d="m16 17 5-5-5-5" /><path d="M21 12H9" /><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /></svg>
          </button>
        </div>}
        {
          !isLoggedIn && <div className="profile flex flex-col justify-center items-center gap-4 w-full border-t border-gray-400 p-4">
            <div className="flex items-center gap-1 font-medium">
              <GalleryVerticalEndIcon className="size-7 bg-black text-white rounded-lg p-1" />
              <h2 className="text-2xl font-semibold text-gray-800 p-4">Letterly</h2>
            </div>
            <button
              className='bg-white inset-0 shadow-[0px_1px_1px_1px_rgba(0,0,0,0.1)] w-full hover:bg-gray-100 transition-colors duration-300 rounded-full p-2 cursor-pointer'
              onClick={() => router.push("/sign-up")}>
              Join Us
            </button>
            <button
              className='bg-black text-white inset-0 shadow-[0px_1px_1px_1px_rgba(0,0,0,0.1)] w-full hover:bg-black/80 transition-colors duration-300 rounded-full p-2 cursor-pointer'
              onClick={() => router.push('/sign-in')}>
              Login
            </button>
          </div>
        }
      </div>

      <div className="right-section lg:w-5/6 w-4/6 flex-1 md:flex-initial relative flex flex-col items-center md:justify-center justify-end gap-10 overflow-hidden">
        {!generating && <h1 className="lg:text-8xl md:text-6xl text-3xl font-extrabold md:block hidden text-gray-300 max-w-3xl mx-auto text-center select-none">Your email will appear here</h1>}
        {isLoading ? <Cloud3Icon /> :
          messages.map((message) => (
            message.role === "assistant" &&
            <div key={message.id} className='bg-gray-50 max-w-[90%] p-4 relative rounded-2xl outline shadow-[0px_3px_3px_1px_rgba(0,0,0,0.1)] max-h-[70vh] overflow-y-scroll scrollbar-thumb-separator'>
              <button className="absolute right-2 top-2 cursor-pointer" onClick={() => navigator.clipboard.writeText(message.parts[0].type)}>
                <CopyIcon className="hover:text-gray-500"  />
              </button>
              {message.parts.map((part, i) =>
                part.type === "text" ? (
                  <span className='whitespace-pre-wrap' key={i}>{part.content}</span>
                ) : null
              )}
            </div>
          ))
        }
        <div className="prompt-area outline shadow-[0px_3px_3px_1px_rgba(0,0,0,0.1)] bg-gray-50 border-gray-400 rounded-2xl p-4 sticky bottom-5 lg:w-[50%] w-[80%]">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="write your prompt here" name="prompt" id="prompt" className="w-full outline-none resize-none min-h-6 field-sizing-content"></textarea>
          <div className="flex items-center justify-between mt-5">
            <div className="flex items-center gap-2">
              <p>Tone</p>
              <Selector options={options} selected={selected} setSelected={setSelected} />
            </div>
            <button
              onClick={handleSubmit}
              disabled={prompt.trim().length === 0 || !isLoggedIn}
              className={`flex items-center gap-2 bg-gray-200 hover:bg-gray-300 transition-colors duration-300 rounded-full p-2 ${isLoggedIn ? "cursor-pointer" : "cursor-not-allowed"}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-upload-icon lucide-upload"><path d="M12 3v12" /><path d="m17 8-5-5-5 5" /><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /></svg>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}