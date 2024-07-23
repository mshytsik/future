import Leader from '../Leader/Leader';

import './Leaders.scss';

const Leaders = ({ leaders, className = '' }) => {
  return (
    <div className={`leaders ${className}`}>
      {leaders.map((leader) => (
        <Leader key={leader.id} leader={leader} />
      ))}
    </div>
  );
};

export default Leaders;
