import Navbar from "./Navbar";
import Footbar from "./Footbar";
import { PropsWithChildren } from "react";
import SideNavigationBar from "./SideNavigationBar";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        minWidth: "100vw",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <div
        style={{
          display: "flex",
          marginTop: "76px",
          width: "100vw",
          justifyContent: "space-between",
        }}
      >
        <SideNavigationBar />
        <main style={{ width: "100%" }}>{children}</main>
      </div>
    </div>
  );
}
