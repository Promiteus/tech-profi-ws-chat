import {ReactLocation, Outlet, Router} from "@tanstack/react-location";
import LoginPage from "../pages/LoginPage";
import ChatPage from "../pages/ChatPage";

const location = new ReactLocation();

const AppRouter = () => {
   return (
       <Router location={location} routes={
           [
               {
                   path: '/',
                   element: <LoginPage />,
               },
               {
                   path: '/chat',
                   element: <ChatPage />,
               },
           ]
       }>
           <Outlet/>
       </Router>
   );
}

export default AppRouter;