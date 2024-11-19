import LoginView from "../LoginView";
import LoginLayout from "../layouts/LoginLayout";
import {useNavigate} from "@tanstack/react-location";

export const users = [
    {userId: Date.now().toLocaleString().concat('Roman'), userName: 'Roman'},
    {userId: Date.now().toLocaleString().concat('Egor'), userName: 'Egor'},
    {userId: Date.now().toLocaleString().concat('Konstantin'), userName: 'Konstantin'},
    {userId: Date.now().toLocaleString().concat('Artem'), userName: 'Artem'},
];

const LoginPage = () => {
    const navigate = useNavigate();

    const onLogin = ({login, room}) => {
        const i = +login;
        sessionStorage.setItem('user_ws', JSON.stringify(users[i]));
        sessionStorage.setItem('user_index', i.toString());
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