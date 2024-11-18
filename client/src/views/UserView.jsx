
const UserView = ({user, isOnline, logOut}) => {
    const color = isOnline ? 'bg-success' : 'bg-danger';
    return (
        <>
          <div className="d-flex justify-content-between align-items-center my-1">
              <div className="d-flex justify-content-start align-items-center">
                  <div className={`p-2 rounded-circle ${color}`}>{}</div>
                  <div className="fs-4 fw-bold mx-2">{user?.userName || 'Аноним'}</div>
              </div>
              <div className="btn-outline-primary btn p-1" onClick={logOut}>
                  Выйти
              </div>
          </div>
        </>
    );
}

export default UserView;