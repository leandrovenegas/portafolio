export default function WorkTreeRoot() {
  return (
    <div className="flex-1 flex items-center justify-center bg-[var(--ps-bg-canvas,#1e1e1e)] text-[var(--ps-text)] font-sans">
      <div className="text-center opacity-50">
        <h2 className="text-xl font-semibold mb-2">WorkTree</h2>
        <p className="text-[var(--font-size-sm,12px)]">Selecciona un archivo del explorador para comenzar.</p>
      </div>
    </div>
  );
}
