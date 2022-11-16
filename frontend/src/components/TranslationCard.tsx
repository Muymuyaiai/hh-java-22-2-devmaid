import './TranslationCard.css';
import Translation from "../model/Translation";

type TranslationCardProps = {
    translation: Translation
}

export default function TranslationCard(props: TranslationCardProps) {

    return (
        <div className="transl-card">
            <div className="transl-name">
                {props.translation.name}
            </div>
            <div className="transl-srclang">
                {props.translation.srcLang}
            </div>
            <div className="transl-tarlang">
                {props.translation.tarLang}
            </div>
        </div>
    )
}