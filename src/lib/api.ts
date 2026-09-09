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

export type NewsArticle = {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
  category: "MATRIX NETWORK" | "MATRIX COMMUNITY" | "MATRIX CAPITAL";
  published_at: string;
  author_name: string;
};

export type NewsArticlePayload = Pick<NewsArticle, "title" | "excerpt" | "content" | "image_url" | "category">;

export type Job = {
  id: number;
  title: string;
  department: string;
  location: string;
  salary: string;
  employment_type: string;
  summary: string;
  description: string;
  requirements: string;
  created_at: string;
  author_name: string;
};

export type JobPayload = Omit<Job, "id" | "created_at" | "author_name">;
export type JobApplicationPayload = { full_name: string; phone: string; cv_url: string; cover_letter: string };

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

export function apiGetNews(limit = 12, category?: NewsArticle["category"]) {
  const params = new URLSearchParams({ limit: String(limit) });
  if (category) params.set("category", category);
  return request<NewsArticle[]>(`/api/news?${params}`);
}

export function apiGetNewsArticle(id: string) {
  return request<NewsArticle>(`/api/news/${id}`);
}

export function apiCreateNews(payload: NewsArticlePayload) {
  const token = getStoredToken();
  return request<NewsArticle>("/api/news", {
    method: "POST",
    headers: token ? { Authorization: token } : {},
    body: JSON.stringify(payload),
  });
}

export function apiGetJobs(search = "", department?: string) {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (department) params.set("department", department);
  return request<Job[]>(`/api/jobs?${params}`);
}

export function apiGetJob(id: string) {
  return request<Job>(`/api/jobs/${id}`);
}

export function apiCreateJob(payload: JobPayload) {
  const token = getStoredToken();
  return request<Job>("/api/jobs", { method: "POST", headers: token ? { Authorization: token } : {}, body: JSON.stringify(payload) });
}

export function apiApplyJob(id: string, payload: JobApplicationPayload) {
  const token = getStoredToken();
  return request<{ message: string }>(`/api/jobs/${id}/apply`, { method: "POST", headers: token ? { Authorization: token } : {}, body: JSON.stringify(payload) });
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
