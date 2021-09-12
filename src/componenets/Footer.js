import {Link} from 'react-router-dom'
const Footer = () => {
   return (
     <footer className="icon">
         <p>copyright &copy;  2021</p>
         <Link to="/about">About</Link>
     </footer>
   );
}
export default Footer;