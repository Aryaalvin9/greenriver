import { useRef, useState } from "react";

const maxBytes = 4 * 1024 * 1024;

export default function ProductFormModal({ product, setProduct, saving, onClose, onSubmit }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const uploadImage = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploadError("");
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setUploadError("Gunakan gambar JPG, PNG, atau WebP.");
      return;
    }
    if (file.size > maxBytes) {
      setUploadError("Ukuran gambar maksimal 4 MB.");
      return;
    }

    setUploading(true);
    try {
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      const response = await fetch("/api/admin/upload", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ dataUrl }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Upload failed");
      setProduct({ ...product, image: data.url });
    } catch (error) {
      setUploadError(error.message);
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  return (
    <div className="inquiry-modal-backdrop">
      <section className="inquiry-modal admin-product-modal">
        <button type="button" className="inquiry-close" onClick={onClose}>×</button>
        <span className="eyebrow">Product management</span>
        <h2>{product.id ? "Edit product" : "Create product"}</h2>
        <form onSubmit={onSubmit}>
          <div className="product-upload">
            <div className="product-upload-preview">
              <img src={product.image || "/img/imageProduct.png"} alt="Product preview" />
              {uploading && <span><i className="fas fa-circle-notch fa-spin" /> Uploading</span>}
            </div>
            <div className="product-upload-copy">
              <strong>Product image</strong>
              <p>JPG, PNG, or WebP. Maximum file size 4 MB.</p>
              <button type="button" onClick={() => inputRef.current?.click()} disabled={uploading}><i className="fas fa-cloud-arrow-up" /> {uploading ? "Uploading..." : "Choose image"}</button>
              <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={uploadImage} hidden />
            </div>
          </div>
          {uploadError && <p className="form-error">{uploadError}</p>}
          <div className="field"><label>Product name</label><input value={product.name} onChange={(event) => setProduct({ ...product, name: event.target.value })} required /></div>
          <div className="field"><label>Description</label><textarea value={product.desc} onChange={(event) => setProduct({ ...product, desc: event.target.value })} /></div>
          <label className="admin-switch"><input type="checkbox" checked={product.active} onChange={(event) => setProduct({ ...product, active: event.target.checked })} /><span /> Product visible on website</label>
          <button className="submit-button" disabled={saving || uploading}>{saving ? "Saving..." : uploading ? "Waiting for upload..." : "Save product"}</button>
        </form>
      </section>
    </div>
  );
}
