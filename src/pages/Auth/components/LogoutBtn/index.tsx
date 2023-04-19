import { useNavigate } from "react-router-dom";
import styles from "./LogoutBtn.module.scss";

function LogoutBtn() {
  const navigate = useNavigate();
  const clickLogoutBtn = () => {
    if (confirm("정말로 로그아웃을 하시겠습니까?")) {
      localStorage.removeItem("accessToken");
      // localStorage.removeItem("refreshToken");
      navigate("/");
    } else {
      console.log("로그아웃 취소");
    }
  };
  return (
    <button className={styles.logoutBtn} onClick={clickLogoutBtn}>
      로그아웃
    </button>
  );
}

export default LogoutBtn;
