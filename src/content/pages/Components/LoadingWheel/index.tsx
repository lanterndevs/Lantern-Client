import { FC } from 'react';
import ReactLoading from 'react-loading';

interface LoadingWheelProps {
  children: Object;
  loaded: boolean;
}

const LoadingWheel: FC<LoadingWheelProps> = ({ children, loaded }) => {
  return loaded ? (
    <>{children}</>
  ) : (
    <div
      style={{
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        position: 'relative',
        marginLeft: '-50vw',
        left: '50%'
      }}
    >
      <ReactLoading
        type={'spinningBubbles'}
        color={'#5569FF'}
      />
    </div>
  );
};

export default LoadingWheel;
