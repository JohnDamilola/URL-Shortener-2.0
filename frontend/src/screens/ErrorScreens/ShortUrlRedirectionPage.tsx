import { Link } from "react-router-dom";
import { isDisabled, isExpired} from 'screens/DashboardScreens/Dashboard';



export const ShortUrlRedirectionPage = () => {

  return (
       <body>
          <div id="error-page">
             <div className="content">
                <h2 className="header" data-text="404">
                   404
                </h2>
                <h4 data-text="Opps! Page not found">
                   Opps! Page not found
                </h4>
               
                   {isDisabled && isExpired ? (
                     <p>
                      Sorry, the page you're looking for is disabled and expired.
                      </p>) : ( isDisabled ? ( <p>
                      Sorry, the page you're looking for is disabled.
                      </p>) : ( <p>
                      Sorry, the page you're looking for is expired.
                      </p>))};
                     

                <div className="btns">
                  <Link className="navbar-brand" to="/">
                   <a href="https://www.codingnepalweb.com/">return home</a>
                   </Link> 
                </div>
             </div>
          </div>
       </body>
  );
};

export default ShortUrlRedirectionPage