import { CloseButton } from "../../CloseButton";
import successIcon from "../../../assets/success.svg";

interface FeedbackSuccessStepProps {
    onFeedbackRestart: () => void;
}

export const FeedbackSuccessStep = ({onFeedbackRestart}: FeedbackSuccessStepProps) => {
    return (
        <>
            <header>
                <CloseButton />
            </header>

            <div className="flex flex-col items-center py-18 w-[304px]">
                <img src={successIcon} alt="Sucesso! foi finalizado" />

                <span className="text-xl mt-2">
                    Agradecemos o feedback!
                </span>

                <button
                onClick={onFeedbackRestart}
                type="button"
                className="py-2 px-6 m-6 bg-zinc-800 rounded-md border-transparent text-sm leading-6 hover:bg-zinc-700 transition-colors focus:outline-none
                focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:rind-brand-500"
                >
                    Quero enviar outro
                </button>
            </div>
        </>
    );
}