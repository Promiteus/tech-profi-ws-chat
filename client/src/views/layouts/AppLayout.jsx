const AppLayout = ({children}) => {
    return (
        <div className="App">
            <div className="container h-100 d-flex flex-column justify-content-center">
                {children}
            </div>
        </div>
    );
}

export default AppLayout;