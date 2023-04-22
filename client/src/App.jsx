import Canvas from "./canvas";
import Customizer from "./pages/Customizer";
import Home from "./pages/Home";
import wood from "./assets/wood.jpg";
function App() {
  return (
    <main className="app transition-all ease-in" style={{backgroundImage:`url(${wood})`}}>
      

       
      <header>
        <nav class="bg-white border-gray-200 px-6 lg:px-6 py-4   bg-gray-800 bg-opacity-50 backdrop-blur-sm ">
          <div class="flex flex-wrap justify-center items-center mx-auto max-w-screen-xl">
            <a href="https://flowbite.com" class="flex items-center">
              
              <span class="flex flex-row self-center text-4xl font-semibold whitespace-nowrap dark:text-white">
                De'ZIGN'<img
                src="https://flowbite.com/docs/images/logo.svg"
                class="m-1 h-6 "
                alt="Flowbite Logo"
              /> IT
              </span>
            </a>
          </div>
        </nav>
      </header>
      <Home />
      <Canvas />
      <Customizer />
      
    </main>

  );
}

export default App;
