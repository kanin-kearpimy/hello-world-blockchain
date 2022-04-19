import './card.css'

const Card = ({ hash, data, previousHash }) => {
    return (
        <div className="card">
            <div>
                <span>Hash: </span> <p>{ hash }</p>
            </div>
            <div>
                <span>Data: </span> <p>{ data }</p>
            </div>
            <div>
                <span>Previous Hash: </span> <p>{ previousHash }</p>
            </div>
        </div>
    )
}

export default Card