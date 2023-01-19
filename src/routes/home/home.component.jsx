import Directory from "../../components/directory/directry.component";
import {Outlet} from 'react-router-dom'

const Home = () => {

  return (
    <div>
        <Directory />
        <Outlet/>
    </div>
  
  );
  
  
};

export default Home;
