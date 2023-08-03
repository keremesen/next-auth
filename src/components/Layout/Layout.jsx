import Sidebar from "../Sidebar/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen w-screen ">
      <Sidebar />
      <main className="flex h-screen flex-1 "> {children} </main>
    </div>
  );
};

export default Layout;
