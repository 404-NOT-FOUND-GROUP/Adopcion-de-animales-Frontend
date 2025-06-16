import React from "react";
import { Sidebar } from "../../navs";
import { Navbar } from "../../navs";

export const DashboardPage = () => {
    return (
        <div className="max-vh-100 d-flex flex-column text-dark" style={{ backgroundColor: "transparent" }}>
            <Navbar />
            <Sidebar />
            <main className="flex-grow-1 d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", marginLeft:"150px" }}>
                <div className="text-center">
                    <h1 className="fw-bold text-primary">Bienvenido a Nuestro Albergue</h1>
                </div>
            </main>
        </div>
    );
};