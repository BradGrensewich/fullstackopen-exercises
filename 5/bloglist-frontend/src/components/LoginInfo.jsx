const LoginInfo = ({user, onLogout}) => {
    return (
        <div>
          <p>{user.name} logged in <button onClick={onLogout}>Logout</button></p>          
        </div>
    )
}

export default LoginInfo