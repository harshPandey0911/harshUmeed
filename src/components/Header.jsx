function Header({ title, subtitle, action }) {
  return (
    <header className="mb-6 flex items-start justify-between gap-3 pt-1">
      <div className="min-w-0">
        <h1 className="truncate text-[22px] font-semibold tracking-[-0.01em] text-[#111827]">{title}</h1>
        {subtitle ? <p className="mt-1 text-sm text-[#6b7280]">{subtitle}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  )
}

export default Header
