import styles from './styles.js';

function Header({ user }) {
   return (
      <header>
         <nav>
            <ul>
               <li><a href="#">Links</a></li>
               <li><a href="#">Links</a></li>
               <li><a href="#">Links</a></li>
               <li><a href="#">Links</a></li>
            </ul>
         </nav>
         {/* Logo or App Title */}
         {/* Do something here that shows user badge/avatar */}
         <img src="" alt="User Badge" />
      </header>
   );
}

export default Header;
