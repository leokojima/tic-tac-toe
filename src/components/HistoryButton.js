export default function HistoryButton({number, value, onClickMoveTo}) {
  return (
    <li key={number}>
      <button onClick={onClickMoveTo}>
        {value}
      </button>
    </li>
  );
}
