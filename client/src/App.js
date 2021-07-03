import Meeting from './pages/Metting';
import {ContextProvider} from './contexts/globalContext'
import Normalize from 'react-normalize'

function App() {

  return (
    <>
    <ContextProvider>
      <Normalize/>
      <Meeting/>
    </ContextProvider>
    </>
  );
}

export default App;
