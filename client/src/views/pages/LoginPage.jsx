import LoginView from "../LoginView";
import LoginLayout from "../layouts/LoginLayout";
import {useNavigate} from "@tanstack/react-location";

export const users = [
    {userId: '9ba401b4-8616-4f92-9c3c-1ba1145bec50', userName: 'Roman'},
    {userId: '37c5ccd8-9ad7-4697-a7e8-19983428e791', userName: 'Egor'},
    {userId: 'a31d7a94-6bc1-4bb7-82ed-a7872e3debd5', userName: 'Konstantin'},
    {userId: 'ea4633e8-8aef-4894-bfca-348eb512d50b', userName: 'Artem'},
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