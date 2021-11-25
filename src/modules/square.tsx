type Hand = 'X'|'O'|null;

interface HandProps{
  value: Hand
  onClick: () => void
}

export function Square(props: HandProps){
  return(
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}