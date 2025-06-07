import { Link } from "react-router-dom";
import { useLogin } from "../../../shared/hooks/useLogin";
import { useState } from "react";

export const Login = () => {
  const { form, loading, handleChange, handleSubmit } = useLogin();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  return (
    <div
      className="table-responsive"
      style={{
        marginTop: "75px",
        paddingBottom: "2rem",
        minHeight: "calc(100vh - 100px)",
        overflowY: "auto",
      }}
    >
      <div
        className="container d-flex justify-content-center align-items-start"
        style={{ minHeight: "100vh", paddingTop: "10px" }}
      >
        <div className="row justify-content-center w-100">
          <div
            className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5"
            style={{ minWidth: "340px", maxWidth: "400px", margin: "0 auto" }}
          >
            <div className="card shadow border-0">
              <div
                className="card-header text-white text-center"
                style={{ background: "#17486b", fontSize: "1.5rem", fontWeight: "bold" }}
              >
                Iniciar Sesión
              </div>

              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Correo electronico</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <div className="position-relative">
                      <input
                        type={passwordVisible ? "text" : "password"}
                        className="form-control"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                      />
                      <button
                        type="button"
                        className="position-absolute top-50 end-0 translate-middle-y btn btn-link"
                        onClick={togglePasswordVisibility}
                        style={{ zIndex: 1 }}
                        tabIndex={-1}
                      >
                        {passwordVisible ? "🙈" : "👁️"}
                      </button>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Logenado..." : "Iniciar Sesión"}
            </button>
                </form>
                <div className="text-center mt-3">
                  <Link to="/olvido" className="text-decoration-underline" style={{ color: "#17486b" }}>
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <div className="d-flex align-items-center my-3">
                  <div style={{ flex: 1, height: 1, background: "#ddd" }} />
                  <span className="mx-2 text-muted" style={{ fontSize: "0.95rem" }}>o</span>
                  <div style={{ flex: 1, height: 1, background: "#ddd" }} />
                </div>
                <button
                  type="button"
                  className="btn btn-light w-100 border d-flex align-items-center justify-content-center"
                  style={{ fontWeight: 500 }}
                  onClick={() => window.location.href = "https://accounts.google.com/signin"}
                >
                  Inicia sesión con Google
                </button>
                <div className="text-center mt-3">
                  <span>¿Ya tienes cuenta? </span>
                  <a href="/register" className="text-primary fw-semibold" style={{ textDecoration: "underline", cursor: "pointer" }}>
                    Registrate Aquí
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 