function HistoryButton({key, value, onClick}) {
  return (
    <li key={key}>
      <button onClick={onClick}>
        {value}
      </button>
    </li>
  );
}

export default HistoryButton;
