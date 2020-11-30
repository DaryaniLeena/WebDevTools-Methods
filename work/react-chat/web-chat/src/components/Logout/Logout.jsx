import "./Logout.css";

function Logout({ performLogout }) {
    return (
        <div className="logout-container">
            <button className="logout-button" onClick={performLogout}>
                Logout
            </button>
        </div>
    );
}
export default Logout;
