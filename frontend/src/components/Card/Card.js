import './card.css'

const Card = ({ hash, previousHash, handleClick }) => {
    return (
        <div className="card" onClick={handleClick}>
            <div>
                <span>Hash: </span> <p>{ hash }</p>
            </div>
            <div>
                <span>Previous Hash: </span> <p>{ previousHash }</p>
            </div>
        </div>
    )
}

export default Card