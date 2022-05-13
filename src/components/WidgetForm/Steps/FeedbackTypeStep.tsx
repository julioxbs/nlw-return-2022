import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";

interface FeedbackTypeStepProps {
    onFeedbackTypeChange: (type: FeedbackType) => void;
}

export const FeedbackTypeStep = (props: FeedbackTypeStepProps) => {
    return (
        <>
            <header>
                <span className="text-xl leading-6">Deixe seu feedback</span>

                <CloseButton />
            </header>

            <div className="flex py-8 gap-2 w-full">
                {Object.entries(feedbackTypes).map(([key, { title, image: { source, alt } }]) => {
                    return (
                        <button
                            key={key}
                            className="bg-zinc-800 rounded-lg py-5 w-24 flex-1 flex-col items-center border-2 border-transparent hover:border-brand-500 focus:border-brand-500
                            focus:outline-none"
                            type="button"
                            onClick={() => props.onFeedbackTypeChange(key as FeedbackType)}
                        >
                            <img src={source} alt={alt} />
                            <span>{title}</span>
                        </button>
                    );
                })}
            </div>
        </>
    );
}