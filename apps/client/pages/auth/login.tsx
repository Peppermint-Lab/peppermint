import { toast } from "@/shadcn/hooks/use-toast";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

const monitorData = {
  Live: {
    uptime: "99.8%",
    uptimeNote: "↑ Stable",
    tickets: "142",
    ticketsNote: "↓ 12 resolved",
    response: "1.4s",
    responseNote: "avg this hour",
    primaryPath:
      "M0 78 C34 72 54 49 88 45 C122 40 132 60 166 58 C202 56 218 42 256 40 C296 38 308 58 346 52",
    secondaryPath:
      "M0 90 C38 88 60 88 96 86 C134 84 152 74 186 80 C222 86 242 72 280 76 C314 79 328 74 346 72",
    labels: ["00:00", "06:00", "12:00", "18:00", "Now"],
  },
  Daily: {
    uptime: "99.5%",
    uptimeNote: "↑ Healthy",
    tickets: "386",
    ticketsNote: "↓ 48 resolved",
    response: "1.8s",
    responseNote: "daily avg",
    primaryPath:
      "M0 70 C30 58 56 65 82 50 C116 31 142 48 170 42 C208 33 232 62 262 55 C296 47 314 38 346 44",
    secondaryPath:
      "M0 88 C42 82 68 84 104 78 C140 72 162 82 196 76 C232 70 252 62 286 66 C318 70 332 61 346 58",
    labels: ["Mon", "Tue", "Wed", "Thu", "Today"],
  },
  Weekly: {
    uptime: "99.2%",
    uptimeNote: "→ Reliable",
    tickets: "1.9k",
    ticketsNote: "↓ 312 resolved",
    response: "2.1s",
    responseNote: "weekly avg",
    primaryPath:
      "M0 66 C38 42 64 38 96 55 C130 73 158 34 190 42 C226 51 242 74 278 58 C312 43 326 48 346 36",
    secondaryPath:
      "M0 86 C40 80 72 72 106 76 C142 80 166 68 198 72 C232 77 256 58 286 62 C318 66 330 54 346 50",
    labels: ["W1", "W2", "W3", "W4", "Now"],
  },
};

type MonitorPeriod = keyof typeof monitorData;

export default function YottabyteLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle");
  const [url, setUrl] = useState("");
  const [monitorPeriod, setMonitorPeriod] = useState<MonitorPeriod>("Live");
  const activeMonitor = monitorData[monitorPeriod];

  async function oidcLogin() {
    await fetch(`/api/v1/auth/check`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.url) {
          setUrl(res.url);
        }
      });
  }

  useEffect(() => {
    oidcLogin();
  }, []);

  useEffect(() => {
    if (router.query.error) {
      toast({
        variant: "destructive",
        title: "Account Error - No Account Found",
        description:
          "It looks like you have tried to use SSO with an account that does not exist. Please try again or contact your admin to get you set up first.",
      });
    }
  }, [router]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (status === "loading") return;

    setStatus("loading");

    try {
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.user) {
        setCookie("session", data.token);
        if (data.user.external_user) {
          router.push("/portal");
        } else if (data.user.firstLogin) {
          router.push("/onboarding");
        } else {
          router.push("/");
        }
      } else {
        setStatus("idle");
        toast({
          variant: "destructive",
          title: "Error",
          description:
            data.message ||
            "There was an error logging in, please try again. If this issue persists, please contact support.",
        });
      }
    } catch (error) {
      console.error(error);
      setStatus("idle");
      toast({
        variant: "destructive",
        title: "Database Error",
        description:
          "This is an issue with the database, please check the docker logs or contact support.",
      });
    }
  };

  return (
    <main className="ydoc-login">
      <style jsx>{`
        .ydoc-login {
          --peppermint: #10b981;
          --peppermint-bright: #34d399;
          --peppermint-dark: #047857;
          --ink: #07100b;
          --muted: #6b7470;
          min-height: 100vh;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(360px, 1fr);
          background: #ffffff;
          color: var(--ink);
          font-family: Inter, ui-sans-serif, system-ui, -apple-system,
            BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .auth-panel {
          grid-column: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 56px 40px;
        }

        .auth-inner {
          width: min(100%, 350px);
        }

        .brand {
          display: flex;
          align-items: center;
          margin-bottom: 36px;
        }

        .brand-logo {
          width: 282px;
          height: auto;
          display: block;
        }

        h1 {
          margin: 0 0 6px;
          font-size: 34px;
          line-height: 1.12;
          font-weight: 800;
          letter-spacing: 0;
        }

        .subtitle {
          margin: 0 0 32px;
          color: var(--muted);
          font-size: 20px;
          line-height: 1.45;
        }

        form {
          display: flex;
          flex-direction: column;
        }

        label {
          margin-bottom: 7px;
          color: #151a16;
          font-size: 17px;
          font-weight: 500;
        }

        .field {
          width: 100%;
          height: 48px;
          border: 1px solid #d7ddda;
          border-radius: 7px;
          padding: 0 15px;
          color: #535d58;
          background: #ffffff;
          font-size: 20px;
          line-height: 48px;
          outline: none;
          box-shadow: 0 1px 2px rgba(16, 24, 40, 0.03);
          transition: border-color 0.18s ease, box-shadow 0.18s ease,
            color 0.18s ease;
        }

        .field:focus {
          border-color: var(--peppermint);
          color: var(--ink);
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.14);
        }

        .field-wrap {
          margin-bottom: 19px;
        }

        .field-wrap.password {
          margin-bottom: 7px;
        }

        .forgot {
          align-self: flex-end;
          margin-bottom: 23px;
          color: var(--peppermint-dark);
          text-decoration: none;
          font-size: 17px;
          line-height: 1.4;
          font-weight: 500;
        }

        .forgot:hover {
          text-decoration: underline;
        }

        .submit {
          height: 48px;
          border: 1px solid #b7c1bc;
          border-radius: 8px;
          background: #ffffff;
          color: var(--ink);
          font-size: 19px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.18s ease, border-color 0.18s ease,
            box-shadow 0.18s ease, color 0.18s ease, transform 0.18s ease;
        }

        .submit:hover:not(:disabled) {
          background: #f4fbf7;
          border-color: var(--peppermint);
          color: var(--peppermint-dark);
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.12);
        }

        .submit:focus-visible {
          border-color: var(--peppermint);
          outline: none;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.16);
        }

        .submit:active:not(:disabled) {
          transform: translateY(1px);
        }

        .submit:disabled {
          cursor: not-allowed;
          opacity: 0.68;
        }

        .oidc {
          margin-top: 10px;
          color: var(--peppermint-dark);
        }

        .showcase {
          grid-column: 1;
          grid-row: 1;
          position: relative;
          overflow: hidden;
          isolation: isolate;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 44px 0;
          background: radial-gradient(
              circle at 84% 4%,
              rgba(52, 211, 153, 0.18) 0 2px,
              transparent 3px
            ),
            radial-gradient(
              circle at 8% 4%,
              rgba(255, 255, 255, 0.11) 0 1px,
              transparent 2px
            ),
            linear-gradient(180deg, #103729 0%, #153c2f 100%);
        }

        .showcase::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: radial-gradient(
            rgba(52, 211, 153, 0.2) 1.2px,
            transparent 1.2px
          );
          background-size: 31px 31px;
          opacity: 0.52;
          z-index: 0;
        }

        .showcase::after {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(
              circle at 78% 24%,
              rgba(16, 185, 129, 0.12),
              transparent 25%
            ),
            linear-gradient(
              90deg,
              rgba(5, 20, 14, 0.12),
              transparent 18%,
              rgba(5, 20, 14, 0.1)
            );
          pointer-events: none;
          z-index: 1;
        }

        .showcase-content {
          position: relative;
          z-index: 2;
          width: 100%;
          transform: translateY(12px);
        }

        .corner-dots {
          position: absolute;
          right: 0;
          top: 6px;
          width: 31px;
          height: 31px;
          border-radius: 9px 0 0 9px;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 3px;
          box-shadow: 0 8px 22px rgba(8, 27, 19, 0.18);
          z-index: 3;
        }

        .corner-dots span {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #4a4a4a;
        }

        .monitor-card {
          position: relative;
          width: min(88%, 570px);
          margin: 0 auto;
          border: 1px solid rgba(208, 241, 224, 0.16);
          border-radius: 8px;
          padding: 29px 29px 24px;
          background: rgba(40, 78, 60, 0.7);
          box-shadow: 0 22px 52px rgba(4, 19, 13, 0.18);
          backdrop-filter: blur(8px);
        }

        .monitor-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .monitor-head h2 {
          margin: 0;
          color: #f4fff6;
          font-size: 17px;
          line-height: 1;
          font-weight: 800;
          letter-spacing: 0;
        }

        .tabs {
          display: flex;
          align-items: center;
          gap: 22px;
          color: rgba(221, 240, 229, 0.48);
          font-size: 13px;
        }

        .tab {
          border: 0;
          border-radius: 5px;
          padding: 6px 12px;
          background: transparent;
          color: rgba(221, 240, 229, 0.48);
          cursor: pointer;
          font: inherit;
          transition: background 0.18s ease, color 0.18s ease;
        }

        .tab:hover {
          color: #b9f3d8;
        }

        .tab:focus-visible {
          outline: 2px solid rgba(143, 240, 198, 0.72);
          outline-offset: 2px;
        }

        .tab.active {
          border-radius: 5px;
          background: rgba(16, 185, 129, 0.26);
          color: #8ff0c6;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 28px;
        }

        .stat {
          min-height: 118px;
          border: 1px solid rgba(221, 240, 229, 0.13);
          border-radius: 7px;
          padding: 15px 17px;
          background: rgba(62, 101, 80, 0.54);
        }

        .stat-label {
          margin-bottom: 4px;
          color: rgba(221, 240, 229, 0.46);
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          line-height: 1.28;
        }

        .stat-value {
          color: #f3fff4;
          font-size: 27px;
          line-height: 1.1;
          font-weight: 800;
        }

        .stat-value.green {
          color: var(--peppermint-bright);
        }

        .stat-value.yellow {
          color: #f5cd43;
        }

        .stat-note {
          margin-top: 4px;
          color: #9af3ca;
          font-size: 12px;
          font-weight: 600;
        }

        .stat-note.yellow {
          color: #f5cd43;
        }

        .chart {
          width: 100%;
          height: 120px;
          display: block;
        }

        .hero-copy {
          position: relative;
          z-index: 2;
          width: min(82%, 460px);
          margin: 58px auto 0;
          text-align: center;
        }

        .hero-copy h3 {
          margin: 0 auto 9px;
          max-width: 390px;
          color: #ffffff;
          font-size: 31px;
          line-height: 1.18;
          font-weight: 800;
          letter-spacing: 0;
        }

        .hero-copy p {
          margin: 0 auto;
          max-width: 410px;
          color: rgba(236, 248, 238, 0.66);
          font-size: 19px;
          line-height: 1.45;
        }

        .showcase-blocks {
          position: absolute;
          left: 22px;
          bottom: 38px;
          display: grid;
          grid-template-columns: repeat(3, 13px);
          gap: 7px;
          opacity: 0.18;
        }

        .showcase-blocks span {
          width: 13px;
          height: 13px;
          border-radius: 3px;
          background: var(--peppermint);
        }

        .top-squares {
          position: absolute;
          top: 23px;
          right: 54px;
          display: flex;
          gap: 7px;
          opacity: 0.19;
        }

        .top-squares span {
          width: 16px;
          height: 16px;
          border-radius: 3px;
          background: var(--peppermint);
        }

        @media (max-width: 1040px) {
          .monitor-card {
            width: min(90%, 500px);
          }

          .auth-panel {
            padding: 48px 32px;
          }
        }

        @media (max-width: 860px) {
          .ydoc-login {
            grid-template-columns: 1fr;
          }

          .auth-panel {
            min-height: 100vh;
            grid-column: 1;
          }

          .showcase {
            grid-column: 1;
            display: none;
          }
        }

        @media (max-width: 420px) {
          .auth-panel {
            padding: 40px 26px;
          }

          .auth-inner {
            width: 100%;
          }

          .brand {
            margin-bottom: 32px;
          }

          .brand-logo {
            width: 236px;
          }

          .field {
            font-size: 16px;
          }
        }
      `}</style>

      <section className="auth-panel">
        <div className="auth-inner">
          <div className="brand">
            <img
              className="brand-logo"
              src="/yottabyte-wordmark.png"
              alt="Yottabyte"
            />
          </div>

          <h1>Welcome back</h1>
          <p className="subtitle">Sign in to your Digital Operations Centre</p>

          <form onSubmit={handleSubmit}>
            <div className="field-wrap">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                className="field"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <div className="field-wrap password">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                className="field"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            <a className="forgot" href="/auth/forgot-password">
              Forgot password?
            </a>

            <button
              className="submit"
              type="submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Logging in..." : "Login"}
            </button>

            {url && (
              <button
                className="submit oidc"
                type="button"
                onClick={() => router.push(url)}
              >
                Sign in with OIDC
              </button>
            )}
          </form>

        </div>
      </section>

      <section className="showcase">
        <div className="corner-dots">
          <span />
          <span />
          <span />
        </div>
        <div className="top-squares">
          <span />
          <span />
        </div>

        <div className="showcase-content">
          <div className="monitor-card">
            <div className="monitor-head">
              <h2>System Monitoring</h2>
              <div className="tabs">
                {Object.keys(monitorData).map((period) => (
                  <button
                    key={period}
                    className={`tab ${
                      monitorPeriod === period ? "active" : ""
                    }`}
                    type="button"
                    onClick={() => setMonitorPeriod(period as MonitorPeriod)}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>

            <div className="stats">
              <div className="stat">
                <div className="stat-label">Uptime</div>
                <div className="stat-value green">{activeMonitor.uptime}</div>
                <div className="stat-note">{activeMonitor.uptimeNote}</div>
              </div>
              <div className="stat">
                <div className="stat-label">Active Tickets</div>
                <div className="stat-value">{activeMonitor.tickets}</div>
                <div className="stat-note yellow">
                  {activeMonitor.ticketsNote}
                </div>
              </div>
              <div className="stat">
                <div className="stat-label">Response Time</div>
                <div className="stat-value yellow">
                  {activeMonitor.response}
                </div>
                <div className="stat-note">{activeMonitor.responseNote}</div>
              </div>
            </div>

            <svg
              className="chart"
              viewBox="0 0 346 91"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.34" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
              </defs>
              <line
                x1="0"
                y1="34"
                x2="346"
                y2="34"
                stroke="#4c7458"
                strokeOpacity="0.25"
              />
              <line
                x1="0"
                y1="63"
                x2="346"
                y2="63"
                stroke="#4c7458"
                strokeOpacity="0.25"
              />
              <line
                x1="0"
                y1="88"
                x2="346"
                y2="88"
                stroke="#4c7458"
                strokeOpacity="0.25"
              />
              <path
                d={`${activeMonitor.primaryPath} L346 88 L0 88 Z`}
                fill="url(#chartFill)"
              />
              <path
                d={activeMonitor.primaryPath}
                fill="none"
                stroke="#10b981"
                strokeWidth="2.4"
              />
              <path
                d={activeMonitor.secondaryPath}
                fill="none"
                stroke="#d0ad35"
                strokeDasharray="6 4"
                strokeWidth="1.7"
              />
              <circle
                cx="345"
                cy="52"
                r="5"
                fill="#315e3c"
                stroke="#10b981"
                strokeWidth="2"
              />
              <text x="0" y="90" fill="#9aada1" fontSize="9">
                {activeMonitor.labels[0]}
              </text>
              <text x="88" y="90" fill="#9aada1" fontSize="9">
                {activeMonitor.labels[1]}
              </text>
              <text x="173" y="90" fill="#9aada1" fontSize="9">
                {activeMonitor.labels[2]}
              </text>
              <text x="256" y="90" fill="#9aada1" fontSize="9">
                {activeMonitor.labels[3]}
              </text>
              <text x="321" y="90" fill="#9aada1" fontSize="9">
                {activeMonitor.labels[4]}
              </text>
            </svg>
          </div>

          <div className="hero-copy">
            <h3>You&apos;ve reached where your problems get solved.</h3>
            <p>
              Yottabyte Digital Operations Centre - your unified platform for
              monitoring & support.
            </p>
          </div>
        </div>

        <div className="showcase-blocks">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </section>
    </main>
  );
}
