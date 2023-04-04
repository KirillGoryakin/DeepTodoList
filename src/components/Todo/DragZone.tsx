import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Todo } from 'types';

type Props = {
  todo: Todo;
  setDraggable: (v: boolean) => void;
};

const DragZone: React.FC<Props> = ({ todo, setDraggable }) => {
  return (
    <div
      onMouseEnter={() => setDraggable(true)}
      onMouseLeave={() => setDraggable(false)}
      style={{ cursor: 'grab' }}
    >
      <DragIndicatorIcon
        fontSize='large'
      />
    </div>
  );
};

export { DragZone };