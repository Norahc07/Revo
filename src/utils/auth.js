const USERS_KEY = "users";
const CURRENT_KEY = "currentUser";

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function loadUsers() {
  try {
    const raw = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(CURRENT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setCurrentUser(user) {
  if (user) {
    localStorage.setItem(CURRENT_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_KEY);
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_RE =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

export function registerUser({ username, email, password }) {
  if (!username || !username.trim()) {
    return { ok: false, field: "username", message: "Username is required." };
  }
  if (!EMAIL_RE.test(normalizeEmail(email))) {
    return { ok: false, field: "email", message: "Enter a valid email." };
  }
  if (!PASSWORD_RE.test(String(password || ""))) {
    return {
      ok: false,
      field: "password",
      message:
        "Password must be 8+ chars with letters, numbers & a special character."
    };
  }

  const users = loadUsers();
  if (users.find((u) => normalizeEmail(u.email) === normalizeEmail(email))) {
    return {
      ok: false,
      field: "email",
      message: "This email is already registered. Try logging in."
    };
  }

  const user = {
    id: Date.now(),
    username: username.trim(),
    email: normalizeEmail(email),
    password: String(password),
    createdAt: new Date().toISOString()
  };

  users.push(user);
  saveUsers(users);
  setCurrentUser(user);

  return { ok: true, user };
}

export function loginUser({ email, password }) {
  if (!EMAIL_RE.test(normalizeEmail(email))) {
    return { ok: false, field: "email", message: "Enter a valid email." };
  }
  if (!password) {
    return { ok: false, field: "password", message: "Password is required." };
  }

  const users = loadUsers();
  const user = users.find((u) => normalizeEmail(u.email) === normalizeEmail(email));
  if (!user || String(user.password) !== String(password)) {
    return { ok: false, field: "password", message: "Email or password incorrect." };
  }

  setCurrentUser(user);
  return { ok: true, user };
}

export function logoutUser() {
  setCurrentUser(null);
}

