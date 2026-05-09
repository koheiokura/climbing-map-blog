import areas from "../../data/areas.json";

type Props = {
  params: {
    id: string;
  };
};

export default function AreaPage({ params }: Props) {
  //const area = areas.find(a => a.id === params.id);

  // データを取得している箇所の直後に追加
  const area = areas.find(a => a.id === 'komoridani');

  // 論理的ガードの追加
  if (!area) {
    return <div>エリア情報が見つかりませんでした。</div>;
  }

  // ここより下では、areaが必ず存在することが保証されるためビルドが通ります
  return (
    <div>
      <h1>{area.name}</h1>
      <p>{area.desc}</p>
      {/* ...以下省略 */}
    </div>
  );

  // return (
  //   <div>
  //     <h1>{area.name}</h1>
  //     <p>{area.description}</p>

  //     <h2>アクセス</h2>
  //     {area.approach.map((step, i) => (
  //       <div key={i}>
  //         <h3>{step.title}</h3>
  //         <img src={step.image} width="300" />
  //       </div>
  //     ))}

  //     <h2>参考ブログ</h2>
  //     {area.blogs.map((b, i) => (
  //       <div key={i}>
  //         <a href={b.url}>{b.title}</a>
  //       </div>
  //     ))}
  //   </div>
  // );
}