import './TranslationCard.css';
import Translation from "../../model/Translation";
import { ImCross } from 'react-icons/im';


type TranslationCardProps = {
    translation: Translation
    deleteTranslation: (translation: Translation) => void
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
            <div>
                <ImCross className="transl-delete"
                         onClick={() => props.deleteTranslation(props.translation)}
                />
            </div>
        </div>
    )
}