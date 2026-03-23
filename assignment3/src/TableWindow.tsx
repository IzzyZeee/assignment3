type StepProps = {
    title: string;
    children: React.ReactNode;
    renderExtra?: () => React.ReactNode; 
};

export const tableWindow ({ renderExtra, children }: StepProps) => ( // Table display  
    {renderExtra && ( // Optional ("History" window has a title text thing)
        <div></div>
    )}

    <h1 className="mb-67"></h1> // Children
  
)