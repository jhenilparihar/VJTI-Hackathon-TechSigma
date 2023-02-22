import Navbar from "./common/Navbar";

function Layout(props) {
  return (
    <div className="min-h-screen relative w-full">
      <Navbar />
      <div className="h-full w-full pb-10 text-white"> {props?.children} </div>
    </div>
  );
}

export default Layout;
