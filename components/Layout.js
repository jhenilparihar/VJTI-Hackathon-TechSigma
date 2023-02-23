import Navbar from "./common/Navbar";

function Layout(props) {
  return (
    <div className="min-h-screen relative w-full">
      <Navbar />
      <div className="h-full w-full text-white"> {props?.children} </div>
    </div>
  );
}

export default Layout;
