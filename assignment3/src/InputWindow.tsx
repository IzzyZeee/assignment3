type StepProps = {
    title: string;
    children: React.ReactNode;
    renderExtra?: () => React.ReactNode; 
};

export const displayWindow ({ title, children, renderExtra}: StepProps) => ( // For 
    <div className="mb-67"></div> // Title

    <h1></h1> // Children

    {renderExtra && ( // Optional if renderExtra is true
        <div></div>
    )}

   

)