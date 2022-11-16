import './SourceCodeCard.css';
import SourceCode from "../model/SourceCode";
import { ImCross } from 'react-icons/im';

type SourceCodeCardProps = {
    code: SourceCode
    deleteSourceCode: (sourceCode: SourceCode) => void
}

export default function SourceCodeCard(props: SourceCodeCardProps) {

    return (
        <div className="code-card">
            <div className="transl-name">
                {props.code.name}
            </div>
            <div className="code-lang">
                {props.code.language}
            </div>
            <div>
                <ImCross className="code-delete" onClick={() => props.deleteSourceCode(props.code)}/>
            </div>
        </div>
    )
}