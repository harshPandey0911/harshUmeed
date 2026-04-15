function Card({ children, className = '' }) {
  return <section className={`card-surface p-4 ${className}`}>{children}</section>
}

export default Card
