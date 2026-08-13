const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";

export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
};

export type RegisterResponse = {
  message: string;
  user: {
    id: number;
    username: string;
    email: string;
    role: string;
  };
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  token_type: string;
  user: {
    id: number;
    username: string;
    email: string;
    role: string;
  };
};

export type UserRole =
  | "DIRECTOR"
  | "DEPARTMENT_HEAD"
  | "TEAM_LEAD"
  | "EMPLOYEE"
  | "HR";

export type AuthUser = LoginResponse["user"] & { role: UserRole };

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
    ...options,
  });

  if (!response.ok) {
    let detail = "Có lỗi xảy ra";
    try {
      const errorJson = await response.json();
      detail = typeof errorJson.detail === "string"
        ? errorJson.detail
        : JSON.stringify(errorJson.detail);
    } catch {
      detail = response.statusText;
    }

    throw new Error(detail);
  }

  return response.json() as Promise<T>;
}

export async function apiRegister(payload: RegisterPayload): Promise<RegisterResponse> {
  return request<RegisterResponse>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function apiLogin(payload: LoginPayload): Promise<LoginResponse> {
  return request<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function saveAuthSession(loginResponse: LoginResponse) {
  localStorage.setItem("access_token", loginResponse.access_token);
  localStorage.setItem("token_type", loginResponse.token_type);
  localStorage.setItem("user", JSON.stringify(loginResponse.user));
}

export function getStoredToken(): string | null {
  const token = localStorage.getItem("access_token");
  const type = localStorage.getItem("token_type") ?? "bearer";
  return token ? `${type} ${token}` : null;
}

export function getStoredUser(): AuthUser | null {
  const raw = localStorage.getItem("user");
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function clearAuthSession() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("token_type");
  localStorage.removeItem("user");
}
