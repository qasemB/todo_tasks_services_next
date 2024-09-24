const Content = ({ children, }: Readonly<{ children: React.ReactNode; }>) => {
    return (
        <div className={`bg-gray-100 dark:bg-gray-500 fixed w-full h-screen transition-all pt-app_header_h lg:pr-app_sidebar_w  overflow-hidden`}>
            <div className="w-full h-full p-5 pb-2 relative overflow-y-auto">
                {children}
            </div>
        </div>
    );
};

export default Content;