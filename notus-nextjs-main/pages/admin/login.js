import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "admin", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");
      router.replace("/admin");
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head><title>Admin Login | Green River Indonesia</title></Head>
      <main className="admin-login-page">
        <section className="admin-login-brand">
          <a href="/" className="site-brand"><img src="/img/logo.png" alt="Green River Indonesia" /><span><strong>Green River</strong><small>Indonesia</small></span></a>
          <div><span className="eyebrow">Administration</span><h1>Manage your digital operation in one place.</h1><p>Products, visitor traffic and customer inquiries are available from one focused dashboard.</p></div>
        </section>
        <section className="admin-login-panel">
          <form className="admin-login-card" onSubmit={submit}>
            <h2>Welcome back</h2><p>Sign in with your administrator credentials.</p>
            <div className="field"><label htmlFor="admin-username">Username</label><input id="admin-username" value={form.username} onChange={(event) => setForm({ ...form, username: event.target.value })} autoComplete="username" required /></div>
            <div className="field"><label htmlFor="admin-password">Password</label><input id="admin-password" type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} autoComplete="current-password" required /></div>
            {error && <p className="form-error">{error}</p>}
            <button className="submit-button" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button>
          </form>
        </section>
      </main>
    </>
  );
}
