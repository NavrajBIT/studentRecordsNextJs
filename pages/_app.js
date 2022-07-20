import "../styles/globals.css";
import "../styles/navbar.css";
import "../styles/sidebar.css";
import "../styles/innerNavbar.css";
import "../styles/formPage.css";
import "../styles/viewRecords.css";
import "../styles/assignment.css";
import "../styles/attendance.css";
import "../styles/modificationrequest.css";
import "../styles/transactions.css";

import { useContext , useEffect} from "react";
import UserState from "../context/UserState";

function MyApp({ Component, pageProps }) {


  return (
    <UserState>
      <Component {...pageProps} />
    </UserState>
  );
}

export default MyApp;
