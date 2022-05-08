import "./navbar.css";
import { Button } from "react-bootstrap";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          CrimeMap
        </a>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="#">
                메인분석화면
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#">
                지도/안전경로
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#">
                커뮤니티
              </a>
            </li>

            <li className="button">
              <button className="login" type="button">
                로그인
              </button>
              <button className="register" type="button">
                회원가입
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
