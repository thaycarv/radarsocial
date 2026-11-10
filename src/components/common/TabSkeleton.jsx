import React from 'react';

export const TabSkeleton = () => {
  return (
    <div className="space-y-6 animate-skeleton">
      {/* Top Banner Skeleton */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2.5 w-full max-w-lg">
          <div className="h-5 bg-slate-200 rounded-md w-40"></div>
          <div className="h-7 bg-slate-200 rounded-lg w-72"></div>
          <div className="h-4 bg-slate-100 rounded-md w-full"></div>
        </div>
        <div className="h-10 bg-slate-200 rounded-lg w-48 shrink-0"></div>
      </div>

      {/* KPI Cards Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs space-y-3">
            <div className="flex justify-between items-center">
              <div className="h-3.5 bg-slate-200 rounded w-24"></div>
              <div className="w-7 h-7 bg-slate-100 rounded-lg"></div>
            </div>
            <div className="h-6 bg-slate-200 rounded w-32"></div>
            <div className="h-2 bg-slate-100 rounded-full w-full"></div>
          </div>
        ))}
      </div>

      {/* Main Content Area Skeleton */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="h-6 bg-slate-200 rounded w-56"></div>
        <div className="h-64 bg-slate-100 rounded-xl w-full flex items-center justify-center">
          <div className="h-8 w-8 rounded-full border-2 border-slate-300 border-t-slate-500 animate-spin"></div>
        </div>
      </div>
    </div>
  );
};
