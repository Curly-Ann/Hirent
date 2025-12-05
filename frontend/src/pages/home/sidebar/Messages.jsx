import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Plus, Send, MessageCircle, Search, Ban, Flag } from "lucide-react";
import profPic from "../../../assets/profile/prof_pic.jpg";

const Messages = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [showLeftScrollbar, setShowLeftScrollbar] = useState(false);
    const [showRightScrollbar, setShowRightScrollbar] = useState(false);

    const [inboxList, setInboxList] = useState([]);
    const [messagesData, setMessagesData] = useState([]);
    const [activeChatId, setActiveChatId] = useState(null);

    const leftRef = useRef(null);
    const rightRef = useRef(null);

    // Avatar URLs
    const avatarPNGs = [
        "https://randomuser.me/api/portraits/men/1.jpg",
        "https://randomuser.me/api/portraits/women/2.jpg",
        "https://randomuser.me/api/portraits/men/3.jpg",
        "https://randomuser.me/api/portraits/women/4.jpg",
        "https://randomuser.me/api/portraits/men/5.jpg",
        "https://randomuser.me/api/portraits/women/6.jpg",
        "https://randomuser.me/api/portraits/men/7.jpg",
        "https://randomuser.me/api/portraits/women/8.jpg",
        "https://randomuser.me/api/portraits/men/9.jpg",
    ];

    const [showBlockedUsers, setShowBlockedUsers] = useState(false);

    const [reportModalOpen, setReportModalOpen] = useState(false);

    const handleBlockOwner = (chatId) => {
        if (!chatId) return;
        // Example logic: mark blocked in inbox list
        setInboxList((prev) =>
            prev.map((chat) =>
                chat.id === chatId ? { ...chat, blocked: true } : chat
            )
        );
        alert("Owner has been blocked."); // or your custom UI notification
    };

    const [selectedReason, setSelectedReason] = useState("");
    const [customReason, setCustomReason] = useState("");


    const [submittedReport, setSubmittedReport] = useState(false);

    // Update the handleReportOwner function to trigger the submission confirmation
    const handleReportOwner = (chatId, reason) => {
        setReportModalOpen(false);
        console.log(`Reported owner ${chatId} for reason: ${reason}`);
        alert(`You reported this owner for: ${reason}`);

        // Show the submitted report confirmation popup
        setSubmittedReport(true);

        // Hide the popup after a few seconds (optional)
        setTimeout(() => setSubmittedReport(false), 5000);
    };


    const fileInputRef = useRef(null);

    const handleFileButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const message = {
            id: Date.now(),
            chatId: activeChat.id,
            sender: "renter",
            text: file.name,
            file: file,
            fileType: file.type,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase(),
        };

        // Add to messages
        setAllMessages((prev) => [...prev, message]);
        setMessagesData((prev) => [...prev, message]);

        // Update inbox last message
        let lastMsgText;
        if (file.type.startsWith("image/")) lastMsgText = "You sent a photo.";
        else if (file.type === "application/pdf") lastMsgText = "You sent a PDF file.";
        else lastMsgText = `You sent a file: ${file.name}`;

        setInboxList((prev) =>
            prev.map((chat) =>
                chat.id === activeChat.id ? { ...chat, lastMessage: lastMsgText } : chat
            )
        );
    };


    const [allMessages, setAllMessages] = useState([]); // all messages across chats
    useEffect(() => {
        setAllMessages(mockMessagesData);

        // Update inbox last message dynamically
        const updatedInbox = mockInboxList.map((chat) => {
            const chatMessages = mockMessagesData.filter((msg) => msg.chatId === chat.id);
            const lastMsg = chatMessages[chatMessages.length - 1];
            const lastMessageText = lastMsg?.sender === "renter" ? `You: ${lastMsg.text}` : lastMsg?.text;
            return { ...chat, lastMessage: lastMessageText };
        });

        setInboxList(updatedInbox);

        if (updatedInbox.length > 0) {
            const firstChatId = updatedInbox[0].id;
            setActiveChatId(firstChatId);
            setMessagesData(mockMessagesData.filter((msg) => msg.chatId === firstChatId));
        }
    }, []);


    const [newMessage, setNewMessage] = useState(""); // state for input

    // Function to send message
    const handleSendMessage = () => {
        if (!newMessage.trim() || !activeChat) return;

        const message = {
            id: Date.now(),
            chatId: activeChat.id,
            sender: "renter",
            text: newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toUpperCase(),
        };

        // Add to global messages
        setAllMessages((prev) => [...prev, message]);

        // Update messagesData for active chat
        setMessagesData((prev) => [...prev, message]);

        // Update inbox last message
        setInboxList((prev) =>
            prev.map((chat) =>
                chat.id === activeChat.id ? { ...chat, lastMessage: `You: ${message.text}` } : chat
            )
        );

        setNewMessage("");
    };

    useEffect(() => {
        if (rightRef.current) {
            rightRef.current.scrollTop = rightRef.current.scrollHeight;
        }
    }, [messagesData]);




    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => (document.body.style.overflow = "auto");
    }, []);

    useEffect(() => {
        document.title = "Hirent — Messages";
        return () => (document.title = "Hirent");
    }, []);


    const handleScrollLeft = () => {
        setShowLeftScrollbar(true);
        clearTimeout(leftRef.current?.timeoutId);
        leftRef.current.timeoutId = setTimeout(() => setShowLeftScrollbar(false), 3000);
    };

    const handleScrollRight = () => {
        setShowRightScrollbar(true);
        clearTimeout(rightRef.current?.timeoutId);
        rightRef.current.timeoutId = setTimeout(() => setShowRightScrollbar(false), 3000);
    };

    // Mock inbox list with activeStatus
    const mockInboxList = [
        { id: 1, name: "Shane Watson", lastMessage: "Perfect, see you Saturday then. Thanks!", lastMessageTime: "5 min ago", unreadCount: 0, avatar: avatarPNGs[0], activeStatus: "Online" },
        { id: 2, name: "Perry Mate", lastMessage: "Thanks! Looking forward to it.", lastMessageTime: "20 min ago", unreadCount: 0, avatar: avatarPNGs[1], activeStatus: "Active 10 min ago" },
        { id: 3, name: "Genlou Bandin", lastMessage: "Scammer ka! 😭", lastMessageTime: "Yesterday", unreadCount: 0, avatar: profPic, activeStatus: "Active 1h ago" },
        { id: 4, name: "Kane Williamson", lastMessage: "Sure, will share it with you.", lastMessageTime: "Yesterday", unreadCount: 1, avatar: avatarPNGs[2], activeStatus: "Offline 2 days ago" },
        { id: 5, name: "Shane Smith", lastMessage: "Thanks for sharing 😊", lastMessageTime: "Yesterday", unreadCount: 0, avatar: avatarPNGs[3], activeStatus: "Online" },
        { id: 6, name: "Robert Willions", lastMessage: "Okay, Great 👍", lastMessageTime: "1 day ago", unreadCount: 3, avatar: avatarPNGs[4], activeStatus: "Offline 1 day ago" },
    ];

    // Mock messages
    const mockMessagesData = [
        { id: 1, chatId: 1, sender: "owner", text: "Hi! The projector is available this weekend.", time: "09:15 AM" },
        { id: 2, chatId: 1, sender: "renter", text: "Great! I’ll pick it up on Saturday morning. Is it in good condition?", time: "09:16 AM" },
        { id: 3, chatId: 1, sender: "owner", text: "Yes, it’s fully tested and works perfectly.", time: "09:17 AM" },
        { id: 4, chatId: 1, sender: "renter", text: "Awesome! Can you also confirm the cables are included?", time: "09:18 AM" },
        { id: 5, chatId: 1, sender: "owner", text: "Yes, all necessary cables and remote are included.", time: "09:19 AM" },
        { id: 6, chatId: 1, sender: "renter", text: "Perfect, see you Saturday then. Thanks!", time: "09:20 AM" },

        { id: 7, chatId: 2, sender: "owner", text: "Hello! Your booking is confirmed.", time: "10:00 AM" },

        { id: 9, chatId: 3, sender: "renter", text: "Scammer ka! 😭", time: "8:09 AM" },

        { id: 10, chatId: 4, sender: "renter", text: "Can you share your location details?", time: "3:49 PM" },
        { id: 11, chatId: 4, sender: "owner", text: "Sure, will share it with you.", time: "4:15 PM" },

        { id: 12, chatId: 5, sender: "renter", text: "Thanks for sharing 😊", time: "6:30 PM" },

        { id: 13, chatId: 6, sender: "owner", text: "Okay, Great 👍", time: "12:00 AM" },
        { id: 14, chatId: 6, sender: "owner", text: "Okay, Great 👍", time: "12:01 AM" },
        { id: 15, chatId: 6, sender: "owner", text: "Okay, Great 👍", time: "12:01 AM" },
    ];

    useEffect(() => {
        const updatedInbox = mockInboxList.map((chat) => {
            // Get messages for this chat
            const chatMessages = mockMessagesData.filter((msg) => msg.chatId === chat.id);
            const lastMsg = chatMessages[chatMessages.length - 1];

            // Prepend "You: " if last message is from renter
            const lastMessageText =
                lastMsg?.sender === "renter" ? `You: ${lastMsg.text}` : lastMsg?.text;

            return {
                ...chat,
                lastMessage: lastMessageText,
            };
        });

        setInboxList(updatedInbox);

        // Set first chat as active by default
        if (updatedInbox.length > 0) {
            const firstChatId = updatedInbox[0].id;
            setActiveChatId(firstChatId);
            setMessagesData(mockMessagesData.filter((msg) => msg.chatId === firstChatId));
        }
    }, []);


    const handleSelectChat = (chatId) => {
        setActiveChatId(chatId);

        // Show messages for this chat
        setMessagesData(allMessages.filter((msg) => msg.chatId === chatId));

        // Clear unread count for this chat
        setInboxList((prev) =>
            prev.map((chat) =>
                chat.id === chatId ? { ...chat, unreadCount: 0 } : chat
            )
        );
    };



    const activeChat = inboxList.find((chat) => chat.id === activeChatId);

    return (
        <div className="flex min-h-screen px-4 md:px-6 lg:px-8 overflow-hidden">
            {/* LEFT COLUMN */}
            <div
                ref={leftRef}
                onScroll={handleScrollLeft}
                className={`w-[560px] pl-16 flex-shrink-0 h-screen bg-white border-r border-gray-200 overflow-y-auto ${showLeftScrollbar ? "show-scrollbar" : "hide-scrollbar"}`}
            >
                {/* Back Button */}
                <div className="flex items-center justify-between mb-3 mt-10">
                    <button onClick={() => navigate(-1)} className="flex items-center text-[#7A1CA9] text-sm font-medium hover:underline">
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Go back
                    </button>
                </div>

                {/* TITLE */}
                <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="flex items-start gap-4">
                        <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200">
                            <MessageCircle className="w-8 h-8 text-[#a12fda]" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-purple-900 mt-1">Messages</h1>
                            <p className="text-gray-500 text-sm mr-4">Chat with owners here</p>
                        </div>
                    </div>

                    {/* View Blocked Users Button */}
                    <button
                        className="px-3 py-1.5 mr-5 mt-4 bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 shadow-sm text-[13px] rounded-lg font-medium"
                        onClick={() => setShowBlockedUsers((prev) => !prev)}
                    >
                        {showBlockedUsers ? "View All" : "View Blocked Users"}
                    </button>
                </div>


                {/* SEARCH */}
                <div className="mb-4 mr-5 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                    <input
                        type="text"
                        placeholder="Search owners..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 text-[14px] focus:ring-2 focus:ring-purple-300 focus:border-purple-400 outline-none"
                    />
                </div>

                {/* INBOX LIST */}
                <div className="bg-white p-1 space-y-2 mr-5 mb-20">
                    <div className="space-y-1">
                        {inboxList
                            .filter((item) => {
                                if (showBlockedUsers) return item.blocked; // show only blocked users
                                return !item.blocked && item.name.toLowerCase().includes(searchTerm.toLowerCase());
                            })
                            .map((item) => (
                                <div
                                    key={item.id}
                                    className={`flex items-center gap-3 cursor-pointer p-4 rounded-lg hover:bg-purple-100/20 ${item.id === activeChatId ? "bg-purple-300/20" : ""}`}
                                    onClick={() => handleSelectChat(item.id)}
                                >
                                    <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover" />
                                    <div className="flex-1">
                                        <p className={`text-[14px] font-medium ${item.unreadCount ? "font-semibold" : ""}`}>
                                            {item.name}
                                        </p>
                                        <p className={`text-[13px] truncate ${item.unreadCount ? "font-semibold text-gray-900" : "text-gray-500"}`}>
                                            {item.lastMessage}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-[12px] text-gray-500">{item.lastMessageTime}</span>
                                        {item.unreadCount > 0 && (
                                            <span className="bg-purple-600 text-white text-[11px] px-2 py-0.5 rounded-full mt-1">
                                                {item.unreadCount}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}

                    </div>
                </div>

            </div>

            {/* RIGHT COLUMN */}
            <div ref={rightRef} className={`flex-1 relative h-screen ${showRightScrollbar ? "show-scrollbar" : "hide-scrollbar"}`}>

                {/* HEADER */}
                <div className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0">
                    <div className="flex items-center gap-3 mt-4">
                        <img
                            src={activeChat?.avatar || ""}
                            alt={activeChat?.name || ""}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                            <p className="text-[15px] font-semibold">
                                {activeChat?.blocked ? "Owner Blocked" : activeChat?.name || "Select a chat"}
                            </p>
                            {activeChat && (
                                <p className="text-xs text-gray-500 flex items-center gap-1">
                                    <span
                                        className={`w-2 h-2 rounded-full ${activeChat.activeStatus === "Online" ? "bg-green-500" : "bg-gray-400"}`}
                                    ></span>
                                    {activeChat.activeStatus}
                                </p>
                            )}
                        </div>
                    </div>


                    <div className="flex items-center gap-2 mt-4">
                        <button
                            className="px-2 py-1 bg-red-50 hover:bg-red-200 text-red-700 border border-red-200 rounded-full text-[13px] font-medium flex items-center gap-1.5"
                            onClick={() => handleBlockOwner(activeChat?.id)}
                        >
                            <Ban className="w-4 h-4" />
                            Block Owner
                        </button>

                        <button
                            className="px-2 py-1 bg-yellow-50 hover:bg-yellow-200 text-yellow-700 border border-yellow-200 rounded-full text-[13px] font-medium flex items-center gap-1.5"
                            onClick={() => setReportModalOpen(true)}
                        >
                            <Flag className="w-4 h-4" />
                            Report Owner
                        </button>

                    </div>

                    {reportModalOpen && (
                        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4 pt-12">
                            <div className="bg-white rounded-xl w-full max-w-md p-8 shadow-lg relative">

                                {/* Title */}
                                <h2 className="text-xl font-bold mb-3">Report Owner</h2>
                                <p className="text-sm text-gray-900 mb-4 leading-relaxed">
                                    Why are you reporting this owner?<br />

                                    <span className="block mt-3 mb-6 text-[13px] text-gray-500 leading-relaxed">
                                        Your report is anonymous unless it's for an intellectual property issue.
                                        If the owner is placing someone in immediate danger, please contact your
                                        local emergency services.
                                    </span>
                                </p>

                                {/* Categories */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {[
                                        "Spam",
                                        "Inappropriate behavior",
                                        "Scam / Fraud",
                                        "Illegal activity",
                                        "Harassment",
                                        "Hate speech",
                                        "Violence",
                                        "Something else",
                                    ].map((item) => (
                                        <button
                                            key={item}
                                            onClick={() => setSelectedReason(item)}
                                            className={`px-3 py-2 rounded-full text-[13px] transition
                            ${selectedReason === item
                                                    ? item === "Something else"
                                                        ? "bg-red-100 text-red-600 "
                                                        : "bg-purple-100 text-purple-600 "
                                                    : "bg-gray-100 text-gray-600 "
                                                }
                        `}
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>

                                {/* Optional reason box if "Something else" is selected */}
                                <div className="mb-2">
                                    <h3 className="text-sm font-medium mb-1">Reason</h3>
                                    <textarea
                                        placeholder="Help us understand the issue with this owner."
                                        className="w-full p-3 border rounded-lg text-[13px] focus:ring-2 focus:ring-purple-300 outline-none"
                                        rows={3}
                                        value={customReason}
                                        onChange={(e) => setCustomReason(e.target.value)}
                                        disabled={selectedReason !== "Something else"}
                                    />
                                </div>

                                {/* Submit button */}
                                <button
                                    className="w-full py-2.5 text-sm rounded-lg bg-[#7A1CA9] border hover:bg-purple-700 text-white font-medium mt-2"
                                    onClick={() =>
                                        handleReportOwner(
                                            activeChat?.id,
                                            selectedReason === "Something else" ? customReason : selectedReason
                                        )
                                    }
                                >
                                    Submit report
                                </button>

                                {/* Cancel button */}
                                <button
                                    className="w-full py-2 text-gray-600 border rounded-lg hover:text-gray-800 text-sm mt-2"
                                    onClick={() => setReportModalOpen(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}


                    {/* Submitted Report Popup */}
                    {submittedReport && (
                        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg w-[420px] p-8 text-center shadow-lg">
                                <div className="flex justify-center">
                                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                                        <ShieldCheck className="w-6 h-6 text-red-600" />
                                    </div>
                                </div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-2">Thank you for submitting a report!</h2>
                                <p className="text-sm text-gray-500 mb-6">We take reports seriously and after a thorough review, our support team will get back to you.</p>

                                <div className="mt-4 flex justify-center">
                                    <button
                                        className="px-3 py-1.5 text-[13px] bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
                                        onClick={() => setSubmittedReport(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}


                </div>

                {/* MESSAGES OR BLOCK NOTICE */}
                {activeChat?.blocked ? (
                    <div className="flex-1 flex items-center justify-center px-6 py-52 text-center">
                        <div>
                            <p className="text-lg font-semibold text-gray-700">You have blocked this owner</p>
                            <p className="text-sm text-gray-500 mt-1">You cannot see messages or send messages to this owner anymore.</p>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* MESSAGES AREA */}
                        <div
                            ref={rightRef}
                            onScroll={handleScrollRight}
                            className={`flex-1 overflow-y-auto px-10 pt-5 space-y-2 ${showRightScrollbar ? "show-scrollbar" : "hide-scrollbar"}`}
                            style={{ maxHeight: "calc(100vh - 160px)", paddingBottom: "80px" }}
                        >
                            {messagesData.map((msg) => (
                                <div key={msg.id} className={msg.sender === "owner" ? "" : "text-right"}>
                                    <div
                                        className={`inline-block px-4 py-2 rounded-lg text-sm ${msg.sender === "owner"
                                            ? "bg-gray-100 text-gray-900"
                                            : msg.file
                                                ? "bg-gray-50 text-gray-900"
                                                : "bg-[#8D00D4] text-white text-left"
                                            }`}
                                    >
                                        {msg.file ? (
                                            msg.file.type.startsWith("image/") ? (
                                                <img
                                                    src={URL.createObjectURL(msg.file)}
                                                    alt={msg.file.name}
                                                    className="max-w-xs rounded-lg"
                                                />
                                            ) : (
                                                <a
                                                    href={URL.createObjectURL(msg.file)}
                                                    download={msg.file.name}
                                                    className="underline"
                                                >
                                                    {msg.file.name}
                                                </a>
                                            )
                                        ) : (
                                            msg.text
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1">{msg.time}</p>
                                </div>
                            ))}



                        </div>


                        {/* MESSAGE INPUT */}
                        <div className="absolute bottom-12 pb-6 left-0 w-full px-6 py-3 border-t flex items-center gap-4 bg-white">
                            <button
                                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                                onClick={handleFileButtonClick}
                            >
                                <Plus className="w-5 h-5 text-gray-600" />
                            </button>

                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleFileChange}
                            />

                            <input
                                type="text"
                                placeholder="Type Something..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                                className="flex-1 px-4 py-2 bg-gray-50 border rounded-full text-sm outline-none"
                            />

                            <button
                                className="p-3 bg-[#8D00D4] hover:bg-purple-700 text-white rounded-full"
                                onClick={handleSendMessage}
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </>
                )}

            </div>

        </div>
    );
};

export default Messages;
