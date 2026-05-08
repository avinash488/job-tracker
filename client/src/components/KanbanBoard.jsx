import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const statusColors = {
  Applied: '#3498db',
  Interview: '#f39c12',
  Offer: '#2ecc71',
  Rejected: '#e74c3c',
  Ghosted: '#95a5a6'
};

const COLUMNS = ['Applied', 'Interview', 'Offer', 'Rejected', 'Ghosted'];

const KanbanBoard = ({ applications, onStatusChange, onDelete }) => {
  const handleDragEnd = (result) => {
    const { destination, draggableId } = result;
    if (!destination) return;

    const newStatus = destination.droppableId;
    const app = applications.find(a => a.id === draggableId);
    if (app.status !== newStatus) {
      onStatusChange(draggableId, newStatus);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div style={{
        display: 'flex',
        gap: '1rem',
        overflowX: 'auto',
        padding: '1rem 0'
      }}>
        {COLUMNS.map(column => {
          const columnApps = applications.filter(a => a.status === column);
          return (
            <div key={column} style={{
              minWidth: '220px',
              backgroundColor: '#f4f4f4',
              borderRadius: '8px',
              padding: '1rem',
              flex: 1
            }}>
              {/* Column Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <h4 style={{ margin: 0, color: statusColors[column] }}>{column}</h4>
                <span style={{
                  backgroundColor: statusColors[column],
                  color: 'white',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem'
                }}>
                  {columnApps.length}
                </span>
              </div>

              {/* Droppable Area */}
              <Droppable droppableId={column}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      minHeight: '100px',
                      backgroundColor: snapshot.isDraggingOver ? '#e8e8e8' : 'transparent',
                      borderRadius: '4px',
                      transition: 'background-color 0.2s'
                    }}>
                    {columnApps.map((app, index) => (
                      <Draggable key={app.id} draggableId={app.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              backgroundColor: snapshot.isDragging ? '#dfe6e9' : 'white',
                              borderRadius: '6px',
                              padding: '0.75rem',
                              marginBottom: '0.75rem',
                              boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                              ...provided.draggableProps.style
                            }}>
                            <p style={{ margin: '0 0 0.25rem', fontWeight: 'bold', fontSize: '0.95rem' }}>{app.company}</p>
                            <p style={{ margin: '0 0 0.25rem', fontSize: '0.85rem', color: '#555' }}>{app.role}</p>
                            {app.applied_date && (
                              <p style={{ margin: '0 0 0.25rem', fontSize: '0.75rem', color: '#888' }}>
                                Applied: {app.applied_date}
                              </p>
                            )}
                            {app.follow_up_date && (
                              <p style={{ margin: '0 0 0.5rem', fontSize: '0.75rem', color: '#e67e22' }}>
                                Follow-up: {app.follow_up_date}
                              </p>
                            )}
                            <button
                              onClick={() => onDelete(app.id)}
                              style={{
                                padding: '0.2rem 0.6rem',
                                backgroundColor: '#e74c3c',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '0.75rem'
                              }}>
                              Delete
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;