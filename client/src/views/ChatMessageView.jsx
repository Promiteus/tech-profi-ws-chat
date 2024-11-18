import ChatBadgeView from "./ChatBadgeView";

const ChatMessageView = ({messages, currentUser}) => {
    return (
        <>
            <div className="d-flex flex-column flex-grow-1 overflow-scroll card border border-dark p-3">
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