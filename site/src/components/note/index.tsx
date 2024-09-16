import './note.scss';

export const Note: React.FC<React.PropsWithChildren<{ type?: 'info' }>> = ({ type = 'info', children }) => (
    <div className={`note note_${type}`}>
        {children}
    </div>
)
