import LoginView from "../LoginView";
import LoginLayout from "../layouts/LoginLayout";
import {useNavigate} from "@tanstack/react-location";

const LoginPage = () => {
    const navigate = useNavigate();

    const onLogin = ({login, room}) => {
        const user = {
            userId: Date.now().toLocaleString().concat(login),
            userName: login,
        }
        sessionStorage.setItem('user_ws', JSON.stringify(user));
        sessionStorage.setItem('room_ws', room);
        navigate({to: '/chat'})
    }

    return (
        <LoginLayout>
            <LoginView login={onLogin} />
        </LoginLayout>
    );
}

export default LoginPage;