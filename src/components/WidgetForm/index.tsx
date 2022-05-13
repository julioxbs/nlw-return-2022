import { useState } from "react";

import bugImage from "../../assets/bug.svg";
import ideiaImage from "../../assets/ideia.svg";
import otherImage from "../../assets/other.svg";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";

export const feedbackTypes = {
    BUG: {
        title: 'Problema',
        image: {
            source: bugImage,
            alt: 'Imagem de um inseto',
        }
    },
    IDEA: {
        title: 'Ideia',
        image: {
            source: ideiaImage,
            alt: 'Imagem de uma lâmpada',
        }
    },
    OTHER: {
        title: 'Outro',
        image: {
            source: otherImage,
            alt: 'Imagem de um balão de pensamento',
        }
    },
}

export type FeedbackType = keyof typeof feedbackTypes;

export const WidgetForm = () => {
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);

    const backToFeedbackType = () => {
        setFeedbackSent(false);
        setFeedbackType(null);
    }

    const [feedbackSent, setFeedbackSent] = useState(false);

    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
            {feedbackSent ? (
                <FeedbackSuccessStep onFeedbackRestart={backToFeedbackType} />
            ) : (
                <>
                    {!feedbackType ?
                        <FeedbackTypeStep onFeedbackTypeChange={setFeedbackType} /> :
                        <FeedbackContentStep
                            onBackRequest={backToFeedbackType}
                            feedbackType={feedbackType}
                            onFeedbackSent={() => setFeedbackSent(true)} />}
                </>
            )}

            <footer className="text-xs text-neutral-400">
                Feito com ♥ pela <a className="underline underline-offset-2" target="_blank" href="https://rocketseat.com.br">Rocketseat</a>
            </footer>
        </div>
    );
}