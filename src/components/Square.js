export default function Square({value}) {
  function handleClick() {
    console.log({value}.value + 'clicked');
  }

  return <button className="square" onClick={handleClick}>{value}</button>;
}
