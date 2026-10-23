import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import ProductFormModal from "components/Admin/ProductFormModal";

const emptyProduct = { id: null, name: "", desc: "", image: "/img/imageProduct.png", active: true };
const tabs = [{ id: "overview", label: "Overview", icon: "fa-chart-pie" }, { id: "products", label: "Products", icon: "fa-boxes-stacked" }, { id: "inquiries", label: "Inquiries", icon: "fa-inbox" }];

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [productForm, setProductForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");

  const loadData = useCallback(async () => {
    const responses = await Promise.all([fetch("/api/admin/stats"), fetch("/api/admin/products"), fetch("/api/admin/inquiries")]);
    if (responses.some((response) => response.status === 401)) return router.replace("/admin/login");
    if (responses.some((response) => !response.ok)) throw new Error("Unable to load admin data");
    const [statsData, productsData, inquiriesData] = await Promise.all(responses.map((response) => response.json()));
    setStats(statsData.stats); setProducts(productsData.products); setInquiries(inquiriesData.inquiries); setLoading(false);
  }, [router]);

  useEffect(() => { loadData().catch(() => router.replace("/admin/login")); }, [loadData, router]);

  const visibleProducts = useMemo(() => products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase())), [products, search]);
  const visibleInquiries = useMemo(() => inquiries.filter((item) => [item.name, item.email, item.phone, item.productName].join(" ").toLowerCase().includes(search.toLowerCase())), [inquiries, search]);
  const maxVisits = Math.max(...(stats?.lastSevenDays || []).map((item) => item.visits), 1);

  const saveProduct = async (event) => {
    event.preventDefault(); setSaving(true);
    const url = productForm.id ? `/api/admin/products/${productForm.id}` : "/api/admin/products";
    const response = await fetch(url, { method: productForm.id ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(productForm) });
    setSaving(false);
    if (response.ok) { setProductForm(null); await loadData(); }
  };

  const removeProduct = async (product) => {
    if (!window.confirm(`Delete ${product.name}?`)) return;
    const response = await fetch(`/api/admin/products/${product.id}`, { method: "DELETE" });
    if (response.ok) await loadData();
  };

  const updateStatus = async (id, status) => {
    const response = await fetch(`/api/admin/inquiries/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    if (response.ok) await loadData();
  };

  const logout = async () => { await fetch("/api/admin/logout", { method: "POST" }); router.replace("/admin/login"); };

  if (loading) return <div className="admin-loading"><span /><p>Loading workspace...</p></div>;

  return (
    <>
      <Head><title>Admin Dashboard | Green River Indonesia</title></Head>
      <div className="admin-app">
        <aside className="admin-sidebar">
          <a href="/" className="admin-logo"><img src="/img/logo.png" alt="" /><span>Green River<small>Admin workspace</small></span></a>
          <nav>{tabs.map((item) => <button key={item.id} className={tab === item.id ? "active" : ""} onClick={() => { setTab(item.id); setSearch(""); }}><i className={`fas ${item.icon}`} />{item.label}{item.id === "inquiries" && stats.newInquiries > 0 && <b>{stats.newInquiries}</b>}</button>)}</nav>
          <div className="admin-sidebar-bottom"><a href="/" target="_blank" rel="noreferrer"><i className="fas fa-arrow-up-right-from-square" /> View website</a><button onClick={logout}><i className="fas fa-right-from-bracket" /> Sign out</button></div>
        </aside>
        <main className="admin-main">
          <header className="admin-topbar"><div><span>Admin workspace</span><h1>{tabs.find((item) => item.id === tab)?.label}</h1></div><div className="admin-avatar">A</div></header>

          {tab === "overview" && <section className="admin-content">
            <div className="admin-stat-grid">
              {[{ label: "Unique visitors", value: stats.uniqueVisitors, icon: "fa-users" }, { label: "Page views", value: stats.pageViews, icon: "fa-eye" }, { label: "Total inquiries", value: stats.inquiries, icon: "fa-inbox" }, { label: "Active products", value: stats.activeProducts, icon: "fa-box" }].map((item) => <article className="admin-stat" key={item.label}><i className={`fas ${item.icon}`} /><span>{item.label}</span><strong>{item.value}</strong></article>)}
            </div>
            <div className="admin-overview-grid">
              <article className="admin-panel"><div className="admin-panel-title"><div><span>Traffic</span><h2>Last 7 days</h2></div></div><div className="traffic-chart">{stats.lastSevenDays.map((item) => <div className="traffic-day" key={item.day}><div><span style={{ height: `${Math.max((item.visits / maxVisits) * 100, 5)}%` }} /></div><b>{item.visits}</b><small>{new Date(`${item.day}T00:00:00`).toLocaleDateString("en", { weekday: "short" })}</small></div>)}</div></article>
              <article className="admin-panel"><div className="admin-panel-title"><div><span>Latest activity</span><h2>Recent inquiries</h2></div><button onClick={() => setTab("inquiries")}>View all</button></div><div className="recent-list">{inquiries.slice(0, 5).map((item) => <div key={item.id}><span className={`status-dot ${item.status}`} /><div><strong>{item.name}</strong><small>{item.productName}</small></div><time>{new Date(item.createdAt).toLocaleDateString()}</time></div>)}{inquiries.length === 0 && <p className="admin-empty">No inquiries yet.</p>}</div></article>
            </div>
          </section>}

          {tab === "products" && <section className="admin-content"><div className="admin-actionbar"><input type="search" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} /><button onClick={() => setProductForm(emptyProduct)}><i className="fas fa-plus" /> Add product</button></div><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Product</th><th>Status</th><th>Updated</th><th /></tr></thead><tbody>{visibleProducts.map((product) => <tr key={product.id}><td><div className="admin-product-cell"><img src={product.image} alt="" /><div><strong>{product.name}</strong><small>{product.desc}</small></div></div></td><td><span className={`status-pill ${product.active ? "active" : "inactive"}`}>{product.active ? "Active" : "Hidden"}</span></td><td>{product.updatedAt.startsWith("1970") ? "Catalog seed" : new Date(product.updatedAt).toLocaleDateString()}</td><td><div className="table-actions"><button onClick={() => setProductForm(product)} aria-label={`Edit ${product.name}`}><i className="fas fa-pen" /></button><button className="danger" onClick={() => removeProduct(product)} aria-label={`Delete ${product.name}`}><i className="fas fa-trash" /></button></div></td></tr>)}</tbody></table></div></section>}

          {tab === "inquiries" && <section className="admin-content"><div className="admin-actionbar"><input type="search" placeholder="Search name, email, phone or product..." value={search} onChange={(e) => setSearch(e.target.value)} /><span>{visibleInquiries.length} inquiries</span></div><div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Customer</th><th>Product</th><th>Contact</th><th>Date</th><th>Status</th></tr></thead><tbody>{visibleInquiries.map((item) => <tr key={item.id}><td><strong>{item.name}</strong><small className="table-secondary">{item.company || "No company"}</small></td><td><strong>{item.productName}</strong><small className="table-secondary">{item.message || "No message"}</small></td><td><a href={`mailto:${item.email}`}>{item.email}</a><a className="table-secondary" href={`tel:${item.phone}`}>{item.phone}</a></td><td>{new Date(item.createdAt).toLocaleString()}</td><td><select value={item.status} onChange={(event) => updateStatus(item.id, event.target.value)}><option value="new">New</option><option value="contacted">Contacted</option><option value="closed">Closed</option></select></td></tr>)}{visibleInquiries.length === 0 && <tr><td colSpan="5" className="admin-empty">No inquiries found.</td></tr>}</tbody></table></div></section>}
        </main>
      </div>

      {productForm && <ProductFormModal product={productForm} setProduct={setProductForm} saving={saving} onClose={() => setProductForm(null)} onSubmit={saveProduct} />}
    </>
  );
}
