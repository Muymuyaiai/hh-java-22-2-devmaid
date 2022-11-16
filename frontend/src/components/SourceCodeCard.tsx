import './SourceCodeCard.css';
import SourceCode from "../model/SourceCode";

type SourceCodeCardProps = {
    code: SourceCode
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
        </div>
    )
}