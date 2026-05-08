import areas from "../../data/areas.json";

export default function AreaPage({ params }) {
  const area = areas.find(a => a.id === params.id);

  return (
    <div>
      <h1>{area.name}</h1>
      <p>{area.description}</p>

      <h2>アクセス</h2>
      {area.approach.map((step, i) => (
        <div key={i}>
          <h3>{step.title}</h3>
          <img src={step.image} width="300" />
        </div>
      ))}

      <h2>参考ブログ</h2>
      {area.blogs.map((b, i) => (
        <div key={i}>
          <a href={b.url}>{b.title}</a>
        </div>
      ))}
    </div>
  );
}