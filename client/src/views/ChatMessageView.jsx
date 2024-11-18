import ChatBadgeView from "./ChatBadgeView";
import {useEffect, useRef} from "react";

const ChatMessageView = ({messages, currentUser}) => {
    const scrollChat = useRef(null);

    function scrollUp() {
        if ((scrollChat?.current?.scrollTop === 0) && (messages?.length > 8)){
            //page_++;
            loadMore();
        }
    }

    useEffect(() => {
        if (messages?.length > 5) {
            scrollToBottom();
        }
    }, [messages]);

    const scrollToBottom = () => {
        scrollChat?.current?.scrollTo(0,scrollChat?.current.scrollHeight);
    }


    function loadMore(isDropPage = false) {
    }

    useEffect(() => {
        scrollChat?.current.addEventListener("scroll", scrollUp);
        return () => {
            scrollChat?.current?.removeEventListener("scroll", scrollUp);
        }
    }, []);

    return (
        <>
            <div ref={scrollChat} className="d-flex flex-column flex-grow-1 overflow-scroll card border border-dark p-3">
                {messages.length > 0 ?
                    messages.map((item, k) => <div key={k}><ChatBadgeView item={item} isMyMsg={item?.user?.user === currentUser?.userId}/></div>)
                    : <div className="d-flex justify-content-center text-danger">
                        <div className="card shadow p-2">
                            Здесь пока нет сообщений!
                        </div>
                    </div>}
            </div>
        </>
    );
}

export default ChatMessageView;