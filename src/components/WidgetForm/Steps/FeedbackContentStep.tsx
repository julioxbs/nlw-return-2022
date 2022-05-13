import { ArrowLeft, Camera } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { api } from "../../../lib/api";
import { CloseButton } from "../../CloseButton";
import { Loading } from "../Loading";
import { ScreenShotButton } from "../ScreenShotButton";

interface FeedbackContentStepProps {
    feedbackType: FeedbackType;
    onBackRequest: () => void;
    onFeedbackSent: () => void;
}

export const FeedbackContentStep = ({onFeedbackSent, feedbackType, onBackRequest}: FeedbackContentStepProps) => {
    const {title, image: {source, alt}} = feedbackTypes[feedbackType];

    const [comment, setComment] = useState("");

    const [screenshot, setScreenshot] = useState<string | null>(null);

    const [isSendingFeedback, setIsSendingFeedback] = useState(false);

    async function handleSubmitFeedback(event: FormEvent) {
        event.preventDefault();
        setIsSendingFeedback(true);

        await api.post('feedbacks', {
            type: feedbackType,
            comment,
            screenshot,
        })
        setIsSendingFeedback(false);
        onFeedbackSent();
    }

    return (
        <>
            <header>
                <button
                onClick={() => onBackRequest()}
                className="top-5 lef-5 absolute text-zinc-400 hover:text-zinc-100" 
                type="button">
                    <ArrowLeft width='bold' className="w-4 h-4"/>
                </button>

                <span className="text-xl leading-6 flex items-center justify-center gap-2">
                    <img className="w-6 h-6" src={source} alt={alt} />
                    {title}
                </span>

                <CloseButton />
            </header>

            <form className="my-4 w-full">
                <textarea
                onChange={(e) => setComment(e.target.value)}
                className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none
                scrollbar
                scrollbar-thumb-zinc-700
                scrollbar-track-transparent
                scrollbar-thin
                "
                placeholder="Conte com detalhes o que está acontecendo..."
                />
            </form>

            <footer className="flex gap-2 my-2">
                <ScreenShotButton
                screenshot={screenshot}
                onScreenshotPressed={setScreenshot} />

                <button
                disabled={comment.length === 0 || isSendingFeedback}
                onClick={handleSubmitFeedback}
                type="submit"
                className="p-2 brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm bg-brand-500 hover:bg-brand-300 focus:outline-none
                focus:ring-2 focus:ring-offset-2
                focus:ring-offset-zinc-900
                focus:rind-brand-500 transition-colors duration-500 disabled:opacity-50 disabled:hover:bg-brand-500
                "
                >
                    {isSendingFeedback ? <Loading/> : 'Enviar feedback'}
                </button>
            </footer>
        </>
    );
}