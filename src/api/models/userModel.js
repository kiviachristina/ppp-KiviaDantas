export function createUserModel({ id, nome, email, password, administrador = false }) {
  return {
    id,
    nome,
    email,
    password,
    administrador: String(administrador) === 'true' || administrador === true ? 'true' : 'false'
  };
}
