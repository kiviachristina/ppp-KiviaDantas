const BASE_URL = 'https://serverest.dev';

async function request(path, options = {}) {
  const { headers: customHeaders = {}, ...rest } = options;

  const response = await fetch(`${BASE_URL}${path}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...customHeaders
    }
  });

  const text = await response.text();
  let data = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  return {
    status: response.status,
    ok: response.ok,
    data,
    headers: response.headers
  };
}

export async function createUser({ nome, email, password, administrador = false }) {
  return request('/usuarios', {
    method: 'POST',
    body: JSON.stringify({
      nome,
      email,
      password,
      administrador: String(administrador) === 'true' ? 'true' : 'false'
    })
  });
}

export async function login({ email, password }) {
  return request('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
}

export async function createProduct({ token, payload }) {
  return request('/produtos', {
    method: 'POST',
    headers: {
      Authorization: token
    },
    body: JSON.stringify(payload)
  });
}

export async function getProducts() {
  return request('/produtos');
}

export { BASE_URL };
