export default function TickList({ items, columns = 2 }: { items: string[]; columns?: 1 | 2 | 3 }) {
  const grid = columns === 1 ? "" : columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2";
  return (
    <ul className={`grid gap-x-8 gap-y-3 ${grid}`}>
      {items.map((item) => (
        <li key={item} className="tick">
          <span aria-hidden className="mt-1 text-accent-500">
            ✓
          </span>
          <span className="leading-7">{item}</span>
        </li>
      ))}
    </ul>
  );
}
