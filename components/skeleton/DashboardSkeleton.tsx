import React from 'react';

const DashboardSkeleton = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-start-2 pt-10">
                <div className="skeleton my-1 h-10 w-full dark:bg-gray-600 "></div>
                <div className="skeleton my-1 h-10 w-full dark:bg-gray-600 "></div>
                <div className="skeleton my-1 h-10 w-full dark:bg-gray-600 "></div>
                <div className="skeleton my-1 h-10 w-full dark:bg-gray-600 "></div>
                <div className="skeleton my-1 h-10 w-full dark:bg-gray-600 "></div>
            </div>
        </div>
    );
};

export default DashboardSkeleton;