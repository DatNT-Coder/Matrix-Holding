const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";

export type RegisterPayload = {
  username?: string;
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
  "DIRECTOR" | "DEPARTMENT_HEAD" | "TEAM_LEAD" | "EMPLOYEE" | "HR";

export type AuthUser = LoginResponse["user"] & { role: UserRole };
export type ProfileUpdatePayload = {
  username?: string;
  email?: string;
  current_password?: string;
  new_password?: string;
};

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

export type NewsArticlePayload = Pick<
  NewsArticle,
  "title" | "excerpt" | "content" | "image_url" | "category"
>;
export type ManagedNewsArticle = NewsArticle & {
  author_id: number;
  is_archived: boolean;
  archived_at: string | null;
  updated_at: string;
};
export type PageResult<T> = {
  items: T[];
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
};

export type Job = {
  id: number;
  title: string;
  company_name: string;
  company_logo: string | null;
  company_summary: string | null;
  department: string;
  location: string;
  salary: string;
  employment_type: string;
  experience_required: string;
  education_required: string;
  summary: string;
  description: string;
  requirements: string;
  expires_at: string | null;
  is_featured: boolean;
  featured_until: string | null;
  created_at: string;
  author_name: string;
};

export type JobPayload = Omit<
  Job,
  "id" | "created_at" | "author_name" | "is_featured" | "featured_until"
>;
export type RecruitmentJob = Job & {
  application_count: number;
  new_application_count: number;
};
export type JobApplicationPayload = {
  full_name: string;
  email: string;
  phone: string;
  cv_url: string;
  cover_letter: string;
  experience?: string;
};
export type ApplicationStatus =
  "NEW" | "REVIEWING" | "CONTACTED" | "INTERVIEW" | "OFFERED" | "REJECTED";
export type RecruitmentApplication = {
  id: number;
  job_id: number;
  job_title: string;
  cover_letter: string;
  status: ApplicationStatus;
  hr_note: string | null;
  created_at: string;
  assigned_hr: Recruiter | null;
  candidate: {
    id: number;
    full_name: string;
    email: string;
    phone: string;
    cv_url: string;
    experience: string | null;
  };
};
export type Recruiter = { id: number; username: string; email: string };
export type CandidateProfile = {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  cv_url: string;
  experience: string | null;
  profile_summary: string | null;
};
export type CandidateProfilePayload = Pick<
  CandidateProfile,
  "full_name" | "phone" | "cv_url" | "experience" | "profile_summary"
>;
export type CandidateApplication = {
  id: number;
  job_id: number;
  job_title: string;
  company_name: string;
  status: ApplicationStatus;
  created_at: string;
};

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });

  if (response.status === 401 && path === "/api/auth/login") {
    let detail = "Email hoặc mật khẩu không đúng.";
    try {
      const errorJson = await response.json();
      if (errorJson.detail === "User is disabled") {
        detail = "Tài khoản này hiện đã bị vô hiệu hóa.";
      }
    } catch {
      // Use the safe, user-facing default above when the API does not return JSON.
    }

    throw new Error(detail);
  }

  if (response.status === 401) {
    clearAuthSession();
    if (window.location.pathname !== "/dang-nhap")
      window.location.assign("/dang-nhap");
    throw new Error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
  }

  if (!response.ok) {
    let detail = "Có lỗi xảy ra";
    try {
      const errorJson = await response.json();
      detail =
        typeof errorJson.detail === "string"
          ? errorJson.detail
          : JSON.stringify(errorJson.detail);
    } catch {
      detail = response.statusText;
    }

    throw new Error(detail);
  }

  return response.json() as Promise<T>;
}

export async function apiRegister(
  payload: RegisterPayload,
): Promise<RegisterResponse> {
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

export function apiGetNewsPage(
  page = 1,
  pageSize = 9,
  category?: NewsArticle["category"],
  search = "",
) {
  const params = new URLSearchParams({
    page: String(page),
    page_size: String(pageSize),
  });
  if (category) params.set("category", category);
  if (search) params.set("search", search);
  return request<PageResult<NewsArticle>>(`/api/news/page?${params}`);
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

export function apiGetManagedNews() {
  const token = getStoredToken();
  return request<ManagedNewsArticle[]>("/api/news/manage", {
    headers: token ? { Authorization: token } : {},
  });
}

export function apiUpdateNews(id: number, payload: NewsArticlePayload) {
  const token = getStoredToken();
  return request<NewsArticle>(`/api/news/${id}`, {
    method: "PUT",
    headers: token ? { Authorization: token } : {},
    body: JSON.stringify(payload),
  });
}

export function apiArchiveNews(id: number, restore = false) {
  const token = getStoredToken();
  return request<ManagedNewsArticle>(
    `/api/news/${id}/${restore ? "restore" : "archive"}`,
    { method: "PATCH", headers: token ? { Authorization: token } : {} },
  );
}

export function apiGetJobs(search = "", department?: string) {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (department) params.set("department", department);
  return request<Job[]>(`/api/jobs?${params}`);
}

export function apiGetJobsPage(
  page = 1,
  pageSize = 8,
  search = "",
  department?: string,
) {
  const params = new URLSearchParams({
    page: String(page),
    page_size: String(pageSize),
  });
  if (search) params.set("search", search);
  if (department) params.set("department", department);
  return request<PageResult<Job>>(`/api/jobs/page?${params}`);
}

export function apiGetJob(id: string) {
  return request<Job>(`/api/jobs/${id}`);
}

export function apiCreateJob(payload: JobPayload) {
  const token = getStoredToken();
  return request<Job>("/api/jobs", {
    method: "POST",
    headers: token ? { Authorization: token } : {},
    body: JSON.stringify(payload),
  });
}

export function apiUpdateJob(id: number, payload: JobPayload) {
  const token = getStoredToken();
  return request<Job>(`/api/jobs/${id}`, {
    method: "PATCH",
    headers: token ? { Authorization: token } : {},
    body: JSON.stringify(payload),
  });
}

export function apiDeleteJob(id: number) {
  const token = getStoredToken();
  return request<void>(`/api/jobs/${id}`, {
    method: "DELETE",
    headers: token ? { Authorization: token } : {},
  });
}

export function apiRenewJob(id: number, expires_at: string) {
  const token = getStoredToken();
  return request<Job>(`/api/jobs/${id}/renew`, {
    method: "PATCH",
    headers: token ? { Authorization: token } : {},
    body: JSON.stringify({ expires_at }),
  });
}

export function apiFeatureJob(id: number, featuredUntil: string) {
  const token = getStoredToken();
  return request<Job>(`/api/jobs/${id}/featured`, {
    method: "PATCH",
    headers: token ? { Authorization: token } : {},
    body: JSON.stringify({ featured_until: featuredUntil }),
  });
}

export function apiApplyJob(id: string, payload: JobApplicationPayload) {
  return request<{ message: string }>(`/api/jobs/${id}/apply`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function apiUploadCV(
  file: File,
): Promise<{ url: string; filename: string }> {
  const data = new FormData();
  data.append("file", file);
  const response = await fetch(`${API_BASE_URL}/api/uploads/cv`, {
    method: "POST",
    body: data,
  });
  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ detail: "Không thể tải CV lên." }));
    throw new Error(
      typeof error.detail === "string" ? error.detail : "Không thể tải CV lên.",
    );
  }
  return response.json() as Promise<{ url: string; filename: string }>;
}

export async function apiUploadNewsImage(
  file: File,
): Promise<{ url: string; filename: string }> {
  const data = new FormData();
  data.append("file", file);
  const response = await fetch(`${API_BASE_URL}/api/uploads/news-image`, {
    method: "POST",
    body: data,
  });
  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ detail: "Không thể tải ảnh bài viết lên." }));
    throw new Error(
      typeof error.detail === "string"
        ? error.detail
        : "Không thể tải ảnh bài viết lên.",
    );
  }
  return response.json() as Promise<{ url: string; filename: string }>;
}

export function apiGetApplications(
  search = "",
  status?: ApplicationStatus,
  scope: "MINE" | "UNASSIGNED" | "ALL" = "MINE",
  jobId?: number,
) {
  const token = getStoredToken();
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (status) params.set("status", status);
  if (jobId) params.set("job_id", String(jobId));
  params.set("scope", scope);
  return request<RecruitmentApplication[]>(
    `/api/recruitment/applications?${params}`,
    { headers: token ? { Authorization: token } : {} },
  );
}

export function apiGetRecruitmentTeam() {
  const token = getStoredToken();
  return request<Recruiter[]>("/api/recruitment/hr-team", {
    headers: token ? { Authorization: token } : {},
  });
}
export function apiGetRecruitmentJobs() {
  const token = getStoredToken();
  return request<RecruitmentJob[]>("/api/recruitment/jobs-overview", {
    headers: token ? { Authorization: token } : {},
  });
}

export async function apiGetRecruitmentJobsPage(page = 1, pageSize = 10) {
  const token = getStoredToken();
  const params = new URLSearchParams({
    page: String(page),
    page_size: String(pageSize),
  });
  try {
    return await request<PageResult<RecruitmentJob>>(
      `/api/recruitment/jobs-overview/page?${params}`,
      { headers: token ? { Authorization: token } : {} },
    );
  } catch (error) {
    // Allows a new frontend to work while a Render backend is still deploying.
    if (!(error instanceof Error) || error.message !== "Not Found") throw error;
    const jobs = await apiGetRecruitmentJobs();
    const total = jobs.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const safePage = Math.min(page, totalPages);
    return {
      items: jobs.slice((safePage - 1) * pageSize, safePage * pageSize),
      page: safePage,
      page_size: pageSize,
      total,
      total_pages: totalPages,
    };
  }
}
export function apiGetMyProfile() {
  const token = getStoredToken();
  return request<AuthUser>("/api/users/me", {
    headers: token ? { Authorization: token } : {},
  });
}
export function apiUpdateMyProfile(payload: ProfileUpdatePayload) {
  const token = getStoredToken();
  return request<AuthUser>("/api/users/me", {
    method: "PATCH",
    headers: token ? { Authorization: token } : {},
    body: JSON.stringify(payload),
  });
}
export function apiClaimApplication(id: number) {
  const token = getStoredToken();
  return request<RecruitmentApplication>(
    `/api/recruitment/applications/${id}/claim`,
    { method: "POST", headers: token ? { Authorization: token } : {} },
  );
}
export function apiAssignApplication(
  id: number,
  assigned_hr_id: number | null,
) {
  const token = getStoredToken();
  return request<RecruitmentApplication>(
    `/api/recruitment/applications/${id}/assignment`,
    {
      method: "PATCH",
      headers: token ? { Authorization: token } : {},
      body: JSON.stringify({ assigned_hr_id }),
    },
  );
}

export function apiUpdateApplication(
  id: number,
  payload: Pick<RecruitmentApplication, "status" | "hr_note">,
) {
  const token = getStoredToken();
  return request<RecruitmentApplication>(
    `/api/recruitment/applications/${id}`,
    {
      method: "PATCH",
      headers: token ? { Authorization: token } : {},
      body: JSON.stringify(payload),
    },
  );
}

export function apiGetCandidateProfile() {
  const token = getStoredToken();
  return request<CandidateProfile>("/api/candidates/me", {
    headers: token ? { Authorization: token } : {},
  });
}
export function apiSaveCandidateProfile(payload: CandidateProfilePayload) {
  const token = getStoredToken();
  return request<CandidateProfile>("/api/candidates/me", {
    method: "PUT",
    headers: token ? { Authorization: token } : {},
    body: JSON.stringify(payload),
  });
}
export function apiGetMyCandidateApplications() {
  const token = getStoredToken();
  return request<CandidateApplication[]>("/api/candidates/me/applications", {
    headers: token ? { Authorization: token } : {},
  });
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
