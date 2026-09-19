import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Task, AuditEvent } from '../../types';
import { 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  FileText, 
  Calendar, 
  Layers, 
  ArrowRight, 
  ShieldCheck, 
  X, 
  Play, 
  Search, 
  Filter 
} from 'lucide-react';
import { EmptyState } from '../ui/EmptyState';

export const TaskHistory: React.FC = () => {
  const { taskHistory, startTask, navigateTo } = useApp();
  const [selectedTask, setSelectedTask] = useState<Task | null>(taskHistory[0] || null);
  const [filter, setFilter] = useState<'all' | 'completed' | 'in_progress'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTasks = taskHistory.filter((t) => {
    if (filter === 'completed' && t.status !== 'completed') return false;
    if (filter === 'in_progress' && t.status !== 'in_progress') return false;
    if (searchQuery.trim()) {
      return (
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.goal.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top filter bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search past task activities..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-indigo-600 shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              filter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All ({taskHistory.length})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              filter === 'completed' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter('in_progress')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              filter === 'in_progress' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            In Progress
          </button>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <EmptyState
          type="no-history"
          title="No tasks match your filter"
          description="Try changing your search terms or starting a new guidance session."
          actionLabel="Start a Task"
          onAction={() => navigateTo('/app')}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Tasks List */}
          <div className="lg:col-span-6 space-y-3">
            {filteredTasks.map((task) => {
              const isSelected = selectedTask?.id === task.id;
              const isCompleted = task.status === 'completed';

              return (
                <div
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  className={`cursor-pointer rounded-2xl border p-4 transition-all duration-200 ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/40 shadow-xs ring-1 ring-indigo-600'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${
                        isCompleted ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 leading-tight">{task.title}</h4>
                        <p className="text-[11px] text-slate-500 font-medium">
                          {isCompleted ? 'Completed' : 'In progress'} · {task.startedAt}
                        </p>
                      </div>
                    </div>

                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                      isCompleted ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                      {task.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-1 mb-3">{task.goal}</p>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                    <span>{task.totalSteps} steps completed</span>
                    <span className="flex items-center gap-1 font-semibold text-indigo-600">
                      View timeline <ChevronRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Task Details & Timeline */}
          <div className="lg:col-span-6">
            {selectedTask ? (
              <div className="sticky top-20 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
                <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                      Task Audit Timeline
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-1">{selectedTask.title}</h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Session recorded at {selectedTask.startedAt} {selectedTask.duration ? `(${selectedTask.duration})` : ''}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      startTask(selectedTask.goal, selectedTask.siteId as any);
                      navigateTo('/app/assistant');
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-xl transition"
                  >
                    <Play className="h-3.5 w-3.5" />
                    <span>Replay</span>
                  </button>
                </div>

                {/* Audit trail / step breakdown */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Step Timeline & Actions</h4>
                  
                  <div className="space-y-3 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-slate-200 before:z-0">
                    {selectedTask.auditTrail && selectedTask.auditTrail.length > 0 ? (
                      selectedTask.auditTrail.map((event) => (
                        <div key={event.id} className="relative z-10 flex items-start gap-3">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white text-xs font-bold shrink-0 shadow-2xs">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          </div>
                          <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex-1 text-xs space-y-0.5">
                            <div className="flex items-center justify-between text-slate-500 text-[10px]">
                              <span className="font-semibold uppercase tracking-wider text-indigo-700">{event.type}</span>
                              <span>{event.timestamp}</span>
                            </div>
                            <p className="font-medium text-slate-800 leading-snug">{event.description}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      selectedTask.steps.map((step, idx) => (
                        <div key={step.id} className="relative z-10 flex items-start gap-3">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white text-xs font-bold shrink-0">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          </div>
                          <div className="bg-slate-50 rounded-xl p-3 flex-1 text-xs">
                            <p className="font-medium text-slate-800">{step.instruction}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Safety & Compliance Badge */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
                    <ShieldCheck className="h-4 w-4" />
                    Verified with Zero-Credential Protection
                  </span>
                  <span>ID: {selectedTask.id.slice(0, 12)}</span>
                </div>
              </div>
            ) : (
              <EmptyState
                type="no-active-task"
                title="Select a task to review"
                description="Click on any task from the list to inspect its step-by-step audit trail."
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
