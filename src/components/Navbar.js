import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavItem from './NavItem';
import logo from '../images/QuizVizz-logo.png'
import './Navbar.css';


const Navbar = ({ token, setToken, user, setUser, setLogged, page }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    console.log("log out");
    // setToken("");

    console.log(localStorage.getItem('uerId'));

    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');

    // setLogged(false);
    navigate('/login');
  };
  let history=''
  let home=''
  let dashboard=''
  if(page=='History'){
    history='active';
    home='';
  }
  if(page=='Home'){
    history='';
    home='active';
  }

  const links = [
    { text: 'Home', path: '/', icons: 'home' },
    { text: 'Dashboard', path: '/dashboard', icons: 'chart-line' },
    { text: 'History', path: '/history', icons: 'timeline' },
    { text: 'Profile', path: '/profile', icons: 'user' },
  ];
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

return(
  <>
    <nav className={`side-navbar ${isCollapsed ? 'collapsed' : ''}`}>

{/* Website name and logo */}
<button className="navbar-toggler" onClick={toggleNavbar}>
<i class={`fa-solid fa-chevron-${isCollapsed? 'right':'left'}`}></i>
</button>
<div className="navbar-header">
  <a href="/">
  <img class="logo" src={logo}/>
  </a>
</div>

<ul className="nav-list">
  {links.map((link) => (
    <NavItem key={link.text} {...link} />
  ))}
  <NavItem text="Logout" onClick={handleLogout}/> 
</ul>
</nav>
  </>
)
};


export default Navbar;

// const Navbar = ({ token, setToken, user, setUser, setLogged }) => {
//   const handleClick = () => {
//     console.log("log out");
//     setToken("");
//     setLogged(false);
//   };
//   return (
//     <>
//       <nav className="navbar navbar-expand-lg bg-body-tertiary text-dark ">
//         <div className="container-fluid">
//           <Link className="navbar-brand text-dark" to="/home">
//             QuizViz
//           </Link>jyhjnhnh111101010100101
//           <Link className="navbar-brand text-dark" to="/home">
//             {user}
//           </Link>
//           <button
//             className="navbar-toggler text-dark"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarNav"
//             aria-controls="navbarNav"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarSupportedContent">
//             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//               <li className="nav-item">
//                 <Link
//                   className="nav-link active text-dark"
//                   aria-current="page"
//                   to="/home"
//                 >
//                   Home
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link text-dark" to="/history">
//                   History
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link text-dark" to="/dashboard">
//                   Dashboard
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link text-dark" to="/leaderboard">
//                   Leaderboard
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link
//                   className="nav-link text-dark"
//                   to="/login"
//                   onClick={handleClick}
//                 >
//                   Logout
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Navbar;
