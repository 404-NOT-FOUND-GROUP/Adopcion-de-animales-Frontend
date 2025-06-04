import { useVerificaContraseña } from "../shared/hooks/useVerifica";

export const ContraseñaOlvidada = () => {
  const {
    email,
    setEmail,
    isLoading,
    sendResetEmail,
  } = useVerificaContraseña();

  return (
    <div className="container" style={{ marginTop: "3rem", marginBottom: "3rem", paddingLeft: "1rem", paddingRight: "1rem" }}>
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
          <div className="card shadow border-0">
            <div
              className="card-header text-white text-center"
              style={{ background: "#17486b", fontSize: "1.5rem", fontWeight: "bold" }}
            >
              Recuperar Contraseña
            </div>
            <div className="card-body">
              <form onSubmit={sendResetEmail}>
                <div className="mb-3">
                  <label className="form-label">Correo electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button
                  className="btn w-100"
                  type="submit"
                  style={{
                    background: "#17486b",
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? "Enviando..." : "Enviar correo de recuperación"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};