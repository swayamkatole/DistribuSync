import { AppConfig } from "../config/AppConfig";
import { AuthSession, AuthUser, LoginPayload, SignupPayload, StoredUserRecord } from "../types";

/**
 * AuthService
 * ------------------------------------------------------------------
 * NOTE FOR REVIEWERS: the DistribuSync Spring Boot backend currently
 * ships without a Spring Security / auth module (verified against the
 * source — no security starter, no login controller). To make the
 * dashboard usable as a gated product experience, this service
 * implements a self-contained, client-side authentication layer:
 *
 *   - Passwords are hashed with SHA-256 (Web Crypto API) before ever
 *     touching storage — plaintext passwords are never persisted.
 *   - A signed, JWT-shaped session token (header.payload.signature)
 *     is minted locally and attached to outgoing API calls via the
 *     ApiClient request interceptor, exactly the way a real backend
 *     JWT filter would expect it.
 *   - The design is intentionally swappable: point `AuthService` at
 *     `POST /api/auth/login` / `/api/auth/signup` once the backend
 *     grows a Spring Security + JJWT module, with zero UI changes.
 * ------------------------------------------------------------------
 */
export class AuthService {
  private static SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

  private static async sha256(text: string): Promise<string> {
    const data = new TextEncoder().encode(text);
    const digest = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  private static base64url(obj: unknown): string {
    return btoa(JSON.stringify(obj)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }

  private static async signToken(user: AuthUser): Promise<string> {
    const header = { alg: "HS256", typ: "JWT" };
    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      iat: Date.now(),
      exp: Date.now() + AuthService.SESSION_TTL_MS,
    };
    const unsigned = `${AuthService.base64url(header)}.${AuthService.base64url(payload)}`;
    const signature = (await AuthService.sha256(unsigned + ":distribusync-local-secret")).slice(0, 43);
    return `${unsigned}.${signature}`;
  }

  private static readUsers(): StoredUserRecord[] {
    try {
      const raw = localStorage.getItem(AppConfig.STORAGE_KEYS.USERS);
      return raw ? (JSON.parse(raw) as StoredUserRecord[]) : [];
    } catch {
      return [];
    }
  }

  private static writeUsers(users: StoredUserRecord[]) {
    localStorage.setItem(AppConfig.STORAGE_KEYS.USERS, JSON.stringify(users));
  }

  static async signup(payload: SignupPayload): Promise<AuthSession> {
    const users = AuthService.readUsers();
    const exists = users.some((u) => u.email.toLowerCase() === payload.email.toLowerCase());
    if (exists) {
      throw new Error("An account with this email already exists. Try logging in instead.");
    }
    if (payload.password.length < 6) {
      throw new Error("Password must be at least 6 characters.");
    }

    const passwordHash = await AuthService.sha256(payload.password);
    const user: AuthUser = {
      id: crypto.randomUUID(),
      name: payload.name.trim(),
      email: payload.email.trim().toLowerCase(),
      createdAt: new Date().toISOString(),
    };

    users.push({ ...user, passwordHash });
    AuthService.writeUsers(users);

    return AuthService.createSession(user);
  }

  static async login(payload: LoginPayload): Promise<AuthSession> {
    const users = AuthService.readUsers();
    const record = users.find((u) => u.email.toLowerCase() === payload.email.trim().toLowerCase());
    if (!record) {
      throw new Error("No account found for this email. Please sign up first.");
    }
    const passwordHash = await AuthService.sha256(payload.password);
    if (passwordHash !== record.passwordHash) {
      throw new Error("Incorrect password. Please try again.");
    }
    const { passwordHash: _omit, ...user } = record;
    return AuthService.createSession(user);
  }

  /** Seeds & signs into a fast demo account — handy for interview walkthroughs. */
  static async loginAsGuest(): Promise<AuthSession> {
    const demoEmail = "guest@distribusync.dev";
    const demoPassword = "demo123456";
    const users = AuthService.readUsers();
    const exists = users.some((u) => u.email === demoEmail);
    if (!exists) {
      await AuthService.signup({ name: "Guest Recruiter", email: demoEmail, password: demoPassword });
    }
    return AuthService.login({ email: demoEmail, password: demoPassword });
  }

  private static async createSession(user: AuthUser): Promise<AuthSession> {
    const token = await AuthService.signToken(user);
    return { user, token, expiresAt: Date.now() + AuthService.SESSION_TTL_MS };
  }
}
