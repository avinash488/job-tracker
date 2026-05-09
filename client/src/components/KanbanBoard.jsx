import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Trash2, MapPin, DollarSign, Calendar } from 'lucide-react';

const COLUMNS = [
  { id: 'Applied', color: 'bg-blue-500', light: 'bg-blue-50 dark:bg-blue-950', border: 'border-blue-200 dark:border-blue-800' },
  { id: 'Interview', color: 'bg-yellow-500', light: 'bg-yellow-50 dark:bg-yellow-950', border: 'border-yellow-200 dark:border-yellow-800' },
  { id: 'Offer', color: 'bg-emerald-500', light: 'bg-emerald-50 dark:bg-emerald-950', border: 'border-emerald-200 dark:border-emerald-800' },
  { id: 'Rejected', color: 'bg-red-500', light: 'bg-red-50 dark:bg-red-950', border: 'border-red-200 dark:border-red-800' },
  { id: 'Ghosted', color: 'bg-gray-400', light: 'bg-gray-50 dark:bg-gray-900', border: 'border-gray-200 dark:border-gray-700' },
];

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
      <div className="flex gap-4 overflow-x-auto pb-4">
        {COLUMNS.map(column => {
          const columnApps = applications.filter(a => a.status === column.id);
          return (
            <div key={column.id} className={`min-w-[240px] flex-1 rounded-xl border ${column.border} ${column.light} p-3`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${column.color}`} />
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">{column.id}</h3>
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full text-white ${column.color}`}>
                  {columnApps.length}
                </span>
              </div>
              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`min-h-[120px] rounded-lg transition-colors duration-200 ${snapshot.isDraggingOver ? 'bg-white/50 dark:bg-white/5' : ''}`}
                  >
                    {columnApps.map((app, index) => (
                      <Draggable key={app.id} draggableId={app.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={provided.draggableProps.style}
                            className={`bg-white dark:bg-gray-800 rounded-xl p-3.5 mb-2.5 shadow-sm border border-gray-100 dark:border-gray-700 ${snapshot.isDragging ? 'shadow-lg' : 'hover:shadow-md'}`}
                          >
                            <div className="flex justify-between items-start mb-1">
                              <div>
                                <p className="font-semibold text-gray-800 dark:text-white text-sm">{app.company}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{app.role}</p>
                              </div>
                              <button
                                onClick={() => onDelete(app.id)}
                                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                            <div className="space-y-1 mt-2">
                              {app.location && <div className="flex items-center gap-1.5 text-xs text-gray-400"><MapPin size={11} />{app.location}</div>}
                              {app.salary_range && <div className="flex items-center gap-1.5 text-xs text-gray-400"><DollarSign size={11} />{app.salary_range}</div>}
                              {app.applied_date && <div className="flex items-center gap-1.5 text-xs text-gray-400"><Calendar size={11} />Applied: {app.applied_date}</div>}
                              {app.follow_up_date && <div className="flex items-center gap-1.5 text-xs text-orange-400 font-medium"><Calendar size={11} />Follow-up: {app.follow_up_date}</div>}
                            </div>
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