const ChatBadgeView = ({isMyMsg, item}) => {
    const justify = isMyMsg ? 'justify-content-start' : 'justify-content-end';
    const color = !isMyMsg ? 'border-success' : 'border-secondary';
    return (
            <div className={`d-flex ${justify}`}>
                <div className={`d-flex ${color} flex-column card shadow border-2 w-25 p-1 rounded my-1`}>
                    <div className="d-flex flex-grow-0 border-bottom border-2">
                        {item?.user?.userName}
                    </div>
                    <div className="d-flex flex-grow-1">
                        {item?.message}
                    </div>
                </div>
            </div>
    );
}

export default ChatBadgeView;